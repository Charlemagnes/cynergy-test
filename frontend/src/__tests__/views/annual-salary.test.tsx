import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnnualSalaryView } from "@/views/annual-salary/annual-salary";
import { getAnnualSalaries } from "@/lib/api-calls";
import { WorkerAnnualSalary } from "@/types/workers";

// Mock the API call
vi.mock("@/lib/api-calls", () => ({
  getAnnualSalaries: vi.fn(),
}));

describe("AnnualSalaryView Component", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    // Reset mock
    vi.mocked(getAnnualSalaries).mockReset();
  });

  it("renders the annual salary view with data", async () => {
    const mockData: WorkerAnnualSalary[] = [
      {
        worker_id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        hire_date: "2023-01-15",
        department_name: "IT",
        annual_salary: 60000,
      },
      {
        worker_id: 2,
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        hire_date: "2023-02-20",
        department_name: "HR",
        annual_salary: 72000,
      },
    ];

    vi.mocked(getAnnualSalaries).mockResolvedValueOnce(mockData);

    render(
      <QueryClientProvider client={queryClient}>
        <AnnualSalaryView />
      </QueryClientProvider>
    );

    // Check if title and description are rendered
    expect(screen.getByText("Annual Salary Report")).toBeInTheDocument();
    expect(screen.getByText("Annual salary breakdown by worker and department")).toBeInTheDocument();

    // Wait for data to be loaded
    await screen.findByText(/John/);

    // Check if annual salary data is formatted correctly
    expect(screen.getByText("$60,000.00")).toBeInTheDocument();
    expect(screen.getByText("$72,000.00")).toBeInTheDocument();
    expect(screen.getByText(/Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Smith/)).toBeInTheDocument();
    expect(screen.getByText("HR")).toBeInTheDocument();
    expect(screen.getByText("IT")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    vi.mocked(getAnnualSalaries).mockImplementationOnce(
      () => new Promise(() => {}) // Never resolves
    );

    render(
      <QueryClientProvider client={queryClient}>
        <AnnualSalaryView />
      </QueryClientProvider>
    );

    // Should show loading indicator
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("handles error state", async () => {
    vi.mocked(getAnnualSalaries).mockRejectedValueOnce(new Error("Failed to fetch"));

    render(
      <QueryClientProvider client={queryClient}>
        <AnnualSalaryView />
      </QueryClientProvider>
    );

    // Wait for error message
    await screen.findByText("There was an error");
    expect(screen.getByText("There was an error")).toBeInTheDocument();
  });
});
