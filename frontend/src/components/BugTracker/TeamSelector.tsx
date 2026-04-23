import React, { useState } from 'react';
import { Users, Edit2, X } from 'lucide-react';

interface TeamSelectorProps {
  currentTeam: string | null;
  onTeamChange: (team: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function TeamSelector({ currentTeam, onTeamChange, isOpen, onClose }: TeamSelectorProps) {
  const [newTeam, setNewTeam] = useState(currentTeam || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeam.trim()) {
      onTeamChange(newTeam.trim());
      setIsEditing(false);
      localStorage.setItem('userTeam', newTeam.trim());
    }
  };

  return (
    <>
      {/* Team Display Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Current Team/Group</p>
              <p className="text-lg font-semibold text-gray-900">{currentTeam || 'Default'}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
            <span>Change Team</span>
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Change Team/Group</h2>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewTeam(currentTeam || '');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-2">
                  Team/Group Name
                </label>
                <input
                  type="text"
                  id="team"
                  value={newTeam}
                  onChange={(e) => setNewTeam(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Frontend Team, Backend Team"
                  required
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2">
                  All bugs you create will be visible only to members of this team.
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setNewTeam(currentTeam || '');
                  }}
                  className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
