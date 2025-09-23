#!/bin/bash
# Ollama 测试脚本
# 测试本地Ollama AI

echo "🦙 Testing Ollama with Llama 3.2..."
echo "================================="

# 设置环境变量
export AI_ENGINE="ollama"
export AI_BASE_URL="http://localhost:11434"
export AI_MODEL="llama3.2:latest"

echo "Engine: $AI_ENGINE"
echo "Model: $AI_MODEL"
echo "Base URL: $AI_BASE_URL"
echo ""

# 检查Ollama是否运行
if ! curl -s http://localhost:11434/api/tags > /dev/null; then
    echo "❌ Error: Ollama is not running on localhost:11434"
    echo "Please start Ollama first:"
    echo "  ollama serve"
    echo "  ollama pull llama3.2:latest"
    exit 1
fi

echo "✅ Ollama is running"
echo ""

# 执行测试
gemini "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

