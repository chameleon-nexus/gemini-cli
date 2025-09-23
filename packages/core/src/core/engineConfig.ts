/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AiEngine } from './contentGeneratorFactory.js';
import { 
  DEFAULT_AI_ENGINE, 
  ENGINE_DEFAULTS,
  ENGINES_REQUIRING_API_KEY,
  ENGINES_REQUIRING_BASE_URL 
} from './engineConstants.js';

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
    const engine = (process.env['AI_ENGINE'] || DEFAULT_AI_ENGINE).toLowerCase() as AiEngine;
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
    const engineDefaults = ENGINE_DEFAULTS[engine as keyof typeof ENGINE_DEFAULTS];

    if (engineDefaults) {
      // 使用统一的默认配置
      config['baseUrl'] = process.env[`${engine.toUpperCase()}_BASE_URL`] || engineDefaults.baseUrl;
      config['model'] = process.env[`${engine.toUpperCase()}_MODEL`] || engineDefaults.model;
      
      // 处理API密钥（支持多个环境变量作为fallback）
      if (engineDefaults.apiKeyEnv.length > 0) {
        config['apiKey'] = this.getApiKeyFromEnvVars([...engineDefaults.apiKeyEnv]);
      }
      
      // 处理特殊配置
      if (engine === 'azure' && 'apiVersion' in engineDefaults) {
        config['apiVersion'] = process.env['AZURE_API_VERSION'] || engineDefaults.apiVersion;
      }
    }

    return config;
  }

  /**
   * 从多个环境变量中获取API密钥
   */
  private static getApiKeyFromEnvVars(envVars: string[]): string | undefined {
    for (const envVar of envVars) {
      const value = process.env[envVar];
      if (value) {
        return value;
      }
    }
    return undefined;
  }

  /**
   * 验证配置是否完整
   */
  static validateConfig(config: EngineConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const engine = config.engine;
    
    // 检查API密钥（仅对需要API密钥的引擎）
    if (ENGINES_REQUIRING_API_KEY.includes(engine as any)) {
      if (!config.custom?.['apiKey']) {
        const engineDefaults = ENGINE_DEFAULTS[engine as keyof typeof ENGINE_DEFAULTS];
        const envVars = engineDefaults?.apiKeyEnv || [];
        errors.push(`API key not found for engine: ${engine}. Please set one of: ${envVars.join(', ')}`);
      }
    }
    
    // 检查Base URL（仅对需要Base URL的引擎）
    if (ENGINES_REQUIRING_BASE_URL.includes(engine as any)) {
      if (!config.custom?.['baseUrl']) {
        errors.push(`${engine} base URL not configured. Please set ${engine.toUpperCase()}_BASE_URL environment variable.`);
      }
    }
    
    // 特殊验证
    switch (engine) {
      case 'azure':
        if (!config.custom?.['baseUrl']) {
          errors.push('Azure OpenAI requires AZURE_BASE_URL environment variable');
        }
        break;
      case 'openrouter':
        if (!config.custom?.['apiKey']) {
          errors.push('OpenRouter requires OPENROUTER_API_KEY environment variable');
        }
        break;
      case 'dashscope':
        if (!config.custom?.['apiKey']) {
          errors.push('DashScope requires DASHSCOPE_API_KEY or ALIBABA_CLOUD_API_KEY environment variable');
        }
        break;
      case 'glm':
        if (!config.custom?.['apiKey']) {
          errors.push('GLM requires GLM_API_KEY or ZHIPU_API_KEY environment variable');
        }
        break;
    }
    
    return {
      valid: errors.length === 0,
      errors
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
