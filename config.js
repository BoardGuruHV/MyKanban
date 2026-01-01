// Configuration for MyKanban
// This file can be modified during deployment to inject environment-specific values

window.APP_CONFIG = {
  // Detect environment
  ENV: typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    ? 'production'
    : 'development',

  // API URL for Ollama
  // In production (Vercel), this will be set to the Railway backend URL
  // In development, it points to localhost Ollama directly
  // The Railway proxy supports the same API paths as Ollama (/api/generate, /api/tags)
  // so the frontend doesn't need to know the difference
  get API_URL() {
    return this.ENV === 'production'
      ? 'https://mykanban-production.up.railway.app'
      : 'http://localhost:11434';
  }
};

console.log('[Config] Environment:', window.APP_CONFIG.ENV);
console.log('[Config] API URL:', window.APP_CONFIG.API_URL);
