import { useState, useEffect, useCallback } from 'react';
import {
  fetchInternships,
  fetchInternshipsGroupedByRegion,
  createInternship,
  updateInternship,
  deleteInternship,
  updateInternshipStatus,
  updateInternshipNotes
} from '../services/internshipsService';
import { supabase } from '../services/supabaseClient';

export const useInternships = (groupByRegion = false) => {
  const [internships, setInternships] = useState(groupByRegion ? {} : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadInternships = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = groupByRegion 
        ? await fetchInternshipsGroupedByRegion()
        : await fetchInternships();
      setInternships(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading internships:', err);
    } finally {
      setLoading(false);
    }
  }, [groupByRegion]);

  useEffect(() => {
    loadInternships();

    // Set up realtime subscription for instant updates
    const subscription = supabase
      .channel('internships_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'internships' }, 
        () => {
          // Reload data when any change occurs
          loadInternships();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [loadInternships]);

  const addInternship = async (internshipData) => {
    try {
      const newInternship = await createInternship(internshipData);
      // Realtime subscription will handle the update
      return newInternship;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateInternshipById = async (id, updates) => {
    try {
      const updated = await updateInternship(id, updates);
      // Realtime subscription will handle the update
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeInternship = async (id) => {
    try {
      await deleteInternship(id);
      // Realtime subscription will handle the update
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await updateInternshipStatus(id, status);
      // Realtime subscription will handle the update
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const saveNotes = async (id, notes) => {
    try {
      await updateInternshipNotes(id, notes);
      // Realtime subscription will handle the update
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    internships,
    loading,
    error,
    refresh: loadInternships,
    addInternship,
    updateInternship: updateInternshipById,
    removeInternship,
    changeStatus,
    saveNotes
  };
};
