/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @author chameleon-nexus
 * @email mythicscribe2014@gmail.com
 */

import type {
  CountTokensParameters,
  CountTokensResponse,
  EmbedContentParameters,
  EmbedContentResponse,
  GenerateContentParameters,
  GenerateContentResponse,
} from '@google/genai';
import type { ContentGenerator } from './contentGenerator.js';

/**
 * Zhipu AI GLM ContentGenerator implementation
 * Supports accessing GLM series models through Zhipu AI official API
 */
export class GlmContentGenerator implements ContentGenerator {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly model: string;

  constructor() {
    // Unified environment variable support, prioritize engine-specific variables, fallback to generic variables
    this.baseUrl = process.env['GLM_BASE_URL'] || process.env['AI_BASE_URL'] || 'https://open.bigmodel.cn/api/paas/v4';
    this.apiKey = process.env['GLM_API_KEY'] || process.env['ZHIPU_API_KEY'] || process.env['AI_API_KEY'] || (() => {
      throw new Error('API key not found. Please set one of: GLM_API_KEY, ZHIPU_API_KEY, or AI_API_KEY environment variable.');
    })();
    this.model = process.env['GLM_MODEL'] || process.env['AI_MODEL'] || 'glm-4';
    
    console.log('🧠 Zhipu AI GLM ContentGenerator: Initialized successfully');
    console.log(`   Model: ${this.model}`);
    console.log(`   API Endpoint: ${this.baseUrl}`);
    console.log(`   Provider: Zhipu AI`);
  }

  async generateContent(
    request: GenerateContentParameters,
    userPromptId: string,
  ): Promise<GenerateContentResponse> {
    try {
      // 转换请求格式
      const messages = this.convertGeminiToGlm(request.contents);
      
      const glmRequest = {
        model: this.model,
        messages,
        temperature: request.config?.temperature,
        max_tokens: request.config?.maxOutputTokens,
        top_p: request.config?.topP,
        stream: false
      };

      // 调用智谱AI API
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(glmRequest),
        signal: request.config?.abortSignal
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`智谱AI GLM API error: ${response.status} ${errorText}`);
      }

      const glmResponse = await response.json();
      
      // 转换响应格式
      return this.convertGlmToGemini(glmResponse);

    } catch (error) {
      console.error('智谱AI GLM API call failed:', error);
      throw error;
    }
  }

  async generateContentStream(
    request: GenerateContentParameters,
    userPromptId: string,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    try {
      // 智谱AI支持原生流式响应
      const messages = this.convertGeminiToGlm(request.contents);
      
      const glmRequest = {
        model: this.model,
        messages,
        temperature: request.config?.temperature,
        max_tokens: request.config?.maxOutputTokens,
        top_p: request.config?.topP,
        stream: true
      };

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(glmRequest),
        signal: request.config?.abortSignal
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`智谱AI GLM Stream API error: ${response.status} ${errorText}`);
      }

      return this.handleGlmStream(response);

    } catch (error) {
      console.error('智谱AI GLM Stream API call failed:', error);
      // 如果流式失败，回退到非流式
      const response = await this.generateContent(request, userPromptId);
      return this.simulateStream(response);
    }
  }

  async countTokens(request: CountTokensParameters): Promise<CountTokensResponse> {
    // 智谱AI提供token计算接口
    try {
      const messages = this.convertGeminiToGlm(request.contents);
      
      const response = await fetch(`${this.baseUrl}/token/encode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages
        })
      });

      if (response.ok) {
        const result = await response.json();
        return {
          totalTokens: result.tokens?.length || 0,
        };
      }
    } catch (error) {
      console.warn('智谱AI token counting failed, using estimation:', error);
    }

    // 回退到估算
    const text = JSON.stringify(request);
    const estimatedTokens = Math.ceil(text.length / 4);
    
    return {
      totalTokens: estimatedTokens,
    };
  }

  async embedContent(request: EmbedContentParameters): Promise<EmbedContentResponse> {
    throw new Error('Embedding not supported by GLM implementation');
  }

  private convertGeminiToGlm(contents: any): Array<{role: string, content: string}> {
    const messages: Array<{role: string, content: string}> = [];
    
    for (const content of contents) {
      if (content.parts && Array.isArray(content.parts)) {
        let textContent = '';
        
        for (const part of content.parts) {
          if (part.text) {
            textContent += part.text;
          }
        }
        
        if (textContent.trim()) {
          const role = content.role === 'model' ? 'assistant' : content.role;
          messages.push({
            role,
            content: textContent,
          });
        }
      }
    }
    
    return messages;
  }

  private convertGlmToGemini(glmResponse: any): any {
    const choice = glmResponse.choices[0];
    const message = choice.message;
    
    return {
      candidates: [{
        content: {
          role: 'model',
          parts: [{ text: message.content }],
        },
        finishReason: this.mapFinishReason(choice.finish_reason),
        index: choice.index,
      }],
      usageMetadata: {
        promptTokenCount: glmResponse.usage?.prompt_tokens || 0,
        candidatesTokenCount: glmResponse.usage?.completion_tokens || 0,
        totalTokenCount: glmResponse.usage?.total_tokens || 0,
      },
    } as GenerateContentResponse;
  }

  private async* handleGlmStream(response: Response): AsyncGenerator<GenerateContentResponse> {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('Stream reader not available');
    }

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ') && !line.includes('[DONE]')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.choices?.[0]?.delta?.content) {
                yield {
                  candidates: [{
                    content: {
                      role: 'model',
                      parts: [{ text: data.choices[0].delta.content }],
                    },
                    finishReason: 'STOP' as any,
                    index: 0,
                  }],
                } as GenerateContentResponse;
              }
            } catch (e) {
              // 忽略解析错误
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  private mapFinishReason(reason: string): any {
    switch (reason) {
      case 'stop':
        return 'STOP';
      case 'length':
        return 'MAX_TOKENS';
      case 'content_filter':
        return 'SAFETY';
      default:
        return 'STOP';
    }
  }

  private async* simulateStream(response: GenerateContentResponse): AsyncGenerator<GenerateContentResponse> {
    const content = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const words = content.split(' ');
    const chunkSize = 3; // 每次返回3个单词，模拟流式效果

    for (let i = 0; i < words.length; i += chunkSize) {
      const chunk = words.slice(i, i + chunkSize).join(' ');
      
      yield {
        candidates: [{
          content: {
            role: 'model',
            parts: [{ text: chunk + (i + chunkSize < words.length ? ' ' : '') }],
          },
          finishReason: 'STOP' as any,
          index: 0,
        }],
      } as GenerateContentResponse;

      // 添加小延迟以模拟流式输出
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
}
