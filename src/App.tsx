import React, { useState } from 'react';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { ChatInterface } from './components/ChatInterface';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useTasks } from './hooks/useTasks';
import { useChat } from './hooks/useChat';
import { config } from './config/env';

function App() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'chat'>('tasks');
  const { tasks, loading, error, createTask, toggleTask, deleteTask } = useTasks();
  const { messages, loading: chatLoading, error: chatError, sendMessage, clearChat } = useChat();

  const handleCreateTask = async (taskData: Parameters<typeof createTask>[0]) => {
    await createTask(taskData);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Environment Warning */}
        {false && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
            <div className="max-w-6xl mx-auto">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> OpenAI API key not configured. AI chat features will be limited. 
                Please add your API key to the .env file to enable full functionality.
              </p>
            </div>
          </div>
        )}

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'tasks' ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Your Tasks</h2>
                <p className="text-gray-600">Stay organized and boost your productivity</p>
              </div>

              <TaskForm onSubmit={handleCreateTask} />
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <TaskList
                tasks={tasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                loading={loading}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Assistant</h2>
                <p className="text-gray-600">Get productivity tips and task management advice</p>
              </div>

              <div className="max-w-4xl mx-auto h-96">
                <ChatInterface
                  messages={messages}
                  onSendMessage={sendMessage}
                  onClearChat={clearChat}
                  loading={chatLoading}
                  error={chatError}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;