#!/bin/bash

# Start Ollama server in the background
/bin/ollama serve &

# Wait for Ollama to start
echo "Waiting for Ollama to start..."
sleep 10

# Pull the llama3 model (or whatever model is specified)
MODEL=${OLLAMA_MODEL:-llama3}
echo "Pulling model: $MODEL"
/bin/ollama pull $MODEL

# Keep the container running
echo "Ollama is ready and serving on port 11434"
wait
