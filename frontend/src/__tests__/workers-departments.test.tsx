import { render, screen } from '@testing-library/react';
import { WorkersView } from '../views/workers-departments/workers-departments';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the API call
vi.mock('@/lib/api-calls', () => ({
  getWorkersWithDepartments: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: 'John Doe',
      department: 'Engineering',
      salary: 75000,
    },
  ]),
}));

describe('WorkersView', () => {
  const queryClient = new QueryClient();

  it('renders the workers and departments view', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <WorkersView />
      </QueryClientProvider>
    );

    expect(screen.getByText('Workers + Departments')).toBeInTheDocument();
    expect(
      screen.getByText('Complete list of workers with their departments')
    ).toBeInTheDocument();
  });

  it('shows the search input', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <WorkersView />
      </QueryClientProvider>
    );

    expect(screen.getByPlaceholderText('Search Workers...')).toBeInTheDocument();
  });
});
