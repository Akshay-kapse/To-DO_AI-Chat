# Smart Task Assistant - Backend API

Backend API server for the Smart Task Assistant application, providing secure OpenAI integration and task management endpoints.

## Features

- 🤖 **OpenAI Integration**: Secure server-side AI chat powered by OpenAI API
- 🔒 **Security**: Helmet, CORS, rate limiting, and input validation
- 🌍 **Environment Management**: Secure environment variable handling with bolt.env
- ⚡ **Performance**: Compression, caching headers, and optimized responses
- 📝 **Logging**: Morgan HTTP request logging
- 🛡️ **Error Handling**: Comprehensive error handling and validation

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **AI Integration**: OpenAI API v4
- **Security**: Helmet, CORS, Rate Limiting
- **Environment**: dotenv with bolt.env conventions
- **Logging**: Morgan
- **Performance**: Compression middleware

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key

### Installation

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your-openai-secret-key-here
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

   **Getting an OpenAI API Key:**
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Sign up or log in to your account
   - Navigate to API Keys section
   - Create a new API key
   - Add some credits to your account for API usage

4. **Start the server**
   
   Development mode (with auto-restart):
   ```bash
   npm run dev
   ```

   Production mode:
   ```bash
   npm start
   ```

5. **Verify the server is running**
   
   Visit `http://localhost:3001` to see the API status.

## API Endpoints

### Health Check
- **GET** `/api/health` - Server health and status information

### Chat
- **POST** `/api/chat` - Send message to AI assistant
  ```json
  {
    "message": "How can I be more productive?",
    "context": "User has 5 pending tasks"
  }
  ```

- **POST** `/api/chat/suggestions` - Get AI task suggestions
  ```json
  {
    "tasks": ["Complete project proposal", "Review code"]
  }
  ```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | ✅ Yes | - |
| `PORT` | Server port | No | 3001 |
| `NODE_ENV` | Environment mode | No | development |
| `FRONTEND_URL` | Frontend URL for CORS | No | http://localhost:5173 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms | No | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | No | 100 |

## Security Features

- **Helmet**: Security headers and protection
- **CORS**: Configured for frontend domain only
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Request body validation and sanitization
- **Error Handling**: Secure error responses without sensitive data exposure

## Development

### File Structure
```
server/
├── config/
│   └── env.js              # Environment configuration
├── middleware/
│   └── errorHandler.js     # Error handling middleware
├── routes/
│   ├── chat.js            # AI chat endpoints
│   └── health.js          # Health check endpoints
├── services/
│   └── openaiService.js   # OpenAI API integration
├── .env.example           # Environment template
├── .env.local            # Local environment (not in repo)
├── package.json          # Dependencies and scripts
├── server.js             # Main server file
└── README.md             # This file
```

### Adding New Endpoints

1. Create a new route file in `routes/`
2. Import and use in `server.js`
3. Add appropriate middleware and validation
4. Update this README with endpoint documentation

## Deployment

### Environment Setup
1. Copy `.env.example` to `.env`
2. Set production values for all variables
3. Ensure `NODE_ENV=production`

### Production Considerations
- Use a process manager like PM2
- Set up proper logging and monitoring
- Configure reverse proxy (nginx)
- Enable HTTPS
- Set up database if needed for persistence

## Troubleshooting

### Common Issues

1. **OpenAI API Key Error**
   - Verify your API key is correct in `.env.local`
   - Check that you have credits in your OpenAI account
   - Ensure the key has proper permissions

2. **CORS Issues**
   - Verify `FRONTEND_URL` matches your frontend URL exactly
   - Check that the frontend is running on the expected port

3. **Rate Limiting**
   - Adjust `RATE_LIMIT_MAX_REQUESTS` if needed
   - Consider implementing user-based rate limiting for production

4. **Port Already in Use**
   - Change the `PORT` in `.env.local`
   - Kill any existing processes on the port

### Logs and Debugging

- Server logs show configuration on startup
- HTTP requests are logged with Morgan
- Errors include stack traces in development mode
- Health endpoint provides service status

## Contributing

1. Follow the existing code structure
2. Add proper error handling for new endpoints
3. Update environment variables in `.env.example`
4. Add tests for new functionality
5. Update this README with new features

## License

MIT License - see the main project LICENSE file.