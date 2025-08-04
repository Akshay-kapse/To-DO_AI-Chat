import OpenAI from 'openai';
import { config } from '../config/env.js';

class OpenAIService {
  constructor() {
    console.log('🤖 Initializing OpenAI service...');
    console.log('🔑 API Key configured:', !!config.openai.apiKey);
    console.log('🔑 API Key length:', config.openai.apiKey ? config.openai.apiKey.length : 0);
    
    this.client = new OpenAI({
      apiKey: config.openai.apiKey,
    });
    
    console.log('✅ OpenAI client initialized');
  }

  async sendMessage(message, context = '') {
    console.log('📤 OpenAI Service: Sending message:', { message, context });
    
    try {
      const systemPrompt = `You are a helpful productivity assistant for a task management app called "Smart Task Assistant". 
      ${context ? `Current tasks context: ${context}` : ''}
      
      Provide helpful, concise responses about productivity, task management, and organization. 
      Keep responses under 150 words and be encouraging and practical.`;

      console.log('🎯 System prompt:', systemPrompt);

      const completion = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 200,
        temperature: 0.7,
      });

      console.log('📥 OpenAI API Response:', {
        choices: completion.choices?.length,
        usage: completion.usage,
        model: completion.model
      });
      return {
        message: completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.',
        usage: completion.usage,
      };
    } catch (error) {
      console.error('❌ OpenAI API Error:', {
        message: error.message,
        status: error.status,
        code: error.code,
        type: error.type
      });
      
      if (error.status === 401) {
        console.error('🔑 Invalid API key detected');
        throw new Error('Invalid OpenAI API key. Please check your configuration.');
      } else if (error.status === 429) {
        console.error('⏰ Rate limit exceeded');
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      } else if (error.status === 500) {
        console.error('🔧 OpenAI service error');
        throw new Error('OpenAI service is temporarily unavailable. Please try again later.');
      }
      
      console.error('🚨 Unexpected error:', error);
      throw new Error('Failed to get AI response. Please try again.');
    }
  }

  async getTaskSuggestions(tasks) {
    if (!tasks || tasks.length === 0) {
      return [];
    }

    try {
      const taskList = tasks.join(', ');
      const response = await this.sendMessage(
        `Based on these tasks: ${taskList}. Suggest 3 additional related tasks that would help with productivity.`
      );

      // Parse suggestions from the response
      const suggestions = response.message
        .split('\n')
        .filter(line => line.trim().length > 0 && (line.includes('-') || line.includes('•')))
        .map(line => line.replace(/^[-•]\s*/, '').trim())
        .slice(0, 3);

      return suggestions;
    } catch (error) {
      console.error('Error getting task suggestions:', error);
      return [];
    }
  }
}

export const openaiService = new OpenAIService();