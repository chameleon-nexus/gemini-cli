# GLM函数调用功能说明

## 概述

GLM ContentGenerator 现在支持完整的函数调用（Function Calling）功能，允许AI模型实际执行工具操作，而不仅仅是返回文本建议。

## 核心特性

### 🛠️ 请求端 - 工具声明
- 自动转换 `request.config.tools` 到 GLM API 格式
- 增强工具描述，明确告知模型这些是可执行工具
- 支持完整的工具参数验证和类型定义

### 🎯 响应端 - 工具执行
- 自动识别并解析 GLM 返回的函数调用指令
- 实际执行工具函数并返回结果
- 支持同步和异步工具执行
- 完整的错误处理和结果反馈

### 🔄 流式支持
- 流式模式下的工具调用累积和执行
- 实时工具调用状态反馈
- 流式和非流式模式的统一接口

### 🛡️ 安全机制
- 函数名安全验证（字符限制、长度检查）
- 参数深度和大小限制
- 执行超时控制（30秒）
- 危险属性过滤
- 详细的错误日志记录

## 使用方法

### 1. 创建工具执行器

```typescript
const toolExecutors = {
  write_file: async ({ filename, content }: { filename: string; content: string }) => {
    // 实际的文件写入逻辑
    await fs.writeFile(filename, content, 'utf8');
    return { success: true, message: `文件 ${filename} 写入成功` };
  },
  
  get_time: async () => {
    return { timestamp: new Date().toISOString() };
  }
};
```

### 2. 定义工具声明

```typescript
const tools: Tool[] = [
  {
    functionDeclarations: [
      {
        name: 'write_file',
        description: '写入内容到指定文件',
        parameters: {
          type: 'object',
          properties: {
            filename: { type: 'string', description: '文件名' },
            content: { type: 'string', description: '文件内容' }
          },
          required: ['filename', 'content']
        }
      }
    ]
  }
];
```

### 3. 初始化生成器

```typescript
// 传入工具执行器
const generator = new GlmContentGenerator(toolExecutors);
```

### 4. 发起带工具的请求

```typescript
const response = await generator.generateContent({
  contents: [{
    role: 'user',
    parts: [{ text: '请帮我创建一个hello.txt文件，内容是"Hello World"' }]
  }],
  config: {
    tools: tools,  // 传入工具定义
    temperature: 0.1
  }
}, 'user-prompt-id');

// response.functionCalls 包含执行的工具调用
// response.text 包含AI的最终回答
```

### 5. 流式处理

```typescript
const streamGenerator = generator.generateContentStream({
  contents: [{ role: 'user', parts: [{ text: '获取当前时间' }] }],
  config: { tools: tools }
}, 'stream-id');

for await (const chunk of streamGenerator) {
  if (chunk.text) {
    console.log('文本:', chunk.text);
  }
  if (chunk.functionCalls) {
    console.log('工具调用:', chunk.functionCalls.length);
  }
}
```

## 工作流程

### 标准模式流程
1. **请求发送**：将工具定义转换为 GLM 格式并发送
2. **AI 决策**：GLM 模型决定是否需要调用工具
3. **工具执行**：自动执行 AI 指定的工具调用
4. **结果返回**：包含工具执行结果的完整响应

### 流式模式流程
1. **流式响应**：接收 GLM 的流式输出
2. **工具累积**：累积完整的工具调用数据
3. **批量执行**：流结束后批量执行所有工具
4. **结果输出**：输出包含执行结果的最终响应

## 安全特性

### 函数名验证
- 只允许字母、数字、下划线
- 长度限制（最大100字符）
- 禁止空或无效函数名

### 参数安全
- 参数类型检查（必须为对象）
- 嵌套深度限制（最大10层）
- 参数大小限制（最大1MB）
- 危险属性过滤（`__proto__`, `constructor`, `prototype`）

### 执行控制
- 30秒执行超时
- 详细错误记录
- 异常安全处理

## 错误处理

所有工具执行都会返回标准化的结果格式：

```typescript
type ToolExecutionResult = {
  success: boolean;
  result?: any;      // 成功时的结果
  error?: string;    // 失败时的错误信息
};
```

## 日志输出

系统会输出详细的执行日志：

```
🧠 Zhipu AI GLM ContentGenerator: Initialized successfully
   Available Tools: 2 functions
   - write_file, get_time

🔧 GLM工具转换完成: 已准备 2 个可执行工具
   - write_file: 写入内容到指定文件 [可执行工具 - 我会实际调用此功能]

🔧 GLM返回了 1 个工具调用
📋 工具调用: write_file { filename: "hello.txt", content: "Hello World" }

🚀 开始执行工具调用...
🔧 执行工具调用: write_file { filename: "hello.txt", content: "Hello World" }
✅ 工具 "write_file" 执行成功: { success: true, message: "文件 hello.txt 写入成功" }
✅ 工具执行完成
```

## 示例代码

查看 `src/examples/glm-function-calling-example.ts` 获取完整的使用示例。

## 注意事项

1. **工具执行器必须在构造时提供**：`new GlmContentGenerator(toolExecutors)`
2. **工具定义必须在配置中传递**：`config: { tools: tools }`
3. **所有工具执行都是异步的**，即使工具本身是同步的
4. **错误不会中断流程**，而是作为结果的一部分返回
5. **流式模式下工具调用在流结束后执行**，不是实时的

## 兼容性

- 完全向后兼容，不影响现有的非工具调用用法
- 支持 GLM-4 及更高版本的所有模型
- 兼容原有的 Google GenAI 接口规范


