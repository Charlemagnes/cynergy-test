import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getWorkersWithDepartments } from "@/lib/api-calls";
import { workerDepartmentColumns } from "./table-col-defs";
import { DataTable } from "@/components/data-table/data-table";
import DataTableFilters, { DataTableGlobalSearchFilter } from "@/components/data-table/data-table-filters";

export const WorkersView = () => {
  const {
    isPending: isPending,
    data: workersAndDepartments,
    error: fetchingError,
  } = useQuery({
    queryKey: ["workers-departments"],
    queryFn: async () => {
      const result = await getWorkersWithDepartments();
      // console.log(result);
      return result;
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workers + Departments</CardTitle>
        <CardDescription>Complete list of workers with their departments</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          tableId="workers-departments"
          columns={workerDepartmentColumns}
          data={workersAndDepartments ?? []}
          error={fetchingError}
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
