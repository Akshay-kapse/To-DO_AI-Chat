export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error response
  let statusCode = 500;
  let message = 'Internal server error';

  // Handle specific error types
  if (err.message.includes('Invalid OpenAI API key')) {
    statusCode = 401;
    message = 'AI service configuration error';
  } else if (err.message.includes('Rate limit exceeded')) {
    statusCode = 429;
    message = 'Too many requests. Please try again later.';
  } else if (err.message.includes('OpenAI service is temporarily unavailable')) {
    statusCode = 503;
    message = 'AI service temporarily unavailable';
  } else if (err.message.includes('Failed to get AI response')) {
    statusCode = 500;
    message = 'AI service error. Please try again.';
  }

  res.status(statusCode).json({
    error: true,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: true,
    message: 'Endpoint not found',
  });
};