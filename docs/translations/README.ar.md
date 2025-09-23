# Gemini CLI (CatalystAI Edition) - منصة AI متعددة المحركات

**🚀 أول أداة CLI موحدة في العالم تدعم 6 محركات AI رئيسية - أمر واحد، جميع النماذج**

## 🌟 الميزات الأساسية

- 🎯 **6 محركات AI رئيسية**: OpenRouter، Azure، Ollama، Volcengine، Bailian، GLM
- 🔄 **متغيرات البيئة الموحدة**: إعداد واحد لجميع المحركات
- 🌍 **تغطية النماذج العالمية**: يدعم GPT، Claude، Qwen، GLM، DeepSeek والنماذج الرئيسية الأخرى
- 🏠 **دعم AI المحلي**: نشر Ollama محلياً مع خصوصية البيانات الكاملة

## 📦 التثبيت

```bash
npm install -g @catalystai/gemini-cli
```

## 🎛️ محركات AI والنماذج المدعومة

### 🌐 OpenRouter (موجه النماذج المتعددة)
- `anthropic/claude-3.5-sonnet` (افتراضي)
- `openai/gpt-4`
- `meta-llama/llama-3.1-8b-instruct`

### ☁️ Azure OpenAI
- `gpt-4` (افتراضي)
- `gpt-3.5-turbo`
- `gpt-4-turbo`

### 🦙 Ollama (AI محلي)
- `llama3.2:latest` (افتراضي)
- `mistral:latest`
- `codellama:latest`

### 🔥 Volcengine (المحرك الافتراضي)
- `deepseek-v3-250324` (افتراضي)
- `qwen-plus`
- `qwen-max`

### 🌊 Bailian (Alibaba Cloud Bailian)
- `qwen-plus` (افتراضي)
- `qwen-max`
- `qwen-vl-plus`

### 🧠 GLM (Zhipu AI)
- `glm-4` (افتراضي)
- `glm-4v`
- `cogview-3`

## 🚀 الاستخدام

```bash
# إعداد مفتاح API الموحد
export AI_API_KEY="your-actual-api-key-from-your-ai-provider"
export AI_MODEL="your-preferred-model-name"
export AI_ENGINE="volcengine"  # الخيارات: openrouter, azure, ollama, volcengine, bailian, glm

# البدء في الاستخدام
gemini "مرحباً، يرجى تقديم نفسك"
```

## 🔧 تبديل المحرك السريع

```bash
# التبديل إلى OpenRouter مع Claude
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"
gemini "Hello Claude!"

# التبديل إلى Azure مع GPT-4
export AI_ENGINE="azure"
export AI_MODEL="gpt-4"
gemini "Hello GPT-4!"

# التبديل إلى Ollama المحلي
export AI_ENGINE="ollama"
export AI_MODEL="llama3.2:latest"
gemini "Hello Llama!"
```

## 🧪 نصوص الاختبار

```bash
# Linux/macOS
chmod +x test-*.sh
./test-volcengine.sh

# Windows
.\test-volcengine.ps1
```

## 🔗 الروابط ذات الصلة

- [GitHub Repository](https://github.com/chameleon-nexus/gemini-cli)
- [المشروع الأصلي](https://github.com/google-gemini/gemini-cli)
- [ترخيص Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)

## 📋 الامتثال للترخيص

يعتمد هذا المشروع على [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) ويتبع متطلبات ترخيص Apache 2.0.

---

**إخلاء المسؤولية**: هذا المشروع غير مرتبط بـ Google، OpenRouter، Azure، Ollama، Volcengine، Alibaba Cloud، Zhipu AI أو أي شركات أخرى.
