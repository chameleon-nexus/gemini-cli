# Gemini CLI (CatalystAI Edition) - 多引擎AI平台

[![npm version](https://badge.fury.io/js/%40catalystai%2Fgemini-cli.svg)](https://badge.fury.io/js/%40catalystai%2Fgemini-cli)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**🚀 全球首个支持6大AI引擎的统一CLI工具 - 一个命令，所有模型**

> ⚠️ **重要声明**: 这是 [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) 的修改版本。原始项目版权归 Google LLC 所有，遵循 Apache 2.0 许可证。

## 🌐 语言切换

| 🇺🇸 [English](../README.md) | 🇻🇳 [Tiếng Việt](README.vi.md) | 🇯🇵 [日本語](README.ja.md) | 🇩🇪 [Deutsch](README.de.md) | 🇸🇦 [العربية](README.ar.md) | 🇨🇳 **中文** |

## 🌟 核心特性

- 🎯 **6大AI引擎支持**: OpenRouter、Azure、Ollama、Volcengine、Bailian、GLM
- 🔄 **统一环境变量**: 一套配置，所有引擎通用
- 🌍 **全球模型覆盖**: 支持GPT、Claude、Qwen、GLM、DeepSeek等主流模型
- 🏠 **本地AI支持**: Ollama本地部署，数据完全私有
- 🔧 **零配置切换**: 一个环境变量即可切换引擎
- 📊 **完整功能**: 流式/非流式、Token计算、嵌入向量全支持

## 📦 安装

```bash
npm install -g @catalystai/gemini-cli
```

## 🎛️ 支持的AI引擎与模型

### 🌐 OpenRouter (多模型路由)
**支持的模型**: GPT-4、Claude、Llama、Mistral等
- `anthropic/claude-3.5-sonnet` (默认)
- `openai/gpt-4`
- `meta-llama/llama-3.1-8b-instruct`
- `mistralai/mistral-7b-instruct`

### ☁️ Azure OpenAI / Azure AI Foundry
**支持的模型**: GPT-4、GPT-3.5、DALL-E等
- `gpt-4` (默认)
- `gpt-3.5-turbo`
- `gpt-4-turbo`
- `dall-e-3`

### 🦙 Ollama (本地AI)
**支持的模型**: Llama、Mistral、CodeLlama等
- `llama3.2:latest` (默认)
- `mistral:latest`
- `codellama:latest`
- `qwen:latest`

### 🔥 Volcengine (默认引擎)
**支持的模型**: DeepSeek V3、Qwen系列、ChatGLM、Baichuan等
- `deepseek-v3-250324` (默认)
- `qwen-plus`
- `qwen-max`
- `chatglm-6b`

### 🌊 Bailian (阿里云百炼)
**支持的模型**: 通义千问商业版、多模态模型
- `qwen-plus` (默认)
- `qwen-max`
- `qwen-vl-plus`

### 🧠 GLM (智谱AI)
**支持的模型**: GLM-4、CogView等
- `glm-4` (默认)
- `glm-4v`
- `cogview-3`

## ⚙️ 统一配置系统

### 🔧 推荐配置方式 (统一环境变量)

```bash
# 统一API密钥 (所有引擎通用)
export AI_API_KEY="your-actual-api-key-from-your-ai-provider"

# 统一模型名称 (所有引擎通用)
export AI_MODEL="your-preferred-model-name"

# 统一Base URL (可选，仅需自定义时设置)
export AI_BASE_URL="your-custom-endpoint-url"

# 引擎选择 (一个变量控制所有)
export AI_ENGINE="volcengine"  # 选项: openrouter, azure, ollama, volcengine, bailian, glm
```

### 🪟 Windows PowerShell 配置

```powershell
# 统一配置
$env:AI_API_KEY="your-actual-api-key-from-your-ai-provider"
$env:AI_MODEL="your-preferred-model-name"
$env:AI_ENGINE="volcengine"
```

### 🔧 引擎特定配置 (可选)

如果使用引擎特定配置，系统会自动fallback到统一配置：

```bash
# OpenRouter 特定配置  
export OPENROUTER_API_KEY="your-openrouter-api-key"
export OPENROUTER_MODEL="anthropic/claude-3.5-sonnet"

# Azure 特定配置
export AZURE_API_KEY="your-azure-openai-api-key"
export AZURE_BASE_URL="https://your-resource.openai.azure.com"
export AZURE_MODEL="gpt-4"

# Volcengine 特定配置
export VOLCENGINE_API_KEY="your-volcengine-api-key"
export VOLCENGINE_MODEL="deepseek-v3-250324"
```

## 🚀 使用方法

### 💬 直接提问模式

```bash
gemini "你好，请介绍一下你自己"
```

### 🔄 交互式模式

```bash
gemini
```

然后选择 "2. Use Gemini API Key" 并按回车开始聊天。

## 🧪 各引擎测试示例

### 🌐 测试 OpenRouter

```bash
# 使用统一配置
export AI_API_KEY="your-openrouter-api-key"
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"

# 测试命令
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### ☁️ 测试 Azure OpenAI

```bash
# 使用统一配置
export AI_API_KEY="your-azure-openai-api-key"
export AI_ENGINE="azure"
export AI_BASE_URL="https://your-resource.openai.azure.com"
export AI_MODEL="gpt-4"

# 测试命令
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🦙 测试 Ollama (本地AI)

```bash
# 使用统一配置
export AI_ENGINE="ollama"
export AI_BASE_URL="http://localhost:11434"
export AI_MODEL="llama3.2:latest"

# 测试命令
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🔥 测试 Volcengine (默认引擎)

```bash
# 使用统一配置
export AI_API_KEY="your-volcengine-api-key"
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"

# 测试命令
gemini "请介绍一下你自己，你是哪个AI模型？"
```

### 🌊 测试 Bailian

```bash
# 使用统一配置
export AI_API_KEY="your-bailian-api-key"
export AI_ENGINE="bailian"
export AI_MODEL="qwen-plus"

# 测试命令
gemini "请介绍一下你自己，你是哪个AI模型？"
```

### 🧠 测试 GLM

```bash
# 使用统一配置
export AI_API_KEY="your-glm-api-key"
export AI_ENGINE="glm"
export AI_MODEL="glm-4"

# 测试命令
gemini "请介绍一下你自己，你是哪个AI模型？"
```

## 🔧 快速引擎切换

```bash
# 切换到OpenRouter使用Claude
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"
gemini "Hello Claude!"

# 切换到Azure使用GPT-4
export AI_ENGINE="azure"
export AI_MODEL="gpt-4"
gemini "Hello GPT-4!"

# 切换到本地Ollama
export AI_ENGINE="ollama"
export AI_MODEL="llama3.2:latest"
gemini "Hello Llama!"

# 切换到Volcengine使用DeepSeek
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"
gemini "Hello DeepSeek!"
```

## 🏗️ 技术架构

### 🎯 多引擎工厂模式架构

本项目采用**工厂模式**设计，实现了高度可扩展的多AI引擎支持：

```
ContentGeneratorFactory
├── OpenrouterContentGenerator    (OpenRouter)
├── AzureContentGenerator         (Azure OpenAI)
├── OllamaContentGenerator        (Local Ollama)
├── VolcengineContentGenerator    (Volcengine)
├── BailianContentGenerator       (Alibaba Cloud Bailian)
└── GlmContentGenerator           (Zhipu AI GLM)
```

### 🔧 核心特性

✅ **6大AI引擎**: 通过工厂模式统一管理所有AI引擎  
✅ **统一环境变量**: `AI_API_KEY`、`AI_MODEL`、`AI_BASE_URL` 通用配置  
✅ **自动格式转换**: 无缝转换Gemini格式与各引擎API格式  
✅ **流式响应支持**: 所有引擎都支持流式和非流式响应  
✅ **智能错误处理**: 30秒超时保护，详细的错误提示  
✅ **配置优先级**: 统一配置 > 引擎特定配置 > 默认配置  
✅ **零配置切换**: 一个环境变量即可切换引擎  

## 📋 许可证声明

本项目基于 [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) 开发，遵循Apache 2.0许可证要求：

### 原始项目信息

- **原始项目**: Google Gemini CLI
- **原始版权**: Copyright 2025 Google LLC  
- **原始许可证**: Apache License 2.0
- **原始仓库**: https://github.com/google-gemini/gemini-cli

### 修改声明

根据Apache 2.0许可证第4节要求：

- ✅ 保留原始Apache 2.0许可证
- ✅ 保留原始版权声明
- ✅ 明确标记所有修改
- ✅ 包含完整许可证文本

## 🔄 从原始Gemini CLI迁移

如果你正在从原始Google Gemini CLI迁移：

1. **卸载原始版本**: `npm uninstall -g @google/gemini-cli`
2. **安装本版本**: `npm install -g @catalystai/gemini-cli`
3. **设置API密钥**: `export AI_API_KEY="your-actual-api-key"`
4. **选择引擎**: `export AI_ENGINE="volcengine"` (或其他引擎)
5. **正常使用**: 所有命令保持不变

## 🧪 测试脚本

为每个引擎提供了即用型测试脚本。这些脚本使用占位符API密钥，你需要替换为实际密钥。

### 🚀 如何使用测试脚本

#### Linux/macOS 用户

```bash
# 给脚本添加执行权限
chmod +x test-*.sh

# 测试单个引擎
./test-openrouter.sh
./test-azure.sh
./test-ollama.sh
./test-volcengine.sh
./test-bailian.sh
./test-glm.sh

# 测试所有引擎
./test-all-engines.sh
```

#### Windows 用户

```powershell
# 测试单个引擎
.\test-volcengine.ps1
.\test-openrouter.ps1

# 或者直接运行
powershell -ExecutionPolicy Bypass -File test-volcengine.ps1
```

#### 配置

在运行测试脚本之前，将占位符API密钥替换为你的实际密钥：

```bash
# 编辑任何测试脚本并替换占位符API密钥
export AI_API_KEY="your-actual-api-key-from-your-ai-provider"
```

### 📋 可用测试脚本

### 🌐 OpenRouter 测试脚本

```bash
#!/bin/bash
# test-openrouter.sh
export AI_API_KEY="your-openrouter-api-key"
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"

echo "Testing OpenRouter with Claude 3.5 Sonnet..."
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### ☁️ Azure 测试脚本

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

### 🦙 Ollama 测试脚本

```bash
#!/bin/bash
# test-ollama.sh
export AI_ENGINE="ollama"
export AI_BASE_URL="http://localhost:11434"
export AI_MODEL="llama3.2:latest"

echo "Testing Ollama with Llama 3.2..."
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🔥 Volcengine 测试脚本

```bash
#!/bin/bash
# test-volcengine.sh
export AI_API_KEY="your-volcengine-api-key"
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"

echo "Testing Volcengine with DeepSeek V3..."
gemini "请介绍一下你自己，你是哪个AI模型？"
```

### 🌊 Bailian 测试脚本

```bash
#!/bin/bash
# test-bailian.sh
export AI_API_KEY="your-bailian-api-key"
export AI_ENGINE="bailian"
export AI_MODEL="qwen-plus"

echo "Testing Bailian with Qwen Plus..."
gemini "请介绍一下你自己，你是哪个AI模型？"
```

### 🧠 GLM 测试脚本

```bash
#!/bin/bash
# test-glm.sh
export AI_API_KEY="your-glm-api-key"
export AI_ENGINE="glm"
export AI_MODEL="glm-4"

echo "Testing GLM with GLM-4..."
gemini "请介绍一下你自己，你是哪个AI模型？"
```

### 🚀 所有引擎测试脚本

```bash
#!/bin/bash
# test-all-engines.sh

# 测试函数
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
test_engine "bailian" "qwen-plus" "your-bailian-api-key" "" "请介绍一下你自己，你是哪个AI模型？请用中文回答。"

echo "🧠 Testing GLM (GLM-4)..."
test_engine "glm" "glm-4" "your-glm-api-key" "" "请介绍一下你自己，你是哪个AI模型？请用中文回答。"

echo "✅ All engines tested!"
```

## 🔗 相关链接

- [原始项目 (Google Gemini CLI)](https://github.com/google-gemini/gemini-cli)
- [OpenRouter](https://openrouter.ai/)
- [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- [Ollama](https://ollama.ai/)
- [火山引擎AI平台](https://www.volcengine.com/products/ai)
- [阿里云百炼](https://bailian.console.aliyun.com/)
- [智谱AI](https://www.zhipuai.cn/)
- [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

## 🐛 问题反馈

如果遇到任何问题，请在 [GitHub Issues](https://github.com/chameleon-nexus/gemini-cli/issues) 提交。

## 🤝 贡献指南

欢迎贡献代码！请确保：

1. 遵循原始项目的代码风格
2. 包含适当的测试
3. 更新相关文档
4. 遵守Apache 2.0许可证条款

## 📝 更新日志

### v0.0.3 (当前版本)
- ✨ **新增阿里云百炼支持** - OpenAI兼容模式
- ✨ **Azure AI Foundry支持** - 新服务端点
- ✨ **统一环境变量系统** - `AI_API_KEY`、`AI_MODEL`、`AI_BASE_URL`
- ✨ **Ollama适配器优化** - 真正的流式处理
- ✨ **GLM适配器完善** - 智谱AI GLM-4支持
- 🔧 **配置优先级优化** - 统一配置 > 引擎特定配置
- 📚 **完整测试脚本** - 每个引擎都有独立的测试脚本
- 🐛 **错误处理改进** - 更友好的错误提示

### v0.0.2
- ✨ **多引擎支持** - OpenRouter、Azure、DashScope、GLM、Ollama
- ✨ **工厂模式架构** - 高度可扩展的设计
- ✨ **流式响应支持** - 所有引擎都支持流式处理
- 📚 **详细文档** - 多引擎使用指南

### v0.0.1
- 🎉 **初始版本** - 火山引擎AI集成
- ✨ **完整兼容性** - 与原始Gemini CLI完全兼容
- 🔧 **环境变量配置** - 灵活的配置选项
- 🇨🇳 **中文优化** - 针对中文对话优化

## 🌟 项目亮点

- 🚀 **全球首创**: 第一个支持6大AI引擎的统一CLI工具
- 🎯 **零学习成本**: 一个命令，所有模型
- 🔄 **智能切换**: 环境变量控制，秒级切换引擎
- 🌍 **全球覆盖**: 支持中美欧主流AI模型
- 🏠 **本地支持**: Ollama本地部署，数据完全私有
- 📊 **企业级**: 完整的错误处理和配置管理

---

**免责声明**: 本项目与Google、OpenRouter、Azure、Ollama、Volcengine、阿里云、智谱AI等公司无关联关系。使用时请遵守各平台的服务条款。