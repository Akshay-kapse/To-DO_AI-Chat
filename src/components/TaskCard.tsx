import React from 'react';
import { Task } from '../types';
import { CheckCircle2, Circle, Trash2, AlertCircle, Clock, Star } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (task: Task) => void;
}

const priorityConfig = {
  low: { color: 'text-blue-500', bg: 'bg-blue-50', icon: Clock },
  medium: { color: 'text-yellow-500', bg: 'bg-yellow-50', icon: AlertCircle },
  high: { color: 'text-red-500', bg: 'bg-red-50', icon: Star },
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onDelete }) => {
  const priorityStyle = priorityConfig[task.priority];
  const PriorityIcon = priorityStyle.icon;

  return (
    <div className={`group relative bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 ${
      task.completed ? 'opacity-60' : ''
    }`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggle(task.id)}
            className="flex-shrink-0 mt-0.5 hover:scale-110 transition-transform duration-200"
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 hover:text-green-500" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-medium text-gray-900 ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}>
                {task.title}
              </h3>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priorityStyle.bg} ${priorityStyle.color}`}>
                <PriorityIcon className="w-3 h-3" />
                {task.priority}
              </div>
            </div>

            {task.description && (
              <p className={`text-sm text-gray-600 ${
                task.completed ? 'line-through' : ''
              }`}>
                {task.description}
              </p>
            )}

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-400">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <button
            onClick={() => onDelete(task.id)}
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded-full transition-all duration-200"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};