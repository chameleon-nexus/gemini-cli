/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  CountTokensParameters,
  CountTokensResponse,
  EmbedContentParameters,
  EmbedContentResponse,
  GenerateContentParameters,
  GenerateContentResponse,
  Part,
} from '@google/genai';
import type { ContentGenerator } from './contentGenerator.js';

/**
 * 火山引擎API响应格式
 */
interface VolcengineMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface VolcengineRequest {
  model: string;
  messages: VolcengineMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
}

interface VolcengineChoice {
  index: number;
  message: {
    role: 'assistant';
    content: string;
  };
  finish_reason: string;
}

interface VolcengineResponse {
  choices: VolcengineChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  model: string;
  id: string;
  created: number;
}

/**
 * 火山引擎ContentGenerator实现
 */
export class VolcengineContentGenerator implements ContentGenerator {
  private readonly baseUrl = process.env['VOLCENGINE_BASE_URL'] || 'https://ark.cn-beijing.volces.com/api/v3';
  private readonly apiKey = process.env['VOLCENGINE_API_KEY'] || process.env['GEMINI_API_KEY'] || (() => {
    throw new Error('API key not found. Please set VOLCENGINE_API_KEY or GEMINI_API_KEY environment variable.');
  })();
  private readonly model = process.env['VOLCENGINE_MODEL'] || 'deepseek-v3-250324';

  constructor() {}

  /**
   * 转换Gemini格式的内容为火山引擎格式
   */
  private convertGeminiToVolcengine(contents: any): VolcengineMessage[] {
    // 确保contents是数组
    const contentArray = Array.isArray(contents) ? contents : [contents];
    const messages: VolcengineMessage[] = [];

    for (const content of contentArray) {
      if (content.role === 'user' || content.role === 'model') {
        const role = content.role === 'model' ? 'assistant' : 'user';
        const textParts = content.parts
          ?.filter((part: Part) => part.text)
          .map((part: Part) => part.text)
          .join(' ') || '';
        
        if (textParts.trim()) {
          messages.push({
            role: role as 'user' | 'assistant',
            content: textParts.trim()
          });
        }
      }
    }

    return messages;
  }

  /**
   * 转换火山引擎响应为Gemini格式
   */
  private convertVolcengineToGemini(volcResponse: VolcengineResponse): any {
    const choice = volcResponse.choices[0];
    
    return {
      candidates: [{
        content: {
          parts: [{ text: choice.message.content }],
          role: 'model'
        },
        finishReason: this.mapFinishReason(choice.finish_reason),
        index: choice.index,
        safetyRatings: []
      }],
      usageMetadata: {
        promptTokenCount: volcResponse.usage.prompt_tokens,
        candidatesTokenCount: volcResponse.usage.completion_tokens,
        totalTokenCount: volcResponse.usage.total_tokens
      },
      modelVersion: volcResponse.model,
      // 添加缺失的属性
      text: choice.message.content,
      data: undefined,
      functionCalls: [],
      executableCode: null,
      codeExecutionResult: null
    } as unknown as GenerateContentResponse;
  }

  private mapFinishReason(reason: string): string {
    switch (reason) {
      case 'stop':
        return 'STOP';
      case 'length':
        return 'MAX_TOKENS';
      case 'content_filter':
        return 'SAFETY';
      default:
        return 'OTHER';
    }
  }

  async generateContent(
    request: GenerateContentParameters,
    userPromptId: string,
  ): Promise<GenerateContentResponse> {
    try {
      // 转换请求格式
      const messages = this.convertGeminiToVolcengine(request.contents);
      
      const volcRequest: VolcengineRequest = {
        model: this.model,
        messages,
        temperature: request.config?.temperature,
        max_tokens: request.config?.maxOutputTokens,
        top_p: request.config?.topP,
        stream: false
      };

      // 调用火山引擎API
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(volcRequest),
        signal: request.config?.abortSignal
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Volcengine API error: ${response.status} ${errorText}`);
      }

      const volcResponse: VolcengineResponse = await response.json();
      
      // 转换响应格式
      return this.convertVolcengineToGemini(volcResponse);

    } catch (error) {
      console.error('火山引擎API调用失败:', error);
      throw error;
    }
  }

  async generateContentStream(
    request: GenerateContentParameters,
    userPromptId: string,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    // 对于流式响应，我们可以先实现非流式版本
    // 然后模拟流式输出
    const response = await this.generateContent(request, userPromptId);
    
    return this.simulateStream(response);
  }

  private async *simulateStream(response: any): AsyncGenerator<GenerateContentResponse> {
    // 简单模拟：将完整响应分块输出
    const content = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const words = content.split(' ');
    
    for (let i = 0; i < words.length; i += 5) {
      const chunk = words.slice(i, i + 5).join(' ');
      
      yield {
        ...response,
        candidates: [{
          ...response.candidates[0],
          content: {
            parts: [{ text: chunk + (i + 5 < words.length ? ' ' : '') }],
            role: 'model'
          }
        }]
      } as GenerateContentResponse;
      
      // 小延迟模拟流式效果
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  async countTokens(request: CountTokensParameters): Promise<CountTokensResponse> {
    // 简单估算token数量
    const content = JSON.stringify(request.contents);
    const estimatedTokens = Math.ceil(content.length / 4); // 粗略估算
    
    return {
      totalTokens: estimatedTokens
    };
  }

  async embedContent(request: EmbedContentParameters): Promise<EmbedContentResponse> {
    // 暂不支持embedding
    throw new Error('Embedding not supported by Volcengine implementation');
  }
}
