import React, { useState, useEffect } from 'react';
import { X, Upload, Tag as TagIcon, AlertCircle } from 'lucide-react';
import { Bug } from '../../data/mockBugs';

interface BugFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bugData: Partial<Bug>) => void;
  bug?: Bug | null;
  loading?: boolean;
}

export function BugForm({ isOpen, onClose, onSubmit, bug, loading = false }: BugFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Medium' as const,
    expected_outcome: '',
    actual_outcome: '',
    problem_identified: '',
    status: 'Open' as const,
    resolution: '',
    tags: [] as string[],
    images: [] as string[]
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (bug) {
      setFormData({
        title: bug.title,
        description: bug.description || '',
        difficulty: bug.difficulty,
        expected_outcome: bug.expected_outcome || '',
        actual_outcome: bug.actual_outcome || '',
        problem_identified: bug.problem_identified || '',
        status: bug.status,
        resolution: bug.resolution || '',
        tags: bug.tags,
        images: bug.images
      });
    } else {
      setFormData({
        title: '',
        description: '',
        difficulty: 'Medium',
        expected_outcome: '',
        actual_outcome: '',
        problem_identified: '',
        status: 'Open',
        resolution: '',
        tags: [],
        images: []
      });
    }
  }, [bug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/40 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 sticky top-0 bg-white rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-900">
            {bug ? 'Edit Bug Report' : 'Add New Bug Report'}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="input"
              placeholder="Brief description of the bug"
              required
            />
          </div>

          {/* Status and Difficulty Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="select w-full"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Testing">Testing</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as any }))}
                className="select w-full"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="input min-h-[96px]"
              placeholder="Detailed description of the bug"
            />
          </div>

          {/* Expected vs Actual Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Expected Outcome</label>
              <textarea
                value={formData.expected_outcome}
                onChange={(e) => setFormData(prev => ({ ...prev, expected_outcome: e.target.value }))}
                rows={3}
                className="input min-h-[96px]"
                placeholder="What should have happened?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Actual Outcome</label>
              <textarea
                value={formData.actual_outcome}
                onChange={(e) => setFormData(prev => ({ ...prev, actual_outcome: e.target.value }))}
                rows={3}
                className="input min-h-[96px]"
                placeholder="What actually happened?"
              />
            </div>
          </div>

          {/* Problem Identified */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <AlertCircle className="inline h-4 w-4 mr-1" />
              Problem Identified
            </label>
            <textarea
              value={formData.problem_identified}
              onChange={(e) => setFormData(prev => ({ ...prev, problem_identified: e.target.value }))}
              rows={3}
              className="input min-h-[96px]"
              placeholder="Root cause analysis or identified issues"
            />
          </div>

          {/* Resolution */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Resolution</label>
            <textarea
              value={formData.resolution}
              onChange={(e) => setFormData(prev => ({ ...prev, resolution: e.target.value }))}
              rows={3}
              className="input min-h-[96px]"
              placeholder="How was this bug resolved? (if applicable)"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <TagIcon className="inline h-4 w-4 mr-1" />
              Tags
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input flex-1"
                placeholder="Add tags (press Enter)"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Image URLs */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <Upload className="inline h-4 w-4 mr-1" />
              Bug Images (URLs)
            </label>
            <div className="space-y-2">
              {formData.images.map((image, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => {
                      const newImages = [...formData.images];
                      newImages[index] = e.target.value;
                      setFormData(prev => ({ ...prev, images: newImages }));
                    }}
                    className="input flex-1"
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = formData.images.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, images: newImages }));
                    }}
                    className="text-danger-600 hover:text-danger-800 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, images: [...prev.images, ''] }))}
                className="text-primary-600 hover:text-primary-800 text-sm"
              >
                + Add Image URL
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-neutral-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : (bug ? 'Update Bug' : 'Create Bug')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}