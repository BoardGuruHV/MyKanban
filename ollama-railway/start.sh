#!/bin/bash

# Start Ollama server in the background
/bin/ollama serve &

# Wait for Ollama to start
echo "Waiting for Ollama to start..."
sleep 10

# Pull the model (using smaller qwen2.5:3b for Railway's memory constraints)
MODEL=${OLLAMA_MODEL:-qwen2.5:3b}
echo "Pulling model: $MODEL"
/bin/ollama pull $MODEL

# Keep the container running
echo "Ollama is ready and serving on port 11434"
wait
