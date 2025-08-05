import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const AnnualSalaryView = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Annual Salary Report</CardTitle>
        <CardDescription>Annual salary breakdown by worker and department</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Monthly Salary</TableHead>
              <TableHead>Annual Salary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workersWithAnnualSalary
              .sort((a, b) => b.annualSalary - a.annualSalary)
              .map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell className="font-medium">{worker.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{worker.departmentName}</Badge>
                  </TableCell>
                  <TableCell>${worker.monthlySalary.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold text-green-600">
                    ${worker.annualSalary.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
