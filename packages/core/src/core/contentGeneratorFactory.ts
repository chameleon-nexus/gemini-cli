/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ContentGenerator } from './contentGenerator.js';
import { VolcengineContentGenerator } from './volcengineContentGenerator.js';
import { OpenrouterContentGenerator } from './openrouterContentGenerator.js';
import { AzureContentGenerator } from './azureContentGenerator.js';
import { DashscopeContentGenerator } from './dashscopeContentGenerator.js';
import { OllamaContentGenerator } from './ollamaContentGenerator.js';

/**
 * AI引擎类型定义
 * 可以轻松扩展新的引擎类型
 */
export type AiEngine = 'volcengine' | 'openrouter' | 'azure' | 'dashscope' | 'ollama' | 'openai' | 'anthropic' | 'deepseek' | 'custom';

/**
 * ContentGenerator工厂类
 * 根据环境变量创建对应的ContentGenerator实例
 * 设计为易于扩展的工厂模式
 */
export class ContentGeneratorFactory {
  /**
   * 根据环境变量创建并返回一个ContentGenerator实例
   * @param engineType 可选的引擎类型，如果不提供则从环境变量读取
   * @returns ContentGenerator实例
   */
  static createContentGenerator(engineType?: AiEngine): ContentGenerator {
    // 优先使用传入的参数，其次使用环境变量，最后使用默认值
    const engine = (engineType || process.env['AI_ENGINE'] || 'volcengine').toLowerCase() as AiEngine;

    console.log(`🚀 Multi-Engine Support: Using ${engine.toUpperCase()} AI Engine`);

    switch (engine) {
      case 'volcengine':
        console.log('🔥 Volcengine AI Adapter: Initializing...');
        return new VolcengineContentGenerator();
        
      case 'openrouter':
        console.log('🌐 OpenRouter AI Adapter: Initializing...');
        return new OpenrouterContentGenerator();
        
      case 'azure':
        console.log('☁️ Azure OpenAI Adapter: Initializing...');
        return new AzureContentGenerator();
        
      case 'dashscope':
        console.log('🌊 Alibaba Cloud DashScope Adapter: Initializing...');
        return new DashscopeContentGenerator();
        
      case 'ollama':
        console.log('🦙 Ollama Local AI Adapter: Initializing...');
        return new OllamaContentGenerator();
        
      case 'openai':
        throw new Error('OpenAI engine not implemented yet. Please use openrouter or azure.');
        
      case 'anthropic':
        throw new Error('Anthropic engine not implemented yet. Please use openrouter.');
        
      case 'deepseek':
        throw new Error('DeepSeek engine not implemented yet. Please use volcengine or openrouter.');
        
      case 'custom':
        throw new Error('Custom engine not implemented yet.');
        
      default:
        console.log('🔥 Default Engine: Using Volcengine AI');
        return new VolcengineContentGenerator();
    }
  }

  /**
   * 获取当前配置的引擎类型
   * @returns 当前引擎类型
   */
  static getCurrentEngine(): AiEngine {
    return (process.env['AI_ENGINE'] || 'volcengine').toLowerCase() as AiEngine;
  }

  /**
   * 检查指定的引擎是否受支持
   * @param engine 引擎类型
   * @returns 是否支持该引擎
   */
  static isEngineSupported(engine: string): boolean {
    const supportedEngines: AiEngine[] = ['volcengine', 'openrouter', 'azure', 'dashscope', 'ollama'];
    return supportedEngines.includes(engine.toLowerCase() as AiEngine);
  }

  /**
   * 获取所有支持的引擎列表
   * @returns 支持的引擎列表
   */
  static getSupportedEngines(): AiEngine[] {
    return ['volcengine', 'openrouter', 'azure', 'dashscope', 'ollama'];
  }

  /**
   * 获取所有可用的引擎列表（包括未实现的）
   * @returns 所有引擎列表
   */
  static getAllEngines(): AiEngine[] {
    return ['volcengine', 'openrouter', 'azure', 'dashscope', 'ollama', 'openai', 'anthropic', 'deepseek', 'custom'];
  }

  /**
   * 打印引擎状态信息
   */
  static printEngineStatus(): void {
    console.log('🔧 Multi-Engine Status:');
    console.log(`   Current Engine: ${this.getCurrentEngine()}`);
    console.log(`   Supported Engines: ${this.getSupportedEngines().join(', ')}`);
    console.log(`   Available Engines: ${this.getAllEngines().join(', ')}`);
  }
}

/**
 * 便捷的工厂函数，保持向后兼容
 * @param engineType 可选的引擎类型
 * @returns ContentGenerator实例
 */
export function createContentGenerator(engineType?: AiEngine): ContentGenerator {
  return ContentGeneratorFactory.createContentGenerator(engineType);
}
