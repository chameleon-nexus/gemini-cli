#!/bin/bash
# Azure OpenAI 测试脚本
# 测试Azure OpenAI服务

echo "☁️ Testing Azure OpenAI with GPT-4..."
echo "===================================="

# 设置环境变量
export AI_API_KEY="your-azure-openai-api-key"
export AI_ENGINE="azure"
export AI_BASE_URL="https://your-resource.openai.azure.com"
export AI_MODEL="gpt-4"

echo "Engine: $AI_ENGINE"
echo "Model: $AI_MODEL"
echo "Base URL: $AI_BASE_URL"
echo "API Key: ${AI_API_KEY:0:10}..."
echo ""

# 执行测试
gemini "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."
