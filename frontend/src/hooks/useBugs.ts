import { useState, useEffect } from 'react';
import { mockBugs, Bug } from '../data/mockBugs';

export function useBugs() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setBugs(mockBugs);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addBug = (bugData: Omit<Bug, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    const newBug: Bug = {
      ...bugData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'current-user'
    };
    setBugs(prev => [newBug, ...prev]);
  };

  const updateBug = (bugId: string, updates: Partial<Bug>) => {
    setBugs(prev => prev.map(bug => 
      bug.id === bugId 
        ? { ...bug, ...updates, updated_at: new Date().toISOString() }
        : bug
    ));
  };

  const toggleFavorite = (bugId: string) => {
    setBugs(prev => prev.map(bug => 
      bug.id === bugId 
        ? { ...bug, is_favorite: !bug.is_favorite, updated_at: new Date().toISOString() }
        : bug
    ));
  };

  const deleteBug = (bugId: string) => {
    setBugs(prev => prev.filter(bug => bug.id !== bugId));
  };

  return {
    bugs,
    loading,
    addBug,
    updateBug,
    toggleFavorite,
    deleteBug
  };
}