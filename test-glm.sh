#!/bin/bash
# GLM 测试脚本
# 测试智谱AI GLM

echo "🧠 Testing GLM with GLM-4..."
echo "=========================="

# 设置环境变量
export AI_API_KEY="your-glm-api-key"
export AI_ENGINE="glm"
export AI_MODEL="glm-4"

echo "Engine: $AI_ENGINE"
echo "Model: $AI_MODEL"
echo "API Key: ${AI_API_KEY:0:10}..."
echo ""

# 执行测试
gemini "你好，请介绍一下你自己，你是哪个AI模型？请用中文回答。"
