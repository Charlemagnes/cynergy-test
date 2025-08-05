"use client";

import type React from "react";

import { Filter, Search, CalendarIcon } from "lucide-react";
import { useDataTable } from "./data-table";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { DebouncedInput } from "../ui/debounced-input";
// import { Calendar } from '@/components/ui/calendar';
// import type { DateRange } from 'react-day-picker';
// import { format } from 'date-fns';
// import { Button } from '@/components/ui/button';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DataTableFiltersProps {
  children?: ReactNode;
}

interface DataTableSearchFilterProps {
  placeholder?: string;
  value: string;
  onChange(value: string): void;
}

interface DataTableFilterActiveProps {
  label?: string;
  columnId: string;
}

interface DataTableFilterOptionProps extends DataTableFilterActiveProps {
  options: { label: string; value: string }[];
}

interface ResetFiltersButtonProps {
  label?: string;
  resetFunctions: Array<() => void>;
}

//TODO: place them in separate files

export default function DataTableFilters({ children }: DataTableFiltersProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-t-md border bg-card p-4 dark:border-white sm:flex-row sm:items-center">
      {children}
    </div>
  );
}

// Search Filter
export function DataTableSearchFilter({ placeholder = "Search...", value, onChange }: DataTableSearchFilterProps) {
  return (
    <div className="relative w-full sm:w-64">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>

      <DebouncedInput
        type="text"
        value={value}
        onChange={(event) => onChange(String(event))}
        className="block w-full rounded-md border border-border bg-input py-2 pl-10 pr-3 text-sm leading-5 placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder={placeholder}
      />
    </div>
  );
}

//search filter but with global filter
// Search Filter
export function DataTableGlobalSearchFilter({ placeholder = "Search..." }: { placeholder?: string }) {
  const { globalFilter, setGlobalFilter } = useDataTable();

  return (
    <div className="relative w-full sm:w-64">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>

      <DebouncedInput
        type="text"
        value={globalFilter}
        onChange={(event) => setGlobalFilter(String(event))}
        className="block w-full rounded-md border border-border bg-input py-2 pl-10 pr-3 text-sm leading-5 placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder={placeholder}
      />
    </div>
  );
}

// Active Filter
export function DataTableActiveFilter({ label = "Show inactive", columnId = "is_active" }: DataTableFilterActiveProps) {
  const { table } = useDataTable();
  const filterValue = table.getColumn(columnId)?.getFilterValue() as boolean | undefined;

  const handleShowInactiveChange = () => {
    const column = table.getColumn(columnId);
    const currentFilterValue = column?.getFilterValue() as boolean | undefined;

    if (currentFilterValue == undefined) {
      column?.setFilterValue(false);
    } else {
      column?.setFilterValue(undefined);
    }
  };

  return (
    <div className="flex items-center">
      <input
        id={`show-inactive-${columnId}`}
        type="checkbox"
        checked={filterValue == false ? true : false}
        onChange={() => handleShowInactiveChange()}
        className="h-4 w-4 rounded border-border text-primary transition-colors focus:ring-primary"
      />
      <label htmlFor={`show-inactive-${columnId}`} className="ml-2 block text-sm text-foreground">
        {label}
      </label>
    </div>
  );
}

//show by column condition dropdown
export function DataTableShowByFilterDropdown({
  label = "Show by",
  columnId = "is_active",
  options,
}: DataTableFilterOptionProps) {
  const { table } = useDataTable();
  const filterValue = table.getColumn(columnId)?.getFilterValue() as string | undefined;

  const handleShowByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const column = table.getColumn(columnId);
    const value = event.target.value;
    if (value === "all") {
      column?.setFilterValue(undefined);
      return;
    }
    column?.setFilterValue(value);
  };

  return (
    <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
      <label htmlFor={`show-by-${columnId}`} className="text-sm text-foreground">
        {label}
      </label>
      <select
        id={`show-by-${columnId}`}
        value={filterValue || ""}
        onChange={handleShowByChange}
        className="rounded-md border border-border bg-input px-3 py-1.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="all">All</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Reset Filters Button
export function ResetFiltersButton({ label = "Reset filters", resetFunctions }: ResetFiltersButtonProps) {
  const { setGlobalFilter, setColumnFilters } = useDataTable();

  const resetFilters = () => {
    setGlobalFilter("");
    setColumnFilters([]);
    resetFunctions.forEach((resetFunction) => resetFunction());
  };

  return (
    <button
      onClick={resetFilters}
      type="button"
      className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
    >
      <Filter className="mr-1.5 h-4 w-4 text-foreground" />
      {label}
    </button>
  );
}

/* yknow what ill just comment this for time purposes
export function DataTableCalendarFilter({
  selectedRange,
  onSelect,
}: {
  selectedRange?: DateRange;
  onSelect(range: DateRange | undefined): void;
}) {
  const [internalSelectedRange, setInternalSelectedRange] = useState<DateRange | undefined>(
    selectedRange
  );

  useEffect(() => {
    setInternalSelectedRange(selectedRange);
  }, [selectedRange]);

  const debouncedOnSelect = useCallback(
    debounce((range: DateRange | undefined) => {
      onSelect(range);
    }, 500),
    [onSelect]
  );

  const handleInternalSelect = useCallback(
    (range: DateRange | undefined) => {
      setInternalSelectedRange(range);
      debouncedOnSelect(range);
    },
    [debouncedOnSelect]
  );

  const displayText = internalSelectedRange?.from
    ? internalSelectedRange.to
      ? `${format(internalSelectedRange.from, 'PPP')} - ${format(internalSelectedRange.to, 'PPP')}`
      : format(internalSelectedRange.from, 'PPP')
    : 'Date Range...';

  return (
    <div className="flex w-full flex-wrap gap-2 sm:w-auto">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start text-left text-sm transition-colors">
            <CalendarIcon className="mr-2 h-4 w-4 text-foreground" />
            <span className="max-w-[180px] truncate sm:max-w-[220px]">{displayText}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={internalSelectedRange}
            onSelect={handleInternalSelect}
            initialFocus
            className="rounded-md border border-border shadow-md"
          />
        </PopoverContent>
      </Popover>
      {internalSelectedRange && (
        <Button
          variant="ghost"
          onClick={() => handleInternalSelect(undefined)}
          className="h-auto px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Clear
        </Button>
      )}
    </div>
  );
}
*/

// Helper function for debounce
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Container for grouping filter elements
export function DataTableFilterGroup({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-4">{children}</div>;
}
