export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export interface AIResponse {
  message: string;
  suggestions?: string[];
  error?: string;
}

export interface AppConfig {
  apiUrl: string;
  appName: string;
  appVersion: string;
  devMode: boolean;
}