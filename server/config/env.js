import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables using bolt.env best practices
// Try .env.local first (for local development), then .env
const envFiles = ['.env.local', '.env'];

for (const envFile of envFiles) {
  const envPath = path.resolve(__dirname, '..', envFile);
  const result = dotenv.config({ path: envPath });
  
  if (!result.error) {
    console.log(`✅ Environment loaded from: ${envFile}`);
    break;
  }
}

// Validate required environment variables
const requiredEnvVars = ['OPENAI_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars);
  console.error('Please copy .env.example to .env.local and fill in the required values');
  process.exit(1);
}

export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  server: {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  cors: {
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  },
};

// Log configuration (without sensitive data)
console.log('🔧 Server configuration loaded:', {
  port: config.server.port,
  nodeEnv: config.server.nodeEnv,
  frontendUrl: config.cors.frontendUrl,
  openaiConfigured: !!config.openai.apiKey,
});