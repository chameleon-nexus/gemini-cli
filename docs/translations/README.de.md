# Gemini CLI (CatalystAI Edition) - Multi-Engine AI-Plattform

**🚀 Das weltweit erste einheitliche CLI-Tool mit Unterstützung für 6 große AI-Engines - Ein Befehl, alle Modelle**

## 🌟 Hauptfunktionen

- 🎯 **6 große AI-Engines**: OpenRouter, Azure, Ollama, Volcengine, Bailian, GLM
- 🔄 **Einheitliche Umgebungsvariablen**: Eine Konfiguration für alle Engines
- 🌍 **Globale Modellabdeckung**: Unterstützt GPT, Claude, Qwen, GLM, DeepSeek und andere Mainstream-Modelle
- 🏠 **Lokale AI-Unterstützung**: Ollama-Lokaldeployment mit vollständiger Datenprivatheit

## 📦 Installation

```bash
npm install -g @catalystai/gemini-cli
```

## 🎛️ Unterstützte AI-Engines & Modelle

### 🌐 OpenRouter (Multi-Model Router)
- `anthropic/claude-3.5-sonnet` (Standard)
- `openai/gpt-4`
- `meta-llama/llama-3.1-8b-instruct`

### ☁️ Azure OpenAI
- `gpt-4` (Standard)
- `gpt-3.5-turbo`
- `gpt-4-turbo`

### 🦙 Ollama (Lokale AI)
- `llama3.2:latest` (Standard)
- `mistral:latest`
- `codellama:latest`

### 🔥 Volcengine (Standard-Engine)
- `deepseek-v3-250324` (Standard)
- `qwen-plus`
- `qwen-max`

### 🌊 Bailian (Alibaba Cloud Bailian)
- `qwen-plus` (Standard)
- `qwen-max`
- `qwen-vl-plus`

### 🧠 GLM (Zhipu AI)
- `glm-4` (Standard)
- `glm-4v`
- `cogview-3`

## 🚀 Verwendung

```bash
# Einheitliche API-Schlüssel-Konfiguration
export AI_API_KEY="your-actual-api-key-from-your-ai-provider"
export AI_MODEL="your-preferred-model-name"
export AI_ENGINE="volcengine"  # Optionen: openrouter, azure, ollama, volcengine, bailian, glm

# Verwenden
gemini "Hallo, bitte stelle dich vor"
```

## 🔧 Schneller Engine-Wechsel

```bash
# Zu OpenRouter mit Claude wechseln
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"
gemini "Hello Claude!"

# Zu Azure mit GPT-4 wechseln
export AI_ENGINE="azure"
export AI_MODEL="gpt-4"
gemini "Hello GPT-4!"

# Zu lokalem Ollama wechseln
export AI_ENGINE="ollama"
export AI_MODEL="llama3.2:latest"
gemini "Hello Llama!"
```

## 🧪 Testskripte

```bash
# Linux/macOS
chmod +x test-*.sh
./test-volcengine.sh

# Windows
.\test-volcengine.ps1
```

## 🔗 Verwandte Links

- [GitHub Repository](https://github.com/chameleon-nexus/gemini-cli)
- [Ursprüngliches Projekt](https://github.com/google-gemini/gemini-cli)
- [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

## 📋 Lizenzkonformität

Dieses Projekt basiert auf [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) und folgt den Apache 2.0-Lizenzanforderungen.

---

**Haftungsausschluss**: Dieses Projekt ist nicht mit Google, OpenRouter, Azure, Ollama, Volcengine, Alibaba Cloud, Zhipu AI oder anderen Unternehmen verbunden.
