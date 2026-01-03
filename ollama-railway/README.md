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
| `OLLAMA_MODEL` | `llama3` | Model to pull (optional, defaults to llama3) |
| `PORT` | `11434` | Ollama port (Railway sets automatically) |

## 📊 Resource Requirements

- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: ~5GB for llama3 model
- **CPU**: 2+ cores recommended

**Railway Plan Needed**: At least the **Developer Plan** ($5/month base + usage)

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
    "model": "llama3",
    "prompt": "Say hello!",
    "stream": false
  }'
```

## ⚠️ Important Notes

- First deployment will take 5-10 minutes (downloading model)
- Model is ~4.7GB and persists in Railway volume
- Inference will be slower than local GPU (Railway uses CPU)
- Consider using smaller models like `qwen2.5:3b` for faster inference

## 💰 Cost Estimate

- **Base**: $5/month (Railway Developer plan)
- **Usage**: ~$20-30/month for moderate use (RAM + CPU)
- **Total**: ~$25-35/month

For comparison:
- **Claude API**: ~$0.01 per request (pay-as-you-go)
- **Local Ollama**: Free (your hardware)
