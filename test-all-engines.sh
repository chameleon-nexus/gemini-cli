#!/bin/bash
# 综合测试脚本
# 测试所有支持的AI引擎

echo "🚀 Multi-Engine AI CLI - Comprehensive Test"
echo "=========================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 测试函数
test_engine() {
    local engine=$1
    local model=$2
    local api_key=$3
    local base_url=$4
    local prompt=$5
    local script_name=$6
    
    echo -e "${BLUE}Testing $engine with $model...${NC}"
    echo "----------------------------------------"
    
    # 设置环境变量
    export AI_ENGINE="$engine"
    export AI_MODEL="$model"
    if [ -n "$api_key" ]; then
        export AI_API_KEY="$api_key"
    fi
    if [ -n "$base_url" ]; then
        export AI_BASE_URL="$base_url"
    fi
    
    echo "Engine: $engine"
    echo "Model: $model"
    if [ -n "$base_url" ]; then
        echo "Base URL: $base_url"
    fi
    echo ""
    
    # 执行测试
    if gemini "$prompt"; then
        echo -e "${GREEN}✅ $engine test completed successfully${NC}"
    else
        echo -e "${RED}❌ $engine test failed${NC}"
    fi
    echo ""
    echo "=========================================="
    echo ""
}

# 测试所有引擎
echo "🌐 Testing OpenRouter (Claude 3.5 Sonnet)..."
test_engine "openrouter" "anthropic/claude-3.5-sonnet" "your-openrouter-api-key" "" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

echo "☁️ Testing Azure OpenAI (GPT-4)..."
test_engine "azure" "gpt-4" "your-azure-openai-api-key" "https://your-resource.openai.azure.com" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

echo "🦙 Testing Ollama (Llama 3.2)..."
test_engine "ollama" "llama3.2:latest" "" "http://localhost:11434" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

echo "🔥 Testing Volcengine (DeepSeek V3)..."
test_engine "volcengine" "deepseek-v3-250324" "your-volcengine-api-key" "" "请介绍一下你自己，你是哪个AI模型？请用中文回答。"

echo "🌊 Testing Bailian (Qwen Plus)..."
test_engine "bailian" "qwen-plus" "your-bailian-api-key" "" "你好，请介绍一下你自己，你是哪个AI模型？请用中文回答。"

echo "🧠 Testing GLM (GLM-4)..."
test_engine "glm" "glm-4" "your-glm-api-key" "" "你好，请介绍一下你自己，你是哪个AI模型？请用中文回答。"

echo "🦙 Testing Ollama (Llama 3.2)..."
# 检查Ollama是否运行
if curl -s http://localhost:11434/api/tags > /dev/null; then
    echo "✅ Ollama is running"
    echo ""
    test_engine "ollama" "llama3.2:latest" "" "http://localhost:11434" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."
else
    echo -e "${YELLOW}⚠️ Ollama is not running, skipping Ollama test${NC}"
    echo "To test Ollama, please run:"
    echo "  ollama serve"
    echo "  ollama pull llama3.2:latest"
    echo ""
fi

echo -e "${GREEN}🎉 All engine tests completed!${NC}"
echo ""
echo "To run individual engine tests:"
echo "  ./test-openrouter.sh"
echo "  ./test-azure.sh"
echo "  ./test-ollama.sh"
echo "  ./test-volcengine.sh"
echo "  ./test-bailian.sh"
echo "  ./test-glm.sh"
