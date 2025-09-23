# Gemini CLI (Chameleon Nexus Tech Edition) - Multi-Engine AI Platform

[![npm version](https://badge.fury.io/js/%40chameleon-nexus-tech%2Fgemini-cli.svg)](https://badge.fury.io/js/%40chameleon-nexus-tech%2Fgemini-cli)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**🚀 World's First Unified CLI Tool Supporting 6 Major AI Engines - One Command, All Models**

> ⚠️ **Important Notice**: This is a modified version of [Google Gemini CLI](https://github.com/google-gemini/gemini-cli). Original project copyright belongs to Google LLC under Apache 2.0 License.

## 🌟 Core Features

- 🎯 **6 Major AI Engines**: OpenRouter, Azure, Ollama, Volcengine, Bailian, GLM
- 🔄 **Unified Environment Variables**: One configuration for all engines
- 🌍 **Global Model Coverage**: Supports GPT, Claude, Qwen, GLM, DeepSeek and other mainstream models
- 🏠 **Local AI Support**: Ollama local deployment with complete data privacy
- 🔧 **Zero-Config Switching**: Switch engines with a single environment variable
- 📊 **Complete Functionality**: Streaming/non-streaming, token counting, embedding vectors all supported

## 📦 Installation

```bash
npm install -g @chameleon-nexus-tech/gemini-cli
```

## 🎛️ Supported AI Engines & Models

### 🌐 OpenRouter (Multi-Model Router)
**Supported Models**: GPT-4, Claude, Llama, Mistral, etc.
- `anthropic/claude-3.5-sonnet` (default)
- `openai/gpt-4`
- `meta-llama/llama-3.1-8b-instruct`
- `mistralai/mistral-7b-instruct`

### ☁️ Azure OpenAI / Azure AI Foundry
**Supported Models**: GPT-4, GPT-3.5, DALL-E, etc.
- `gpt-4` (default)
- `gpt-3.5-turbo`
- `gpt-4-turbo`
- `dall-e-3`

### 🦙 Ollama (Local AI)
**Supported Models**: Llama, Mistral, CodeLlama, etc.
- `llama3.2:latest` (default)
- `mistral:latest`
- `codellama:latest`
- `qwen:latest`

### 🔥 Volcengine (Default Engine)
**Supported Models**: DeepSeek V3, Qwen Series, ChatGLM, Baichuan, etc.
- `deepseek-v3-250324` (default)
- `qwen-plus`
- `qwen-max`
- `chatglm-6b`

### 🌊 Bailian (Alibaba Cloud Bailian)
**Supported Models**: Qwen Commercial Edition, Multimodal Models
- `qwen-plus` (default)
- `qwen-max`
- `qwen-vl-plus`

### 🧠 GLM (Zhipu AI)
**Supported Models**: GLM-4, CogView, etc.
- `glm-4` (default)
- `glm-4v`
- `cogview-3`

## ⚙️ Unified Configuration System

### 🔧 Recommended Configuration (Unified Environment Variables)

```bash
# Unified API Key (works for all engines)
export AI_API_KEY="your-api-key-here"

# Unified Model Name (works for all engines)
export AI_MODEL="your-model-name"

# Unified Base URL (optional, only needed for custom URLs)
export AI_BASE_URL="your-custom-url"

# Engine Selection (one variable controls all)
export AI_ENGINE="volcengine"  # Options: openrouter, azure, ollama, volcengine, bailian, glm
```

### 🪟 Windows PowerShell Configuration

```powershell
# Unified configuration
$env:AI_API_KEY="your-api-key-here"
$env:AI_MODEL="your-model-name"
$env:AI_ENGINE="volcengine"
```

### 🔧 Engine-Specific Configuration (Optional)

If using engine-specific configuration, the system will automatically fallback to unified configuration:

```bash
# OpenRouter specific configuration  
export OPENROUTER_API_KEY="openrouter-key"
export OPENROUTER_MODEL="anthropic/claude-3.5-sonnet"

# Azure specific configuration
export AZURE_API_KEY="azure-key"
export AZURE_BASE_URL="https://your-resource.openai.azure.com"
export AZURE_MODEL="gpt-4"

# Volcengine specific configuration
export VOLCENGINE_API_KEY="volcengine-key"
export VOLCENGINE_MODEL="deepseek-v3-250324"
```

## 🚀 Usage

### 💬 Direct Question Mode

```bash
gemini "Hello, please introduce yourself"
```

### 🔄 Interactive Mode

```bash
gemini
```

Then select "2. Use Gemini API Key" and press Enter to start chatting.

## 🧪 Engine Testing Examples

### 🌐 Testing OpenRouter

```bash
# Using unified configuration
export AI_API_KEY="sk-or-v1-1234567890abcdef1234567890abcdef"
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"

# Test command
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### ☁️ Testing Azure OpenAI

```bash
# Using unified configuration
export AI_API_KEY="sk-1234567890abcdef1234567890abcdef"
export AI_ENGINE="azure"
export AI_BASE_URL="https://your-resource.openai.azure.com"
export AI_MODEL="gpt-4"

# Test command
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🦙 Testing Ollama (Local AI)

```bash
# Using unified configuration
export AI_ENGINE="ollama"
export AI_BASE_URL="http://localhost:11434"
export AI_MODEL="llama3.2:latest"

# Test command
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🔥 Testing Volcengine (Default Engine)

```bash
# Using unified configuration
export AI_API_KEY="sk-1234567890abcdef1234567890abcdef"
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"

# Test command
gemini "Please introduce yourself and tell me which AI model you are."
```

### 🌊 Testing Bailian

```bash
# Using unified configuration
export AI_API_KEY="sk-1234567890abcdef1234567890abcdef"
export AI_ENGINE="bailian"
export AI_MODEL="qwen-plus"

# Test command
gemini "Please introduce yourself and tell me which AI model you are."
```

### 🧠 Testing GLM

```bash
# Using unified configuration
export AI_API_KEY="sk-1234567890abcdef1234567890abcdef"
export AI_ENGINE="glm"
export AI_MODEL="glm-4"

# Test command
gemini "Please introduce yourself and tell me which AI model you are."
```

## 🔧 Quick Engine Switching

```bash
# Switch to OpenRouter using Claude
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"
gemini "Hello Claude!"

# Switch to Azure using GPT-4
export AI_ENGINE="azure"
export AI_MODEL="gpt-4"
gemini "Hello GPT-4!"

# Switch to local Ollama
export AI_ENGINE="ollama"
export AI_MODEL="llama3.2:latest"
gemini "Hello Llama!"

# Switch to Volcengine using DeepSeek
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"
gemini "Hello DeepSeek!"
```

## 🏗️ Technical Architecture

### 🎯 Multi-Engine Factory Pattern Architecture

This project uses **Factory Pattern** design to achieve highly scalable multi-AI engine support:

```
ContentGeneratorFactory
├── OpenrouterContentGenerator    (OpenRouter)
├── AzureContentGenerator         (Azure OpenAI)
├── OllamaContentGenerator        (Local Ollama)
├── VolcengineContentGenerator    (Volcengine)
├── BailianContentGenerator       (Alibaba Cloud Bailian)
└── GlmContentGenerator           (Zhipu AI GLM)
```

### 🔧 Core Features

✅ **6 Major AI Engines**: Unified management of all AI engines through factory pattern  
✅ **Unified Environment Variables**: `AI_API_KEY`, `AI_MODEL`, `AI_BASE_URL` universal configuration  
✅ **Automatic Format Conversion**: Seamless conversion between Gemini format and engine API formats  
✅ **Streaming Response Support**: All engines support both streaming and non-streaming responses  
✅ **Intelligent Error Handling**: 30-second timeout protection with detailed error messages  
✅ **Configuration Priority**: Unified config > Engine-specific config > Default config  
✅ **Zero-Config Switching**: Switch engines with a single environment variable  

### 📁 Core File Structure

```
packages/core/src/core/
├── contentGenerator.ts              # ContentGenerator interface definition
├── contentGeneratorFactory.ts       # Multi-engine factory class
├── engineConstants.ts               # Engine configuration constants
├── engineConfig.ts                  # Configuration manager
├── openrouterContentGenerator.ts    # OpenRouter adapter
├── azureContentGenerator.ts         # Azure OpenAI adapter
├── ollamaContentGenerator.ts        # Ollama adapter
├── volcengineContentGenerator.ts    # Volcengine adapter
├── bailianContentGenerator.ts       # Bailian adapter
└── glmContentGenerator.ts           # GLM adapter
```

### 🔄 API Format Conversion

**Request Conversion Flow**:
```
Gemini Request → Engine Adapter → Engine API Format
```

**Response Conversion Flow**:
```
Engine API Response → Engine Adapter → Gemini Response Format
```

**Supported Conversion Features**:
- Role mapping: `user` ↔ `user`, `model` ↔ `assistant`
- Content extraction: Gemini parts array ↔ Engine message format
- Generation parameters: temperature, topP, maxTokens, etc.
- Streaming processing: Real-time response stream conversion
- Token calculation: Automatic token counting and estimation

## 📋 License Compliance

This project is based on [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) and follows Apache 2.0 License requirements:

### Original Project Information

- **Original Project**: Google Gemini CLI
- **Original Copyright**: Copyright 2025 Google LLC  
- **Original License**: Apache License 2.0
- **Original Repository**: https://github.com/google-gemini/gemini-cli

### Modification Statement

In accordance with Apache 2.0 License Section 4:

- ✅ Retained original Apache 2.0 license
- ✅ Retained original copyright notices
- ✅ Clearly marked modifications
- ✅ Included complete license text

## 🔄 Migration from Original Gemini CLI

If you're migrating from the original Google Gemini CLI:

1. **Uninstall original version**: `npm uninstall -g @google/gemini-cli`
2. **Install this version**: `npm install -g @chameleon-nexus-tech/gemini-cli`
3. **Set API key**: `export AI_API_KEY="your-key"`
4. **Select engine**: `export AI_ENGINE="volcengine"` (or other engines)
5. **Use as before**: All commands remain the same

## 🧪 Test Scripts

Ready-to-use test scripts are provided for each engine:

### 🌐 OpenRouter Test Script

```bash
#!/bin/bash
# test-openrouter.sh
export AI_API_KEY="sk-or-v1-1234567890abcdef1234567890abcdef"
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"

echo "Testing OpenRouter with Claude 3.5 Sonnet..."
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### ☁️ Azure Test Script

```bash
#!/bin/bash
# test-azure.sh
export AI_API_KEY="sk-1234567890abcdef1234567890abcdef"
export AI_ENGINE="azure"
export AI_BASE_URL="https://your-resource.openai.azure.com"
export AI_MODEL="gpt-4"

echo "Testing Azure OpenAI with GPT-4..."
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🦙 Ollama Test Script

```bash
#!/bin/bash
# test-ollama.sh
export AI_ENGINE="ollama"
export AI_BASE_URL="http://localhost:11434"
export AI_MODEL="llama3.2:latest"

echo "Testing Ollama with Llama 3.2..."
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🔥 Volcengine Test Script

```bash
#!/bin/bash
# test-volcengine.sh
export AI_API_KEY="sk-1234567890abcdef1234567890abcdef"
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"

echo "Testing Volcengine with DeepSeek V3..."
gemini "Please introduce yourself and tell me which AI model you are."
```

### 🌊 Bailian Test Script

```bash
#!/bin/bash
# test-bailian.sh
export AI_API_KEY="sk-1234567890abcdef1234567890abcdef"
export AI_ENGINE="bailian"
export AI_MODEL="qwen-plus"

echo "Testing Bailian with Qwen Plus..."
gemini "Please introduce yourself and tell me which AI model you are."
```

### 🧠 GLM Test Script

```bash
#!/bin/bash
# test-glm.sh
export AI_API_KEY="sk-1234567890abcdef1234567890abcdef"
export AI_ENGINE="glm"
export AI_MODEL="glm-4"

echo "Testing GLM with GLM-4..."
gemini "Please introduce yourself and tell me which AI model you are."
```

### 🚀 All Engines Test Script

```bash
#!/bin/bash
# test-all-engines.sh
# Comprehensive test for all supported engines
./test-openrouter.sh
./test-azure.sh
./test-ollama.sh
./test-volcengine.sh
./test-bailian.sh
./test-glm.sh
```

## 🔗 Related Links

- [Original Project (Google Gemini CLI)](https://github.com/google-gemini/gemini-cli)
- [OpenRouter](https://openrouter.ai/)
- [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- [Ollama](https://ollama.ai/)
- [Volcengine AI Platform](https://www.volcengine.com/products/ai)
- [Alibaba Cloud Bailian](https://bailian.console.aliyun.com/)
- [Zhipu AI](https://www.zhipuai.cn/)
- [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

## 🐛 Issue Reporting

If you encounter any issues, please report them on [GitHub Issues](https://github.com/chameleon-nexus/gemini-cli/issues).

## 🤝 Contributing

Contributions are welcome! Please ensure:

1. Follow the original project's code style
2. Include appropriate tests
3. Update relevant documentation
4. Respect the Apache 2.0 license terms

## 📝 Changelog

### v0.0.3 (Current Version)
- ✨ **Added Bailian Support** - OpenAI compatible mode
- ✨ **Azure AI Foundry Support** - New service endpoint
- ✨ **Unified Environment Variable System** - `AI_API_KEY`, `AI_MODEL`, `AI_BASE_URL`
- ✨ **Ollama Adapter Optimization** - True streaming implementation
- ✨ **GLM Adapter Enhancement** - Zhipu AI GLM-4 support
- 🔧 **Configuration Priority Optimization** - Unified config > Engine-specific config
- 📚 **Complete Test Scripts** - Individual test scripts for each engine
- 🐛 **Error Handling Improvements** - More user-friendly error messages

### v0.0.2
- ✨ **Multi-Engine Support** - OpenRouter, Azure, DashScope, GLM, Ollama
- ✨ **Factory Pattern Architecture** - Highly scalable design
- ✨ **Streaming Response Support** - All engines support streaming
- 📚 **Detailed Documentation** - Multi-engine usage guide

### v0.0.1
- 🎉 **Initial Release** - Volcengine AI integration
- ✨ **Complete Compatibility** - Fully compatible with original Gemini CLI
- 🔧 **Environment Variable Configuration** - Flexible configuration options
- 🇨🇳 **Chinese Optimization** - Optimized for Chinese conversations

## 🌟 Project Highlights

- 🚀 **World's First**: First unified CLI tool supporting 6 major AI engines
- 🎯 **Zero Learning Cost**: One command, all models
- 🔄 **Smart Switching**: Environment variable controlled, second-level engine switching
- 🌍 **Global Coverage**: Supports mainstream AI models from US, China, and Europe
- 🏠 **Local Support**: Ollama local deployment with complete data privacy
- 📊 **Enterprise Grade**: Complete error handling and configuration management

---

**Disclaimer**: This project is not affiliated with Google, OpenRouter, Azure, Ollama, Volcengine, Alibaba Cloud, Zhipu AI, or any other companies. Please comply with the terms of service of the respective platforms when using this software.