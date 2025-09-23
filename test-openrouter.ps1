# OpenRouter 测试脚本 (PowerShell版本)
# 测试OpenRouter多模型路由服务

Write-Host "🌐 Testing OpenRouter with Claude 3.5 Sonnet..." -ForegroundColor Blue
Write-Host "=============================================" -ForegroundColor Gray

# 设置环境变量
$env:AI_API_KEY = "sk-or-v1-1234567890abcdef1234567890abcdef"
$env:AI_ENGINE = "openrouter"
$env:AI_MODEL = "anthropic/claude-3.5-sonnet"

Write-Host "Engine: $env:AI_ENGINE" -ForegroundColor Yellow
Write-Host "Model: $env:AI_MODEL" -ForegroundColor Yellow
Write-Host "API Key: $($env:AI_API_KEY.Substring(0,15))..." -ForegroundColor Yellow
Write-Host ""

# 执行测试
gemini "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."
