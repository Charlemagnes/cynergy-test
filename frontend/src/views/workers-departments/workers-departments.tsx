import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const WorkersView = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Workers</CardTitle>
        <CardDescription>Complete list of workers with their departments</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Monthly Salary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workersWithDepartments.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell className="font-medium">{worker.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{worker.departmentName}</Badge>
                </TableCell>
                <TableCell>${worker.monthlySalary.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
