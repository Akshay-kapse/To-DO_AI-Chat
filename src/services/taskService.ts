import { Task } from '../types';

const TASKS_STORAGE_KEY = 'smart-task-assistant-tasks';

export class TaskService {
  private tasks: Task[] = [];

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    try {
      const stored = localStorage.getItem(TASKS_STORAGE_KEY);
      if (stored) {
        this.tasks = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      this.tasks = [];
    }
  }

  private saveTasks(): void {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }

  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  getTask(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const now = new Date().toISOString();
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.unshift(newTask);
    this.saveTasks();
    return newTask;
  }

  updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return null;
    }

    const updatedTask = {
      ...this.tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.tasks[taskIndex] = updatedTask;
    this.saveTasks();
    return updatedTask;
  }

  deleteTask(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    
    if (this.tasks.length < initialLength) {
      this.saveTasks();
      return true;
    }
    return false;
  }

  toggleTask(id: string): Task | null {
    const task = this.getTask(id);
    if (!task) {
      return null;
    }

    return this.updateTask(id, { completed: !task.completed });
  }

  getTasksSummary(): string {
    const total = this.tasks.length;
    const completed = this.tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const highPriority = this.tasks.filter(task => task.priority === 'high' && !task.completed).length;

    return `Total tasks: ${total}, Completed: ${completed}, Pending: ${pending}, High priority: ${highPriority}`;
  }
}

export const taskService = new TaskService();