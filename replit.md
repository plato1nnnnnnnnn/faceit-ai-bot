# Faceit AI Bot Monorepo - Replit Setup

## Overview
This is a monorepo containing a Faceit AI bot application with multiple components:
- **Frontend**: Next.js web application (main user interface)
- **Backend**: Node.js Express API server 
- **AI Service**: Python FastAPI ML/AI service
- **Extension**: Browser extension (React)
- **Desktop**: Electron desktop application
- **Shared Packages**: UI components and utilities

## Current Status
✅ Fully configured and working in Replit environment
✅ All dependencies installed
✅ Frontend running on port 5000 (configured for Replit proxy)
✅ Backend API on port 4000 (localhost)
✅ AI service on port 8000 (localhost) 
✅ Deployment configured for autoscale

## Architecture
- **Frontend**: Next.js 14 with TypeScript, configured to bind to 0.0.0.0:5000 for Replit compatibility
- **Backend**: Express server with CORS configured for cross-origin requests
- **AI Service**: FastAPI with CORS configured for frontend communication
- **Database**: Ready to use Replit PostgreSQL when needed
- **Deployment**: Configured as autoscale deployment target

## Development Commands
- `npm run dev:web` - Start frontend only (currently in workflow)
- `npm run dev:backend` - Start backend API server
- `npm run dev:ai` - Start Python AI service
- `npm run dev:fullstack` - Start frontend + backend + AI together
- `npm run install:all` - Install all monorepo dependencies

## Replit Configuration
- **Workflow**: Frontend on port 5000 (configured for webview)
- **Next.js**: Configured with cache-control headers and host binding
- **CORS**: Backend and AI services configured for cross-origin communication
- **Languages**: Node.js 20 and Python 3.11 installed

## Services Architecture
- **Port 5000**: Next.js Frontend (public-facing, bound to 0.0.0.0)
- **Port 4000**: Express Backend API (localhost only)
- **Port 8000**: Python FastAPI AI Service (localhost only)

## Recent Setup (September 26, 2025)
- Imported from GitHub and configured for Replit environment
- Fixed Next.js configuration for proxy compatibility
- Configured all services with proper CORS settings
- Set up deployment configuration
- All services tested and working
- Created modern UI with navigation and responsive design
- Implemented AI demo analysis and teammate search features
- Fixed API client to properly handle FormData uploads
- Added comprehensive error handling and loading states
- Optimized build configuration and performance

## Features Implemented
- ✅ Modern responsive frontend with gradient design
- ✅ AI-powered demo analysis with file upload
- ✅ Teammate search with filtering system
- ✅ Real-time API status monitoring
- ✅ Navigation system with routing
- ✅ Premium features showcase
- ✅ Error handling and user feedback
- ✅ Mobile-responsive design

## API Endpoints Working
- ✅ Backend health check (/api/health)
- ✅ AI service health check (/health)
- ✅ Demo analysis (/analyze-demo)
- ✅ Teammate search (/api/search-teammates)
- ✅ User statistics (/api/user-stats/:userId)
- ✅ Training generation (/generate-training)
- ✅ Voice commands (/voice-assistant/commands)

## Build & Deploy
- Use `scripts/start-all.sh` to start all services
- Or use `npm run dev:fullstack` for development
- Frontend builds with Next.js optimization
- All services configured for production deployment

## User Preferences
- Language: Mixed (English/Russian content)
- Framework: Next.js with TypeScript  
- Backend: Express.js with ES modules
- AI/ML: Python with FastAPI
- Design: Modern dark theme with orange/amber gradients