interface BaseWorker {
  worker_id: number;
  first_name: string;
  last_name: string;
  email: string;
  hire_date: string;
}

interface WorkerSalary extends BaseWorker {
  salary: number;
}

interface WorkerDepartment extends BaseWorker {
  department_name: string;
}

interface WorkerAnnualSalary extends WorkerDepartment {
  annual_salary: number;
}

export { WorkerSalary, WorkerDepartment, WorkerAnnualSalary };
