import { DataTable } from "@/components/data-table/data-table";
import DataTableFilters, {
  DataTableSearchFilter,
  DataTableFilterGroup,
  DataTableShowByFilterDropdown,
  ResetFiltersButton,
  DataTableGlobalSearchFilter,
} from "@/components/data-table/data-table-filters";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTotalSalaries } from "@/lib/api-calls";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const TotalSalaryView = () => {
  const queryClient = useQueryClient();
  const { isPending: isPending, data: workers } = useQuery({
    queryKey: ["workers-total-salary"],
    queryFn: async () => {
      const result = await getTotalSalaries();
      console.log(result);
      return result;
    },
  });

  const totalSalary = workers?.reduce((sum, worker) => sum + worker.salary, 0);

  const apiKeyColumns = createApiKeysColumns({
    handleCopyToClipboard: copyToClipboard,
    handleRevokeApiKey: handleRevokeApiKey,
    selectedApiKey: selectedApiKey,
    copiedId: copied,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Salary Overview</CardTitle>
        <CardDescription>Combined monthly salary of all workers</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          tableId="api-keys-table"
          columns={workersColumns}
          data={workers ?? []}
          isLoading={isPending}
          filters={
            <DataTableFilters>
              <DataTableGlobalSearchFilter placeholder="Search Users..." />
            </DataTableFilters>
          }
        />
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Total Monthly Salary</TableCell>
              <TableCell className="text-2xl font-bold text-green-600">${totalSalary.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Total Annual Salary</TableCell>
              <TableCell className="text-2xl font-bold text-blue-600">${(totalSalary * 12).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Number of Workers</TableCell>
              <TableCell className="text-xl font-semibold">{workers.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Average Monthly Salary</TableCell>
              <TableCell className="text-xl font-semibold">
                ${Math.round(totalSalary / workers.length).toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table> */}
      </CardContent>
    </Card>
  );
};
