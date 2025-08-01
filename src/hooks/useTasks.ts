import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types';
import { taskService } from '../services/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshTasks = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const allTasks = taskService.getAllTasks();
      setTasks(allTasks);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error refreshing tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  const createTask = useCallback(async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      const newTask = taskService.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
      return null;
    }
  }, []);

  const updateTask = useCallback(async (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    try {
      setError(null);
      const updatedTask = taskService.updateTask(id, updates);
      if (updatedTask) {
        setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
        return updatedTask;
      }
      return null;
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
      return null;
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      setError(null);
      const success = taskService.deleteTask(id);
      if (success) {
        setTasks(prev => prev.filter(task => task.id !== id));
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
      return false;
    }
  }, []);

  const toggleTask = useCallback(async (id: string) => {
    try {
      setError(null);
      const updatedTask = taskService.toggleTask(id);
      if (updatedTask) {
        setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
        return updatedTask;
      }
      return null;
    } catch (err) {
      setError('Failed to toggle task');
      console.error('Error toggling task:', err);
      return null;
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    refreshTasks,
  };
};