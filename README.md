# MyKanban - Feature Development Matrix

A Kanban-style project management application for tracking feature development across multiple projects, with AI-powered prompt enhancement.

🚀 **[Deploy to Vercel + Railway](QUICK_START.md)** | 📖 **[Full Deployment Guide](DEPLOYMENT.md)**

## Features

- **Drag & Drop Kanban Boards** - Manage features across Backlog, In Progress, and Done columns
- **Multi-Project Support** - Create unlimited custom projects with color coding
- **AI-Powered Prompts** - Enhance and contextualize feature prompts using Ollama
- **Unified Dashboard** - View all projects at a glance with progress visualization
- **Project-Specific Boards** - Dedicated board for each project
- **localStorage Persistence** - All data saved automatically in browser
- **Copy Prompts** - One-click copy of feature prompts for AI coding agents
- **Progress Tracking** - Visual progress bars and statistics per project
- **Dual Creation Modes** - Identical or contextualized features per project

## Quick Start

### 🌐 Deploy as Web App

See **[QUICK_START.md](QUICK_START.md)** for deploying to Vercel (frontend) + Railway (backend).

### 💻 Run Locally

Simply open `index.html` in your web browser:

```bash
# Using default browser
xdg-open /home/vik/MyKanban/index.html

# Or with a specific browser
google-chrome /home/vik/MyKanban/index.html
firefox /home/vik/MyKanban/index.html
```

### 🤖 Enable AI Features (Optional)

Install and run Ollama for AI prompt enhancement:

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model
ollama pull llama3

# Run Ollama (in a separate terminal)
ollama serve
```

Then in MyKanban settings, ensure Ollama URL is set to `http://localhost:11434`

### Navigation

- **Dashboard Tab** - Overview of all projects with mini Kanban boards
- **Project Tabs** - Individual Kanban boards for each project
- **Add Feature** - Click to create new feature requests
- **Copy Prompt** - Click to copy feature prompt for pasting into coding agent
- **Drag Features** - Drag cards between columns to update status

### Project Management

1. **Create Projects**
   - Click "New Project" button
   - Set name, path, color, and AI context
   - Projects appear as tabs in the dashboard

### Feature Management

1. **Create Feature**
   - Click "New Feature" button
   - Fill in title, description, prompt, and tags
   - Choose creation mode:
     - **Identical**: Same prompt for all selected projects
     - **Contextualized**: AI adapts prompt for each project's tech stack (requires Ollama)

2. **AI Enhancement** (Optional)
   - Click "Enhance with AI" to expand brief prompts into detailed specifications
   - Click "Revert" to undo AI enhancements
   - Preview contextualized prompts before creation

3. **Track Progress**
   - Drag feature cards between columns: Backlog → In Progress → Done
   - Each project tracks status independently
   - Progress bars update automatically

4. **Copy Prompts**
   - Click "Copy Prompt" button on any feature card
   - Paste into your AI coding agent (Claude Code, Cursor, etc.)
   - Each project can have a customized version

5. **Delete Features**
   - Click "Delete" button on feature card
   - Removes feature from all projects

## Data Storage

All data is stored in browser's localStorage:
- `kanban_features` - Feature definitions (title, description, prompt, tags)
- `kanban_projects` - Project configurations (name, path, color, AI context)
- `kanban_status` - Feature status mapping (featureId → projectId → status)
- `kanban_ai_settings` - AI/Ollama configuration

**Privacy**: All data stays local in your browser. Nothing is sent to external servers (except optional Ollama API calls for AI features).

## Architecture

### Frontend
- **Technology**: Vanilla HTML, CSS, JavaScript
- **Hosting**: Vercel (static hosting with global CDN)
- **Dependencies**: None (single self-contained file)
- **Browser Support**: Modern browsers with localStorage and drag-and-drop API

### Backend (Optional - for AI features)
- **API Proxy**: Node.js + Express (hosted on Railway)
- **AI Service**: Ollama (local or Railway-hosted)
- **Endpoints**: `/api/generate`, `/api/tags`, `/api/status`

## Tips

- Use descriptive feature names for easy identification
- Add project AI context (tech stack, patterns) for better contextualization
- Use tags to categorize features (e.g., "backend", "frontend", "bug", "feature")
- Check Dashboard regularly to see overall progress across all projects
- Leverage AI enhancement for quick prompt drafting
- Copy contextualized prompts to get project-specific implementations

## Deployment

- **Quick Start**: See [QUICK_START.md](QUICK_START.md) for 10-minute deployment
- **Full Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions
- **Repository**: https://github.com/BoardGuruHV/MyKanban

## File Structure

```
MyKanban/
├── index.html              # Main application (self-contained)
├── config.js               # Environment configuration
├── vercel.json             # Vercel deployment config
├── api/                    # Backend API proxy
│   ├── server.js          # Express server
│   ├── package.json       # Node dependencies
│   ├── Dockerfile         # Docker container config
│   └── .env.example       # Environment variables template
├── README.md              # This file
├── QUICK_START.md         # 10-minute deployment guide
└── DEPLOYMENT.md          # Detailed deployment documentation
```

## Created

Generated with Claude Code for multi-project feature development management.
