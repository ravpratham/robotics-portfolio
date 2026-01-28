import { useState, useEffect } from 'react';
import { Assignment } from '../types';

const STORAGE_KEY = 'robotics-assignments';

const defaultAssignments: Assignment[] = [
  {
    id: 1,
    title: 'Assignment 1',
    description: 'Content coming soon...',
    section: 'Section 1',
    content: '',
    youtubeUrl: ''
  },
  {
    id: 2,
    title: 'Assignment 2',
    description: 'Content coming soon...',
    section: 'Section 2',
    content: '',
    youtubeUrl: ''
  }
];

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultAssignments;
      }
    }
    return defaultAssignments;
  });

  // Save to localStorage whenever assignments change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
  }, [assignments]);

  const addAssignment = (assignment: Omit<Assignment, 'id'>) => {
    const newId = Math.max(...assignments.map(a => a.id), 0) + 1;
    const newAssignment: Assignment = {
      ...assignment,
      id: newId,
      content: assignment.content || '',
      youtubeUrl: assignment.youtubeUrl || ''
    };
    setAssignments([...assignments, newAssignment]);
    return newAssignment;
  };

  const deleteAssignment = (id: number) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const updateAssignment = (id: number, updates: Partial<Assignment>) => {
    setAssignments(
      assignments.map(a => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  const getAssignment = (id: number): Assignment | undefined => {
    return assignments.find(a => a.id === id);
  };

  return {
    assignments,
    addAssignment,
    deleteAssignment,
    updateAssignment,
    getAssignment
  };
}
