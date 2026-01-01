# MyKanban Deployment Guide

This guide explains how to deploy MyKanban as a web application using Vercel (frontend) and Railway (backend API).

## Architecture

```
User Browser (Vercel) → Railway API Proxy → Ollama Service
```

- **Frontend**: Static HTML/CSS/JS hosted on Vercel
- **Backend**: Node.js Express API proxy hosted on Railway
- **AI Service**: Ollama (can be hosted on Railway or external server)

## Prerequisites

- GitHub account
- Vercel account (free tier)
- Railway account (free trial, then ~$5-20/month)
- Git installed locally

## Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git branch -M main
gh repo create MyKanban --public --source=. --remote=origin
git push -u origin main
```

Or manually:
1. Create a new repository on GitHub
2. Add the remote: `git remote add origin https://github.com/YOUR_USERNAME/MyKanban.git`
3. Push: `git push -u origin main`

### 2. Deploy Frontend to Vercel

#### Option A: Using Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
4. Add Environment Variable:
   - `VITE_API_URL` = (your Railway API URL - add after step 3)
5. Deploy

### 3. Deploy Backend to Railway

#### Option A: Using Railway CLI
```bash
npm i -g @railway/cli
railway login
cd api
railway init
railway up
railway open
```

#### Option B: Using Railway Dashboard
1. Go to https://railway.app/new
2. Select "Deploy from GitHub repo"
3. Select your MyKanban repository
4. Configure:
   - Root Directory: `/api`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add Environment Variables:
   - `OLLAMA_URL` = `http://localhost:11434` (or your Ollama service URL)
   - `ALLOWED_ORIGINS` = `https://your-app.vercel.app,https://*.vercel.app`
   - `PORT` = (auto-set by Railway)
6. Deploy
7. Copy the generated Railway URL (e.g., `https://mykanban-api.up.railway.app`)

### 4. Update Vercel Environment Variable

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add/Update:
   - `VITE_API_URL` = `https://your-railway-app.up.railway.app`
4. Redeploy the frontend

### 5. Optional: Deploy Ollama on Railway

If you want to host Ollama on Railway:

1. Create a new Railway service
2. Deploy from Docker image: `ollama/ollama:latest`
3. Add volume mount for models: `/root/.ollama`
4. Set environment variables:
   - `OLLAMA_MODELS` = `llama3` (or your preferred model)
5. Update the API service's `OLLAMA_URL` to point to this service

**Note**: Ollama requires significant resources (2GB+ RAM, 4GB+ disk). Consider using cloud AI APIs instead:
- OpenAI API
- Anthropic Claude API
- Together AI

## Environment Variables Summary

### Frontend (Vercel)
- `VITE_API_URL`: Railway API endpoint (e.g., `https://mykanban-api.up.railway.app`)

### Backend (Railway)
- `OLLAMA_URL`: Ollama service URL
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins
- `PORT`: Auto-set by Railway

## Testing

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Create a new project
3. Add a feature
4. Test AI contextualization (requires working Ollama connection)

## Troubleshooting

### CORS Errors
- Ensure `ALLOWED_ORIGINS` on Railway includes your Vercel domain
- Check Railway logs: `railway logs`

### Ollama Not Connecting
- Check Railway API logs
- Verify `OLLAMA_URL` is correct
- Test the endpoint: `curl https://your-railway-api.up.railway.app/api/ollama/status`

### Frontend Not Loading
- Check Vercel deployment logs
- Verify `index.html` is in root directory
- Check browser console for errors

## Cost Estimates

- **Vercel**: Free (Hobby tier)
- **Railway API**: ~$5/month (minimal resources)
- **Ollama on Railway**: ~$15-20/month (requires more resources)
- **Alternative**: Use cloud AI APIs (~$0.01-0.10 per request)

## Local Development

```bash
# Terminal 1: Start backend
cd api
npm install
cp .env.example .env
# Edit .env with your settings
npm run dev

# Terminal 2: Open frontend
cd ..
# Edit index.html to use http://localhost:3000 for API
open index.html
```

## Updating the Application

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Both Vercel and Railway will automatically deploy the changes.
