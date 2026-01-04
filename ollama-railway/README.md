# Ollama Railway Deployment

This directory contains the configuration for deploying Ollama to Railway.

## 🚀 Deployment Steps

### Option 1: Deploy via Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Navigate to ollama-railway directory
cd ollama-railway

# Create new Railway service
railway init

# Deploy
railway up
```

### Option 2: Deploy via Railway Dashboard

1. Go to https://railway.app/dashboard
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose **BoardGuruHV/MyKanban**
5. Set **Root Directory** to: `ollama-railway`
6. Click **"Deploy"**

## ⚙️ Environment Variables

Set these in Railway dashboard after deployment:

| Variable | Value | Description |
|----------|-------|-------------|
| `OLLAMA_MODEL` | `qwen2.5:3b` | Model to pull (optional, defaults to qwen2.5:3b) |
| `PORT` | `11434` | Ollama port (Railway sets automatically) |

## 📊 Resource Requirements

- **RAM**: Minimum 2GB (qwen2.5:3b model)
- **Storage**: ~2GB for qwen2.5:3b model (~5GB for llama3)
- **CPU**: 2+ cores recommended

**Railway Plan Needed**: At least the **Developer Plan** ($5/month base + usage)

**Note**: Using qwen2.5:3b instead of llama3 due to Railway's memory constraints (container has ~3.3GB available despite 8GB allocation)

## 🔗 After Deployment

1. Copy the Railway service URL (e.g., `https://ollama-production.up.railway.app`)
2. Update the API proxy environment variable `OLLAMA_URL` to point to this URL
3. Redeploy the API service

## 🧪 Test the Deployment

```bash
# Check if Ollama is running
curl https://your-ollama-url.up.railway.app/api/tags

# Test generation
curl -X POST https://your-ollama-url.up.railway.app/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen2.5:3b",
    "prompt": "Say hello!",
    "stream": false
  }'
```

## ⚠️ Important Notes

- First deployment will take 2-5 minutes (downloading qwen2.5:3b model)
- Model is ~1.9GB (qwen2.5:3b) and will need to be re-downloaded on each deployment
- Inference will be slower than local GPU (Railway uses CPU)
- qwen2.5:3b provides good quality while fitting in Railway's memory constraints

## 💰 Cost Estimate

- **Base**: $5/month (Railway Developer plan)
- **Usage**: ~$20-30/month for moderate use (RAM + CPU)
- **Total**: ~$25-35/month

For comparison:
- **Claude API**: ~$0.01 per request (pay-as-you-go)
- **Local Ollama**: Free (your hardware)
