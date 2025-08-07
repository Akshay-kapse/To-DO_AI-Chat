# Smart Task Assistant

A beautiful, AI-powered task management application built with React, TypeScript, and OpenAI integration.

## Features

- ✅ **Task Management**: Create, edit, delete, and toggle tasks with priority levels
- 🤖 **AI Assistant**: Get productivity tips and task management advice powered by OpenAI
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 💾 **Local Storage**: Your tasks are automatically saved locally
- 🎨 **Modern UI**: Clean, professional interface with smooth animations
- ⚡ **Fast & Efficient**: Built with Vite for optimal performance

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **AI Integration**: OpenAI API
- **Build Tool**: Vite
- **State Management**: React Hooks + Custom Hooks

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (for AI features)

### Installation

1. **Install all dependencies**
   ```bash
   npm install
   ```

2. **Install backend dependencies**
   ```bash
   npm run server:install
   ```

3. **Frontend Environment Setup**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` if you need to change the API URL:
   ```env
   VITE_API_URL=http://localhost:3001
   ```

4. **Backend Environment Setup**
   
   Navigate to the server directory and set up environment:
   ```bash
   cd server
   cp .env.example .env.local
   ```

   Edit `server/.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=******************
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

5. **Start both servers**
   
   Start both frontend and backend servers with one command:
   ```bash
   npm run dev:full
   ```

   Or start servers separately:
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   
   # Terminal 2 - Backend
   npm run server:dev
   ```

6. **Open your browser**
   
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3001`

## Environment Variables

### Frontend (.env)
| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API URL | No | http://localhost:3001 |
| `VITE_APP_NAME` | Application name | No | Smart Task Assistant |
| `VITE_APP_VERSION` | Application version | No | 1.0.0 |
| `VITE_DEV_MODE` | Enable development mode | No | false |

### Backend (server/.env.local)
| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | ✅ Yes | - |
| `PORT` | Server port | No | 3001 |
| `NODE_ENV` | Environment mode | No | development |
| `FRONTEND_URL` | Frontend URL for CORS | No | http://localhost:5173 |

## Usage

### Task Management
- Click "Add new task" to create a task
- Set priority levels (low, medium, high)
- Click the circle icon to mark tasks complete
- Use the trash icon to delete tasks
- View task statistics at the top

### AI Assistant
- Switch to the "AI Chat" tab
- Ask questions about productivity, task management, or organization
- Get contextual advice based on your current tasks
- Clear chat history with the trash icon

## Architecture

### Full Stack Architecture
```
Frontend (React + Vite)     Backend (Node.js + Express)
├── Components              ├── Routes
├── Services (API calls)    ├── Services (OpenAI)
├── Hooks                   ├── Middleware
└── Types                   └── Config
```

### Frontend Structure
```
src/
├── components/          # React components
│   ├── Header.tsx      # App header with navigation
│   ├── TaskCard.tsx    # Individual task display
│   ├── TaskForm.tsx    # Task creation form
│   ├── TaskList.tsx    # Task list with stats
│   ├── ChatInterface.tsx # AI chat interface
│   └── ErrorBoundary.tsx # Error handling
├── hooks/              # Custom React hooks
│   ├── useTasks.ts     # Task management logic
│   └── useChat.ts      # Chat functionality
├── services/           # External service integrations
│   ├── taskService.ts  # Local storage task operations
│   └── openai.ts       # OpenAI API integration
├── types/              # TypeScript type definitions
├── config/             # Configuration and environment
└── utils/              # Utility functions
```

### Backend Structure
```
server/
├── config/             # Environment configuration
├── middleware/         # Express middleware
├── routes/            # API endpoints
├── services/          # External service integrations
├── .env.example       # Environment template
├── .env.local        # Local environment (not in repo)
└── server.js         # Main server file
```

## API Endpoints

### Health Check
- **GET** `/api/health` - Server health and status

### Chat
- **POST** `/api/chat` - Send message to AI assistant
- **POST** `/api/chat/suggestions` - Get AI task suggestions

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues:

1. Check that your `.env` file is properly configured
2. Ensure your OpenAI API key has sufficient credits
3. Verify your internet connection for AI features
4. Check the browser console for error messages

For additional help, create an issue in the project repository.
