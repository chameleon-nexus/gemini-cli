#!/bin/bash
# Bailian 测试脚本
# 测试阿里云百炼

echo "🌊 Testing Bailian with Qwen Plus..."
echo "=================================="

# 设置环境变量
export AI_API_KEY="your-bailian-api-key"
export AI_ENGINE="bailian"
export AI_MODEL="qwen-plus"

echo "Engine: $AI_ENGINE"
echo "Model: $AI_MODEL"
echo "API Key: ${AI_API_KEY:0:10}..."
echo ""

# 执行测试
gemini "你好，请介绍一下你自己，你是哪个AI模型？请用中文回答。"
