# Gemini CLI (CatalystAI Edition) - Multi-Engine AI-Plattform

[![npm version](https://badge.fury.io/js/%40catalystai%2Fgemini-cli.svg)](https://badge.fury.io/js/%40catalystai%2Fgemini-cli)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**🚀 Das weltweit erste einheitliche CLI-Tool mit Unterstützung für 6 große AI-Engines - Ein Befehl, alle Modelle**

> ⚠️ **Wichtiger Hinweis**: Dies ist eine modifizierte Version von [Google Gemini CLI](https://github.com/google-gemini/gemini-cli). Das ursprüngliche Projekt ist urheberrechtlich geschützt von Google LLC und folgt der Apache 2.0 Lizenz.

## 🌐 Sprachumschaltung / Language Switch

| 🇺🇸 [English](../README.md) | 🇨🇳 [中文](README.zh.md) | 🇯🇵 [日本語](README.ja.md) | 🇩🇪 **Deutsch** | 🇻🇳 [Tiếng Việt](README.vi.md) | 🇸🇦 [العربية](README.ar.md) |

## 🌟 Hauptfunktionen

- 🎯 **6 große AI-Engine-Unterstützung**: OpenRouter、Azure、Ollama、Volcengine、Bailian、GLM
- 🔄 **Einheitliche Umgebungsvariablen**: Ein Satz Konfigurationen für alle Engines
- 🌍 **Globale Modellabdeckung**: Unterstützt GPT、Claude、Qwen、GLM、DeepSeek und andere Mainstream-Modelle
- 🏠 **Lokale AI-Unterstützung**: Ollama lokale Bereitstellung, Daten vollständig privat
- 🔧 **Null-Konfigurationswechsel**: Ein Umgebungsvariable reicht für Engine-Wechsel
- 📊 **Vollständige Funktionen**: Streaming/Non-Streaming、Token-Berechnung、Embedding-Vektoren vollständig unterstützt

## 📦 Installation

```bash
npm install -g @catalystai/gemini-cli
```

## 🎛️ Unterstützte AI-Engines und Modelle

### 🌐 OpenRouter (Multi-Model-Routing)
**Unterstützte Modelle**: GPT-4、Claude、Llama、Mistral等
- `anthropic/claude-3.5-sonnet` (Standard)
- `openai/gpt-4`
- `meta-llama/llama-3.1-8b-instruct`
- `mistralai/mistral-7b-instruct`

### ☁️ Azure OpenAI / Azure AI Foundry
**Unterstützte Modelle**: GPT-4、GPT-3.5、DALL-E等
- `gpt-4` (Standard)
- `gpt-3.5-turbo`
- `gpt-4-turbo`
- `dall-e-3`

### 🦙 Ollama (Lokale AI)
**Unterstützte Modelle**: Llama、Mistral、CodeLlama等
- `llama3.2:latest` (Standard)
- `mistral:latest`
- `codellama:latest`
- `qwen:latest`

### 🔥 Volcengine (Standard-Engine)
**Unterstützte Modelle**: DeepSeek V3、Qwen-Serie、ChatGLM、Baichuan等
- `deepseek-v3-250324` (Standard)
- `qwen-plus`
- `qwen-max`
- `chatglm-6b`

### 🌊 Bailian (阿里云百炼)
**Unterstützte Modelle**: 通义千问商业版、多模态模型
- `qwen-plus` (Standard)
- `qwen-max`
- `qwen-vl-plus`

### 🧠 GLM (智谱AI)
**Unterstützte Modelle**: GLM-4、CogView等
- `glm-4` (Standard)
- `glm-4v`
- `cogview-3`

## ⚙️ Einheitliches Konfigurationssystem

### 🔧 Empfohlene Konfigurationsmethode (Einheitliche Umgebungsvariablen)

```bash
# Einheitlicher API-Schlüssel (für alle Engines gemeinsam)
export AI_API_KEY="your-actual-api-key-from-your-ai-provider"

# Einheitlicher Modellname (für alle Engines gemeinsam)
export AI_MODEL="your-preferred-model-name"

# Einheitliche Base URL (Optional, nur bei benutzerdefinierten Einstellungen)
export AI_BASE_URL="your-custom-endpoint-url"

# Engine-Auswahl (Eine Variable steuert alles)
export AI_ENGINE="volcengine"  # Optionen: openrouter, azure, ollama, volcengine, bailian, glm
```

### 🪟 Windows PowerShell Konfiguration

```powershell
# Einheitliche Konfiguration
$env:AI_API_KEY="your-actual-api-key-from-your-ai-provider"
$env:AI_MODEL="your-preferred-model-name"
$env:AI_ENGINE="volcengine"
```

### 🔧 Engine-spezifische Konfiguration (Optional)

Bei Verwendung engine-spezifischer Konfigurationen fällt das System automatisch auf einheitliche Konfigurationen zurück：

```bash
# OpenRouter spezifische Konfiguration  
export OPENROUTER_API_KEY="your-openrouter-api-key"
export OPENROUTER_MODEL="anthropic/claude-3.5-sonnet"

# Azure spezifische Konfiguration
export AZURE_API_KEY="your-azure-openai-api-key"
export AZURE_BASE_URL="https://your-resource.openai.azure.com"
export AZURE_MODEL="gpt-4"

# Volcengine spezifische Konfiguration
export VOLCENGINE_API_KEY="your-volcengine-api-key"
export VOLCENGINE_MODEL="deepseek-v3-250324"
```

## 🚀 Verwendung

### 💬 Direkter Frage-Modus

```bash
gemini "Hallo, bitte stelle dich vor"
```

### 🔄 Interaktiver Modus

```bash
gemini
```

Wählen Sie dann "2. Use Gemini API Key" und drücken Sie Enter, um den Chat zu starten.

## 🧪 Engine-Testbeispiele

### 🌐 OpenRouter testen

```bash
# Einheitliche Konfiguration verwenden
export AI_API_KEY="your-openrouter-api-key"
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"

# Test-Befehl
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### ☁️ Azure OpenAI testen

```bash
# Einheitliche Konfiguration verwenden
export AI_API_KEY="your-azure-openai-api-key"
export AI_ENGINE="azure"
export AI_BASE_URL="https://your-resource.openai.azure.com"
export AI_MODEL="gpt-4"

# Test-Befehl
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🦙 Ollama testen (Lokale AI)

```bash
# Einheitliche Konfiguration verwenden
export AI_ENGINE="ollama"
export AI_BASE_URL="http://localhost:11434"
export AI_MODEL="llama3.2:latest"

# Test-Befehl
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🔥 Volcengine testen (Standard-Engine)

```bash
# Einheitliche Konfiguration verwenden
export AI_API_KEY="your-volcengine-api-key"
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"

# Test-Befehl
gemini "Bitte stelle dich vor und sage mir, welches AI-Modell du bist."
```

### 🌊 Bailian testen

```bash
# Einheitliche Konfiguration verwenden
export AI_API_KEY="your-bailian-api-key"
export AI_ENGINE="bailian"
export AI_MODEL="qwen-plus"

# Test-Befehl
gemini "Bitte stelle dich vor und sage mir, welches AI-Modell du bist."
```

### 🧠 GLM testen

```bash
# Einheitliche Konfiguration verwenden
export AI_API_KEY="your-glm-api-key"
export AI_ENGINE="glm"
export AI_MODEL="glm-4"

# Test-Befehl
gemini "Bitte stelle dich vor und sage mir, welches AI-Modell du bist."
```

## 🔧 Schneller Engine-Wechsel

```bash
# Zu OpenRouter Claude wechseln
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"
gemini "Hello Claude!"

# Zu Azure GPT-4 wechseln
export AI_ENGINE="azure"
export AI_MODEL="gpt-4"
gemini "Hello GPT-4!"

# Zu lokalem Ollama wechseln
export AI_ENGINE="ollama"
export AI_MODEL="llama3.2:latest"
gemini "Hello Llama!"

# Zu Volcengine DeepSeek wechseln
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"
gemini "Hello DeepSeek!"
```

## 🏗️ Technische Architektur

### 🎯 Multi-Engine-Factory-Pattern-Architektur

Dieses Projekt verwendet ein**Factory-Pattern**-Design und realisiert hochgradig erweiterbare Multi-AI-Engine-Unterstützung：

```
ContentGeneratorFactory
├── OpenrouterContentGenerator    (OpenRouter)
├── AzureContentGenerator         (Azure OpenAI)
├── OllamaContentGenerator        (Local Ollama)
├── VolcengineContentGenerator    (Volcengine)
├── BailianContentGenerator       (Alibaba Cloud Bailian)
└── GlmContentGenerator           (Zhipu AI GLM)
```

### 🔧 Kernfunktionen

✅ **6 große AI-Engines**: Einheitliche Verwaltung aller AI-Engines durch Factory-Pattern  
✅ **Einheitliche Umgebungsvariablen**: `AI_API_KEY`、`AI_MODEL`、`AI_BASE_URL` gemeinsame Konfiguration  
✅ **Automatische Formatkonvertierung**: Nahtlose Konvertierung zwischen Gemini-Format und verschiedenen Engine-API-Formaten  
✅ **Streaming-Response-Unterstützung**: Alle Engines unterstützen Streaming und Non-Streaming Responses  
✅ **Intelligente Fehlerbehandlung**: 30-Sekunden-Timeout-Schutz, detaillierte Fehlermeldungen  
✅ **Konfigurationspriorität**: Einheitliche Konfiguration > Engine-spezifische Konfiguration > Standard-Konfiguration  
✅ **Null-Konfigurationswechsel**: Engine-Wechsel mit einer Umgebungsvariable möglich  

## 📋 Lizenzhinweis

Dieses Projekt basiert auf [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) und folgt den Apache 2.0-Lizenzanforderungen：

### Ursprüngliche Projektinformationen

- **Ursprüngliches Projekt**: Google Gemini CLI
- **Ursprüngliches Copyright**: Copyright 2025 Google LLC  
- **Ursprüngliche Lizenz**: Apache License 2.0
- **Ursprüngliches Repository**: https://github.com/google-gemini/gemini-cli

### Änderungserklärung

Gemäß Apache 2.0-Lizenz Abschnitt 4：

- ✅ Ursprüngliche Apache 2.0-Lizenz beibehalten
- ✅ Ursprüngliche Copyright-Hinweise beibehalten
- ✅ Alle Änderungen klar markieren
- ✅ Vollständigen Lizenztext einbeziehen

## 🔄 Migration von ursprünglicher Gemini CLI

Wenn Sie von der ursprünglichen Google Gemini CLI migrieren：

1. **Ursprüngliche Version deinstallieren**: `npm uninstall -g @google/gemini-cli`
2. **Diese Version installieren**: `npm install -g @catalystai/gemini-cli`
3. **API-Schlüssel setzen**: `export AI_API_KEY="your-actual-api-key"`
4. **Engine auswählen**: `export AI_ENGINE="volcengine"` (oder andere Engine)
5. **Normal verwenden**: Alle Befehle bleiben unverändert

## 🧪 Testskripte

Sofort einsatzbereite Testskripte für jede Engine. Diese Skripte verwenden Platzhalter-API-Schlüssel, die Sie durch echte Schlüssel ersetzen müssen.

### 🚀 Verwendung der Testskripte

#### Linux/macOS Benutzer

```bash
# Ausführungsrechte für Skripte vergeben
chmod +x test-*.sh

# Einzelne Engine testen
./test-openrouter.sh
./test-azure.sh
./test-ollama.sh
./test-volcengine.sh
./test-bailian.sh
./test-glm.sh

# Alle Engines testen
./test-all-engines.sh
```

#### Windows Benutzer

```powershell
# Einzelne Engine testen
.\test-volcengine.ps1
.\test-openrouter.ps1

# Oder direkt ausführen
powershell -ExecutionPolicy Bypass -File test-volcengine.ps1
```

#### Konfiguration

Ersetzen Sie vor dem Ausführen der Testskripte die Platzhalter-API-Schlüssel durch echte Schlüssel：

```bash
# Bearbeiten Sie jedes Testskript und ersetzen Sie Platzhalter-API-Schlüssel
export AI_API_KEY="your-actual-api-key-from-your-ai-provider"
```

### 📋 Verfügbare Testskripte

### 🌐 OpenRouter Testskript

```bash
#!/bin/bash
# test-openrouter.sh
export AI_API_KEY="your-openrouter-api-key"
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"

echo "Testing OpenRouter with Claude 3.5 Sonnet..."
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### ☁️ Azure Testskript

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

### 🦙 Ollama Testskript

```bash
#!/bin/bash
# test-ollama.sh
export AI_ENGINE="ollama"
export AI_BASE_URL="http://localhost:11434"
export AI_MODEL="llama3.2:latest"

echo "Testing Ollama with Llama 3.2..."
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🔥 Volcengine Testskript

```bash
#!/bin/bash
# test-volcengine.sh
export AI_API_KEY="your-volcengine-api-key"
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"

echo "Testing Volcengine with DeepSeek V3..."
gemini "Bitte stelle dich vor und sage mir, welches AI-Modell du bist."
```

### 🌊 Bailian Testskript

```bash
#!/bin/bash
# test-bailian.sh
export AI_API_KEY="your-bailian-api-key"
export AI_ENGINE="bailian"
export AI_MODEL="qwen-plus"

echo "Testing Bailian with Qwen Plus..."
gemini "Bitte stelle dich vor und sage mir, welches AI-Modell du bist."
```

### 🧠 GLM Testskript

```bash
#!/bin/bash
# test-glm.sh
export AI_API_KEY="your-glm-api-key"
export AI_ENGINE="glm"
export AI_MODEL="glm-4"

echo "Testing GLM with GLM-4..."
gemini "Bitte stelle dich vor und sage mir, welches AI-Modell du bist."
```

### 🚀 Alle Engines Testskript

```bash
#!/bin/bash
# test-all-engines.sh

# Test-Funktion
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

# Alle Engines testen
echo "🌐 Testing OpenRouter (Claude 3.5 Sonnet)..."
test_engine "openrouter" "anthropic/claude-3.5-sonnet" "your-openrouter-api-key" "" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

echo "☁️ Testing Azure OpenAI (GPT-4)..."
test_engine "azure" "gpt-4" "your-azure-openai-api-key" "https://your-resource.openai.azure.com" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

echo "🦙 Testing Ollama (Llama 3.2)..."
test_engine "ollama" "llama3.2:latest" "" "http://localhost:11434" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

echo "🔥 Testing Volcengine (DeepSeek V3)..."
test_engine "volcengine" "deepseek-v3-250324" "your-volcengine-api-key" "" "Bitte stelle dich vor und sage mir, welches AI-Modell du bist. Bitte antworte auf Deutsch."

echo "🌊 Testing Bailian (Qwen Plus)..."
test_engine "bailian" "qwen-plus" "your-bailian-api-key" "" "Bitte stelle dich vor und sage mir, welches AI-Modell du bist. Bitte antworte auf Deutsch."

echo "🧠 Testing GLM (GLM-4)..."
test_engine "glm" "glm-4" "your-glm-api-key" "" "Bitte stelle dich vor und sage mir, welches AI-Modell du bist. Bitte antworte auf Deutsch."

echo "✅ All engines tested!"
```

## 🔗 Verwandte Links

- [Ursprüngliches Projekt (Google Gemini CLI)](https://github.com/google-gemini/gemini-cli)
- [OpenRouter](https://openrouter.ai/)
- [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- [Ollama](https://ollama.ai/)
- [火山引擎AI平台](https://www.volcengine.com/products/ai)
- [阿里云百炼](https://bailian.console.aliyun.com/)
- [智谱AI](https://www.zhipuai.cn/)
- [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

## 🐛 Problemberichterstattung

Wenn Sie Probleme haben, melden Sie diese bitte bei [GitHub Issues](https://github.com/chameleon-nexus/gemini-cli/issues).

## 🤝 Beitragsrichtlinien

Code-Beiträge sind willkommen! Bitte stellen Sie sicher：

1. Dem Code-Stil des ursprünglichen Projekts zu folgen
2. Angemessene Tests einzuschließen
3. Verwandte Dokumentation zu aktualisieren
4. Die Apache 2.0-Lizenzbedingungen einzuhalten

## 📝 Changelog

### v0.0.3 (Aktuelle Version)
- ✨ **阿里云百炼-Unterstützung hinzugefügt** - OpenAI-kompatibler Modus
- ✨ **Azure AI Foundry-Unterstützung** - Neuer Service-Endpunkt
- ✨ **Einheitliches Umgebungsvariablen-System** - `AI_API_KEY`、`AI_MODEL`、`AI_BASE_URL`
- ✨ **Ollama-Adapter-Optimierung** - Echter Streaming-Verarbeitung
- ✨ **GLM-Adapter-Vervollständigung** - 智谱AI GLM-4-Unterstützung
- 🔧 **Konfigurationspriorität-Optimierung** - Einheitliche Konfiguration > Engine-spezifische Konfiguration
- 📚 **Vollständige Testskripte** - Unabhängige Testskripte für jede Engine
- 🐛 **Fehlerbehandlung verbessert** - Freundlichere Fehlermeldungen

### v0.0.2
- ✨ **Multi-Engine-Unterstützung** - OpenRouter、Azure、DashScope、GLM、Ollama
- ✨ **Factory-Pattern-Architektur** - Hochgradig erweiterbares Design
- ✨ **Streaming-Response-Unterstützung** - Alle Engines unterstützen Streaming-Verarbeitung
- 📚 **Detaillierte Dokumentation** - Multi-Engine-Nutzungsanleitung

### v0.0.1
- 🎉 **Erste Version** - 火山引擎AI-Integration
- ✨ **Vollständige Kompatibilität** - Vollständig kompatibel mit ursprünglicher Gemini CLI
- 🔧 **Umgebungsvariablen-Konfiguration** - Flexible Konfigurationsoptionen
- 🇨🇳 **Chinesisch-Optimierung** - Für chinesische Gespräche optimiert

## 🌟 Projekt-Highlights

- 🚀 **Weltpremiere**: Das erste einheitliche CLI-Tool mit Unterstützung für 6 große AI-Engines
- 🎯 **Null-Lernkosten**: Ein Befehl, alle Modelle
- 🔄 **Intelligenter Wechsel**: Umgebungsvariablen-Steuerung, Engine-Wechsel in Sekunden
- 🌍 **Globale Abdeckung**: Unterstützt Mainstream-AI-Modelle aus China, USA und Europa
- 🏠 **Lokale Unterstützung**: Ollama lokale Bereitstellung, Daten vollständig privat
- 📊 **Unternehmensklasse**: Vollständige Fehlerbehandlung und Konfigurationsverwaltung

---

**Haftungsausschluss**: Dieses Projekt steht in keiner Verbindung zu Google, OpenRouter, Azure, Ollama, Volcengine, 阿里云, 智谱AI oder anderen Unternehmen. Bitte beachten Sie bei der Nutzung die Servicebedingungen der jeweiligen Plattformen.