import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
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

  // Fetch from Supabase on mount
  useEffect(() => {
    const fetchFromSupabase = async () => {
      console.log('Fetching from Supabase...');
      
      try {
        const { data, error } = await supabase
          .from('assignments')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error:', error.message);
          setIsLoading(false);
          return;
        }

        console.log('Received ' + (data?.length || 0) + ' assignments from Supabase');

        if (data && data.length > 0) {
          const convertedAssignments = data.map((item: unknown) => {
            const dbItem = item as { id: number; created_at: string; title: string; description: string | null; section: string; content: string | null; youtube_url: string | null };
            return {
              id: dbItem.id,
              title: dbItem.title,
              description: dbItem.description || '',
              section: dbItem.section,
              content: dbItem.content || '',
              youtubeUrl: dbItem.youtube_url || ''
            } as Assignment;
          });
          setAssignments(convertedAssignments);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(convertedAssignments));
        } else {
          console.log('No assignments found in Supabase - using default/local data');
        }
      } catch (err) {
        console.error('Exception fetching Supabase:', err);
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

    console.log('Adding new assignment:', newAssignment.title);
    
    // Optimistic update
    setAssignments(prev => [...prev, newAssignment]);

    // Try to sync to Supabase
    try {
      const { error } = await supabase
        .from('assignments')
        .insert([{
          title: newAssignment.title,
          description: newAssignment.description || null,
          section: newAssignment.section,
          content: newAssignment.content || null,
          youtube_url: newAssignment.youtubeUrl || null
        }]);

      if (error) {
        console.error('Failed to sync to Supabase:', error.message);
      } else {
        console.log('Successfully synced to Supabase');
      }
    } catch (err) {
      console.error('Exception syncing to Supabase:', err);
    }

    return newAssignment;
  }, [assignments]);

  const deleteAssignment = useCallback(async (id: number) => {
    setAssignments(prev => prev.filter(a => a.id !== id));

    try {
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Failed to delete from Supabase:', error.message);
      }
    } catch (err) {
      console.error('Exception deleting from Supabase:', err);
    }
  }, []);

  const updateAssignment = useCallback(async (id: number, updates: Partial<Assignment>) => {
    setAssignments(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));

    try {
      const { error } = await supabase
        .from('assignments')
        .update({
          title: updates.title,
          description: updates.description || null,
          section: updates.section,
          content: updates.content || null,
          youtube_url: updates.youtubeUrl || null
        })
        .eq('id', id);

      if (error) {
        console.error('Failed to update Supabase:', error.message);
      }
    } catch (err) {
      console.error('Exception updating Supabase:', err);
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
    isLoading
  };
}

