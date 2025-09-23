#!/bin/bash
# OpenRouter 测试脚本
# 测试OpenRouter多模型路由服务

echo "🌐 Testing OpenRouter with Claude 3.5 Sonnet..."
echo "============================================="

# 设置环境变量
export AI_API_KEY="your-openrouter-api-key"
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"

echo "Engine: $AI_ENGINE"
echo "Model: $AI_MODEL"
echo "API Key: ${AI_API_KEY:0:15}..."
echo ""

# 执行测试
gemini "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."
