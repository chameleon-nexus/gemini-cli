# Gemini CLI (CatalystAI Edition) - マルチエンジンAIプラットフォーム

[![npm version](https://badge.fury.io/js/%40catalystai%2Fgemini-cli.svg)](https://badge.fury.io/js/%40catalystai%2Fgemini-cli)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**🚀 世界初の6大AIエンジンをサポートする統一CLIツール - 1つのコマンドで全モデル**

> ⚠️ **重要な声明**: これは [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) の修正版です。元のプロジェクトの著作権は Google LLC に帰属し、Apache 2.0 ライセンスに従います。

## 🌐 言語切り替え / Language Switch

| 🇺🇸 [English](../README.md) | 🇨🇳 [中文](README.zh.md) | 🇯🇵 **日本語** | 🇩🇪 [Deutsch](README.de.md) | 🇻🇳 [Tiếng Việt](README.vi.md) | 🇸🇦 [العربية](README.ar.md) |

## 🌟 主要機能

- 🎯 **6大AIエンジンサポート**: OpenRouter、Azure、Ollama、Volcengine、Bailian、GLM
- 🔄 **統一環境変数**: 1セットの設定で全エンジン共通
- 🌍 **グローバルモデル対応**: GPT、Claude、Qwen、GLM、DeepSeekなどの主流モデルをサポート
- 🏠 **ローカルAIサポート**: Ollamaローカルデプロイ、データ完全プライベート
- 🔧 **ゼロ設定切り替え**: 1つの環境変数でエンジン切り替え可能
- 📊 **完全機能**: ストリーミング/非ストリーミング、トークン計算、埋め込みベクトル全サポート

## 📦 インストール

```bash
npm install -g @catalystai/gemini-cli
```

## 🎛️ サポートAIエンジンとモデル

### 🌐 OpenRouter (マルチモデルルーティング)
**サポートモデル**: GPT-4、Claude、Llama、Mistralなど
- `anthropic/claude-3.5-sonnet` (デフォルト)
- `openai/gpt-4`
- `meta-llama/llama-3.1-8b-instruct`
- `mistralai/mistral-7b-instruct`

### ☁️ Azure OpenAI / Azure AI Foundry
**サポートモデル**: GPT-4、GPT-3.5、DALL-Eなど
- `gpt-4` (デフォルト)
- `gpt-3.5-turbo`
- `gpt-4-turbo`
- `dall-e-3`

### 🦙 Ollama (ローカルAI)
**サポートモデル**: Llama、Mistral、CodeLlamaなど
- `llama3.2:latest` (デフォルト)
- `mistral:latest`
- `codellama:latest`
- `qwen:latest`

### 🔥 Volcengine (デフォルトエンジン)
**サポートモデル**: DeepSeek V3、Qwenシリーズ、ChatGLM、Baichuanなど
- `deepseek-v3-250324` (デフォルト)
- `qwen-plus`
- `qwen-max`
- `chatglm-6b`

### 🌊 Bailian (阿里云百炼)
**サポートモデル**: 通义千问商業版、マルチモーダルモデル
- `qwen-plus` (デフォルト)
- `qwen-max`
- `qwen-vl-plus`

### 🧠 GLM (智谱AI)
**サポートモデル**: GLM-4、CogViewなど
- `glm-4` (デフォルト)
- `glm-4v`
- `cogview-3`

## ⚙️ 統一設定システム

### 🔧 推奨設定方法 (統一環境変数)

```bash
# 統一APIキー (全エンジン共通)
export AI_API_KEY="your-actual-api-key-from-your-ai-provider"

# 統一モデル名 (全エンジン共通)
export AI_MODEL="your-preferred-model-name"

# 統一Base URL (オプション、カスタム時のみ設定)
export AI_BASE_URL="your-custom-endpoint-url"

# エンジン選択 (1つの変数で全制御)
export AI_ENGINE="volcengine"  # オプション: openrouter, azure, ollama, volcengine, bailian, glm
```

### 🪟 Windows PowerShell 設定

```powershell
# 統一設定
$env:AI_API_KEY="your-actual-api-key-from-your-ai-provider"
$env:AI_MODEL="your-preferred-model-name"
$env:AI_ENGINE="volcengine"
```

### 🔧 エンジン固有設定 (オプション)

エンジン固有設定を使用する場合、システムは自動的に統一設定にフォールバックします：

```bash
# OpenRouter 固有設定  
export OPENROUTER_API_KEY="your-openrouter-api-key"
export OPENROUTER_MODEL="anthropic/claude-3.5-sonnet"

# Azure 固有設定
export AZURE_API_KEY="your-azure-openai-api-key"
export AZURE_BASE_URL="https://your-resource.openai.azure.com"
export AZURE_MODEL="gpt-4"

# Volcengine 固有設定
export VOLCENGINE_API_KEY="your-volcengine-api-key"
export VOLCENGINE_MODEL="deepseek-v3-250324"
```

## 🚀 使用方法

### 💬 直接質問モード

```bash
gemini "こんにちは、自己紹介をお願いします"
```

### 🔄 対話モード

```bash
gemini
```

その後「2. Use Gemini API Key」を選択してEnterを押し、チャットを開始してください。

## 🧪 各エンジンテスト例

### 🌐 OpenRouter テスト

```bash
# 統一設定を使用
export AI_API_KEY="your-openrouter-api-key"
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"

# テストコマンド
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### ☁️ Azure OpenAI テスト

```bash
# 統一設定を使用
export AI_API_KEY="your-azure-openai-api-key"
export AI_ENGINE="azure"
export AI_BASE_URL="https://your-resource.openai.azure.com"
export AI_MODEL="gpt-4"

# テストコマンド
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🦙 Ollama テスト (ローカルAI)

```bash
# 統一設定を使用
export AI_ENGINE="ollama"
export AI_BASE_URL="http://localhost:11434"
export AI_MODEL="llama3.2:latest"

# テストコマンド
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🔥 Volcengine テスト (デフォルトエンジン)

```bash
# 統一設定を使用
export AI_API_KEY="your-volcengine-api-key"
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"

# テストコマンド
gemini "自己紹介をお願いします。あなたはどのAIモデルですか？"
```

### 🌊 Bailian テスト

```bash
# 統一設定を使用
export AI_API_KEY="your-bailian-api-key"
export AI_ENGINE="bailian"
export AI_MODEL="qwen-plus"

# テストコマンド
gemini "自己紹介をお願いします。あなたはどのAIモデルですか？"
```

### 🧠 GLM テスト

```bash
# 統一設定を使用
export AI_API_KEY="your-glm-api-key"
export AI_ENGINE="glm"
export AI_MODEL="glm-4"

# テストコマンド
gemini "自己紹介をお願いします。あなたはどのAIモデルですか？"
```

## 🔧 高速エンジン切り替え

```bash
# OpenRouterのClaudeに切り替え
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"
gemini "Hello Claude!"

# AzureのGPT-4に切り替え
export AI_ENGINE="azure"
export AI_MODEL="gpt-4"
gemini "Hello GPT-4!"

# ローカルOllamaに切り替え
export AI_ENGINE="ollama"
export AI_MODEL="llama3.2:latest"
gemini "Hello Llama!"

# VolcengineのDeepSeekに切り替え
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"
gemini "Hello DeepSeek!"
```

## 🏗️ 技術アーキテクチャ

### 🎯 マルチエンジンファクトリーパターンアーキテクチャ

このプロジェクトは**ファクトリーパターン**設計を採用し、高度に拡張可能なマルチAIエンジンサポートを実現：

```
ContentGeneratorFactory
├── OpenrouterContentGenerator    (OpenRouter)
├── AzureContentGenerator         (Azure OpenAI)
├── OllamaContentGenerator        (Local Ollama)
├── VolcengineContentGenerator    (Volcengine)
├── BailianContentGenerator       (Alibaba Cloud Bailian)
└── GlmContentGenerator           (Zhipu AI GLM)
```

### 🔧 コア機能

✅ **6大AIエンジン**: ファクトリーパターンで全AIエンジンを統一管理  
✅ **統一環境変数**: `AI_API_KEY`、`AI_MODEL`、`AI_BASE_URL` 共通設定  
✅ **自動フォーマット変換**: Geminiフォーマットと各エンジンAPIフォーマットのシームレス変換  
✅ **ストリーミングレスポンスサポート**: 全エンジンがストリーミングと非ストリーミングレスポンスをサポート  
✅ **インテリジェントエラーハンドリング**: 30秒タイムアウト保護、詳細なエラーメッセージ  
✅ **設定優先度**: 統一設定 > エンジン固有設定 > デフォルト設定  
✅ **ゼロ設定切り替え**: 1つの環境変数でエンジン切り替え可能  

## 📋 ライセンス声明

このプロジェクトは [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) に基づいて開発され、Apache 2.0ライセンス要件に従います：

### 元のプロジェクト情報

- **元のプロジェクト**: Google Gemini CLI
- **元の著作権**: Copyright 2025 Google LLC  
- **元のライセンス**: Apache License 2.0
- **元のリポジトリ**: https://github.com/google-gemini/gemini-cli

### 修正声明

Apache 2.0ライセンス第4条要件に従って：

- ✅ 元のApache 2.0ライセンスを保持
- ✅ 元の著作権声明を保持
- ✅ すべての修正を明確にマーク
- ✅ 完全なライセンステキストを含める

## 🔄 元のGemini CLIからの移行

元のGoogle Gemini CLIから移行する場合：

1. **元のバージョンをアンインストール**: `npm uninstall -g @google/gemini-cli`
2. **このバージョンをインストール**: `npm install -g @catalystai/gemini-cli`
3. **APIキーを設定**: `export AI_API_KEY="your-actual-api-key"`
4. **エンジンを選択**: `export AI_ENGINE="volcengine"` (または他のエンジン)
5. **通常通り使用**: すべてのコマンドは変更なし

## 🧪 テストスクリプト

各エンジン用の即座に使用可能なテストスクリプトを提供。これらのスクリプトはプレースホルダーAPIキーを使用しているため、実際のキーに置き換える必要があります。

### 🚀 テストスクリプトの使用方法

#### Linux/macOS ユーザー

```bash
# スクリプトに実行権限を付与
chmod +x test-*.sh

# 単一エンジンテスト
./test-openrouter.sh
./test-azure.sh
./test-ollama.sh
./test-volcengine.sh
./test-bailian.sh
./test-glm.sh

# 全エンジンテスト
./test-all-engines.sh
```

#### Windows ユーザー

```powershell
# 単一エンジンテスト
.\test-volcengine.ps1
.\test-openrouter.ps1

# または直接実行
powershell -ExecutionPolicy Bypass -File test-volcengine.ps1
```

#### 設定

テストスクリプトを実行する前に、プレースホルダーAPIキーを実際のキーに置き換えてください：

```bash
# 任意のテストスクリプトを編集し、プレースホルダーAPIキーを置き換え
export AI_API_KEY="your-actual-api-key-from-your-ai-provider"
```

### 📋 利用可能なテストスクリプト

### 🌐 OpenRouter テストスクリプト

```bash
#!/bin/bash
# test-openrouter.sh
export AI_API_KEY="your-openrouter-api-key"
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"

echo "Testing OpenRouter with Claude 3.5 Sonnet..."
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### ☁️ Azure テストスクリプト

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

### 🦙 Ollama テストスクリプト

```bash
#!/bin/bash
# test-ollama.sh
export AI_ENGINE="ollama"
export AI_BASE_URL="http://localhost:11434"
export AI_MODEL="llama3.2:latest"

echo "Testing Ollama with Llama 3.2..."
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🔥 Volcengine テストスクリプト

```bash
#!/bin/bash
# test-volcengine.sh
export AI_API_KEY="your-volcengine-api-key"
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"

echo "Testing Volcengine with DeepSeek V3..."
gemini "自己紹介をお願いします。あなたはどのAIモデルですか？"
```

### 🌊 Bailian テストスクリプト

```bash
#!/bin/bash
# test-bailian.sh
export AI_API_KEY="your-bailian-api-key"
export AI_ENGINE="bailian"
export AI_MODEL="qwen-plus"

echo "Testing Bailian with Qwen Plus..."
gemini "自己紹介をお願いします。あなたはどのAIモデルですか？"
```

### 🧠 GLM テストスクリプト

```bash
#!/bin/bash
# test-glm.sh
export AI_API_KEY="your-glm-api-key"
export AI_ENGINE="glm"
export AI_MODEL="glm-4"

echo "Testing GLM with GLM-4..."
gemini "自己紹介をお願いします。あなたはどのAIモデルですか？"
```

### 🚀 全エンジンテストスクリプト

```bash
#!/bin/bash
# test-all-engines.sh

# テスト関数
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

# 全エンジンテスト
echo "🌐 Testing OpenRouter (Claude 3.5 Sonnet)..."
test_engine "openrouter" "anthropic/claude-3.5-sonnet" "your-openrouter-api-key" "" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

echo "☁️ Testing Azure OpenAI (GPT-4)..."
test_engine "azure" "gpt-4" "your-azure-openai-api-key" "https://your-resource.openai.azure.com" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

echo "🦙 Testing Ollama (Llama 3.2)..."
test_engine "ollama" "llama3.2:latest" "" "http://localhost:11434" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

echo "🔥 Testing Volcengine (DeepSeek V3)..."
test_engine "volcengine" "deepseek-v3-250324" "your-volcengine-api-key" "" "自己紹介をお願いします。あなたはどのAIモデルですか？日本語でお答えください。"

echo "🌊 Testing Bailian (Qwen Plus)..."
test_engine "bailian" "qwen-plus" "your-bailian-api-key" "" "自己紹介をお願いします。あなたはどのAIモデルですか？日本語でお答えください。"

echo "🧠 Testing GLM (GLM-4)..."
test_engine "glm" "glm-4" "your-glm-api-key" "" "自己紹介をお願いします。あなたはどのAIモデルですか？日本語でお答えください。"

echo "✅ All engines tested!"
```

## 🔗 関連リンク

- [元のプロジェクト (Google Gemini CLI)](https://github.com/google-gemini/gemini-cli)
- [OpenRouter](https://openrouter.ai/)
- [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- [Ollama](https://ollama.ai/)
- [火山引擎AI平台](https://www.volcengine.com/products/ai)
- [阿里云百炼](https://bailian.console.aliyun.com/)
- [智谱AI](https://www.zhipuai.cn/)
- [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

## 🐛 問題報告

何か問題が発生した場合は、[GitHub Issues](https://github.com/chameleon-nexus/gemini-cli/issues) で報告してください。

## 🤝 貢献ガイド

コード貢献を歓迎します！以下の点を確認してください：

1. 元のプロジェクトのコードスタイルに従う
2. 適切なテストを含める
3. 関連ドキュメントを更新する
4. Apache 2.0ライセンス条項を遵守する

## 📝 更新ログ

### v0.0.3 (現在のバージョン)
- ✨ **阿里云百炼サポート追加** - OpenAI互換モード
- ✨ **Azure AI Foundryサポート** - 新しいサービスエンドポイント
- ✨ **統一環境変数システム** - `AI_API_KEY`、`AI_MODEL`、`AI_BASE_URL`
- ✨ **Ollamaアダプター最適化** - 真のストリーミング処理
- ✨ **GLMアダプター完成** - 智谱AI GLM-4サポート
- 🔧 **設定優先度最適化** - 統一設定 > エンジン固有設定
- 📚 **完全テストスクリプト** - 各エンジンに独立したテストスクリプト
- 🐛 **エラーハンドリング改善** - よりフレンドリーなエラーメッセージ

### v0.0.2
- ✨ **マルチエンジンサポート** - OpenRouter、Azure、DashScope、GLM、Ollama
- ✨ **ファクトリーパターンアーキテクチャ** - 高度に拡張可能な設計
- ✨ **ストリーミングレスポンスサポート** - 全エンジンがストリーミング処理をサポート
- 📚 **詳細ドキュメント** - マルチエンジン使用ガイド

### v0.0.1
- 🎉 **初期バージョン** - 火山引擎AI統合
- ✨ **完全互換性** - 元のGemini CLIと完全互換
- 🔧 **環境変数設定** - 柔軟な設定オプション
- 🇨🇳 **中国語最適化** - 中国語対話に最適化

## 🌟 プロジェクトハイライト

- 🚀 **世界初**: 6大AIエンジンをサポートする最初の統一CLIツール
- 🎯 **ゼロ学習コスト**: 1つのコマンドで全モデル
- 🔄 **インテリジェント切り替え**: 環境変数制御、秒単位でエンジン切り替え
- 🌍 **グローバル対応**: 中国・米国・欧州の主流AIモデルをサポート
- 🏠 **ローカルサポート**: Ollamaローカルデプロイ、データ完全プライベート
- 📊 **エンタープライズグレード**: 完全なエラーハンドリングと設定管理

---

**免責事項**: このプロジェクトはGoogle、OpenRouter、Azure、Ollama、Volcengine、阿里云、智谱AIなどの会社とは関係ありません。使用時は各プラットフォームのサービス条項を遵守してください。