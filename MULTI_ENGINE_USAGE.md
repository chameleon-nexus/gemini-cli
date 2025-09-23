# 多引擎适配使用指南

本项目现在支持多AI引擎适配，通过环境变量可以轻松切换不同的AI服务提供商。

## 🚀 支持的引擎

| 引擎 | 环境变量值 | 状态 | 说明 |
|------|------------|------|------|
| Google Gemini | `gemini` | ✅ 支持 | 默认引擎，使用Google官方SDK |
| 火山引擎 | `volcengine` | ✅ 支持 | 支持DeepSeek等模型 |
| OpenAI | `openai` | 🚧 开发中 | 计划支持 |

## 🔧 配置方法

### 1. 设置环境变量

#### Windows (PowerShell)
```powershell
# 使用火山引擎
$env:AI_ENGINE="volcengine"
$env:VOLCENGINE_API_KEY="your-volcengine-api-key"

# 使用Google Gemini
$env:AI_ENGINE="gemini"
$env:GEMINI_API_KEY="your-gemini-api-key"
```

#### Linux/macOS (Bash)
```bash
# 使用火山引擎
export AI_ENGINE="volcengine"
export VOLCENGINE_API_KEY="your-volcengine-api-key"

# 使用Google Gemini
export AI_ENGINE="gemini"
export GEMINI_API_KEY="your-gemini-api-key"
```

### 2. 环境变量说明

#### 通用配置
- `AI_ENGINE`: 指定使用的AI引擎 (`gemini`, `volcengine`, `openai`)
- `AI_ENGINE_DEBUG`: 启用调试模式 (`true`/`false`)

#### 火山引擎配置
- `VOLCENGINE_API_KEY`: 火山引擎API密钥
- `VOLCENGINE_BASE_URL`: API地址 (默认: `https://ark.cn-beijing.volces.com/api/v3`)
- `VOLCENGINE_MODEL`: 模型名称 (默认: `deepseek-v3-250324`)

#### Google Gemini配置
- `GEMINI_API_KEY`: Gemini API密钥 (或使用 `GOOGLE_API_KEY`)
- `GEMINI_MODEL`: 模型名称 (默认: `gemini-1.5-flash`)

## 📝 使用示例

### 基本使用
```bash
# 使用默认引擎 (Gemini)
gemini "你好，请介绍一下自己"

# 切换到火山引擎
export AI_ENGINE="volcengine"
gemini "你好，请介绍一下自己"
```

### 交互模式
```bash
# 启动交互模式，会使用当前配置的引擎
gemini
```

## 🏗️ 架构设计

### 工厂模式
项目采用工厂模式来管理不同的AI引擎：

```typescript
// 根据环境变量自动创建对应的ContentGenerator
const contentGenerator = ContentGeneratorFactory.createContentGenerator();
```

### 支持的引擎检查
```typescript
// 检查引擎是否支持
if (ContentGeneratorFactory.isEngineSupported('volcengine')) {
  console.log('火山引擎支持');
}

// 获取所有支持的引擎
const engines = ContentGeneratorFactory.getSupportedEngines();
console.log('支持的引擎:', engines); // ['gemini', 'volcengine']
```

## 🔍 调试和故障排除

### 启用调试模式
```bash
export AI_ENGINE_DEBUG="true"
```

### 常见问题

1. **API密钥未设置**
   ```
   Error: API key not found. Please set VOLCENGINE_API_KEY or GEMINI_API_KEY environment variable.
   ```
   解决：设置对应的API密钥环境变量

2. **不支持的引擎**
   ```
   Error: 不支持的AI引擎: openai。支持的引擎: gemini, volcengine
   ```
   解决：使用支持的引擎名称

3. **网络连接问题**
   ```
   Error: Volcengine API error: 401 Unauthorized
   ```
   解决：检查API密钥是否正确，网络是否正常

## 🚀 扩展新引擎

要添加新的AI引擎支持，需要：

1. **创建新的ContentGenerator类**
   ```typescript
   export class OpenAIContentGenerator implements ContentGenerator {
     // 实现所有必需的方法
   }
   ```

2. **更新工厂类**
   ```typescript
   // 在 contentGeneratorFactory.ts 中添加
   case 'openai':
     return new OpenAIContentGenerator();
   ```

3. **更新类型定义**
   ```typescript
   export type AiEngine = 'gemini' | 'volcengine' | 'openai';
   ```

## 📊 性能对比

| 引擎 | 响应速度 | 成本 | 中文支持 | 特殊功能 |
|------|----------|------|----------|----------|
| Google Gemini | ⭐⭐⭐⭐ | 中等 | ⭐⭐⭐⭐ | 多模态支持 |
| 火山引擎 | ⭐⭐⭐⭐⭐ | 低 | ⭐⭐⭐⭐⭐ | DeepSeek推理 |

## 🤝 贡献指南

欢迎贡献新的AI引擎支持！请确保：

1. 实现完整的 `ContentGenerator` 接口
2. 添加适当的错误处理
3. 更新文档和测试
4. 遵循现有的代码风格

---

**注意**: 本项目基于Google Gemini CLI修改，遵循Apache 2.0许可证。

