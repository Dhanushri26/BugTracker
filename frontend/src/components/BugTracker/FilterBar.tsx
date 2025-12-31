import React from 'react';
import { Search, Filter, Star } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  difficultyFilter: string;
  onDifficultyFilterChange: (value: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
}

export function FilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  difficultyFilter,
  onDifficultyFilterChange,
  showFavoritesOnly,
  onToggleFavorites,
}: FilterBarProps) {
  return (
    <div className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-neutral-200 px-6 py-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search bugs by title or tags..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-neutral-500" />
           <div className="relative w-64">
  <select
    value={statusFilter}
    onChange={(e) => onStatusFilterChange(e.target.value)}
    className="w-full appearance-none rounded-md border border-gray-300 bg-white px-2 py-2 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">All Status</option>
    <option value="Open">Open</option>
    <option value="In Progress">In Progress</option>
    <option value="Testing">Testing</option>
    <option value="Resolved">Resolved</option>
    <option value="Closed">Closed</option>
  </select>

  {/* Custom Image Arrow */}
  <img
    src="../assets/sorting.png"   // or png
    alt=""
    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-70"
  />
</div>

          </div>

          <select
            value={difficultyFilter}
            onChange={(e) => onDifficultyFilterChange(e.target.value)}
            className="select"
          >
            <option value="">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Critical">Critical</option>
          </select>

          <button
            onClick={onToggleFavorites}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
              showFavoritesOnly
                ? 'bg-warning-50 border-warning-300 text-warning-700'
                : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <Star className={`h-4 w-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            <span>Favorites</span>
          </button>
        </div>
      </div>
    </div>
  );
}