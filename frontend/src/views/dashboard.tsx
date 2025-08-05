import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TotalSalaryView } from "./total-salary/total-salary";
import { WorkersView } from "./workers-departments/workers-departments";
import { AnnualSalaryView } from "./annual-salary/annual-salary";

type ViewType = "total" | "workers" | "annual";

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<ViewType>("total");

  const RenderCurrentView = () => {
    switch (currentView) {
      case "total":
        return <TotalSalaryView />;
      case "workers":
        return <WorkersView />;
      case "annual":
        return <AnnualSalaryView />;
      default:
        return <TotalSalaryView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Employee Dashboard</h1>
            </div>
            <div className="flex space-x-4">
              <Button variant={currentView === "total" ? "default" : "outline"} onClick={() => setCurrentView("total")}>
                Total Salary
              </Button>
              <Button
                variant={currentView === "workers" ? "default" : "outline"}
                onClick={() => setCurrentView("workers")}
              >
                Workers + Departments
              </Button>
              <Button
                variant={currentView === "annual" ? "default" : "outline"}
                onClick={() => setCurrentView("annual")}
              >
                Annual Salary
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <RenderCurrentView />
      </main>
    </div>
  );
}
