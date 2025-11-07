import { useState, useEffect, useCallback } from 'react';
import { fetchAnalytics } from '../services/analyticsService';
import { supabase } from '../services/supabaseClient';

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading analytics:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();

    // Set up realtime subscription for instant updates
    const subscription = supabase
      .channel('analytics_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'internships' }, 
        () => {
          // Reload analytics when any change occurs
          loadAnalytics();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [loadAnalytics]);

  return {
    analytics,
    loading,
    error,
    refresh: loadAnalytics
  };
};
