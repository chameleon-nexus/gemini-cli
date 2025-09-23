# Gemini CLI (CatalystAI Edition) - Nền tảng AI Multi-Engine

[![npm version](https://badge.fury.io/js/%40catalystai%2Fgemini-cli.svg)](https://badge.fury.io/js/%40catalystai%2Fgemini-cli)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**🚀 Công cụ CLI thống nhất đầu tiên trên thế giới hỗ trợ 6 AI Engine lớn - Một lệnh, tất cả mô hình**

> ⚠️ **Tuyên bố quan trọng**: Đây là phiên bản đã chỉnh sửa của [Google Gemini CLI](https://github.com/google-gemini/gemini-cli). Dự án gốc thuộc bản quyền của Google LLC và tuân theo Giấy phép Apache 2.0.

## 🌐 Chuyển đổi ngôn ngữ / Language Switch

| 🇺🇸 [English](../README.md) | 🇨🇳 [中文](README.zh.md) | 🇯🇵 [日本語](README.ja.md) | 🇩🇪 [Deutsch](README.de.md) | 🇻🇳 **Tiếng Việt** | 🇸🇦 [العربية](README.ar.md) |

## 🌟 Tính năng chính

- 🎯 **Hỗ trợ 6 AI Engine lớn**: OpenRouter、Azure、Ollama、Volcengine、Bailian、GLM
- 🔄 **Biến môi trường thống nhất**: Một bộ cấu hình cho tất cả engine
- 🌍 **Phủ sóng mô hình toàn cầu**: Hỗ trợ GPT、Claude、Qwen、GLM、DeepSeek và các mô hình chính khác
- 🏠 **Hỗ trợ AI cục bộ**: Triển khai Ollama cục bộ, dữ liệu hoàn toàn riêng tư
- 🔧 **Chuyển đổi không cấu hình**: Một biến môi trường để chuyển đổi engine
- 📊 **Tính năng đầy đủ**: Streaming/Non-streaming、Tính toán Token、Vectơ nhúng hỗ trợ đầy đủ

## 📦 Cài đặt

```bash
npm install -g @catalystai/gemini-cli
```

## 🎛️ AI Engine và Mô hình được hỗ trợ

### 🌐 OpenRouter (Định tuyến đa mô hình)
**Mô hình được hỗ trợ**: GPT-4、Claude、Llama、Mistral等
- `anthropic/claude-3.5-sonnet` (Mặc định)
- `openai/gpt-4`
- `meta-llama/llama-3.1-8b-instruct`
- `mistralai/mistral-7b-instruct`

### ☁️ Azure OpenAI / Azure AI Foundry
**Mô hình được hỗ trợ**: GPT-4、GPT-3.5、DALL-E等
- `gpt-4` (Mặc định)
- `gpt-3.5-turbo`
- `gpt-4-turbo`
- `dall-e-3`

### 🦙 Ollama (AI cục bộ)
**Mô hình được hỗ trợ**: Llama、Mistral、CodeLlama等
- `llama3.2:latest` (Mặc định)
- `mistral:latest`
- `codellama:latest`
- `qwen:latest`

### 🔥 Volcengine (Engine mặc định)
**Mô hình được hỗ trợ**: DeepSeek V3、Dòng Qwen、ChatGLM、Baichuan等
- `deepseek-v3-250324` (Mặc định)
- `qwen-plus`
- `qwen-max`
- `chatglm-6b`

### 🌊 Bailian (阿里云百炼)
**Mô hình được hỗ trợ**: 通义千问商业版、多模态模型
- `qwen-plus` (Mặc định)
- `qwen-max`
- `qwen-vl-plus`

### 🧠 GLM (智谱AI)
**Mô hình được hỗ trợ**: GLM-4、CogView等
- `glm-4` (Mặc định)
- `glm-4v`
- `cogview-3`

## ⚙️ Hệ thống cấu hình thống nhất

### 🔧 Phương pháp cấu hình được khuyến nghị (Biến môi trường thống nhất)

```bash
# Khóa API thống nhất (Chung cho tất cả engine)
export AI_API_KEY="your-actual-api-key-from-your-ai-provider"

# Tên mô hình thống nhất (Chung cho tất cả engine)
export AI_MODEL="your-preferred-model-name"

# Base URL thống nhất (Tùy chọn, chỉ cần thiết khi tùy chỉnh)
export AI_BASE_URL="your-custom-endpoint-url"

# Lựa chọn Engine (Một biến điều khiển tất cả)
export AI_ENGINE="volcengine"  # Tùy chọn: openrouter, azure, ollama, volcengine, bailian, glm
```

### 🪟 Windows PowerShell Cấu hình

```powershell
# Cấu hình thống nhất
$env:AI_API_KEY="your-actual-api-key-from-your-ai-provider"
$env:AI_MODEL="your-preferred-model-name"
$env:AI_ENGINE="volcengine"
```

### 🔧 Cấu hình cụ thể cho Engine (Tùy chọn)

Nếu sử dụng cấu hình cụ thể cho engine, hệ thống sẽ tự động fallback về cấu hình thống nhất：

```bash
# Cấu hình cụ thể cho OpenRouter  
export OPENROUTER_API_KEY="your-openrouter-api-key"
export OPENROUTER_MODEL="anthropic/claude-3.5-sonnet"

# Cấu hình cụ thể cho Azure
export AZURE_API_KEY="your-azure-openai-api-key"
export AZURE_BASE_URL="https://your-resource.openai.azure.com"
export AZURE_MODEL="gpt-4"

# Cấu hình cụ thể cho Volcengine
export VOLCENGINE_API_KEY="your-volcengine-api-key"
export VOLCENGINE_MODEL="deepseek-v3-250324"
```

## 🚀 Cách sử dụng

### 💬 Chế độ hỏi trực tiếp

```bash
gemini "Xin chào, hãy giới thiệu về bản thân"
```

### 🔄 Chế độ tương tác

```bash
gemini
```

Sau đó chọn "2. Use Gemini API Key" và nhấn Enter để bắt đầu chat.

## 🧪 Ví dụ kiểm tra các Engine

### 🌐 Kiểm tra OpenRouter

```bash
# Sử dụng cấu hình thống nhất
export AI_API_KEY="your-openrouter-api-key"
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"

# Lệnh kiểm tra
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### ☁️ Kiểm tra Azure OpenAI

```bash
# Sử dụng cấu hình thống nhất
export AI_API_KEY="your-azure-openai-api-key"
export AI_ENGINE="azure"
export AI_BASE_URL="https://your-resource.openai.azure.com"
export AI_MODEL="gpt-4"

# Lệnh kiểm tra
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🦙 Kiểm tra Ollama (AI cục bộ)

```bash
# Sử dụng cấu hình thống nhất
export AI_ENGINE="ollama"
export AI_BASE_URL="http://localhost:11434"
export AI_MODEL="llama3.2:latest"

# Lệnh kiểm tra
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🔥 Kiểm tra Volcengine (Engine mặc định)

```bash
# Sử dụng cấu hình thống nhất
export AI_API_KEY="your-volcengine-api-key"
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"

# Lệnh kiểm tra
gemini "Hãy giới thiệu về bản thân, bạn là mô hình AI nào?"
```

### 🌊 Kiểm tra Bailian

```bash
# Sử dụng cấu hình thống nhất
export AI_API_KEY="your-bailian-api-key"
export AI_ENGINE="bailian"
export AI_MODEL="qwen-plus"

# Lệnh kiểm tra
gemini "Hãy giới thiệu về bản thân, bạn là mô hình AI nào?"
```

### 🧠 Kiểm tra GLM

```bash
# Sử dụng cấu hình thống nhất
export AI_API_KEY="your-glm-api-key"
export AI_ENGINE="glm"
export AI_MODEL="glm-4"

# Lệnh kiểm tra
gemini "Hãy giới thiệu về bản thân, bạn là mô hình AI nào?"
```

## 🔧 Chuyển đổi Engine nhanh

```bash
# Chuyển sang OpenRouter Claude
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"
gemini "Hello Claude!"

# Chuyển sang Azure GPT-4
export AI_ENGINE="azure"
export AI_MODEL="gpt-4"
gemini "Hello GPT-4!"

# Chuyển sang Ollama cục bộ
export AI_ENGINE="ollama"
export AI_MODEL="llama3.2:latest"
gemini "Hello Llama!"

# Chuyển sang Volcengine DeepSeek
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"
gemini "Hello DeepSeek!"
```

## 🏗️ Kiến trúc kỹ thuật

### 🎯 Kiến trúc Multi-Engine Factory Pattern

Dự án này sử dụng thiết kế**Factory Pattern**，thực hiện hỗ trợ Multi-AI Engine có thể mở rộng cao：

```
ContentGeneratorFactory
├── OpenrouterContentGenerator    (OpenRouter)
├── AzureContentGenerator         (Azure OpenAI)
├── OllamaContentGenerator        (Local Ollama)
├── VolcengineContentGenerator    (Volcengine)
├── BailianContentGenerator       (Alibaba Cloud Bailian)
└── GlmContentGenerator           (Zhipu AI GLM)
```

### 🔧 Tính năng cốt lõi

✅ **6 AI Engine lớn**: Quản lý thống nhất tất cả AI Engine thông qua Factory Pattern  
✅ **Biến môi trường thống nhất**: `AI_API_KEY`、`AI_MODEL`、`AI_BASE_URL` cấu hình chung  
✅ **Chuyển đổi định dạng tự động**: Chuyển đổi liền mạch giữa định dạng Gemini và định dạng API của các engine  
✅ **Hỗ trợ phản hồi streaming**: Tất cả engine đều hỗ trợ phản hồi streaming và non-streaming  
✅ **Xử lý lỗi thông minh**: Bảo vệ timeout 30 giây, thông báo lỗi chi tiết  
✅ **Ưu tiên cấu hình**: Cấu hình thống nhất > Cấu hình cụ thể cho engine > Cấu hình mặc định  
✅ **Chuyển đổi không cấu hình**: Chuyển đổi engine với một biến môi trường  

## 📋 Tuyên bố giấy phép

Dự án này được phát triển dựa trên [Google Gemini CLI](https://github.com/google-gemini/gemini-cli)，tuân theo yêu cầu Giấy phép Apache 2.0：

### Thông tin dự án gốc

- **Dự án gốc**: Google Gemini CLI
- **Bản quyền gốc**: Copyright 2025 Google LLC  
- **Giấy phép gốc**: Apache License 2.0
- **Repository gốc**: https://github.com/google-gemini/gemini-cli

### Tuyên bố chỉnh sửa

Theo yêu cầu Giấy phép Apache 2.0 Điều 4：

- ✅ Giữ lại giấy phép Apache 2.0 gốc
- ✅ Giữ lại tuyên bố bản quyền gốc
- ✅ Đánh dấu rõ ràng tất cả chỉnh sửa
- ✅ Bao gồm văn bản giấy phép đầy đủ

## 🔄 Di chuyển từ Gemini CLI gốc

Nếu bạn đang di chuyển từ Google Gemini CLI gốc：

1. **Gỡ cài đặt phiên bản gốc**: `npm uninstall -g @google/gemini-cli`
2. **Cài đặt phiên bản này**: `npm install -g @catalystai/gemini-cli`
3. **Thiết lập khóa API**: `export AI_API_KEY="your-actual-api-key"`
4. **Chọn engine**: `export AI_ENGINE="volcengine"` (hoặc engine khác)
5. **Sử dụng bình thường**: Tất cả lệnh không thay đổi

## 🧪 Script kiểm tra

Cung cấp script kiểm tra sẵn sàng sử dụng cho mỗi engine. Các script này sử dụng khóa API placeholder, bạn cần thay thế bằng khóa thực tế.

### 🚀 Cách sử dụng script kiểm tra

#### Người dùng Linux/macOS

```bash
# Cấp quyền thực thi cho script
chmod +x test-*.sh

# Kiểm tra engine đơn lẻ
./test-openrouter.sh
./test-azure.sh
./test-ollama.sh
./test-volcengine.sh
./test-bailian.sh
./test-glm.sh

# Kiểm tra tất cả engine
./test-all-engines.sh
```

#### Người dùng Windows

```powershell
# Kiểm tra engine đơn lẻ
.\test-volcengine.ps1
.\test-openrouter.ps1

# Hoặc chạy trực tiếp
powershell -ExecutionPolicy Bypass -File test-volcengine.ps1
```

#### Cấu hình

Trước khi chạy script kiểm tra, thay thế khóa API placeholder bằng khóa thực tế：

```bash
# Chỉnh sửa bất kỳ script kiểm tra nào và thay thế khóa API placeholder
export AI_API_KEY="your-actual-api-key-from-your-ai-provider"
```

### 📋 Script kiểm tra có sẵn

### 🌐 Script kiểm tra OpenRouter

```bash
#!/bin/bash
# test-openrouter.sh
export AI_API_KEY="your-openrouter-api-key"
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"

echo "Testing OpenRouter with Claude 3.5 Sonnet..."
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### ☁️ Script kiểm tra Azure

```bash
#!/bin/bash
# test-azure.sh
export AI_API_KEY="your-azure-openai-api-key"
export AI_ENGINE="azure"
export AI_BASE_URL="https://your-resource.openai.azure.com"
export AI_MODEL="gpt-4"

echo "Testing Azure OpenAI with GPT-4..."
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🦙 Script kiểm tra Ollama

```bash
#!/bin/bash
# test-ollama.sh
export AI_ENGINE="ollama"
export AI_BASE_URL="http://localhost:11434"
export AI_MODEL="llama3.2:latest"

echo "Testing Ollama with Llama 3.2..."
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🔥 Script kiểm tra Volcengine

```bash
#!/bin/bash
# test-volcengine.sh
export AI_API_KEY="your-volcengine-api-key"
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"

echo "Testing Volcengine with DeepSeek V3..."
gemini "Hãy giới thiệu về bản thân, bạn là mô hình AI nào?"
```

### 🌊 Script kiểm tra Bailian

```bash
#!/bin/bash
# test-bailian.sh
export AI_API_KEY="your-bailian-api-key"
export AI_ENGINE="bailian"
export AI_MODEL="qwen-plus"

echo "Testing Bailian with Qwen Plus..."
gemini "Hãy giới thiệu về bản thân, bạn là mô hình AI nào?"
```

### 🧠 Script kiểm tra GLM

```bash
#!/bin/bash
# test-glm.sh
export AI_API_KEY="your-glm-api-key"
export AI_ENGINE="glm"
export AI_MODEL="glm-4"

echo "Testing GLM with GLM-4..."
gemini "Hãy giới thiệu về bản thân, bạn là mô hình AI nào?"
```

### 🚀 Script kiểm tra tất cả Engine

```bash
#!/bin/bash
# test-all-engines.sh

# Hàm kiểm tra
test_engine() {
    local engine=$1
    local model=$2
    local api_key=$3
    local base_url=$4
    local prompt=$5
    
    echo "=========================================="
    echo "Testing $engine with $model"
    echo "=========================================="
    
    export AI_ENGINE="$engine"
    export AI_MODEL="$model"
    export AI_API_KEY="$api_key"
    
    if [ -n "$base_url" ]; then
        export AI_BASE_URL="$base_url"
    fi
    
    gemini "$prompt"
    echo ""
}

# Kiểm tra tất cả engine
echo "🌐 Testing OpenRouter (Claude 3.5 Sonnet)..."
test_engine "openrouter" "anthropic/claude-3.5-sonnet" "your-openrouter-api-key" "" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

echo "☁️ Testing Azure OpenAI (GPT-4)..."
test_engine "azure" "gpt-4" "your-azure-openai-api-key" "https://your-resource.openai.azure.com" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

echo "🦙 Testing Ollama (Llama 3.2)..."
test_engine "ollama" "llama3.2:latest" "" "http://localhost:11434" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

echo "🔥 Testing Volcengine (DeepSeek V3)..."
test_engine "volcengine" "deepseek-v3-250324" "your-volcengine-api-key" "" "Hãy giới thiệu về bản thân, bạn là mô hình AI nào? Vui lòng trả lời bằng tiếng Việt."

echo "🌊 Testing Bailian (Qwen Plus)..."
test_engine "bailian" "qwen-plus" "your-bailian-api-key" "" "Hãy giới thiệu về bản thân, bạn là mô hình AI nào? Vui lòng trả lời bằng tiếng Việt."

echo "🧠 Testing GLM (GLM-4)..."
test_engine "glm" "glm-4" "your-glm-api-key" "" "Hãy giới thiệu về bản thân, bạn là mô hình AI nào? Vui lòng trả lời bằng tiếng Việt."

echo "✅ All engines tested!"
```

## 🔗 Liên kết liên quan

- [Dự án gốc (Google Gemini CLI)](https://github.com/google-gemini/gemini-cli)
- [OpenRouter](https://openrouter.ai/)
- [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- [Ollama](https://ollama.ai/)
- [火山引擎AI平台](https://www.volcengine.com/products/ai)
- [阿里云百炼](https://bailian.console.aliyun.com/)
- [智谱AI](https://www.zhipuai.cn/)
- [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

## 🐛 Báo cáo vấn đề

Nếu gặp bất kỳ vấn đề nào, vui lòng báo cáo tại [GitHub Issues](https://github.com/chameleon-nexus/gemini-cli/issues).

## 🤝 Hướng dẫn đóng góp

Chào đón đóng góp code! Vui lòng đảm bảo：

1. Tuân theo phong cách code của dự án gốc
2. Bao gồm test phù hợp
3. Cập nhật tài liệu liên quan
4. Tuân thủ điều khoản Giấy phép Apache 2.0

## 📝 Nhật ký cập nhật

### v0.0.3 (Phiên bản hiện tại)
- ✨ **Thêm hỗ trợ阿里云百炼** - Chế độ tương thích OpenAI
- ✨ **Hỗ trợ Azure AI Foundry** - Điểm cuối dịch vụ mới
- ✨ **Hệ thống biến môi trường thống nhất** - `AI_API_KEY`、`AI_MODEL`、`AI_BASE_URL`
- ✨ **Tối ưu hóa Ollama Adapter** - Xử lý streaming thực sự
- ✨ **Hoàn thiện GLM Adapter** - Hỗ trợ智谱AI GLM-4
- 🔧 **Tối ưu hóa ưu tiên cấu hình** - Cấu hình thống nhất > Cấu hình cụ thể cho engine
- 📚 **Script kiểm tra đầy đủ** - Script kiểm tra độc lập cho mỗi engine
- 🐛 **Cải thiện xử lý lỗi** - Thông báo lỗi thân thiện hơn

### v0.0.2
- ✨ **Hỗ trợ Multi-Engine** - OpenRouter、Azure、DashScope、GLM、Ollama
- ✨ **Kiến trúc Factory Pattern** - Thiết kế có thể mở rộng cao
- ✨ **Hỗ trợ phản hồi streaming** - Tất cả engine đều hỗ trợ xử lý streaming
- 📚 **Tài liệu chi tiết** - Hướng dẫn sử dụng Multi-Engine

### v0.0.1
- 🎉 **Phiên bản đầu tiên** - Tích hợp火山引擎AI
- ✨ **Tương thích hoàn toàn** - Hoàn toàn tương thích với Gemini CLI gốc
- 🔧 **Cấu hình biến môi trường** - Tùy chọn cấu hình linh hoạt
- 🇨🇳 **Tối ưu hóa tiếng Trung** - Tối ưu hóa cho cuộc trò chuyện tiếng Trung

## 🌟 Điểm nổi bật của dự án

- 🚀 **Đầu tiên trên thế giới**: Công cụ CLI thống nhất đầu tiên hỗ trợ 6 AI Engine lớn
- 🎯 **Chi phí học tập bằng không**: Một lệnh, tất cả mô hình
- 🔄 **Chuyển đổi thông minh**: Điều khiển biến môi trường, chuyển đổi engine trong giây
- 🌍 **Phủ sóng toàn cầu**: Hỗ trợ mô hình AI chính từ Trung Quốc, Mỹ và châu Âu
- 🏠 **Hỗ trợ cục bộ**: Triển khai Ollama cục bộ, dữ liệu hoàn toàn riêng tư
- 📊 **Cấp doanh nghiệp**: Xử lý lỗi và quản lý cấu hình đầy đủ

---

**Tuyên bố từ chối trách nhiệm**: Dự án này không liên quan đến Google, OpenRouter, Azure, Ollama, Volcengine, 阿里云, 智谱AI hoặc các công ty khác. Vui lòng tuân thủ các điều khoản dịch vụ của từng nền tảng khi sử dụng.