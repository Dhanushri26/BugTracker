import React from 'react';
import { Bug, Plus } from 'lucide-react';

interface HeaderProps {
  onAddBug: () => void;
}

export function Header({ onAddBug }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Bug className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BugTracker Pro</h1>
              <p className="text-sm text-gray-600">Manage and track your bugs efficiently</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onAddBug}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Bug</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}