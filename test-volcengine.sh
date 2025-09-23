#!/bin/bash
# Volcengine 测试脚本
# 测试火山引擎AI (默认引擎)

echo "🔥 Testing Volcengine with DeepSeek V3..."
echo "=================================="

# 设置环境变量
export AI_API_KEY="sk-1234567890abcdef1234567890abcdef"
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"

echo "Engine: $AI_ENGINE"
echo "Model: $AI_MODEL"
echo "API Key: ${AI_API_KEY:0:10}..."
echo ""

# 执行测试
gemini "请介绍一下你自己，你是哪个AI模型？请用中文回答。"
