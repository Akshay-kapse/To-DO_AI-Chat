import { AppConfig } from '../types';

export const loadConfig = (): AppConfig => {
  const config: AppConfig = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    appName: import.meta.env.VITE_APP_NAME || 'Smart Task Assistant',
    appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
    devMode: import.meta.env.VITE_DEV_MODE === 'true',
  };

  console.log('🔧 Frontend configuration loaded:', {
    apiUrl: config.apiUrl,
    appName: config.appName,
    appVersion: config.appVersion,
    devMode: config.devMode,
  });

  return config;
};

export const config = loadConfig();