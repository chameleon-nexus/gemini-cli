#!/usr/bin/env node

/**
 * GLM函数调用功能测试脚本
 * 使用编译后的dist文件测试函数调用功能
 */

import { GlmContentGenerator } from './packages/core/dist/src/core/glmContentGenerator.js';
import fs from 'fs/promises';
import path from 'path';

// 设置API Key（如果环境变量中没有的话）
process.env.GLM_API_KEY = process.env.GLM_API_KEY || 'ea812f6de7cd4bed90ff4e3f21eefe07.4ZM3Z0gKo2ZF0nXx';

// 定义工具执行器
const toolExecutors = {
  // 写文件工具
  write_file: async ({ filename, content }) => {
    try {
      const fullPath = path.resolve(filename);
      await fs.writeFile(fullPath, content, 'utf8');
      console.log(`✅ 文件写入成功: ${fullPath}`);
      return {
        success: true,
        message: `文件 ${filename} 写入成功`,
        path: fullPath,
        size: content.length
      };
    } catch (error) {
      throw new Error(`文件写入失败: ${error.message}`);
    }
  },

  // 获取当前时间工具
  get_current_time: async () => {
    const now = new Date();
    return {
      timestamp: now.toISOString(),
      formatted: now.toLocaleString('zh-CN', { 
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      timezone: 'Asia/Shanghai',
      unix: Math.floor(now.getTime() / 1000)
    };
  },

  // 计算工具
  calculate: async ({ expression }) => {
    try {
      // 安全的数学表达式求值
      const allowedChars = /^[0-9+\-*/().\s]+$/;
      if (!allowedChars.test(expression)) {
        throw new Error('表达式包含不允许的字符');
      }
      
      const result = Function(`"use strict"; return (${expression})`)();
      return {
        expression,
        result,
        type: typeof result
      };
    } catch (error) {
      throw new Error(`计算表达式错误: ${error.message}`);
    }
  },

  // 读取文件工具
  read_file: async ({ filename }) => {
    try {
      const fullPath = path.resolve(filename);
      const content = await fs.readFile(fullPath, 'utf8');
      const stats = await fs.stat(fullPath);
      return {
        filename,
        path: fullPath,
        content,
        size: stats.size,
        modified: stats.mtime.toISOString()
      };
    } catch (error) {
      throw new Error(`文件读取失败: ${error.message}`);
    }
  }
};

// 定义工具声明（注意：需要使用字符串而不是枚举，因为这是运行时）
const tools = [
  {
    functionDeclarations: [
      {
        name: 'write_file',
        description: '写入内容到指定文件',
        parameters: {
          type: 'object',
          properties: {
            filename: {
              type: 'string',
              description: '文件名（包含路径）'
            },
            content: {
              type: 'string',
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
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'calculate',
        description: '计算数学表达式',
        parameters: {
          type: 'object',
          properties: {
            expression: {
              type: 'string',
              description: '数学表达式，如 "2 + 3 * 4"'
            }
          },
          required: ['expression']
        }
      },
      {
        name: 'read_file',
        description: '读取文件内容',
        parameters: {
          type: 'object',
          properties: {
            filename: {
              type: 'string',
              description: '要读取的文件名'
            }
          },
          required: ['filename']
        }
      }
    ]
  }
];

async function runTest() {
  console.log('🚀 GLM函数调用功能测试开始\n');

  try {
    // 创建带有工具执行器的GLM生成器
    const generator = new GlmContentGenerator(toolExecutors);

    // 测试1：文件写入
    console.log('📋 测试1: 创建文件');
    const response1 = await generator.generateContent({
      model: 'glm-4',
      contents: [{
        role: 'user',
        parts: [{ 
          text: '请帮我创建一个test-output.txt文件，内容是"GLM函数调用测试成功！\\n当前时间：' + new Date().toLocaleString() + '"' 
        }]
      }],
      config: {
        tools: tools,
        temperature: 0.1
      }
    }, 'test-1');

    console.log('AI响应:', response1.text);
    console.log('执行的函数调用:', response1.functionCalls?.length || 0, '个\n');

    // 测试2：时间查询
    console.log('📋 测试2: 查询时间');
    const response2 = await generator.generateContent({
      model: 'glm-4',
      contents: [{
        role: 'user',
        parts: [{ 
          text: '现在几点了？请告诉我详细的时间信息' 
        }]
      }],
      config: {
        tools: tools,
        temperature: 0.1
      }
    }, 'test-2');

    console.log('AI响应:', response2.text);
    console.log('执行的函数调用:', response2.functionCalls?.length || 0, '个\n');

    // 测试3：数学计算
    console.log('📋 测试3: 数学计算');
    const response3 = await generator.generateContent({
      model: 'glm-4',
      contents: [{
        role: 'user',
        parts: [{ 
          text: '帮我计算 (15 + 25) * 2 - 10 等于多少' 
        }]
      }],
      config: {
        tools: tools,
        temperature: 0.1
      }
    }, 'test-3');

    console.log('AI响应:', response3.text);
    console.log('执行的函数调用:', response3.functionCalls?.length || 0, '个\n');

    // 测试4：复合任务
    console.log('📋 测试4: 复合任务 - 读取刚才创建的文件');
    const response4 = await generator.generateContent({
      model: 'glm-4',
      contents: [{
        role: 'user',
        parts: [{ 
          text: '请读取test-output.txt文件的内容，然后告诉我文件里写了什么' 
        }]
      }],
      config: {
        tools: tools,
        temperature: 0.1
      }
    }, 'test-4');

    console.log('AI响应:', response4.text);
    console.log('执行的函数调用:', response4.functionCalls?.length || 0, '个\n');

    console.log('✅ GLM函数调用功能测试完成！');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    if (error.stack) {
      console.error('错误详情:', error.stack);
    }
  }
}

// 运行测试
runTest().catch(console.error);

