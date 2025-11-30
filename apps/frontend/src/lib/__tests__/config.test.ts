import { getTitle, getDescription, AVAILABLE_CALENDARS } from '../config';

describe('Configuration', () => {
  describe('getTitle', () => {
    it('should return correct title format for any year', () => {
      expect(getTitle(2024)).toBe('2024 Minimalist printable calendar');
      expect(getTitle(2025)).toBe('2025 Minimalist printable calendar');
      expect(getTitle(2030)).toBe('2030 Minimalist printable calendar');
    });

    it('should handle edge case years', () => {
      expect(getTitle(1000)).toBe('1000 Minimalist printable calendar');
      expect(getTitle(9999)).toBe('9999 Minimalist printable calendar');
    });
  });

  describe('getDescription', () => {
    it('should return correct description format for any year', () => {
      const description2024 = getDescription(2024);
      expect(description2024).toContain('2024');
      expect(description2024).toContain('Yearly and monthly, minimalist');
      expect(description2024).toContain('A4 and A5 formats');
      expect(description2024).toContain('portrait and landscape');
    });

    it('should include year in description', () => {
      expect(getDescription(2025)).toContain('2025');
      expect(getDescription(2030)).toContain('2030');
    });
  });

  describe('AVAILABLE_CALENDARS', () => {
    it('should have proper structure for each calendar', () => {
      AVAILABLE_CALENDARS.forEach(calendar => {
        expect(calendar).toHaveProperty('theme');
        expect(calendar).toHaveProperty('year');
        expect(calendar).toHaveProperty('title');
        expect(calendar).toHaveProperty('description');
        expect(calendar).toHaveProperty('isVisible');

        expect(typeof calendar.theme).toBe('string');
        expect(typeof calendar.year).toBe('number');
        expect(typeof calendar.title).toBe('string');
        expect(typeof calendar.description).toBe('string');
        expect(typeof calendar.isVisible).toBe('boolean');
      });
    });

    it('should have consistent titles and descriptions', () => {
      AVAILABLE_CALENDARS.forEach(calendar => {
        expect(calendar.title).toBe(getTitle(calendar.year));
        expect(calendar.description).toBe(getDescription(calendar.year));
      });
    });
  });
});