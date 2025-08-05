import { DataTable } from "@/components/data-table/data-table";
import DataTableFilters, { DataTableGlobalSearchFilter } from "@/components/data-table/data-table-filters";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTotalSalaries } from "@/lib/api-calls";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { totalSalaryColumns } from "./table-col-defs";

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

  // const totalSalary = workers?.reduce((sum, worker) => sum + worker.salary, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Salary Overview</CardTitle>
        <CardDescription>Combined monthly salary of all workers</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          tableId="workers-salary"
          columns={totalSalaryColumns}
          data={workers ?? []}
          isLoading={isPending}
          filters={
            <DataTableFilters>
              <DataTableGlobalSearchFilter placeholder="Search Workers..." />
            </DataTableFilters>
          }
        />
      </CardContent>
    </Card>
  );
};
