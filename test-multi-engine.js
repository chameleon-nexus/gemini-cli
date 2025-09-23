/**
 * 多引擎适配测试脚本
 * 用于验证不同AI引擎的切换功能
 */

// 测试环境变量设置
const testEngines = ['gemini', 'volcengine'];

console.log('🧪 开始多引擎适配测试...\n');

testEngines.forEach(engine => {
  console.log(`\n📋 测试引擎: ${engine.toUpperCase()}`);
  
  // 设置环境变量
  process.env['AI_ENGINE'] = engine;
  
  try {
    // 动态导入模块 (ES模块语法)
    import('./packages/core/src/core/contentGeneratorFactory.js').then(module => {
      const { ContentGeneratorFactory } = module;
      
      // 测试工厂方法
      console.log(`   ✅ 当前引擎: ${ContentGeneratorFactory.getCurrentEngine()}`);
      console.log(`   ✅ 引擎支持: ${ContentGeneratorFactory.isEngineSupported(engine)}`);
      console.log(`   ✅ 支持的引擎: ${ContentGeneratorFactory.getSupportedEngines().join(', ')}`);
      
      // 测试创建实例
      try {
        const generator = ContentGeneratorFactory.createContentGenerator();
        console.log(`   ✅ 实例创建成功: ${generator.constructor.name}`);
      } catch (error) {
        console.log(`   ❌ 实例创建失败: ${error.message}`);
      }
      
    }).catch(error => {
      console.log(`   ❌ 模块导入失败: ${error.message}`);
    });
    
  } catch (error) {
    console.log(`   ❌ 测试失败: ${error.message}`);
  }
});

console.log('\n🎯 测试完成！');
console.log('\n💡 使用说明:');
console.log('   1. 设置环境变量: export AI_ENGINE="volcengine"');
console.log('   2. 设置API密钥: export VOLCENGINE_API_KEY="your-key"');
console.log('   3. 运行CLI: gemini "你好"');

