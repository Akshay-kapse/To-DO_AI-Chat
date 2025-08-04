import { useState, useCallback } from 'react';
import { ChatMessage } from '../types';
import { openAIService } from '../services/openai';
import { taskService } from '../services/taskService';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm your Smart Task Assistant. I can help you with productivity tips, task organization, and answer any questions about managing your tasks. How can I help you today?",
      role: 'assistant',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    console.log('💬 useChat: Sending message:', content);

    // Add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      // Get tasks context for the AI
      const tasksSummary = taskService.getTasksSummary();
      console.log('📋 Tasks summary for context:', tasksSummary);
      
      const response = await openAIService.sendMessage(content, tasksSummary);
      console.log('🤖 AI response received:', response);

      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: response.message,
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (response.error) {
        console.warn('⚠️ AI response contained error:', response.error);
        setError(response.error);
      }
    } catch (err) {
      console.error('❌ useChat error:', err);
      setError('Failed to get AI response');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm your Smart Task Assistant. How can I help you today?",
        role: 'assistant',
        timestamp: new Date().toISOString(),
      }
    ]);
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearChat,
  };
};