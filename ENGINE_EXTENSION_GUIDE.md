# AI引擎扩展指南

本指南说明如何为Gemini CLI添加新的AI引擎支持。

## 🏗️ 当前架构

项目采用工厂模式设计，支持通过环境变量 `AI_ENGINE` 动态选择AI引擎：

```typescript
// 支持的引擎类型
export type AiEngine = 'volcengine' | 'openai' | 'anthropic' | 'deepseek' | 'custom';
```

## 📋 添加新引擎的步骤

### 第1步：创建引擎实现类

在 `packages/core/src/core/` 目录下创建新的引擎文件，例如 `openaiContentGenerator.ts`：

```typescript
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  CountTokensParameters,
  CountTokensResponse,
  EmbedContentParameters,
  EmbedContentResponse,
  GenerateContentParameters,
  GenerateContentResponse,
} from '@google/genai';
import type { ContentGenerator } from './contentGenerator.js';

/**
 * OpenAI ContentGenerator实现
 */
export class OpenAIContentGenerator implements ContentGenerator {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly model: string;

  constructor() {
    this.apiKey = process.env['OPENAI_API_KEY'] || (() => {
      throw new Error('API key not found. Please set OPENAI_API_KEY environment variable.');
    })();
    
    this.baseUrl = process.env['OPENAI_BASE_URL'] || 'https://api.openai.com/v1';
    this.model = process.env['OPENAI_MODEL'] || 'gpt-4';
    
    console.log(`🤖 OpenAI ContentGenerator 初始化完成，模型: ${this.model}`);
  }

  async generateContent(
    request: GenerateContentParameters,
    userPromptId: string,
  ): Promise<GenerateContentResponse> {
    // 实现OpenAI API调用逻辑
    // 需要将Gemini格式转换为OpenAI格式
    // 将OpenAI响应转换回Gemini格式
  }

  async generateContentStream(
    request: GenerateContentParameters,
    userPromptId: string,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    // 实现流式响应
  }

  async countTokens(request: CountTokensParameters): Promise<CountTokensResponse> {
    // 实现Token计算
  }

  async embedContent(request: EmbedContentParameters): Promise<EmbedContentResponse> {
    // 实现嵌入功能（如果支持）
  }
}
```

### 第2步：更新工厂类

修改 `contentGeneratorFactory.ts`：

```typescript
// 1. 添加导入
import { OpenAIContentGenerator } from './openaiContentGenerator.js';

// 2. 在switch语句中添加新的case
switch (engine) {
  case 'volcengine':
    return new VolcengineContentGenerator();
    
  case 'openai':  // 新增
    console.log('🤖 初始化OpenAI适配器');
    return new OpenAIContentGenerator();
    
  // ... 其他cases
}

// 3. 更新支持的引擎列表
static getSupportedEngines(): AiEngine[] {
  return ['volcengine', 'openai'];  // 添加 'openai'
}
```

### 第3步：更新配置管理器

修改 `engineConfig.ts` 添加新引擎的配置支持：

```typescript
case 'openai':
  config['apiKey'] = process.env['OPENAI_API_KEY'];
  config['model'] = process.env['OPENAI_MODEL'] || 'gpt-4';
  config['baseUrl'] = process.env['OPENAI_BASE_URL'] || 'https://api.openai.com/v1';
  break;
```

### 第4步：测试新引擎

```bash
# 设置环境变量
export AI_ENGINE="openai"
export OPENAI_API_KEY="your-openai-api-key"

# 测试
gemini "你好"
```

## 🔧 实现要点

### 格式转换
每个新引擎都需要实现双向格式转换：
- **输入转换**：Gemini格式 → 目标引擎格式
- **输出转换**：目标引擎格式 → Gemini格式

### 错误处理
- 提供清晰的错误信息
- 处理网络超时和API限制
- 验证必要的环境变量

### 流式响应
- 如果目标引擎支持流式响应，优先使用原生流式
- 如果不支持，可以实现模拟流式（参考火山引擎的实现）

## 📝 示例：完整的新引擎实现

参考 `volcengineContentGenerator.ts` 的实现，它包含了：
- 完整的格式转换逻辑
- 流式响应模拟
- 错误处理
- 配置管理

## 🚀 扩展建议

1. **保持接口一致性**：所有引擎都应该实现相同的 `ContentGenerator` 接口
2. **配置标准化**：使用统一的环境变量命名规范
3. **文档更新**：添加新引擎到使用文档中
4. **测试覆盖**：为新引擎编写测试用例

## 🔍 调试技巧

1. **启用调试模式**：`export AI_ENGINE_DEBUG="true"`
2. **查看引擎状态**：工厂类会打印当前引擎信息
3. **检查配置**：确保所有必要的环境变量都已设置

---

通过这个架构，您可以轻松添加任何新的AI引擎支持，而无需修改核心业务逻辑！

