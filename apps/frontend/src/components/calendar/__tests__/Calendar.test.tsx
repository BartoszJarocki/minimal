import { render, screen } from '@testing-library/react';
import { DateTime } from 'luxon';
import { MonthCalendar, addLeadingZeros } from '../Calendar';

// Mock Luxon DateTime for consistent testing
const mockDate = DateTime.fromISO('2024-01-15T00:00:00.000Z');

describe('Calendar Components', () => {
  describe('addLeadingZeros', () => {
    it('should add leading zeros to single digit numbers', () => {
      expect(addLeadingZeros(5, 2)).toBe('05');
      expect(addLeadingZeros(1, 3)).toBe('001');
    });

    it('should not modify numbers that already meet the required length', () => {
      expect(addLeadingZeros(10, 2)).toBe('10');
      expect(addLeadingZeros(123, 3)).toBe('123');
    });
  });

  describe('MonthCalendar', () => {
    const defaultProps = {
      date: mockDate,
      weekNames: 'short' as const,
    };

    it('should render calendar grid with proper accessibility attributes', () => {
      render(<MonthCalendar {...defaultProps} />);
      
      // Check for grid role
      const calendar = screen.getByRole('grid');
      expect(calendar).toBeInTheDocument();
      expect(calendar).toHaveAttribute('aria-label', 'Calendar for January 2024');
    });

    it('should render weekday headers with proper accessibility', () => {
      render(<MonthCalendar {...defaultProps} />);
      
      // Check for column headers
      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(7); // 7 days of the week
      
      // Check that each header has proper aria-label
      headers.forEach(header => {
        expect(header).toHaveAttribute('aria-label');
      });
    });

    it('should render day cells with grid cell role', () => {
      render(<MonthCalendar {...defaultProps} />);
      
      // Check for grid cells (this includes day numbers and empty cells)
      const cells = screen.getAllByRole('gridcell');
      expect(cells.length).toBeGreaterThan(28); // At least 28 days + blanks
    });

    it('should handle custom locale', () => {
      render(<MonthCalendar {...defaultProps} locale="en-US" />);
      
      const calendar = screen.getByRole('grid');
      expect(calendar).toBeInTheDocument();
    });

    it('should render with custom CSS classes', () => {
      render(<MonthCalendar {...defaultProps} className="custom-calendar" />);
      
      const calendar = screen.getByRole('grid');
      expect(calendar).toHaveClass('custom-calendar');
    });
  });
});