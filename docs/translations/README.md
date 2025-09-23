# Multi-Language README Documentation

Welcome to the multi-language documentation for Gemini CLI (CatalystAI Edition)! This directory contains README files in different languages to help users worldwide understand and use this powerful multi-engine AI platform.

## 📚 Available Languages / 可用语言 / 利用可能な言語 / Verfügbare Sprachen / Ngôn ngữ có sẵn / اللغات المتاحة

| Language | File | Description |
|----------|------|-------------|
| 🇺🇸 **English** | [README.en.md](./README.en.md) | Original English documentation (main) |
| 🇨🇳 **中文** | [README.zh.md](./README.zh.md) | Chinese Simplified documentation |
| 🇯🇵 **日本語** | [README.ja.md](./README.ja.md) | Japanese documentation |
| 🇩🇪 **Deutsch** | [README.de.md](./README.de.md) | German documentation |
| 🇻🇳 **Tiếng Việt** | [README.vi.md](./README.vi.md) | Vietnamese documentation |
| 🇸🇦 **العربية** | [README.ar.md](./README.ar.md) | Arabic documentation |

## 🚀 Quick Start / 快速开始 / クイックスタート / Schnellstart / Bắt đầu nhanh / البدء السريع

### English
```bash
npm install -g @catalystai/gemini-cli
export AI_API_KEY="your-actual-api-key"
export AI_ENGINE="volcengine"
gemini "Hello, world!"
```

### 中文
```bash
npm install -g @catalystai/gemini-cli
export AI_API_KEY="your-actual-api-key"
export AI_ENGINE="volcengine"
gemini "你好，世界！"
```

### 日本語
```bash
npm install -g @catalystai/gemini-cli
export AI_API_KEY="your-actual-api-key"
export AI_ENGINE="volcengine"
gemini "こんにちは、世界！"
```

### Deutsch
```bash
npm install -g @catalystai/gemini-cli
export AI_API_KEY="your-actual-api-key"
export AI_ENGINE="volcengine"
gemini "Hallo, Welt!"
```

### Tiếng Việt
```bash
npm install -g @catalystai/gemini-cli
export AI_API_KEY="your-actual-api-key"
export AI_ENGINE="volcengine"
gemini "Xin chào, thế giới!"
```

### العربية
```bash
npm install -g @catalystai/gemini-cli
export AI_API_KEY="your-actual-api-key"
export AI_ENGINE="volcengine"
gemini "مرحباً بالعالم!"
```

## 🌟 Supported AI Engines / 支持的AI引擎 / サポートされているAIエンジン / Unterstützte AI-Engines / Động cơ AI được hỗ trợ / محركات AI المدعومة

| Engine | Models | Language Support |
|--------|--------|------------------|
| 🌐 **OpenRouter** | Claude, GPT-4, Llama, Mistral | Global |
| ☁️ **Azure OpenAI** | GPT-4, GPT-3.5, DALL-E | Global |
| 🦙 **Ollama** | Llama, Mistral, CodeLlama | Local |
| 🔥 **Volcengine** | DeepSeek V3, Qwen, ChatGLM | Chinese |
| 🌊 **Bailian** | Qwen Plus/Max, VL Models | Chinese |
| 🧠 **GLM** | GLM-4, CogView | Chinese |

## 🔧 Configuration / 配置 / 設定 / Konfiguration / Cấu hình / الإعداد

### Unified Environment Variables / 统一环境变量 / 統一環境変数 / Einheitliche Umgebungsvariablen / Biến môi trường thống nhất / متغيرات البيئة الموحدة

```bash
# Universal configuration for all engines
# 所有引擎的通用配置
# すべてのエンジンで使用できる設定
# Universelle Konfiguration für alle Engines
# Cấu hình phổ quát cho tất cả động cơ
# إعداد عالمي لجميع المحركات

export AI_API_KEY="your-actual-api-key-from-your-ai-provider"
export AI_MODEL="your-preferred-model-name"
export AI_ENGINE="volcengine"  # openrouter, azure, ollama, volcengine, bailian, glm
```

## 🧪 Testing / 测试 / テスト / Testen / Kiểm tra / الاختبار

### Test Scripts / 测试脚本 / テストスクリプト / Testskripte / Script kiểm tra / نصوص الاختبار

```bash
# Linux/macOS
chmod +x test-*.sh
./test-volcengine.sh

# Windows
.\test-volcengine.ps1
```

## 📖 Documentation Structure / 文档结构 / ドキュメント構造 / Dokumentationsstruktur / Cấu trúc tài liệu / هيكل الوثائق

Each language version includes:

- 🌟 **Core Features** / 核心特性 / コア機能 / Hauptfunktionen / Tính năng chính / الميزات الأساسية
- 📦 **Installation** / 安装 / インストール / Installation / Cài đặt / التثبيت
- 🎛️ **Supported Engines** / 支持的引擎 / サポートエンジン / Unterstützte Engines / Động cơ được hỗ trợ / المحركات المدعومة
- ⚙️ **Configuration** / 配置 / 設定 / Konfiguration / Cấu hình / الإعداد
- 🚀 **Usage** / 使用方法 / 使用方法 / Verwendung / Sử dụng / الاستخدام
- 🧪 **Testing** / 测试 / テスト / Testen / Kiểm tra / الاختبار

## 🤝 Contributing / 贡献 / 貢献 / Beitragen / Đóng góp / المساهمة

We welcome contributions to improve translations! Please:

1. **Fork the repository** / 分叉仓库 / リポジトリをフォーク / Repository forken / Fork kho lưu trữ / انقسام المستودع
2. **Edit the translation** / 编辑翻译 / 翻訳を編集 / Übersetzung bearbeiten / Chỉnh sửa bản dịch / تحرير الترجمة
3. **Submit a pull request** / 提交拉取请求 / プルリクエストを送信 / Pull Request einreichen / Gửi pull request / إرسال طلب السحب

## 📝 License / 许可证 / ライセンス / Lizenz / Giấy phép / الترخيص

This project is based on [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) and follows the Apache 2.0 License requirements.

- **Original Project**: Google Gemini CLI
- **Original Copyright**: Copyright 2025 Google LLC
- **Original License**: Apache License 2.0

## 🔗 Links / 链接 / リンク / Links / Liên kết / الروابط

- [Main Repository](https://github.com/chameleon-nexus/gemini-cli)
- [Original Project](https://github.com/google-gemini/gemini-cli)
- [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

---

**Disclaimer / 免责声明 / 免責事項 / Haftungsausschluss / Tuyên bố từ chối trách nhiệm / إخلاء المسؤولية**: This project is not affiliated with Google, OpenRouter, Azure, Ollama, Volcengine, Alibaba Cloud, Zhipu AI, or other companies. Please follow the respective platform terms of service when using this software.
