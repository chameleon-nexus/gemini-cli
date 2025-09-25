/**
 * 简单的GLM函数调用测试
 */

import { GlmContentGenerator } from './packages/core/dist/src/core/glmContentGenerator.js';

// 设置环境变量
process.env.GLM_API_KEY = 'ea812f6de7cd4bed90ff4e3f21eefe07.4ZM3Z0gKo2ZF0nXx';

console.log('🧪 开始简单测试...\n');

// 创建工具执行器
const toolExecutors = {
  get_time: async () => {
    const now = new Date();
    console.log('⏰ 时间工具被调用了！');
    return {
      current_time: now.toLocaleString('zh-CN'),
      timestamp: now.toISOString()
    };
  },
  
  calculate: async ({ expression }) => {
    console.log('🧮 计算工具被调用了，表达式:', expression);
    try {
      const result = eval(expression); // 简单测试用
      return { expression, result };
    } catch (e) {
      return { error: e.message };
    }
  }
};

// 定义简单的工具
const tools = [{
  functionDeclarations: [
    {
      name: 'get_time',
      description: '获取当前时间',
      parameters: { type: 'object', properties: {} }
    },
    {
      name: 'calculate', 
      description: '计算数学表达式',
      parameters: {
        type: 'object',
        properties: {
          expression: { type: 'string', description: '数学表达式' }
        },
        required: ['expression']
      }
    }
  ]
}];

try {
  const generator = new GlmContentGenerator(toolExecutors);
  console.log('✅ GLM生成器创建成功');
  
  // 简单测试
  console.log('\n📋 测试：请告诉我现在几点');
  const response = await generator.generateContent({
    model: 'glm-4',
    contents: [{
      role: 'user',
      parts: [{ text: '现在几点了？' }]
    }],
    config: { tools, temperature: 0.1 }
  }, 'test');

  console.log('\n🤖 AI回复:', response.text);
  console.log('🔧 函数调用数量:', response.functionCalls?.length || 0);
  
  console.log('\n✅ 测试完成！');
  
} catch (error) {
  console.error('❌ 错误:', error.message);
  console.error(error.stack);
}

