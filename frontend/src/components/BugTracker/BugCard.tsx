import React from 'react';
import { Star, Edit3, Calendar, Tag, AlertCircle } from 'lucide-react';
import { Bug } from '../../data/mockBugs';

interface BugCardProps {
  bug: Bug;
  onToggleFavorite: (id: string) => void;
  onEdit: (bug: Bug) => void;
}

export function BugCard({ bug, onToggleFavorite, onEdit }: BugCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Testing': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{bug.title}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bug.status)}`}>
                {bug.status}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(bug.difficulty)}`}>
                {bug.difficulty}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => onToggleFavorite(bug.id)}
              className={`p-1 rounded transition-colors ${
                bug.is_favorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
              }`}
            >
              <Star className={`h-4 w-4 ${bug.is_favorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onEdit(bug)}
              className="p-1 rounded text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Edit3 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Description */}
        {bug.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{bug.description}</p>
        )}

        {/* Problem Identified */}
        {bug.problem_identified && (
          <div className="bg-orange-50 border-l-4 border-orange-400 p-3 mb-4">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
              <p className="text-orange-700 text-sm font-medium">Problem Identified</p>
            </div>
            <p className="text-orange-600 text-sm mt-1">{bug.problem_identified}</p>
          </div>
        )}

        {/* Tags */}
        {bug.tags.length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="h-4 w-4 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {bug.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(bug.created_at).toLocaleDateString()}</span>
          </div>
          {bug.images.length > 0 && (
            <span className="text-blue-600">{bug.images.length} image(s)</span>
          )}
        </div>
      </div>
    </div>
  );
}