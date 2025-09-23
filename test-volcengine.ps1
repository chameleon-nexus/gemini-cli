# Volcengine 测试脚本 (PowerShell版本)
# 测试火山引擎AI (默认引擎)

Write-Host "🔥 Testing Volcengine with DeepSeek V3..." -ForegroundColor Red
Write-Host "==================================" -ForegroundColor Gray

# 设置环境变量
$env:AI_API_KEY = "your-volcengine-api-key"
$env:AI_ENGINE = "volcengine"
$env:AI_MODEL = "deepseek-v3-250324"

Write-Host "Engine: $env:AI_ENGINE" -ForegroundColor Yellow
Write-Host "Model: $env:AI_MODEL" -ForegroundColor Yellow
Write-Host "API Key: $($env:AI_API_KEY.Substring(0,10))..." -ForegroundColor Yellow
Write-Host ""

# 执行测试
gemini "请介绍一下你自己，你是哪个AI模型？请用中文回答。"
