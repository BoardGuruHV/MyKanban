# Quick Start: Deploy MyKanban

This guide will help you deploy MyKanban in ~10 minutes.

## What You'll Deploy

- **Frontend** (Vercel): Static HTML/CSS/JS Kanban board
- **Backend** (Railway): API proxy for Ollama integration

## Prerequisites

- GitHub account (you already have the repo at https://github.com/BoardGuruHV/MyKanban)
- Vercel account (sign up at https://vercel.com - free)
- Railway account (sign up at https://railway.app - $5 credit free)

---

## Step 1: Deploy Backend to Railway (5 min)

### Option A: Using Railway Dashboard (Recommended)

1. **Go to Railway**: https://railway.app/new

2. **Deploy from GitHub**:
   - Click "Deploy from GitHub repo"
   - Select `BoardGuruHV/MyKanban`
   - Click "Deploy Now"

3. **Configure the deployment**:
   - Click on the deployed service
   - Go to "Settings"
   - Scroll to "Root Directory" and set it to: `/api`
   - Scroll to "Start Command" and set it to: `npm start`
   - Click "Save"

4. **Add Environment Variables**:
   - Go to "Variables" tab
   - Add these variables:
     ```
     OLLAMA_URL=http://localhost:11434
     ALLOWED_ORIGINS=*
     ```
   - Note: Set `ALLOWED_ORIGINS` to your Vercel domain later (e.g., `https://my-kanban.vercel.app`)

5. **Get your Railway URL**:
   - Go to "Settings" tab
   - Under "Domains", click "Generate Domain"
   - Copy the URL (e.g., `https://mykanban-api.up.railway.app`)
   - **Save this URL** - you'll need it for config.js

### Option B: Using Railway CLI

```bash
cd /home/vik/MyKanban
npm i -g @railway/cli
railway login
railway init
railway up
railway domain  # Get your Railway URL
```

---

## Step 2: Update config.js with Railway URL

1. Edit `/home/vik/MyKanban/config.js`
2. Find line 17: `? 'https://mykanban-api.up.railway.app'`
3. Replace with your actual Railway URL from Step 1
4. Commit and push:
   ```bash
   git add config.js
   git commit -m "Update Railway API URL"
   git push origin main
   ```

---

## Step 3: Deploy Frontend to Vercel (3 min)

### Option A: Using Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com/new

2. **Import Git Repository**:
   - Click "Import Project"
   - Select "Import Git Repository"
   - Paste: `https://github.com/BoardGuruHV/MyKanban`
   - Click "Import"

3. **Configure Project**:
   - Framework Preset: **Other** (or leave as detected)
   - Root Directory: `./` (default)
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: (leave empty)

4. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes for deployment
   - You'll get a URL like `https://my-kanban.vercel.app`

5. **Update Railway CORS** (Important!):
   - Go back to Railway
   - Update `ALLOWED_ORIGINS` to your Vercel URL:
     ```
     ALLOWED_ORIGINS=https://your-app.vercel.app,https://*.vercel.app
     ```

### Option B: Using Vercel CLI

```bash
cd /home/vik/MyKanban
npm i -g vercel
vercel login
vercel --prod
```

---

## Step 4: Set Up Ollama (Optional - for AI features)

MyKanban works without AI, but AI features require Ollama.

### Option 1: Use Ollama Locally (Free, for testing)

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model
ollama pull llama3

# Run Ollama
ollama serve
```

In the web app settings, set Ollama URL to: `http://localhost:11434`

### Option 2: Deploy Ollama to Railway (~$15/month)

1. Create a new Railway service
2. Deploy from Docker image: `ollama/ollama:latest`
3. Add persistent volume: `/root/.ollama`
4. Update your API service's `OLLAMA_URL` to point to this service

### Option 3: Use Cloud AI API (Pay-per-use)

Replace Ollama with OpenAI, Anthropic, or Together AI:
- Update `api/server.js` to call the cloud API instead
- Much cheaper for occasional use
- No need to host Ollama

---

## Step 5: Test Your Deployment

1. **Visit your Vercel URL**: `https://your-app.vercel.app`

2. **Create a test project**:
   - Click "New Project"
   - Name: "Test Project"
   - Path: `/test`
   - Color: Blue
   - Click "Add Project"

3. **Add a test feature**:
   - Click "New Feature"
   - Title: "Test Feature"
   - Description: "Testing the deployment"
   - Select "Test Project"
   - Click "Create Feature (Identical)"

4. **Test AI (if Ollama is set up)**:
   - Click the settings gear icon
   - Verify Ollama URL is correct
   - Click "Save Settings"
   - Create a new feature and try "Enhance Prompt" or "Contextualize"

---

## Troubleshooting

### Frontend loads but AI features don't work

**Check Railway logs**:
```bash
railway logs
```

**Common issues**:
- `OLLAMA_URL` is wrong → Update in Railway Variables
- CORS error → Update `ALLOWED_ORIGINS` in Railway
- Ollama not running → Start Ollama or deploy to Railway

### CORS errors in browser console

**Fix**: Update Railway environment variable:
```
ALLOWED_ORIGINS=https://your-actual-vercel-url.vercel.app,https://*.vercel.app
```

### "Failed to communicate with Ollama"

**Check**:
1. Railway API is running: Visit `https://your-railway-url.up.railway.app/health`
2. Ollama is accessible: Visit `https://your-railway-url.up.railway.app/api/ollama/status`
3. In app settings, verify Ollama URL points to Railway URL

---

## Next Steps

### Customize Your Deployment

1. **Custom domain** (Vercel):
   - Go to Vercel project settings → Domains
   - Add your custom domain

2. **Secure Railway** (Important for production):
   - Update `ALLOWED_ORIGINS` to specific domains (remove `*`)
   - Consider adding authentication

3. **Cost optimization**:
   - Vercel: Free tier is usually enough
   - Railway: ~$5/month for API only
   - Consider using cloud AI APIs instead of hosting Ollama

### Update Your Deployment

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Both Vercel and Railway auto-deploy on push to `main`.

---

## Cost Summary

- **Vercel**: Free (Hobby tier)
- **Railway API**: ~$5/month
- **Ollama on Railway**: ~$15-20/month (requires 2GB+ RAM)
- **Cloud AI APIs**: ~$0.01-0.10 per request (pay-per-use)

**Recommendation**: Start with local Ollama for testing, then decide on Railway vs cloud APIs based on usage.

---

## Support

- **Issues**: https://github.com/BoardGuruHV/MyKanban/issues
- **Deployment docs**: See DEPLOYMENT.md for detailed instructions
- **Railway docs**: https://docs.railway.app
- **Vercel docs**: https://vercel.com/docs
