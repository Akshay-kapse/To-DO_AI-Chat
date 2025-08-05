import { AppConfig } from '../types';

export const loadConfig = (): AppConfig => {
  // Detect if we're on HTTPS and adjust API URL accordingly
  const isHttps = window.location.protocol === 'https:';
  const defaultApiUrl = isHttps ? 'https://localhost:3001' : 'http://localhost:3001';
  
  const config: AppConfig = {
    apiUrl: import.meta.env.VITE_API_URL || defaultApiUrl,
    appName: import.meta.env.VITE_APP_NAME || 'Smart Task Assistant',
    appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
    devMode: import.meta.env.VITE_DEV_MODE === 'true',
  };

  // Warn about protocol mismatch
  if (isHttps && config.apiUrl.startsWith('http://')) {
    console.warn('⚠️ Protocol mismatch detected: Frontend is HTTPS but API URL is HTTP');
    console.warn('💡 Try accessing the app at http://localhost:5173 instead');
  }

  console.log('🔧 Frontend configuration loaded:', {
    apiUrl: config.apiUrl,
    appName: config.appName,
    appVersion: config.appVersion,
    devMode: config.devMode,
    protocol: window.location.protocol,
  });

  return config;
};

export const config = loadConfig();