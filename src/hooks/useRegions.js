import { useState, useEffect } from 'react';
import {
  fetchRegions,
  createRegion,
  updateRegion,
  deleteRegion
} from '../services/regionsService';

export const useRegions = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRegions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRegions();
      setRegions(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading regions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegions();
  }, []);

  const addRegion = async (regionData) => {
    try {
      const newRegion = await createRegion(regionData);
      await loadRegions(); // Refresh the list
      return newRegion;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateRegionById = async (id, updates) => {
    try {
      const updated = await updateRegion(id, updates);
      await loadRegions(); // Refresh the list
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeRegion = async (id) => {
    try {
      await deleteRegion(id);
      await loadRegions(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    regions,
    loading,
    error,
    refresh: loadRegions,
    addRegion,
    updateRegion: updateRegionById,
    removeRegion
  };
};
