import { AppConfig } from '../types';

export const loadConfig = (): AppConfig => {
  // Always use HTTP for API URL since backend runs on HTTP
  const defaultApiUrl = 'http://localhost:3001';
  
  const config: AppConfig = {
    apiUrl: import.meta.env.VITE_API_URL || defaultApiUrl,
    appName: import.meta.env.VITE_APP_NAME || 'Smart Task Assistant',
    appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
    devMode: import.meta.env.VITE_DEV_MODE === 'true',
  };

  // Warn about protocol mismatch and provide solution
  const isHttps = window.location.protocol === 'https:';
  if (isHttps && config.apiUrl.startsWith('http://')) {
    console.warn('⚠️ Protocol mismatch detected: Frontend is HTTPS but API URL is HTTP');
    console.warn('💡 Solution: Access the app at http://localhost:5173 instead of https://localhost:5173');
    console.warn('🚫 Browsers block HTTP requests from HTTPS pages (mixed content policy)');
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