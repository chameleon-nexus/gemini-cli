# 🧪 Test Scripts Usage Guide

This directory contains test scripts for each AI engine, making it easy for users to quickly verify the functionality of different engines.

## 📁 Script Files List

### 🐧 Linux/macOS Scripts (.sh)
- `test-openrouter.sh` - Test OpenRouter (Claude 3.5 Sonnet)
- `test-azure.sh` - Test Azure OpenAI (GPT-4)
- `test-ollama.sh` - Test Ollama (Llama 3.2)
- `test-volcengine.sh` - Test Volcengine (DeepSeek V3)
- `test-bailian.sh` - Test Bailian (Qwen Plus)
- `test-glm.sh` - Test GLM (GLM-4)
- `test-all-engines.sh` - Comprehensive test for all engines

### 🪟 Windows Scripts (.ps1)
- `test-volcengine.ps1` - Test Volcengine (PowerShell version)
- `test-openrouter.ps1` - Test OpenRouter (PowerShell version)

## 🚀 Usage Instructions

### Linux/macOS Users

```bash
# Make scripts executable
chmod +x test-*.sh

# Test individual engines
./test-openrouter.sh
./test-azure.sh
./test-ollama.sh
./test-volcengine.sh
./test-bailian.sh
./test-glm.sh

# Test all engines at once
./test-all-engines.sh
```

### Windows Users

```powershell
# Test individual engines
.\test-volcengine.ps1
.\test-openrouter.ps1

# Or run directly
powershell -ExecutionPolicy Bypass -File test-volcengine.ps1
```

## ⚙️ Configuration

### 🔧 Modify API Keys

Before running test scripts, replace the fake API keys with your real ones:

```bash
# Example: modify test-volcengine.sh
export AI_API_KEY="your-real-api-key-here"
```

### 🔧 Modify Configuration Parameters

You can modify the following parameters as needed:

```bash
# Model name
export AI_MODEL="your-preferred-model"

# Base URL (only needed for Azure and Ollama)
export AI_BASE_URL="your-custom-url"

# Test prompt
gemini "your-custom-prompt"
```

## 📋 Engine Configuration Requirements

### 🌐 OpenRouter
- **Required**: `AI_API_KEY` (OpenRouter API Key)
- **Optional**: `AI_MODEL` (default: anthropic/claude-3.5-sonnet)

### ☁️ Azure OpenAI
- **Required**: `AI_API_KEY`, `AI_BASE_URL`, `AI_MODEL`
- **Format**: `AI_BASE_URL="https://your-resource.openai.azure.com"`

### 🦙 Ollama
- **Required**: Local Ollama service running
- **Required**: `AI_BASE_URL="http://localhost:11434"`
- **Optional**: `AI_MODEL` (default: llama3.2:latest)

### 🔥 Volcengine
- **Required**: `AI_API_KEY`
- **Optional**: `AI_MODEL` (default: deepseek-v3-250324)

### 🌊 Bailian
- **Required**: `AI_API_KEY` (Bailian API Key)
- **Optional**: `AI_MODEL` (default: qwen-plus)

### 🧠 GLM
- **Required**: `AI_API_KEY` (Zhipu AI API Key)
- **Optional**: `AI_MODEL` (default: glm-4)

## 🔍 Troubleshooting

### ❌ Common Errors

1. **API Key Error**
   ```
   Error: API key not found
   ```
   **Solution**: Check and set the correct API key

2. **Network Connection Issues**
   ```
   ConnectTimeoutError
   ```
   **Solution**: Check network connection and firewall settings

3. **Ollama Not Running**
   ```
   Error: Ollama is not running
   ```
   **Solution**: Start Ollama service
   ```bash
   ollama serve
   ollama pull llama3.2:latest
   ```

4. **Model Not Found**
   ```
   Error: Model not found
   ```
   **Solution**: Check if the model name is correct, or use the default model

### 🔧 Debugging Tips

1. **Enable Verbose Logging**
   ```bash
   export AI_ENGINE_DEBUG=true
   ```

2. **Check Environment Variables**
   ```bash
   echo $AI_ENGINE
   echo $AI_MODEL
   echo $AI_API_KEY
   ```

3. **Test Network Connection**
   ```bash
   curl -I https://api.openai.com/v1/models
   ```

## 📚 More Information

- [Complete Usage Guide](../MULTI_ENGINE_GUIDE.md)
- [Project README](../README.md)
- [GitHub Issues](https://github.com/chameleon-nexus/gemini-cli/issues)

## 🤝 Contributing

Welcome to submit new test scripts or improve existing ones! Please ensure:

1. Use fake API keys, don't expose real keys
2. Include clear error handling
3. Provide detailed configuration instructions
4. Test script stability
