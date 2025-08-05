"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnFiltersState,
  type FilterFn,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { rankItem } from "@tanstack/match-sorter-utils";
import { createContext, useContext, useState, type ReactNode, forwardRef, useImperativeHandle } from "react";
import { Table as TanstackTable, type Row } from "@tanstack/table-core";

interface DataTableProps<TData, TValue> {
  tableId: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | [];
  isLoading?: boolean;
  filters?: ReactNode;
  error?: Error | null;
  rowOnClick?: (row: TData | null) => void;
  multipleSelection?: boolean;
  footer?: ReactNode;
}

export type CustomColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  headClassName?: string;
};

// Define the fuzzy filter function
//  that will be shared across components
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// Define the context type
interface DataTableContextType {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  table: TanstackTable<any>;
}

export const DataTableContext = createContext<DataTableContextType | undefined>(undefined);

export const DataTable = forwardRef<TanstackTable<any>, DataTableProps<any, any>>(
  ({ tableId, columns, data, isLoading, filters, error, rowOnClick, multipleSelection = false, footer }, ref) => {
    // const { globalFilter, setGlobalFilter, columnFilters, setColumnFilters } = useDataTable();
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
      data: data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        columnFilters,
        globalFilter,
      },
      filterFns: {
        fuzzy: fuzzyFilter,
      },
      globalFilterFn: fuzzyFilter,
      onGlobalFilterChange: setGlobalFilter,
      onColumnFiltersChange: setColumnFilters,
    });

    useImperativeHandle(ref, () => table, []);
    const contextvalue = {
      globalFilter,
      setGlobalFilter,
      columnFilters,
      setColumnFilters,
      table,
    };

    const handleRowOnClick = (row: Row<any>) => {
      const rowData = row.original; // Get the original data of the clicked row
      if (rowOnClick) {
        table.toggleAllRowsSelected(false);
        const isCurrentRowSelected = row.getIsSelected();
        if (isCurrentRowSelected) {
          row.toggleSelected(false);
          rowOnClick(null);
          return;
        }
        row.toggleSelected(true);
        rowOnClick(rowData); // Call the rowOnClick function with the row data
      }
    };

    const handleMultiRowOnClick = (row: Row<any>) => {
      row.toggleSelected(!row.getIsSelected()); // Toggle the selection state of the row
    };

    const RenderTableBody = () =>
      table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            onClick={() => (!multipleSelection ? handleRowOnClick(row) : handleMultiRowOnClick(row))}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 border text-center dark:border-white">
            No results.
          </TableCell>
        </TableRow>
      );

    return (
      <DataTableContext.Provider value={contextvalue}>
        <div className="rounded-md border dark:border-white">
          {filters}
          <Table id={tableId}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const headClassName = (header.column.columnDef.meta as { headClassName?: string })?.headClassName;

                    return (
                      <TableHead className={headClassName} key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <span>There was an error</span>
                  </TableCell>
                </TableRow>
              ) : isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <Loader2 role="status" className="mx-auto h-16 w-16 animate-spin text-foreground" />
                  </TableCell>
                </TableRow>
              ) : (
                <RenderTableBody />
              )}
            </TableBody>
          </Table>
          <Separator orientation="horizontal" className="dark:bg-white" />

          <div className="flex items-center justify-end space-x-2 rounded-sm border p-4 dark:border-white">
            {/* will have to think of a better way to space footer items but i'll do some quick shit */}
            <div className="flex flex-wrap items-center pr-12">{footer}</div>
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border border-green-600 bg-green-500 text-white hover:bg-green-600"
            >
              Previous
            </Button>

            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button> */}
          </div>
        </div>
      </DataTableContext.Provider>
    );
  }
);

DataTable.displayName = "DataTable";

// Custom hook for using the DataTable context
export function useDataTable() {
  const context = useContext(DataTableContext);
  if (context === undefined) {
    throw new Error("useDataTable must be used within a DataTableProvider");
  }
  return context;
}
