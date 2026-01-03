# Ollama Railway Deployment Dockerfile
FROM ollama/ollama:latest

# Set environment variables
ENV OLLAMA_HOST=0.0.0.0:11434

# Create directory for models
RUN mkdir -p /root/.ollama/models

# Expose Ollama port
EXPOSE 11434

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Start Ollama and pull model
CMD ["/start.sh"]
