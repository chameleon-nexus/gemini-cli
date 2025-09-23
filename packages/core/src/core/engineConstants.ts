/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * AI引擎相关常量定义
 * 统一管理默认值和配置，避免硬编码
 */

/**
 * 默认AI引擎
 */
export const DEFAULT_AI_ENGINE = 'volcengine';

/**
 * 已实现并支持的AI引擎列表
 */
export const SUPPORTED_ENGINES = [
  'volcengine',
  'openrouter', 
  'azure',
  'dashscope',
  'glm',
  'bailian',
  'ollama'
] as const;

/**
 * 所有计划支持的AI引擎列表（包括未实现的）
 */
export const ALL_ENGINES = [
  ...SUPPORTED_ENGINES,
  'openai',
  'anthropic',
  'deepseek',
  'custom'
] as const;

/**
 * 引擎类型定义
 */
export type SupportedEngine = typeof SUPPORTED_ENGINES[number];
export type AllEngine = typeof ALL_ENGINES[number];

/**
 * 引擎配置默认值
 */
export const ENGINE_DEFAULTS = {
  volcengine: {
    baseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
    model: 'deepseek-v3-250324',
    apiKeyEnv: ['VOLCENGINE_API_KEY', 'GEMINI_API_KEY'] // 支持多个环境变量作为fallback
  },
  openrouter: {
    baseUrl: 'https://openrouter.ai/api/v1',
    model: 'anthropic/claude-3.5-sonnet',
    apiKeyEnv: ['OPENROUTER_API_KEY']
  },
  azure: {
    baseUrl: '', // 必须由用户提供
    model: 'gpt-4',
    apiVersion: '2024-02-15-preview',
    apiKeyEnv: ['AZURE_API_KEY']
  },
  dashscope: {
    baseUrl: 'https://dashscope.aliyuncs.com/api/v1',
    model: 'qwen-plus',
    apiKeyEnv: ['DASHSCOPE_API_KEY', 'ALIBABA_CLOUD_API_KEY']
  },
  glm: {
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    model: 'glm-4',
    apiKeyEnv: ['GLM_API_KEY', 'ZHIPU_API_KEY']
  },
  bailian: {
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    model: 'qwen-plus',
    apiKeyEnv: ['AI_API_KEY', 'DASHSCOPE_API_KEY', 'ALIBABA_CLOUD_API_KEY', 'BAILIAN_API_KEY']
  },
  ollama: {
    baseUrl: 'http://localhost:11434',
    model: 'llama3.2:latest',
    apiKeyEnv: [] // Ollama不需要API key
  }
} as const;

/**
 * 需要API密钥的引擎列表
 */
export const ENGINES_REQUIRING_API_KEY = SUPPORTED_ENGINES.filter(engine => 
  ENGINE_DEFAULTS[engine]?.apiKeyEnv?.length > 0
);

/**
 * 需要Base URL的引擎列表
 */
export const ENGINES_REQUIRING_BASE_URL = SUPPORTED_ENGINES.filter(engine => {
  const defaults = ENGINE_DEFAULTS[engine];
  return defaults?.baseUrl && defaults.baseUrl.length > 0;
});
