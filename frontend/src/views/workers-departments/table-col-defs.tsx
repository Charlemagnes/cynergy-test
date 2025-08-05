import { ColumnDef } from "@tanstack/react-table";
import { WorkerDepartment } from "@/types/workers";
import { CommonCell } from "@/components/data-table/common-cell";

const headerClasses = "px-6 py-3 text-center text-xs text-foreground font-medium uppercase tracking-wider";

export const workerDepartmentColumns: ColumnDef<WorkerDepartment>[] = [
  {
    accessorKey: "worker_id",
    header: () => <div className={headerClasses}>ID</div>,
    cell: ({ row }) => (
      <CommonCell className="text-center">
        <span className="text-sm font-medium">{row.getValue("worker_id")}</span>
      </CommonCell>
    ),
  },
  {
    accessorKey: "first_name",
    header: () => <div className={headerClasses}>First Name</div>,
    cell: ({ row }) => (
      <CommonCell>
        <span className="text-sm">{row.getValue("first_name")}</span>
      </CommonCell>
    ),
  },
  {
    accessorKey: "last_name",
    header: () => <div className={headerClasses}>Last Name</div>,
    cell: ({ row }) => (
      <CommonCell>
        <span className="text-sm">{row.getValue("last_name")}</span>
      </CommonCell>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className={headerClasses}>Email</div>,
    cell: ({ row }) => (
      <CommonCell>
        <span className="text-sm text-gray-600 dark:text-gray-300">{row.getValue("email")}</span>
      </CommonCell>
    ),
  },
  {
    accessorKey: "hire_date",
    header: () => <div className={headerClasses}>Hire Date</div>,
    cell: ({ row }) => (
      <CommonCell>
        <span className="text-sm">{new Date(row.getValue("hire_date")).toLocaleDateString()}</span>
      </CommonCell>
    ),
  },
  {
    accessorKey: "department_name",
    header: () => <div className={headerClasses}>Department</div>,
    cell: ({ row }) => (
      <CommonCell>
        <span className="text-sm font-medium">{row.getValue("department_name")}</span>
      </CommonCell>
    ),
  },
];
