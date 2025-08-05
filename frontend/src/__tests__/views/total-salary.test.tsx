import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TotalSalaryView } from "@/views/total-salary/total-salary";
import { getTotalSalaries } from "@/lib/api-calls";
import { WorkerSalary } from "@/types/workers";

// Mock the API call
vi.mock("@/lib/api-calls", () => ({
  getTotalSalary: vi.fn(),
}));

describe("TotalSalaryView Component", () => {
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
    vi.mocked(getTotalSalaries).mockReset();
  });

  it("renders the total salary view with data", async () => {
    const mockData: WorkerSalary[] = [
      {
        worker_id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        hire_date: "2023-01-15",
        salary: 50000,
      },
      {
        worker_id: 2,
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        hire_date: "2023-02-20",
        salary: 60000,
      },
    ];

    vi.mocked(getTotalSalaries).mockResolvedValueOnce(mockData);

    render(
      <QueryClientProvider client={queryClient}>
        <TotalSalaryView />
      </QueryClientProvider>
    );

    // Check if title and description are rendered
    expect(screen.getByText("Total Salary")).toBeInTheDocument();
    expect(screen.getByText("List of workers with their total salary")).toBeInTheDocument();

    // Wait for data to be loaded
    await screen.findByText(/John/);

    // Check if salary data is formatted correctly
    expect(screen.getByText("$50,000")).toBeInTheDocument();
    expect(screen.getByText("$60,000")).toBeInTheDocument();
    expect(screen.getByText(/Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Smith/)).toBeInTheDocument();
  });

  it("shows loading state", () => {
    vi.mocked(getTotalSalaries).mockImplementationOnce(
      () => new Promise(() => {}) // Never resolves
    );

    render(
      <QueryClientProvider client={queryClient}>
        <TotalSalaryView />
      </QueryClientProvider>
    );

    // Should show loading indicator
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("handles error state", async () => {
    vi.mocked(getTotalSalaries).mockRejectedValueOnce(new Error("Failed to fetch"));

    render(
      <QueryClientProvider client={queryClient}>
        <TotalSalaryView />
      </QueryClientProvider>
    );

    // Wait for error message
    await screen.findByText("There was an error");
    expect(screen.getByText("There was an error")).toBeInTheDocument();
  });
});
