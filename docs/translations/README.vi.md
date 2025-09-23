# Gemini CLI (CatalystAI Edition) - Nền tảng AI đa động cơ

**🚀 Công cụ CLI thống nhất đầu tiên trên thế giới hỗ trợ 6 động cơ AI lớn - Một lệnh, tất cả mô hình**

## 🌟 Tính năng chính

- 🎯 **6 động cơ AI lớn**: OpenRouter, Azure, Ollama, Volcengine, Bailian, GLM
- 🔄 **Biến môi trường thống nhất**: Một cấu hình cho tất cả động cơ
- 🌍 **Phạm vi mô hình toàn cầu**: Hỗ trợ GPT, Claude, Qwen, GLM, DeepSeek và các mô hình chính khác
- 🏠 **Hỗ trợ AI cục bộ**: Triển khai Ollama cục bộ với quyền riêng tư dữ liệu hoàn toàn

## 📦 Cài đặt

```bash
npm install -g @catalystai/gemini-cli
```

## 🎛️ Động cơ AI & Mô hình được hỗ trợ

### 🌐 OpenRouter (Bộ định tuyến đa mô hình)
- `anthropic/claude-3.5-sonnet` (mặc định)
- `openai/gpt-4`
- `meta-llama/llama-3.1-8b-instruct`

### ☁️ Azure OpenAI
- `gpt-4` (mặc định)
- `gpt-3.5-turbo`
- `gpt-4-turbo`

### 🦙 Ollama (AI cục bộ)
- `llama3.2:latest` (mặc định)
- `mistral:latest`
- `codellama:latest`

### 🔥 Volcengine (Động cơ mặc định)
- `deepseek-v3-250324` (mặc định)
- `qwen-plus`
- `qwen-max`

### 🌊 Bailian (Alibaba Cloud Bailian)
- `qwen-plus` (mặc định)
- `qwen-max`
- `qwen-vl-plus`

### 🧠 GLM (Zhipu AI)
- `glm-4` (mặc định)
- `glm-4v`
- `cogview-3`

## 🚀 Sử dụng

```bash
# Cấu hình khóa API thống nhất
export AI_API_KEY="your-actual-api-key-from-your-ai-provider"
export AI_MODEL="your-preferred-model-name"
export AI_ENGINE="volcengine"  # Tùy chọn: openrouter, azure, ollama, volcengine, bailian, glm

# Bắt đầu sử dụng
gemini "Xin chào, hãy giới thiệu bản thân"
```

## 🔧 Chuyển đổi động cơ nhanh

```bash
# Chuyển sang OpenRouter với Claude
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"
gemini "Hello Claude!"

# Chuyển sang Azure với GPT-4
export AI_ENGINE="azure"
export AI_MODEL="gpt-4"
gemini "Hello GPT-4!"

# Chuyển sang Ollama cục bộ
export AI_ENGINE="ollama"
export AI_MODEL="llama3.2:latest"
gemini "Hello Llama!"
```

## 🧪 Script kiểm tra

```bash
# Linux/macOS
chmod +x test-*.sh
./test-volcengine.sh

# Windows
.\test-volcengine.ps1
```

## 🔗 Liên kết liên quan

- [GitHub Repository](https://github.com/chameleon-nexus/gemini-cli)
- [Dự án gốc](https://github.com/google-gemini/gemini-cli)
- [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

## 📋 Tuân thủ giấy phép

Dự án này dựa trên [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) và tuân theo các yêu cầu giấy phép Apache 2.0.

---

**Tuyên bố từ chối trách nhiệm**: Dự án này không liên quan đến Google, OpenRouter, Azure, Ollama, Volcengine, Alibaba Cloud, Zhipu AI hoặc các công ty khác.
