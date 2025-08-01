import React, { useState } from 'react';
import { Task } from '../types';
import { Plus, X } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel?: () => void;
  initialData?: Partial<Task>;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initialData?.priority || 'medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setIsExpanded(false);
    onCancel?.();
  };

  if (!isExpanded && !initialData) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 group"
      >
        <div className="flex items-center justify-center gap-2 text-gray-500 group-hover:text-blue-600">
          <Plus className="w-5 h-5" />
          <span>Add new task</span>
        </div>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border shadow-sm p-4">
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
        </div>

        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description (optional)..."
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <div className="flex gap-2">
            {(['low', 'medium', 'high'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize transition-colors duration-200 ${
                  priority === p
                    ? p === 'high'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : p === 'medium'
                      ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};