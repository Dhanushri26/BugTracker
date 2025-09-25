import React, { useState, useEffect } from 'react';
import { Bug } from '../../data/mockBugs';
import { useBugs } from '../../hooks/useBugs';
import { Header } from './Header';
import { FilterBar } from './FilterBar';
import { BugCard } from './BugCard';
import { BugForm } from './BugForm';

export function BugTracker() {
  const { bugs, loading, addBug, updateBug, toggleFavorite } = useBugs();
  const [filteredBugs, setFilteredBugs] = useState<Bug[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingBug, setEditingBug] = useState<Bug | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    filterBugs();
  }, [bugs, searchTerm, statusFilter, difficultyFilter, showFavoritesOnly]);

  const filterBugs = () => {
    let filtered = [...bugs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(bug =>
        bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bug.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(bug => bug.status === statusFilter);
    }

    // Difficulty filter
    if (difficultyFilter) {
      filtered = filtered.filter(bug => bug.difficulty === difficultyFilter);
    }

    // Favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter(bug => bug.is_favorite);
    }

    setFilteredBugs(filtered);
  };

  const handleAddBug = () => {
    setEditingBug(null);
    setShowForm(true);
  };

  const handleEditBug = (bug: Bug) => {
    setEditingBug(bug);
    setShowForm(true);
  };

  const handleSubmitBug = async (bugData: Partial<Bug>) => {
    setFormLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (editingBug) {
        updateBug(editingBug.id, bugData);
      } else {
        addBug(bugData as Omit<Bug, 'id' | 'created_at' | 'updated_at' | 'created_by'>);
      }
      
      setShowForm(false);
      setEditingBug(null);
      setFormLoading(false);
    }, 500);
  };

  const handleToggleFavorite = (bugId: string) => {
    toggleFavorite(bugId, { is_favorite: !bugs.find(bug => bug.id === bugId)?.is_favorite });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-neutral-600 mt-4">Loading bugs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header onAddBug={handleAddBug} />

      <main className="max-w-7xl mx-auto">
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          difficultyFilter={difficultyFilter}
          onDifficultyFilterChange={setDifficultyFilter}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
        />

        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-5">
              <h3 className="text-sm font-medium text-neutral-500">Total Bugs</h3>
              <p className="text-3xl font-bold text-neutral-900 tracking-tight">{bugs.length}</p>
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-medium text-neutral-500">Open</h3>
              <p className="text-3xl font-bold text-danger-600 tracking-tight">
                {bugs.filter(b => b.status === 'Open').length}
              </p>
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-medium text-neutral-500">In Progress</h3>
              <p className="text-3xl font-bold text-warning-600 tracking-tight">
                {bugs.filter(b => b.status === 'In Progress').length}
              </p>
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-medium text-neutral-500">Resolved</h3>
              <p className="text-3xl font-bold text-success-600 tracking-tight">
                {bugs.filter(b => b.status === 'Resolved').length}
              </p>
            </div>
          </div>

          {/* Bug List */}
          {filteredBugs.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-neutral-500 text-lg mb-4">
                {bugs.length === 0 ? 'No bugs reported yet' : 'No bugs match your filters'}
              </p>
              <button
                onClick={handleAddBug}
                className="btn-primary px-6"
              >
                Add Your First Bug
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBugs.map((bug) => (
                <BugCard
                  key={bug.id}
                  bug={bug}
                  onToggleFavorite={handleToggleFavorite}
                  onEdit={handleEditBug}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <BugForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingBug(null);
        }}
        onSubmit={handleSubmitBug}
        bug={editingBug}
        loading={formLoading}
      />
    </div>
  );
}