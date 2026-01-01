require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    ollamaUrl: OLLAMA_URL
  });
});

// Ollama API endpoints (support both /api/generate and /api/ollama/generate for compatibility)
app.post(['/api/generate', '/api/ollama/generate'], async (req, res) => {
  try {
    const response = await axios.post(
      `${OLLAMA_URL}/api/generate`,
      req.body,
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'stream'
      }
    );

    // Stream the response back to the client
    response.data.pipe(res);
  } catch (error) {
    console.error('Ollama generate error:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to communicate with Ollama',
      message: error.message
    });
  }
});

app.get(['/api/tags', '/api/ollama/tags'], async (req, res) => {
  try {
    const response = await axios.get(`${OLLAMA_URL}/api/tags`);
    res.json(response.data);
  } catch (error) {
    console.error('Ollama tags error:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to get Ollama models',
      message: error.message
    });
  }
});

// Check Ollama status
app.get(['/api/status', '/api/ollama/status'], async (req, res) => {
  try {
    const response = await axios.get(`${OLLAMA_URL}/api/tags`, {
      timeout: 5000
    });
    res.json({
      status: 'connected',
      models: response.data.models?.length || 0
    });
  } catch (error) {
    res.json({
      status: 'disconnected',
      error: error.message
    });
  }
});

// Catch-all for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

app.listen(PORT, () => {
  console.log(`MyKanban API server running on port ${PORT}`);
  console.log(`Proxying Ollama requests to: ${OLLAMA_URL}`);
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});
