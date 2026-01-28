import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Assignment } from '../types';
import { Database } from '../types/supabase';

type DatabaseAssignment = Database['public']['Tables']['assignments']['Row'];
type DatabaseInsert = Database['public']['Tables']['assignments']['Insert'];
type DatabaseUpdate = Database['public']['Tables']['assignments']['Update'];

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

// Convert Supabase format to our Assignment format
function convertToAssignment(dbAssignment: DatabaseAssignment): Assignment {
  return {
    id: dbAssignment.id,
    title: dbAssignment.title,
    description: dbAssignment.description || '',
    section: dbAssignment.section,
    content: dbAssignment.content || '',
    youtubeUrl: dbAssignment.youtube_url || ''
  };
}

// Convert our Assignment format to Supabase format for insert
function convertToDbInsert(assignment: Assignment): DatabaseInsert {
  return {
    title: assignment.title,
    description: assignment.description || null,
    section: assignment.section,
    content: assignment.content || null,
    youtube_url: assignment.youtubeUrl || null
  };
}

// Convert our Assignment format to Supabase format for update
function convertToDbUpdate(updates: Partial<Assignment>): DatabaseUpdate {
  const updateObj: DatabaseUpdate = {};
  
  if (updates.title !== undefined) updateObj.title = updates.title;
  if (updates.description !== undefined) updateObj.description = updates.description || null;
  if (updates.section !== undefined) updateObj.section = updates.section;
  if (updates.content !== undefined) updateObj.content = updates.content || null;
  if (updates.youtubeUrl !== undefined) updateObj.youtube_url = updates.youtubeUrl || null;
  
  return updateObj;
}

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

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch from Supabase on mount
  useEffect(() => {
    const fetchFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from('assignments')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.log('Supabase not configured or accessible, using localStorage only');
          setIsLoading(false);
          return;
        }

        if (data && data.length > 0) {
          const convertedAssignments = data.map(convertToAssignment);
          setAssignments(convertedAssignments);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(convertedAssignments));
        }
      } catch (err) {
        console.log('Supabase connection failed, using localStorage only');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFromSupabase();
  }, []);

  // Save to localStorage whenever assignments change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
  }, [assignments]);

  const addAssignment = useCallback(async (assignment: Omit<Assignment, 'id'>) => {
    const newId = Math.max(...assignments.map(a => a.id), 0) + 1;
    const newAssignment: Assignment = {
      ...assignment,
      id: newId,
      content: assignment.content || '',
      youtubeUrl: assignment.youtubeUrl || ''
    };

    // Optimistic update
    setAssignments(prev => [...prev, newAssignment]);

    // Try to sync to Supabase
    try {
      const { error } = await supabase
        .from('assignments')
        .insert(convertToDbInsert(newAssignment) as DatabaseInsert);

      if (error) {
        console.log('Failed to sync to Supabase, changes saved locally only');
      }
    } catch (err) {
      console.log('Supabase not available, changes saved locally only');
    }

    return newAssignment;
  }, [assignments]);

  const deleteAssignment = useCallback(async (id: number) => {
    // Optimistic update
    setAssignments(prev => prev.filter(a => a.id !== id));

    // Try to sync to Supabase
    try {
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', id);

      if (error) {
        console.log('Failed to delete from Supabase, deletion saved locally only');
      }
    } catch (err) {
      console.log('Supabase not available, deletion saved locally only');
    }
  }, []);

  const updateAssignment = useCallback(async (id: number, updates: Partial<Assignment>) => {
    // Optimistic update
    setAssignments(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));

    // Try to sync to Supabase
    try {
      const { error } = await supabase
        .from('assignments')
        .update(convertToDbUpdate(updates) as DatabaseUpdate)
        .eq('id', id);

      if (error) {
        console.log('Failed to update Supabase, changes saved locally only');
      }
    } catch (err) {
      console.log('Supabase not available, changes saved locally only');
    }
  }, []);

  const getAssignment = useCallback((id: number): Assignment | undefined => {
    return assignments.find(a => a.id === id);
  }, [assignments]);

  return {
    assignments,
    addAssignment,
    deleteAssignment,
    updateAssignment,
    getAssignment,
    isLoading,
    error
  };
}

