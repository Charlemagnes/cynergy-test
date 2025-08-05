import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WorkersView } from "@/views/workers-departments/workers-departments";
import { getWorkersWithDepartments } from "@/lib/api-calls";
import { WorkerDepartment } from "@/types/workers";

// Mock the API call
vi.mock("@/lib/api-calls", () => ({
  getWorkersWithDepartments: vi.fn(),
}));

describe("WorkersView Component", () => {
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
    vi.mocked(getWorkersWithDepartments).mockReset();
  });

  it("renders the workers view with data", async () => {
    const mockData: WorkerDepartment[] = [
      {
        worker_id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        hire_date: "2023-01-15",
        department_name: "IT",
      },
      {
        worker_id: 2,
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        hire_date: "2023-02-20",
        department_name: "HR",
      },
    ];

    vi.mocked(getWorkersWithDepartments).mockResolvedValueOnce(mockData);

    render(
      <QueryClientProvider client={queryClient}>
        <WorkersView />
      </QueryClientProvider>
    );

    // Check if title and description are rendered
    expect(screen.getByText("Workers + Departments")).toBeInTheDocument();
    expect(screen.getByText("Complete list of workers with their departments")).toBeInTheDocument();

    // Wait for data to be loaded
    await screen.findByText(/John/);

    // Check if data is rendered
    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.getByText(/Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Jane/)).toBeInTheDocument();
    expect(screen.getByText(/Smith/)).toBeInTheDocument();
    expect(screen.getByText("IT")).toBeInTheDocument();
    expect(screen.getByText("HR")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    vi.mocked(getWorkersWithDepartments).mockImplementationOnce(
      () => new Promise(() => {}) // Never resolves
    );

    render(
      <QueryClientProvider client={queryClient}>
        <WorkersView />
      </QueryClientProvider>
    );

    // Should show loading indicator
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("handles error state", async () => {
    vi.mocked(getWorkersWithDepartments).mockRejectedValueOnce(new Error("Failed to fetch"));

    render(
      <QueryClientProvider client={queryClient}>
        <WorkersView />
      </QueryClientProvider>
    );

    // Wait for error message
    await screen.findByText("There was an error");
    expect(screen.getByText("There was an error")).toBeInTheDocument();
  });
});
