/**
 * GLM函数调用功能使用示例
 * 展示如何使用增强后的GlmContentGenerator进行函数调用
 */

import { GlmContentGenerator } from '../core/glmContentGenerator.js';
import type { Tool } from '@google/genai';
import { Type } from '@google/genai';

// 定义示例工具执行器
const toolExecutors = {
  // 写文件工具
  write_file: async ({ filename, content }: { filename: string; content: string }) => {
    console.log(`📝 写入文件: ${filename}`);
    // 这里可以实现实际的文件写入逻辑
    // const fs = await import('fs/promises');
    // await fs.writeFile(filename, content, 'utf8');
    
    return {
      success: true,
      message: `文件 ${filename} 写入成功`,
      size: content.length
    };
  },

  // 获取当前时间工具
  get_current_time: async () => {
    const now = new Date();
    return {
      timestamp: now.toISOString(),
      formatted: now.toLocaleString('zh-CN'),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  },

  // 计算工具
  calculate: async ({ expression }: { expression: string }) => {
    try {
      // 安全的数学表达式求值（仅示例，生产环境需要更严格的验证）
      const result = Function(`"use strict"; return (${expression})`)();
      return {
        expression,
        result,
        type: typeof result
      };
    } catch (error) {
      throw new Error(`计算表达式错误: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  // 系统信息工具
  get_system_info: async () => {
    return {
      platform: process.platform,
      architecture: process.arch,
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime()
    };
  }
};

// 定义工具声明（GLM格式）
const tools: Tool[] = [
  {
    functionDeclarations: [
      {
        name: 'write_file',
        description: '写入内容到指定文件',
        parameters: {
          type: Type.OBJECT,
          properties: {
            filename: {
              type: Type.STRING,
              description: '文件名（包含路径）'
            },
            content: {
              type: Type.STRING,
              description: '要写入的文件内容'
            }
          },
          required: ['filename', 'content']
        }
      },
      {
        name: 'get_current_time',
        description: '获取当前系统时间',
        parameters: {
          type: Type.OBJECT,
          properties: {}
        }
      },
      {
        name: 'calculate',
        description: '计算数学表达式',
        parameters: {
          type: Type.OBJECT,
          properties: {
            expression: {
              type: Type.STRING,
              description: '数学表达式，如 "2 + 3 * 4"'
            }
          },
          required: ['expression']
        }
      },
      {
        name: 'get_system_info',
        description: '获取系统信息',
        parameters: {
          type: Type.OBJECT,
          properties: {}
        }
      }
    ]
  }
];

async function demonstrateFunctionCalling() {
  console.log('🚀 GLM函数调用功能演示开始\n');

  // 创建带有工具执行器的GLM生成器
  const generator = new GlmContentGenerator(toolExecutors);

  // 测试场景1：文件写入
  console.log('📋 测试场景1: 文件写入');
  try {
    const response1 = await generator.generateContent({
      model: 'glm-4',
      contents: [{
        role: 'user',
        parts: [{ 
          text: '请帮我创建一个名为hello.txt的文件，内容是"Hello, GLM Function Calling!"' 
        }]
      }],
      config: {
        tools: tools,
        temperature: 0.1
      }
    }, 'test-1');

    console.log('AI响应:', response1.text);
    console.log('函数调用:', response1.functionCalls?.length || 0, '个');
    console.log('---\n');
  } catch (error) {
    console.error('场景1错误:', error);
  }

  // 测试场景2：时间查询
  console.log('📋 测试场景2: 时间查询');
  try {
    const response2 = await generator.generateContent({
      model: 'glm-4',
      contents: [{
        role: 'user',
        parts: [{ 
          text: '现在几点了？' 
        }]
      }],
      config: {
        tools: tools,
        temperature: 0.1
      }
    }, 'test-2');

    console.log('AI响应:', response2.text);
    console.log('函数调用:', response2.functionCalls?.length || 0, '个');
    console.log('---\n');
  } catch (error) {
    console.error('场景2错误:', error);
  }

  // 测试场景3：数学计算
  console.log('📋 测试场景3: 数学计算');
  try {
    const response3 = await generator.generateContent({
      model: 'glm-4',
      contents: [{
        role: 'user',
        parts: [{ 
          text: '帮我计算 (15 + 25) * 2 - 10' 
        }]
      }],
      config: {
        tools: tools,
        temperature: 0.1
      }
    }, 'test-3');

    console.log('AI响应:', response3.text);
    console.log('函数调用:', response3.functionCalls?.length || 0, '个');
    console.log('---\n');
  } catch (error) {
    console.error('场景3错误:', error);
  }

  // 测试场景4：复合任务
  console.log('📋 测试场景4: 复合任务（系统信息 + 文件写入）');
  try {
    const response4 = await generator.generateContent({
      model: 'glm-4',
      contents: [{
        role: 'user',
        parts: [{ 
          text: '请获取系统信息，然后将信息保存到system-info.json文件中' 
        }]
      }],
      config: {
        tools: tools,
        temperature: 0.1
      }
    }, 'test-4');

    console.log('AI响应:', response4.text);
    console.log('函数调用:', response4.functionCalls?.length || 0, '个');
    console.log('---\n');
  } catch (error) {
    console.error('场景4错误:', error);
  }

  // 测试场景5：流式处理
  console.log('📋 测试场景5: 流式处理（包含函数调用）');
  try {
    const streamGenerator = await generator.generateContentStream({
      model: 'glm-4',
      contents: [{
        role: 'user',
        parts: [{ 
          text: '请获取当前时间，然后告诉我现在是什么时候' 
        }]
      }],
      config: {
        tools: tools,
        temperature: 0.1
      }
    }, 'test-5');

    console.log('流式输出开始...');
    for await (const chunk of streamGenerator) {
      if (chunk.text) {
        process.stdout.write(chunk.text);
      }
      if (chunk.functionCalls && chunk.functionCalls.length > 0) {
        console.log('\n[函数调用执行]');
      }
    }
    console.log('\n流式输出结束\n---\n');
  } catch (error) {
    console.error('场景5错误:', error);
  }

  console.log('✅ GLM函数调用功能演示完成');
}

// 如果直接运行此文件，则执行演示
if (import.meta.url === `file://${process.argv[1]}`) {
  demonstrateFunctionCalling().catch(console.error);
}

export { demonstrateFunctionCalling, toolExecutors, tools };
