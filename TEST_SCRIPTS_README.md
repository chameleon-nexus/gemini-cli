# 🧪 测试脚本使用说明

本目录包含了用于测试各个AI引擎的脚本文件，方便用户快速验证不同引擎的功能。

## 📁 脚本文件列表

### 🐧 Linux/macOS 脚本 (.sh)
- `test-volcengine.sh` - 测试火山引擎 (DeepSeek V3)
- `test-openrouter.sh` - 测试OpenRouter (Claude 3.5 Sonnet)
- `test-azure.sh` - 测试Azure OpenAI (GPT-4)
- `test-dashscope.sh` - 测试DashScope (Qwen Plus)
- `test-bailian.sh` - 测试Bailian (Qwen Plus)
- `test-glm.sh` - 测试GLM (GLM-4)
- `test-ollama.sh` - 测试Ollama (Llama 3.2)
- `test-all-engines.sh` - 综合测试所有引擎

### 🪟 Windows 脚本 (.ps1)
- `test-volcengine.ps1` - 测试火山引擎 (PowerShell版本)
- `test-openrouter.ps1` - 测试OpenRouter (PowerShell版本)

## 🚀 使用方法

### Linux/macOS 用户

```bash
# 给脚本添加执行权限
chmod +x test-*.sh

# 测试单个引擎
./test-volcengine.sh
./test-openrouter.sh
./test-azure.sh

# 测试所有引擎
./test-all-engines.sh
```

### Windows 用户

```powershell
# 测试单个引擎
.\test-volcengine.ps1
.\test-openrouter.ps1

# 或者直接运行
powershell -ExecutionPolicy Bypass -File test-volcengine.ps1
```

## ⚙️ 配置说明

### 🔧 修改API密钥

在运行测试脚本之前，请将脚本中的假API密钥替换为你的真实API密钥：

```bash
# 示例：修改test-volcengine.sh
export AI_API_KEY="your-real-api-key-here"
```

### 🔧 修改配置参数

你可以根据需要修改以下参数：

```bash
# 模型名称
export AI_MODEL="your-preferred-model"

# Base URL (仅Azure和Ollama需要)
export AI_BASE_URL="your-custom-url"

# 测试提示词
gemini "your-custom-prompt"
```

## 📋 各引擎配置要求

### 🔥 Volcengine
- **必需**: `AI_API_KEY`
- **可选**: `AI_MODEL` (默认: deepseek-v3-250324)

### 🌐 OpenRouter
- **必需**: `AI_API_KEY` (OpenRouter API Key)
- **可选**: `AI_MODEL` (默认: anthropic/claude-3.5-sonnet)

### ☁️ Azure OpenAI
- **必需**: `AI_API_KEY`, `AI_BASE_URL`, `AI_MODEL`
- **格式**: `AI_BASE_URL="https://your-resource.openai.azure.com"`

### 🌊 DashScope
- **必需**: `AI_API_KEY` (DashScope API Key)
- **可选**: `AI_MODEL` (默认: qwen-plus)

### 🌊 Bailian
- **必需**: `AI_API_KEY` (百炼API Key)
- **可选**: `AI_MODEL` (默认: qwen-plus)

### 🧠 GLM
- **必需**: `AI_API_KEY` (智谱AI API Key)
- **可选**: `AI_MODEL` (默认: glm-4)

### 🦙 Ollama
- **必需**: 本地运行Ollama服务
- **必需**: `AI_BASE_URL="http://localhost:11434"`
- **可选**: `AI_MODEL` (默认: llama3.2:latest)

## 🔍 故障排除

### ❌ 常见错误

1. **API Key错误**
   ```
   Error: API key not found
   ```
   **解决**: 检查并设置正确的API密钥

2. **网络连接问题**
   ```
   ConnectTimeoutError
   ```
   **解决**: 检查网络连接和防火墙设置

3. **Ollama未运行**
   ```
   Error: Ollama is not running
   ```
   **解决**: 启动Ollama服务
   ```bash
   ollama serve
   ollama pull llama3.2:latest
   ```

4. **模型不存在**
   ```
   Error: Model not found
   ```
   **解决**: 检查模型名称是否正确，或使用默认模型

### 🔧 调试技巧

1. **启用详细日志**
   ```bash
   export AI_ENGINE_DEBUG=true
   ```

2. **检查环境变量**
   ```bash
   echo $AI_ENGINE
   echo $AI_MODEL
   echo $AI_API_KEY
   ```

3. **测试网络连接**
   ```bash
   curl -I https://api.openai.com/v1/models
   ```

## 📚 更多信息

- [完整使用指南](../MULTI_ENGINE_GUIDE.md)
- [项目README](../README.md)
- [GitHub Issues](https://github.com/chameleon-nexus/gemini-cli/issues)

## 🤝 贡献

欢迎提交新的测试脚本或改进现有脚本！请确保：

1. 使用假API密钥，不要暴露真实密钥
2. 包含清晰的错误处理
3. 提供详细的配置说明
4. 测试脚本的稳定性
