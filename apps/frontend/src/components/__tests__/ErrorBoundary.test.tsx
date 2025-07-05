import { render, screen } from '@testing-library/react';
import ErrorBoundary, { CalendarErrorBoundary } from '../ErrorBoundary';

// Component that throws an error for testing
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Suppress console.error for cleaner test output
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('should render default error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Please refresh the page to try again.')).toBeInTheDocument();
  });

  it('should render custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>;
    
    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('should show error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    (process.env as any).NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error details (development only)')).toBeInTheDocument();

    (process.env as any).NODE_ENV = originalEnv;
  });

  it('should not show error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    (process.env as any).NODE_ENV = 'production';

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.queryByText('Error details (development only)')).not.toBeInTheDocument();

    (process.env as any).NODE_ENV = originalEnv;
  });
});

describe('CalendarErrorBoundary', () => {
  it('should render children when there is no error', () => {
    render(
      <CalendarErrorBoundary>
        <ThrowError shouldThrow={false} />
      </CalendarErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('should render calendar-specific error UI when child component throws', () => {
    render(
      <CalendarErrorBoundary>
        <ThrowError shouldThrow={true} />
      </CalendarErrorBoundary>
    );

    expect(screen.getByText('Calendar Unavailable')).toBeInTheDocument();
    expect(screen.getByText('The calendar could not be rendered. Please try refreshing the page.')).toBeInTheDocument();
  });

  it('should have amber styling for calendar errors', () => {
    render(
      <CalendarErrorBoundary>
        <ThrowError shouldThrow={true} />
      </CalendarErrorBoundary>
    );

    const errorContainer = screen.getByText('Calendar Unavailable').closest('div');
    expect(errorContainer).toHaveClass('bg-amber-50', 'border-amber-200');
  });
});