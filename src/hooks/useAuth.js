import { useState, useEffect } from 'react';
import { getCurrentSession, onAuthStateChange } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session on mount
    getCurrentSession()
      .then((session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error getting session:', error);
        setLoading(false);
      });

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return { user, loading };
}
