#!/bin/bash
# DashScope 测试脚本
# 测试阿里云通义千问

echo "🌊 Testing DashScope with Qwen Plus..."
echo "===================================="

# 设置环境变量
export AI_API_KEY="sk-1234567890abcdef1234567890abcdef"
export AI_ENGINE="dashscope"
export AI_MODEL="qwen-plus"

echo "Engine: $AI_ENGINE"
echo "Model: $AI_MODEL"
echo "API Key: ${AI_API_KEY:0:10}..."
echo ""

# 执行测试
gemini "你好，请介绍一下你自己，你是哪个AI模型？请用中文回答。"
