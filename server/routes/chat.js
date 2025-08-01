import express from 'express';
import { openaiService } from '../services/openaiService.js';

const router = express.Router();

// POST /api/chat - Send message to AI
router.post('/', async (req, res, next) => {
  try {
    const { message, context } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: true,
        message: 'Message is required and must be a non-empty string',
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        error: true,
        message: 'Message is too long. Please keep it under 1000 characters.',
      });
    }

    const response = await openaiService.sendMessage(message.trim(), context);

    res.json({
      success: true,
      data: {
        message: response.message,
        timestamp: new Date().toISOString(),
      },
      usage: response.usage,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/chat/suggestions - Get task suggestions
router.post('/suggestions', async (req, res, next) => {
  try {
    const { tasks } = req.body;

    if (!Array.isArray(tasks)) {
      return res.status(400).json({
        error: true,
        message: 'Tasks must be an array',
      });
    }

    const suggestions = await openaiService.getTaskSuggestions(tasks);

    res.json({
      success: true,
      data: {
        suggestions,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;