import { AppConfig } from '../types';

export const loadConfig = (): AppConfig => {
  const config: AppConfig = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    appName: import.meta.env.VITE_APP_NAME || 'Smart Task Assistant',
    appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
    devMode: import.meta.env.VITE_DEV_MODE === 'true',
  };

  // Validate required environment variables
  if (!config.openaiApiKey && !config.devMode) {
    console.warn('OpenAI API key is missing. AI features will be disabled.');
  }

  return config;
};

export const config = loadConfig();