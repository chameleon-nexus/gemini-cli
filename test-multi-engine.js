#!/usr/bin/env node

/**
 * 多引擎测试脚本
 * 测试不同的AI引擎适配器是否正常工作
 */

import { ContentGeneratorFactory } from './packages/core/dist/src/core/contentGeneratorFactory.js';

console.log('🚀 多引擎AI适配器测试\n');

// 显示支持的引擎
console.log('📋 支持的引擎列表:');
const supportedEngines = ContentGeneratorFactory.getSupportedEngines();
const allEngines = ContentGeneratorFactory.getAllEngines();

console.log('✅ 已实现的引擎:', supportedEngines.join(', '));
console.log('📝 所有计划引擎:', allEngines.join(', '));

// 测试每个引擎的初始化
console.log('\n🔧 测试引擎初始化:');

for (const engine of supportedEngines) {
  try {
    console.log(`\n测试 ${engine.toUpperCase()} 引擎:`);
    
    // 设置环境变量
    process.env['AI_ENGINE'] = engine;
    
    // 创建引擎实例
    const generator = ContentGeneratorFactory.createContentGenerator(engine);
    
    console.log(`  ✅ ${engine} 引擎初始化成功`);
    console.log(`  📝 类型: ${generator.constructor.name}`);
    
  } catch (error) {
    console.log(`  ❌ ${engine} 引擎初始化失败: ${error.message}`);
  }
}

// 测试默认引擎
console.log('\n🎯 测试默认引擎:');
try {
  delete process.env['AI_ENGINE'];
  const defaultGenerator = ContentGeneratorFactory.createContentGenerator();
  console.log(`  ✅ 默认引擎: ${defaultGenerator.constructor.name}`);
} catch (error) {
  console.log(`  ❌ 默认引擎失败: ${error.message}`);
}

// 测试引擎状态显示
console.log('\n📊 引擎状态:');
ContentGeneratorFactory.printEngineStatus();

console.log('\n✨ 测试完成！');