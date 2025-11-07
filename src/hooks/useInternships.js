import { useState, useEffect } from 'react';
import {
  fetchInternships,
  fetchInternshipsGroupedByRegion,
  createInternship,
  updateInternship,
  deleteInternship,
  updateInternshipStatus,
  updateInternshipNotes
} from '../services/internshipsService';

export const useInternships = (groupByRegion = false) => {
  const [internships, setInternships] = useState(groupByRegion ? {} : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadInternships = async () => {
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
  };

  useEffect(() => {
    loadInternships();
  }, [groupByRegion]);

  const addInternship = async (internshipData) => {
    try {
      const newInternship = await createInternship(internshipData);
      await loadInternships(); // Refresh the list
      return newInternship;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateInternshipById = async (id, updates) => {
    try {
      const updated = await updateInternship(id, updates);
      await loadInternships(); // Refresh the list
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeInternship = async (id) => {
    try {
      await deleteInternship(id);
      await loadInternships(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await updateInternshipStatus(id, status);
      await loadInternships(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const saveNotes = async (id, notes) => {
    try {
      await updateInternshipNotes(id, notes);
      await loadInternships(); // Refresh the list
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
