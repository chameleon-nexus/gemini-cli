/**
 * 快速测试：生成txt文件写入hello
 */

import { GlmContentGenerator } from './packages/core/dist/src/core/glmContentGenerator.js';
import fs from 'fs/promises';
import path from 'path';

// 设置API Key
process.env.GLM_API_KEY = 'ea812f6de7cd4bed90ff4e3f21eefe07.4ZM3Z0gKo2ZF0nXx';

console.log('🧪 测试：根目录生成txt文件写入hello\n');

// 工具执行器
const toolExecutors = {
  write_file: async ({ filename, content }) => {
    try {
      await fs.writeFile(filename, content, 'utf8');
      console.log(`✅ 文件已创建: ${path.resolve(filename)}`);
      return {
        success: true,
        message: `文件 ${filename} 创建成功`,
        path: path.resolve(filename)
      };
    } catch (error) {
      throw new Error(`文件创建失败: ${error.message}`);
    }
  }
};

// 工具定义
const tools = [{
  functionDeclarations: [{
    name: 'write_file',
    description: '创建文件并写入内容',
    parameters: {
      type: 'object',
      properties: {
        filename: { type: 'string', description: '文件名' },
        content: { type: 'string', description: '文件内容' }
      },
      required: ['filename', 'content']
    }
  }]
}];

try {
  const generator = new GlmContentGenerator(toolExecutors);
  
  console.log('📤 发送请求到GLM...');
  const response = await generator.generateContent({
    model: 'glm-4',
    contents: [{
      role: 'user',
      parts: [{ text: '根目录生成一个txt文件，里面写hello' }]
    }],
    config: { tools, temperature: 0.1 }
  }, 'file-test');

  console.log('\n🤖 GLM回复:', response.text);
  console.log('🔧 执行的函数调用:', response.functionCalls?.length || 0, '个');
  
  if (response.functionCalls && response.functionCalls.length > 0) {
    console.log('📋 函数调用详情:');
    response.functionCalls.forEach(call => {
      console.log(`  - ${call.name}:`, call.args);
    });
  }
  
  console.log('\n✅ 测试完成！');
  
} catch (error) {
  console.error('❌ 测试失败:', error.message);
  if (error.stack) {
    console.error('详细错误:', error.stack);
  }
}

