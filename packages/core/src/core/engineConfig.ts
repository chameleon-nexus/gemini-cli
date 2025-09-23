/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AiEngine } from './contentGeneratorFactory.js';

/**
 * 引擎配置接口
 */
export interface EngineConfig {
  /** 当前使用的引擎 */
  engine: AiEngine;
  /** 是否启用调试模式 */
  debug?: boolean;
  /** 自定义配置 */
  custom?: Record<string, any>;
}

/**
 * 引擎配置管理类
 */
export class EngineConfigManager {
  /**
   * 获取当前引擎配置
   */
  static getConfig(): EngineConfig {
    const engine = (process.env['AI_ENGINE'] || 'gemini').toLowerCase() as AiEngine;
    const debug = process.env['AI_ENGINE_DEBUG'] === 'true';
    
    return {
      engine,
      debug,
      custom: this.getCustomConfig(engine),
    };
  }

  /**
   * 获取特定引擎的自定义配置
   */
  private static getCustomConfig(engine: AiEngine): Record<string, any> {
    const config: Record<string, any> = {};

    switch (engine) {
      case 'volcengine':
        config['baseUrl'] = process.env['VOLCENGINE_BASE_URL'] || 'https://ark.cn-beijing.volces.com/api/v3';
        config['model'] = process.env['VOLCENGINE_MODEL'] || 'deepseek-v3-250324';
        config['apiKey'] = process.env['VOLCENGINE_API_KEY'] || process.env['GEMINI_API_KEY'];
        break;
        
      // 注意：gemini 不再作为独立引擎，现在统一使用 volcengine
        
      case 'openai':
        config['apiKey'] = process.env['OPENAI_API_KEY'];
        config['model'] = process.env['OPENAI_MODEL'] || 'gpt-4';
        config['baseUrl'] = process.env['OPENAI_BASE_URL'] || 'https://api.openai.com/v1';
        break;
    }

    return config;
  }

  /**
   * 验证配置是否完整
   */
  static validateConfig(config: EngineConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 验证API密钥
    if (!config.custom?.['apiKey']) {
      errors.push(`缺少 ${config.engine} 引擎的API密钥`);
    }

    // 验证特定引擎的配置
    switch (config.engine) {
      case 'volcengine':
        if (!config.custom?.['baseUrl']) {
          errors.push('缺少火山引擎的API地址');
        }
        break;
        
      case 'openai':
        if (!config.custom?.['baseUrl']) {
          errors.push('缺少OpenAI的API地址');
        }
        break;
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * 打印当前配置信息
   */
  static printConfig(): void {
    const config = this.getConfig();
    const validation = this.validateConfig(config);
    
    console.log('🔧 AI引擎配置信息:');
    console.log(`   引擎: ${config.engine}`);
    console.log(`   调试模式: ${config.debug ? '开启' : '关闭'}`);
    
    if (config.custom) {
      Object.entries(config.custom).forEach(([key, value]) => {
        if (key === 'apiKey') {
          console.log(`   ${key}: ${value ? '***已设置***' : '未设置'}`);
        } else {
          console.log(`   ${key}: ${value}`);
        }
      });
    }
    
    if (!validation.valid) {
      console.log('⚠️  配置验证失败:');
      validation.errors.forEach(error => {
        console.log(`   - ${error}`);
      });
    } else {
      console.log('✅ 配置验证通过');
    }
  }
}
