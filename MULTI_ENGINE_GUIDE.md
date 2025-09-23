# 多引擎AI适配器使用指南

## 🚀 概述

Gemini CLI 现在支持多个AI引擎，通过统一的接口访问不同的AI服务提供商。当前支持的引擎包括：

- **Volcengine** - 火山引擎AI（默认）
- **OpenRouter** - 多模型路由服务
- **Azure OpenAI** - 微软Azure OpenAI服务
- **DashScope** - 阿里云通义千问
- **Bailian** - 阿里云百炼（通义千问OpenAI兼容模式）
- **GLM** - 智谱AI GLM系列模型
- **Ollama** - 本地AI模型

## 🔧 环境配置

### 1. 选择AI引擎

通过设置 `AI_ENGINE` 环境变量来选择要使用的引擎：

```bash
# Windows PowerShell
$env:AI_ENGINE="volcengine"    # 火山引擎（默认）
$env:AI_ENGINE="openrouter"    # OpenRouter
$env:AI_ENGINE="azure"         # Azure OpenAI
$env:AI_ENGINE="dashscope"     # 阿里云DashScope
$env:AI_ENGINE="bailian"       # 阿里云百炼
$env:AI_ENGINE="glm"           # 智谱AI GLM
$env:AI_ENGINE="ollama"        # Ollama本地模型

# Linux/macOS
export AI_ENGINE="volcengine"
```

### 2. 统一环境变量配置（推荐）

**🎯 统一配置方式** - 所有引擎使用相同的环境变量：

```bash
# 统一API密钥（所有引擎通用）
$env:AI_API_KEY="your_api_key_here"

# 统一模型名称（所有引擎通用）
$env:AI_MODEL="your_model_name"

# 统一Base URL（可选，仅当需要自定义URL时设置）
$env:AI_BASE_URL="your_custom_url"

# 引擎选择
$env:AI_ENGINE="volcengine|openrouter|azure|dashscope|bailian|glm|ollama"
```

### 3. 引擎特定配置（向后兼容）

#### Volcengine（火山引擎）
```bash
$env:VOLCENGINE_API_KEY="your_api_key_here"
# 或者使用兼容的环境变量（向后兼容）
$env:GEMINI_API_KEY="your_api_key_here"
# 或者使用统一变量
$env:AI_API_KEY="your_api_key_here"

$env:VOLCENGINE_BASE_URL="https://ark.cn-beijing.volces.com/api/v3"  # 可选
$env:VOLCENGINE_MODEL="deepseek-v3-250324"  # 可选
```

#### OpenRouter
```bash
$env:OPENROUTER_API_KEY="your_api_key_here"
$env:OPENROUTER_MODEL="anthropic/claude-3.5-sonnet"  # 可选
```

#### Azure OpenAI / Azure AI Foundry
```bash
# Azure OpenAI 传统服务
$env:AZURE_BASE_URL="https://your-resource.openai.azure.com"
$env:AZURE_API_KEY="your_api_key_here"  # 从Azure OpenAI Studio获取
$env:AZURE_MODEL="gpt-4"  # 部署名称
$env:AZURE_API_VERSION="2024-10-21"  # 可选，默认使用最新版本

# Azure AI Foundry 新服务
$env:AZURE_BASE_URL="https://your-resource.services.ai.azure.com"
$env:AZURE_API_KEY="your_access_token"  # 使用 az account get-access-token 获取
$env:AZURE_MODEL="gpt-4o"  # 模型名称
$env:AZURE_API_VERSION="2024-10-21"  # 可选
```

#### 阿里云DashScope
```bash
$env:DASHSCOPE_API_KEY="your_api_key_here"
# 或者使用兼容的环境变量
$env:ALIBABA_CLOUD_API_KEY="your_api_key_here"
$env:DASHSCOPE_MODEL="qwen-plus"  # 可选
```

#### 阿里云百炼（Bailian）
```bash
# 推荐：使用通用环境变量
$env:AI_API_KEY="your_api_key_here"
$env:AI_MODEL="qwen-plus"  # 可选，支持qwen-plus, qwen-turbo等
$env:AI_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"  # 可选

# 或者使用兼容的环境变量
$env:DASHSCOPE_API_KEY="your_api_key_here"
$env:ALIBABA_CLOUD_API_KEY="your_api_key_here"
$env:BAILIAN_API_KEY="your_api_key_here"
$env:BAILIAN_MODEL="qwen-plus"  # 可选
$env:BAILIAN_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"  # 可选
```

#### 智谱AI GLM
```bash
$env:GLM_API_KEY="your_api_key_here"
# 或者使用兼容的环境变量
$env:ZHIPU_API_KEY="your_api_key_here"
$env:GLM_MODEL="glm-4"  # 可选，支持glm-3-turbo, glm-4等
$env:GLM_BASE_URL="https://open.bigmodel.cn/api/paas/v4"  # 可选
```

#### Ollama（本地模型）
```bash
$env:OLLAMA_BASE_URL="http://localhost:11434"  # 可选
$env:OLLAMA_MODEL="llama3.2:latest"  # 可选
```

## 📝 使用示例

### 统一配置方式（推荐）

**🎯 最简单的配置方式** - 只需要设置3个环境变量：

```bash
# 1. 选择AI引擎
$env:AI_ENGINE="volcengine"  # 或 openrouter, azure, dashscope, glm, ollama

# 2. 设置API密钥（所有引擎通用）
$env:AI_API_KEY="your_api_key_here"

# 3. 设置模型名称（可选，有默认值）
$env:AI_MODEL="your_model_name"

# 4. 运行
gemini
```

**实际使用示例：**

```bash
# 使用火山引擎
$env:AI_ENGINE="volcengine"
$env:AI_API_KEY="b59bd5ec-0361-4b5c-aea3-44ad7f239227"
gemini

# 使用OpenRouter
$env:AI_ENGINE="openrouter"
$env:AI_API_KEY="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"
$env:AI_MODEL="anthropic/claude-3.5-sonnet"
gemini

# 使用Azure OpenAI
$env:AI_ENGINE="azure"
$env:AI_API_KEY="your-azure-api-key"
$env:AI_BASE_URL="https://your-resource.openai.azure.com"
$env:AI_MODEL="your-deployment-name"
gemini
```

### 传统配置方式（向后兼容）

```bash
# 使用默认引擎（Volcengine）
gemini

# 使用指定引擎
$env:AI_ENGINE="openrouter"
gemini

# 使用阿里云百炼
$env:AI_ENGINE="bailian"
gemini

# 使用智谱AI GLM
$env:AI_ENGINE="glm"
gemini

# 使用本地Ollama
$env:AI_ENGINE="ollama"
gemini
```

### 测试引擎配置
```bash
# 运行多引擎测试脚本
node test-multi-engine.js
```

## 🔍 引擎状态检查

程序启动时会显示当前使用的引擎：

```
🚀 Multi-Engine Support: Using VOLCENGINE AI Engine
🔥 Volcengine AI Adapter: Initializing...
   Model: deepseek-v3-250324
   API Endpoint: https://ark.cn-beijing.volces.com/api/v3
```

## 🛠️ 开发信息

### 支持的引擎列表
- ✅ **已实现**: volcengine, openrouter, azure, dashscope, glm, ollama
- 📝 **计划中**: openai, anthropic, deepseek, custom

### 技术架构
- **工厂模式**: 通过 `ContentGeneratorFactory` 动态创建引擎实例
- **统一接口**: 所有引擎都实现 `ContentGenerator` 接口
- **类型安全**: 使用TypeScript确保类型安全
- **错误处理**: 统一的错误处理和日志记录

### 文件结构
```
packages/core/src/core/
├── contentGenerator.ts          # 核心接口定义
├── contentGeneratorFactory.ts   # 工厂类
├── volcengineContentGenerator.ts    # 火山引擎适配器
├── openrouterContentGenerator.ts    # OpenRouter适配器
├── azureContentGenerator.ts         # Azure OpenAI适配器
├── dashscopeContentGenerator.ts     # DashScope适配器
├── bailianContentGenerator.ts       # 阿里云百炼适配器
├── glmContentGenerator.ts           # 智谱AI GLM适配器
└── ollamaContentGenerator.ts        # Ollama适配器
```

## 🔑 API密钥兼容性说明

为了向后兼容和用户便利，某些引擎支持多个环境变量作为API密钥的fallback：

### 支持的API密钥环境变量

| 引擎 | 主要环境变量 | 兼容环境变量 | 说明 |
|------|-------------|-------------|------|
| **Volcengine** | `VOLCENGINE_API_KEY` | `GEMINI_API_KEY` | 向后兼容原有的Gemini配置 |
| **DashScope** | `DASHSCOPE_API_KEY` | `ALIBABA_CLOUD_API_KEY` | 支持阿里云通用API密钥 |
| **Bailian** | `AI_API_KEY` | `DASHSCOPE_API_KEY`, `ALIBABA_CLOUD_API_KEY`, `BAILIAN_API_KEY` | 优先使用通用密钥，兼容阿里云密钥 |
| **GLM** | `GLM_API_KEY` | `ZHIPU_API_KEY` | 支持智谱AI的通用命名 |

### 配置优先级

系统会按以下顺序查找API密钥：
1. 通用环境变量（如 `AI_API_KEY`）
2. 引擎特定环境变量（如 `VOLCENGINE_API_KEY`）
3. 兼容环境变量（如 `GEMINI_API_KEY`）
4. 如果都未找到，则抛出错误

## 🚨 故障排除

### 常见问题

1. **API密钥错误**
   ```
   Error: API key not found. Please set [ENGINE]_API_KEY environment variable.
   ```
   **解决**: 检查环境变量是否正确设置

2. **网络连接问题**
   ```
   Error: [ENGINE] API call failed: fetch failed
   ```
   **解决**: 检查网络连接和API端点URL

3. **模型不支持**
   ```
   Error: Model not found or not supported
   ```
   **解决**: 检查模型名称是否正确

### 调试模式
设置环境变量启用详细日志：
```bash
$env:DEBUG="true"
```

## 📚 更多信息

- [火山引擎AI文档](https://www.volcengine.com/docs/82379)
- [OpenRouter文档](https://openrouter.ai/docs)
- [Azure OpenAI文档](https://docs.microsoft.com/en-us/azure/cognitive-services/openai/)
- [阿里云DashScope文档](https://help.aliyun.com/zh/dashscope/)
- [阿里云百炼文档](https://help.aliyun.com/zh/model-studio/)
- [智谱AI GLM文档](https://open.bigmodel.cn/dev/api)
- [Ollama文档](https://ollama.ai/docs)

---

**注意**: 使用前请确保已正确配置对应引擎的API密钥和必要参数。