# Gemini CLI (CatalystAI Edition) - منصة الذكاء الاصطناعي متعددة المحركات

[![npm version](https://badge.fury.io/js/%40catalystai%2Fgemini-cli.svg)](https://badge.fury.io/js/%40catalystai%2Fgemini-cli)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**🚀 أول أداة CLI موحدة في العالم تدعم 6 محركات ذكاء اصطناعي كبيرة - أمر واحد، جميع النماذج**

> ⚠️ **إعلان مهم**: هذه نسخة معدلة من [Google Gemini CLI](https://github.com/google-gemini/gemini-cli). المشروع الأصلي محمي بحقوق الطبع والنشر لشركة Google LLC ويتبع ترخيص Apache 2.0.

## 🌐 تبديل اللغة / Language Switch

| 🇺🇸 [English](../README.md) | 🇨🇳 [中文](README.zh.md) | 🇯🇵 [日本語](README.ja.md) | 🇩🇪 [Deutsch](README.de.md) | 🇻🇳 [Tiếng Việt](README.vi.md) | 🇸🇦 **العربية** |

## 🌟 الميزات الرئيسية

- 🎯 **دعم 6 محركات ذكاء اصطناعي كبيرة**: OpenRouter、Azure、Ollama、Volcengine、Bailian、GLM
- 🔄 **متغيرات بيئة موحدة**: مجموعة إعدادات واحدة لجميع المحركات
- 🌍 **تغطية نماذج عالمية**: يدعم GPT、Claude、Qwen、GLM、DeepSeek والنماذج الرئيسية الأخرى
- 🏠 **دعم الذكاء الاصطناعي المحلي**: نشر Ollama محلي، البيانات خاصة تماماً
- 🔧 **تبديل بدون إعداد**: متغير بيئة واحد لتبديل المحرك
- 📊 **وظائف كاملة**: دعم كامل للتدفق/غير المتدفق، حساب الرموز، متجهات التضمين

## 📦 التثبيت

```bash
npm install -g @catalystai/gemini-cli
```

## 🎛️ محركات الذكاء الاصطناعي والنماذج المدعومة

### 🌐 OpenRouter (توجيه متعدد النماذج)
**النماذج المدعومة**: GPT-4、Claude、Llama、Mistral等
- `anthropic/claude-3.5-sonnet` (افتراضي)
- `openai/gpt-4`
- `meta-llama/llama-3.1-8b-instruct`
- `mistralai/mistral-7b-instruct`

### ☁️ Azure OpenAI / Azure AI Foundry
**النماذج المدعومة**: GPT-4、GPT-3.5、DALL-E等
- `gpt-4` (افتراضي)
- `gpt-3.5-turbo`
- `gpt-4-turbo`
- `dall-e-3`

### 🦙 Ollama (ذكاء اصطناعي محلي)
**النماذج المدعومة**: Llama、Mistral、CodeLlama等
- `llama3.2:latest` (افتراضي)
- `mistral:latest`
- `codellama:latest`
- `qwen:latest`

### 🔥 Volcengine (المحرك الافتراضي)
**النماذج المدعومة**: DeepSeek V3、سلسلة Qwen、ChatGLM、Baichuan等
- `deepseek-v3-250324` (افتراضي)
- `qwen-plus`
- `qwen-max`
- `chatglm-6b`

### 🌊 Bailian (阿里云百炼)
**النماذج المدعومة**: 通义千问商业版、多模态模型
- `qwen-plus` (افتراضي)
- `qwen-max`
- `qwen-vl-plus`

### 🧠 GLM (智谱AI)
**النماذج المدعومة**: GLM-4、CogView等
- `glm-4` (افتراضي)
- `glm-4v`
- `cogview-3`

## ⚙️ نظام التكوين الموحد

### 🔧 طريقة التكوين الموصى بها (متغيرات البيئة الموحدة)

```bash
# مفتاح API موحد (مشترك لجميع المحركات)
export AI_API_KEY="your-actual-api-key-from-your-ai-provider"

# اسم النموذج الموحد (مشترك لجميع المحركات)
export AI_MODEL="your-preferred-model-name"

# Base URL الموحد (اختياري، مطلوب فقط عند التخصيص)
export AI_BASE_URL="your-custom-endpoint-url"

# اختيار المحرك (متغير واحد يتحكم في كل شيء)
export AI_ENGINE="volcengine"  # خيارات: openrouter, azure, ollama, volcengine, bailian, glm
```

### 🪟 تكوين Windows PowerShell

```powershell
# تكوين موحد
$env:AI_API_KEY="your-actual-api-key-from-your-ai-provider"
$env:AI_MODEL="your-preferred-model-name"
$env:AI_ENGINE="volcengine"
```

### 🔧 تكوين خاص بالمحرك (اختياري)

إذا كنت تستخدم تكويناً خاصاً بالمحرك، سيعود النظام تلقائياً إلى التكوين الموحد：

```bash
# تكوين خاص بـ OpenRouter  
export OPENROUTER_API_KEY="your-openrouter-api-key"
export OPENROUTER_MODEL="anthropic/claude-3.5-sonnet"

# تكوين خاص بـ Azure
export AZURE_API_KEY="your-azure-openai-api-key"
export AZURE_BASE_URL="https://your-resource.openai.azure.com"
export AZURE_MODEL="gpt-4"

# تكوين خاص بـ Volcengine
export VOLCENGINE_API_KEY="your-volcengine-api-key"
export VOLCENGINE_MODEL="deepseek-v3-250324"
```

## 🚀 طريقة الاستخدام

### 💬 وضع السؤال المباشر

```bash
gemini "مرحباً، من فضلك عرف بنفسك"
```

### 🔄 الوضع التفاعلي

```bash
gemini
```

ثم اختر "2. Use Gemini API Key" واضغط Enter لبدء المحادثة.

## 🧪 أمثلة اختبار المحركات

### 🌐 اختبار OpenRouter

```bash
# استخدام التكوين الموحد
export AI_API_KEY="your-openrouter-api-key"
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"

# أمر الاختبار
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### ☁️ اختبار Azure OpenAI

```bash
# استخدام التكوين الموحد
export AI_API_KEY="your-azure-openai-api-key"
export AI_ENGINE="azure"
export AI_BASE_URL="https://your-resource.openai.azure.com"
export AI_MODEL="gpt-4"

# أمر الاختبار
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🦙 اختبار Ollama (ذكاء اصطناعي محلي)

```bash
# استخدام التكوين الموحد
export AI_ENGINE="ollama"
export AI_BASE_URL="http://localhost:11434"
export AI_MODEL="llama3.2:latest"

# أمر الاختبار
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🔥 اختبار Volcengine (المحرك الافتراضي)

```bash
# استخدام التكوين الموحد
export AI_API_KEY="your-volcengine-api-key"
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"

# أمر الاختبار
gemini "من فضلك عرف بنفسك وأخبرني أي نموذج ذكاء اصطناعي أنت."
```

### 🌊 اختبار Bailian

```bash
# استخدام التكوين الموحد
export AI_API_KEY="your-bailian-api-key"
export AI_ENGINE="bailian"
export AI_MODEL="qwen-plus"

# أمر الاختبار
gemini "من فضلك عرف بنفسك وأخبرني أي نموذج ذكاء اصطناعي أنت."
```

### 🧠 اختبار GLM

```bash
# استخدام التكوين الموحد
export AI_API_KEY="your-glm-api-key"
export AI_ENGINE="glm"
export AI_MODEL="glm-4"

# أمر الاختبار
gemini "من فضلك عرف بنفسك وأخبرني أي نموذج ذكاء اصطناعي أنت."
```

## 🔧 تبديل سريع للمحرك

```bash
# التبديل إلى OpenRouter Claude
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"
gemini "Hello Claude!"

# التبديل إلى Azure GPT-4
export AI_ENGINE="azure"
export AI_MODEL="gpt-4"
gemini "Hello GPT-4!"

# التبديل إلى Ollama المحلي
export AI_ENGINE="ollama"
export AI_MODEL="llama3.2:latest"
gemini "Hello Llama!"

# التبديل إلى Volcengine DeepSeek
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"
gemini "Hello DeepSeek!"
```

## 🏗️ العمارة التقنية

### 🎯 عمارة نمط المصنع متعدد المحركات

يستخدم هذا المشروع تصميم**نمط المصنع**، ويحقق دعم محركات الذكاء الاصطناعي متعددة قابلة للتوسع بشكل كبير：

```
ContentGeneratorFactory
├── OpenrouterContentGenerator    (OpenRouter)
├── AzureContentGenerator         (Azure OpenAI)
├── OllamaContentGenerator        (Local Ollama)
├── VolcengineContentGenerator    (Volcengine)
├── BailianContentGenerator       (Alibaba Cloud Bailian)
└── GlmContentGenerator           (Zhipu AI GLM)
```

### 🔧 الوظائف الأساسية

✅ **6 محركات ذكاء اصطناعي كبيرة**: إدارة موحدة لجميع محركات الذكاء الاصطناعي من خلال نمط المصنع  
✅ **متغيرات البيئة الموحدة**: `AI_API_KEY`、`AI_MODEL`、`AI_BASE_URL` تكوين مشترك  
✅ **تحويل التنسيق التلقائي**: تحويل سلس بين تنسيق Gemini وتنسيقات API للمحركات المختلفة  
✅ **دعم الاستجابة المتدفقة**: جميع المحركات تدعم الاستجابات المتدفقة وغير المتدفقة  
✅ **معالجة الأخطاء الذكية**: حماية انتهاء مهلة 30 ثانية، رسائل خطأ مفصلة  
✅ **أولوية التكوين**: تكوين موحد > تكوين خاص بالمحرك > تكوين افتراضي  
✅ **تبديل بدون إعداد**: تبديل المحرك بمتغير بيئة واحد  

## 📋 بيان الترخيص

تم تطوير هذا المشروع بناءً على [Google Gemini CLI](https://github.com/google-gemini/gemini-cli)، ويتبع متطلبات ترخيص Apache 2.0：

### معلومات المشروع الأصلي

- **المشروع الأصلي**: Google Gemini CLI
- **حقوق الطبع والنشر الأصلية**: Copyright 2025 Google LLC  
- **الترخيص الأصلي**: Apache License 2.0
- **المستودع الأصلي**: https://github.com/google-gemini/gemini-cli

### بيان التعديل

وفقاً لمتطلبات ترخيص Apache 2.0 المادة 4：

- ✅ الاحتفاظ بترخيص Apache 2.0 الأصلي
- ✅ الاحتفاظ ببيان حقوق الطبع والنشر الأصلي
- ✅ تمييز جميع التعديلات بوضوح
- ✅ تضمين نص الترخيص الكامل

## 🔄 الهجرة من Gemini CLI الأصلي

إذا كنت تهاجر من Google Gemini CLI الأصلي：

1. **إلغاء تثبيت الإصدار الأصلي**: `npm uninstall -g @google/gemini-cli`
2. **تثبيت هذا الإصدار**: `npm install -g @catalystai/gemini-cli`
3. **تعيين مفتاح API**: `export AI_API_KEY="your-actual-api-key"`
4. **اختيار المحرك**: `export AI_ENGINE="volcengine"` (أو محرك آخر)
5. **الاستخدام العادي**: جميع الأوامر تبقى دون تغيير

## 🧪 سكريبت الاختبار

يوفر سكريبت اختبار جاهز للاستخدام لكل محرك. تستخدم هذه السكريبت مفاتيح API مؤقتة، تحتاج إلى استبدالها بمفاتيح حقيقية.

### 🚀 طريقة استخدام سكريبت الاختبار

#### مستخدمو Linux/macOS

```bash
# إعطاء صلاحيات التنفيذ للسكريبت
chmod +x test-*.sh

# اختبار محرك واحد
./test-openrouter.sh
./test-azure.sh
./test-ollama.sh
./test-volcengine.sh
./test-bailian.sh
./test-glm.sh

# اختبار جميع المحركات
./test-all-engines.sh
```

#### مستخدمو Windows

```powershell
# اختبار محرك واحد
.\test-volcengine.ps1
.\test-openrouter.ps1

# أو التشغيل المباشر
powershell -ExecutionPolicy Bypass -File test-volcengine.ps1
```

#### التكوين

قبل تشغيل سكريبت الاختبار، استبدل مفاتيح API المؤقتة بمفاتيح حقيقية：

```bash
# تحرير أي سكريبت اختبار واستبدال مفتاح API المؤقت
export AI_API_KEY="your-actual-api-key-from-your-ai-provider"
```

### 📋 سكريبت الاختبار المتاحة

### 🌐 سكريبت اختبار OpenRouter

```bash
#!/bin/bash
# test-openrouter.sh
export AI_API_KEY="your-openrouter-api-key"
export AI_ENGINE="openrouter"
export AI_MODEL="anthropic/claude-3.5-sonnet"

echo "Testing OpenRouter with Claude 3.5 Sonnet..."
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### ☁️ سكريبت اختبار Azure

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

### 🦙 سكريبت اختبار Ollama

```bash
#!/bin/bash
# test-ollama.sh
export AI_ENGINE="ollama"
export AI_BASE_URL="http://localhost:11434"
export AI_MODEL="llama3.2:latest"

echo "Testing Ollama with Llama 3.2..."
gemini "Hello, please introduce yourself and tell me which AI model you are."
```

### 🔥 سكريبت اختبار Volcengine

```bash
#!/bin/bash
# test-volcengine.sh
export AI_API_KEY="your-volcengine-api-key"
export AI_ENGINE="volcengine"
export AI_MODEL="deepseek-v3-250324"

echo "Testing Volcengine with DeepSeek V3..."
gemini "من فضلك عرف بنفسك وأخبرني أي نموذج ذكاء اصطناعي أنت."
```

### 🌊 سكريبت اختبار Bailian

```bash
#!/bin/bash
# test-bailian.sh
export AI_API_KEY="your-bailian-api-key"
export AI_ENGINE="bailian"
export AI_MODEL="qwen-plus"

echo "Testing Bailian with Qwen Plus..."
gemini "من فضلك عرف بنفسك وأخبرني أي نموذج ذكاء اصطناعي أنت."
```

### 🧠 سكريبت اختبار GLM

```bash
#!/bin/bash
# test-glm.sh
export AI_API_KEY="your-glm-api-key"
export AI_ENGINE="glm"
export AI_MODEL="glm-4"

echo "Testing GLM with GLM-4..."
gemini "من فضلك عرف بنفسك وأخبرني أي نموذج ذكاء اصطناعي أنت."
```

### 🚀 سكريبت اختبار جميع المحركات

```bash
#!/bin/bash
# test-all-engines.sh

# دالة الاختبار
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

# اختبار جميع المحركات
echo "🌐 Testing OpenRouter (Claude 3.5 Sonnet)..."
test_engine "openrouter" "anthropic/claude-3.5-sonnet" "your-openrouter-api-key" "" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

echo "☁️ Testing Azure OpenAI (GPT-4)..."
test_engine "azure" "gpt-4" "your-azure-openai-api-key" "https://your-resource.openai.azure.com" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

echo "🦙 Testing Ollama (Llama 3.2)..."
test_engine "ollama" "llama3.2:latest" "" "http://localhost:11434" "Hello, please introduce yourself and tell me which AI model you are. Please respond in English."

echo "🔥 Testing Volcengine (DeepSeek V3)..."
test_engine "volcengine" "deepseek-v3-250324" "your-volcengine-api-key" "" "من فضلك عرف بنفسك وأخبرني أي نموذج ذكاء اصطناعي أنت. من فضلك أجب باللغة العربية."

echo "🌊 Testing Bailian (Qwen Plus)..."
test_engine "bailian" "qwen-plus" "your-bailian-api-key" "" "من فضلك عرف بنفسك وأخبرني أي نموذج ذكاء اصطناعي أنت. من فضلك أجب باللغة العربية."

echo "🧠 Testing GLM (GLM-4)..."
test_engine "glm" "glm-4" "your-glm-api-key" "" "من فضلك عرف بنفسك وأخبرني أي نموذج ذكاء اصطناعي أنت. من فضلك أجب باللغة العربية."

echo "✅ All engines tested!"
```

## 🔗 الروابط ذات الصلة

- [المشروع الأصلي (Google Gemini CLI)](https://github.com/google-gemini/gemini-cli)
- [OpenRouter](https://openrouter.ai/)
- [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- [Ollama](https://ollama.ai/)
- [火山引擎AI平台](https://www.volcengine.com/products/ai)
- [阿里云百炼](https://bailian.console.aliyun.com/)
- [智谱AI](https://www.zhipuai.cn/)
- [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

## 🐛 الإبلاغ عن المشاكل

إذا واجهت أي مشاكل، يرجى الإبلاغ عنها في [GitHub Issues](https://github.com/chameleon-nexus/gemini-cli/issues).

## 🤝 دليل المساهمة

نرحب بمساهمات الكود! يرجى التأكد من：

1. اتباع أسلوب الكود للمشروع الأصلي
2. تضمين اختبارات مناسبة
3. تحديث الوثائق ذات الصلة
4. الالتزام بشروط ترخيص Apache 2.0

## 📝 سجل التحديثات

### v0.0.3 (الإصدار الحالي)
- ✨ **إضافة دعم阿里云百炼** - وضع التوافق مع OpenAI
- ✨ **دعم Azure AI Foundry** - نقطة نهاية خدمة جديدة
- ✨ **نظام متغيرات البيئة الموحد** - `AI_API_KEY`、`AI_MODEL`、`AI_BASE_URL`
- ✨ **تحسين محول Ollama** - معالجة متدفقة حقيقية
- ✨ **إكمال محول GLM** - دعم智谱AI GLM-4
- 🔧 **تحسين أولوية التكوين** - تكوين موحد > تكوين خاص بالمحرك
- 📚 **سكريبت اختبار كامل** - سكريبت اختبار مستقل لكل محرك
- 🐛 **تحسين معالجة الأخطاء** - رسائل خطأ أكثر ودية

### v0.0.2
- ✨ **دعم متعدد المحركات** - OpenRouter、Azure、DashScope、GLM、Ollama
- ✨ **عمارة نمط المصنع** - تصميم قابل للتوسع بشكل كبير
- ✨ **دعم الاستجابة المتدفقة** - جميع المحركات تدعم المعالجة المتدفقة
- 📚 **وثائق مفصلة** - دليل استخدام متعدد المحركات

### v0.0.1
- 🎉 **الإصدار الأول** - تكامل火山引擎AI
- ✨ **توافق كامل** - متوافق تماماً مع Gemini CLI الأصلي
- 🔧 **تكوين متغيرات البيئة** - خيارات تكوين مرنة
- 🇨🇳 **تحسين اللغة الصينية** - محسن للمحادثات الصينية

## 🌟 نقاط تميز المشروع

- 🚀 **الأول في العالم**: أول أداة CLI موحدة تدعم 6 محركات ذكاء اصطناعي كبيرة
- 🎯 **تكلفة تعلم صفر**: أمر واحد، جميع النماذج
- 🔄 **تبديل ذكي**: تحكم متغيرات البيئة، تبديل المحرك في ثوانٍ
- 🌍 **تغطية عالمية**: يدعم نماذج الذكاء الاصطناعي الرئيسية من الصين وأمريكا وأوروبا
- 🏠 **دعم محلي**: نشر Ollama محلي، البيانات خاصة تماماً
- 📊 **مستوى المؤسسات**: معالجة أخطاء وإدارة تكوين كاملة

---

**إخلاء المسؤولية**: هذا المشروع لا علاقة له بـ Google أو OpenRouter أو Azure أو Ollama أو Volcengine أو 阿里云 أو 智谱AI أو شركات أخرى. يرجى الالتزام بشروط الخدمة لكل منصة عند الاستخدام.