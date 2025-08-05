import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";

describe("DataTable Component", () => {
  // Sample data for testing
  const testData = [
    { id: 1, name: "John Doe", department: "IT" },
    { id: 2, name: "Jane Smith", department: "HR" },
  ];

  // Sample columns definition
  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
  ];

  it("renders the table with data", () => {
    render(<DataTable tableId="test-table" columns={columns} data={testData} />);

    // Check if column headers are rendered
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Department")).toBeInTheDocument();

    // Check if data is rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("IT")).toBeInTheDocument();
    expect(screen.getByText("HR")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<DataTable tableId="test-table" columns={columns} data={[]} isLoading={true} />);

    // Check if loading indicator is present
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows error state", () => {
    render(<DataTable tableId="test-table" columns={columns} data={[]} error={new Error("Test error")} />);

    expect(screen.getByText("There was an error")).toBeInTheDocument();
  });

  it("handles row click", () => {
    const handleRowClick = vi.fn();
    render(<DataTable tableId="test-table" columns={columns} data={testData} rowOnClick={handleRowClick} />);

    // Click on a row
    fireEvent.click(screen.getByText("John Doe"));
    expect(handleRowClick).toHaveBeenCalledWith(testData[0]);
  });

  it("shows no results message when data is empty", () => {
    render(<DataTable tableId="test-table" columns={columns} data={[]} />);

    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("handles multiple selection", () => {
    render(<DataTable tableId="test-table" columns={columns} data={testData} multipleSelection={true} />);

    // Click multiple rows
    fireEvent.click(screen.getByText("John Doe"));
    fireEvent.click(screen.getByText("Jane Smith"));

    // Check if both rows are selected (they should have the 'selected' state)
    const rows = screen.getAllByRole("row").slice(1); // Exclude header row
    expect(rows[0]).toHaveAttribute("data-state", "selected");
    expect(rows[1]).toHaveAttribute("data-state", "selected");
  });
});
