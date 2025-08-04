import axios from 'axios';
import { config } from '../config/env';
import { AIResponse } from '../types';

export class OpenAIService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = `${config.apiUrl}/api/chat`;
    console.log('🔧 OpenAI Service initialized with API URL:', this.apiUrl);
  }

  async sendMessage(message: string, context?: string): Promise<AIResponse> {
    console.log('📤 Sending message to AI:', { message, context, apiUrl: this.apiUrl });
    
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          message: message.trim(),
          context: context || '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 second timeout
        }
      );

      console.log('📥 AI Service Response:', response.data);

      if (response.data.success) {
        return {
          message: response.data.data.message,
        };
      } else {
        throw new Error(response.data.message || 'Failed to get AI response');
      }
    } catch (error) {
      console.error('❌ AI Service Error:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('📊 Error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          code: error.code,
          message: error.message
        });
      }
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          return {
            message: 'AI service is currently unavailable. Please make sure the backend server is running.',
            error: 'Service unavailable'
          };
        } else if (error.response?.status === 401) {
          return {
            message: 'AI service configuration error. Please check the server setup.',
            error: 'Configuration error'
          };
        } else if (error.response?.status === 429) {
          return {
            message: 'Too many requests. Please try again in a moment.',
            error: 'Rate limit exceeded'
          };
        } else if (error.response?.status === 503) {
          return {
            message: 'AI service is temporarily unavailable. Please try again later.',
            error: 'Service temporarily unavailable'
          };
        } else if (error.response?.data?.message) {
          return {
            message: error.response.data.message,
            error: 'API error'
          };
        }
      }

      return {
        message: 'I encountered an error while processing your request. Please try again.',
        error: 'Request failed'
      };
    }
  }

  async getTaskSuggestions(tasks: string[]): Promise<string[]> {
    if (tasks.length === 0) {
      return [];
    }

    console.log('📤 Getting task suggestions for:', tasks);

    try {
      const response = await axios.post(
        `${this.apiUrl}/suggestions`,
        { tasks },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      console.log('📥 Task suggestions response:', response.data);

      if (response.data.success) {
        return response.data.data.suggestions || [];
      }
      
      return [];
    } catch (error) {
      console.error('❌ Error getting task suggestions:', error);
      return [];
    }
  }

  async checkHealth(): Promise<boolean> {
    console.log('🏥 Checking backend health at:', `${config.apiUrl}/api/health`);
    
    try {
      const response = await axios.get(`${config.apiUrl}/api/health`, {
        timeout: 5000,
      });
      console.log('✅ Health check response:', response.data);
      return response.data.status === 'OK';
    } catch (error) {
      console.error('❌ Health check failed:', error);
      return false;
    }
  }
}

export const openAIService = new OpenAIService();