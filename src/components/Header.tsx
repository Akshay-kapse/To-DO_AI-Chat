import React from 'react';
import { useState, useEffect } from 'react';
import { CheckSquare, Bot, Settings } from 'lucide-react';
import { config } from '../config/env';
import { openAIService } from '../services/openai';

interface HeaderProps {
  activeTab: 'tasks' | 'chat';
  onTabChange: (tab: 'tasks' | 'chat') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [isAIEnabled, setIsAIEnabled] = useState(true);

  useEffect(() => {
    // Check if backend is available
    openAIService.checkHealth().then(setIsAIEnabled);
  }, []);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{config.appName}</h1>
              <p className="text-xs text-gray-500">v{config.appVersion}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <button
              onClick={() => onTabChange('tasks')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === 'tasks'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              Tasks
            </button>
            
            <button
              onClick={() => onTabChange('chat')}
              disabled={!isAIEnabled}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === 'chat'
                  ? 'bg-purple-100 text-purple-700'
                  : isAIEnabled
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              title={!isAIEnabled ? 'Configure OpenAI API key to enable chat' : 'AI Assistant'}
            >
              <Bot className="w-4 h-4" />
              AI Chat
              {!isAIEnabled && (
                <Settings className="w-3 h-3 text-gray-400" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};