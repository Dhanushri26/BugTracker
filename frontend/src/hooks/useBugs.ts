import { useState, useEffect } from 'react';
import axios from 'axios';
export function useBugs() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);
 const endpoint = "http://localhost:3000/bugs";
  useEffect(() => {
    const timer = setTimeout(() => {
      axios.get(endpoint).then(response => {
        console.log(response.data);
        setBugs(response.data);
      }).catch(error => {
        console.error('Error fetching bugs:', error);
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addBug = (bugData: Omit<Bug, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    const newBug: Bug = {
      ...bugData,
      // id: Date.now().toString(),

      is_favorite:false,
      created_by: 'current-user'
    };
    setBugs(prev => [newBug, ...prev]);

    axios.post(endpoint, newBug).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error('Error adding bug:', error);
    });
  };

  const updateBug = (bugId: string, updates: Partial<Bug>) => {

    setBugs(prev => prev.map(bug => 
      bug.id === bugId 
        ? { ...bug, ...updates, updated_at: new Date().toISOString() }
        : bug
    ));

    axios.put(endpoint + '/' + bugId, updates).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error('Error updating bug:', error);
    });
  };

  const toggleFavorite = (bugId: string, updates?: Partial<Bug>) => {
    // Determine the new favorite value (allow an explicit override via updates)
    const prevBugs = [...bugs];
    const target = prevBugs.find(b => b.id === bugId);
    if (!target) return;

    const newIsFavorite =
      typeof updates?.is_favorite === 'boolean'
        ? updates!.is_favorite
        : !target.is_favorite;

    // Optimistic update
    setBugs(prev => prev.map(bug =>
      bug.id === bugId
        ? { ...bug, is_favorite: newIsFavorite, updated_at: new Date().toISOString() }
        : bug
    ));

    // Send update to backend
    axios.put(endpoint + '/' + bugId, { is_favorite: newIsFavorite }).then(response => {
      console.log('Favorite updated:', response.data);
    }).catch(error => {
      console.error('Error updating favorite:', error);
      // Revert optimistic update on failure
      setBugs(prev => prev.map(bug =>
        bug.id === bugId
          ? { ...target }
          : bug
      ));
    });
  };

  const deleteBug = (bugId: string) => {
    setBugs(prev => prev.filter(bug => bug.id !== bugId));

    axios.delete(endpoint + '/' + bugId).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error('Error deleting bug:', error);
    });

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