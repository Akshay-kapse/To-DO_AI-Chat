import express from 'express';
import { config } from '../config/env.js';

const router = express.Router();

// GET /api/health - Health check endpoint
router.get('/', (req, res) => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.server.nodeEnv,
    services: {
      openai: !!config.openai.apiKey,
    },
  };

  res.json(healthCheck);
});

export default router;