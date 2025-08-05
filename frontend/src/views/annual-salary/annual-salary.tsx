import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/data-table";
import DataTableFilters, { DataTableGlobalSearchFilter } from "@/components/data-table/data-table-filters";
import { getAnnualSalaries } from "@/lib/api-calls";
import { useQuery } from "@tanstack/react-query";
import { annualSalaryColumns } from "./table-col-defs";

export const AnnualSalaryView = () => {
  const {
    isPending: isPending,
    data: workersAndDepartments,
    error: fetchingError,
  } = useQuery({
    queryKey: ["workers-annual-salary"],
    queryFn: async () => {
      const result = await getAnnualSalaries();
      // console.log(result);
      return result;
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Annual Salary Report</CardTitle>
        <CardDescription>Annual salary breakdown by worker and department</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          tableId="workers-annual-salary"
          columns={annualSalaryColumns}
          data={workersAndDepartments ?? []}
          isLoading={isPending}
          error={fetchingError}
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
