# Gemini CLI (CatalystAI Edition) - 多引擎AI平台

**🚀 全球首个支持6大AI引擎的统一CLI工具 - 一个命令，所有模型**

## 🌟 核心特性

- 🎯 **6大AI引擎支持**: OpenRouter、Azure、Ollama、Volcengine、Bailian、GLM
- 🔄 **统一环境变量**: 一套配置，所有引擎通用
- 🌍 **全球模型覆盖**: 支持GPT、Claude、Qwen、GLM、DeepSeek等主流模型
- 🏠 **本地AI支持**: Ollama本地部署，数据完全私有

## 📦 安装

```bash
npm install -g @catalystai/gemini-cli
```

## 🎛️ 支持的AI引擎与模型

### 🌐 OpenRouter (多模型路由)
- `anthropic/claude-3.5-sonnet` (默认)
- `openai/gpt-4`
- `meta-llama/llama-3.1-8b-instruct`

### ☁️ Azure OpenAI
- `gpt-4` (默认)
- `gpt-3.5-turbo`
- `gpt-4-turbo`

### 🦙 Ollama (本地AI)
- `llama3.2:latest` (默认)
- `mistral:latest`
- `codellama:latest`

### 🔥 Volcengine (默认引擎)
- `deepseek-v3-250324` (默认)
- `qwen-plus`
- `qwen-max`

### 🌊 Bailian (阿里云百炼)
- `qwen-plus` (默认)
- `qwen-max`
- `qwen-vl-plus`

### 🧠 GLM (智谱AI)
- `glm-4` (默认)
- `glm-4v`
- `cogview-3`

## 🚀 使用方法

```bash
# 统一API密钥配置
export AI_API_KEY="your-actual-api-key-from-your-ai-provider"
export AI_MODEL="your-preferred-model-name"
export AI_ENGINE="volcengine"  # 选项: openrouter, azure, ollama, volcengine, bailian, glm

# 开始使用
gemini "你好，请介绍一下你自己"
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
```

## 🧪 测试脚本

```bash
# Linux/macOS
chmod +x test-*.sh
./test-volcengine.sh

# Windows
.\test-volcengine.ps1
```

## 🔗 相关链接

- [GitHub Repository](https://github.com/chameleon-nexus/gemini-cli)
- [原始项目](https://github.com/google-gemini/gemini-cli)
- [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

## 📋 许可证声明

本项目基于 [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) 开发，遵循Apache 2.0许可证要求。

---

**免责声明**: 本项目与Google、OpenRouter、Azure、Ollama、Volcengine、阿里云、智谱AI等公司无关联关系。
