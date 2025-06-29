import { cn, joinComponents } from '../utils';
import React from 'react';

describe('Utility Functions', () => {
  describe('cn (className utility)', () => {
    it('should merge class names correctly', () => {
      expect(cn('px-2 py-1', 'text-blue-500')).toBe('px-2 py-1 text-blue-500');
    });

    it('should handle conditional classes', () => {
      expect(cn('base-class', true && 'conditional-class')).toBe('base-class conditional-class');
      expect(cn('base-class', false && 'conditional-class')).toBe('base-class');
    });

    it('should resolve Tailwind conflicts', () => {
      expect(cn('px-2', 'px-4')).toBe('px-4');
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });

    it('should handle empty inputs', () => {
      expect(cn()).toBe('');
      expect(cn('')).toBe('');
      expect(cn(undefined, null)).toBe('');
    });
  });

  describe('joinComponents', () => {
    it('should join components with commas', () => {
      const result = joinComponents(['Hello'], 'World');
      expect(result).toEqual(['Hello', ', ', 'World']);
    });

    it('should not add comma for first component', () => {
      const result = joinComponents([], 'First');
      expect(result).toEqual(['', 'First']);
    });

    it('should handle multiple joins', () => {
      let result: React.ReactNode[] = [];
      result = joinComponents(result, 'First');
      result = joinComponents(result, 'Second');
      result = joinComponents(result, 'Third');
      
      expect(result).toEqual(['', 'First', ', ', 'Second', ', ', 'Third']);
    });

    it('should handle React elements', () => {
      const element = React.createElement('span', null, 'Element');
      const result = joinComponents(['Text'], element);
      
      expect(result).toHaveLength(3);
      expect(result[0]).toBe('Text');
      expect(result[1]).toBe(', ');
      expect(result[2]).toBe(element);
    });
  });
});