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
} from '@google/genai';
import type { ContentGenerator } from './contentGenerator.js';

/**
 * 阿里云DashScope ContentGenerator implementation
 * 支持通过阿里云DashScope访问通义千问等模型
 */
export class DashscopeContentGenerator implements ContentGenerator {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly model: string;

  constructor() {
    this.baseUrl = process.env['DASHSCOPE_BASE_URL'] || 'https://dashscope.aliyuncs.com/api/v1';
    this.apiKey = process.env['DASHSCOPE_API_KEY'] || process.env['ALIBABA_CLOUD_API_KEY'] || (() => {
      throw new Error('API key not found. Please set DASHSCOPE_API_KEY or ALIBABA_CLOUD_API_KEY environment variable.');
    })();
    this.model = process.env['DASHSCOPE_MODEL'] || 'qwen-plus';
    
    console.log('🌊 阿里云DashScope ContentGenerator: Initialized successfully');
    console.log(`   Model: ${this.model}`);
    console.log(`   API Endpoint: ${this.baseUrl}`);
  }

  async generateContent(
    request: GenerateContentParameters,
    userPromptId: string,
  ): Promise<GenerateContentResponse> {
    try {
      // 转换请求格式
      const messages = this.convertGeminiToDashScope(request.contents);
      
      const dashscopeRequest = {
        model: this.model,
        input: {
          messages,
        },
        parameters: {
          temperature: request.config?.temperature,
          max_tokens: request.config?.maxOutputTokens,
          top_p: request.config?.topP,
        }
      };

      // 调用DashScope API
      const response = await fetch(`${this.baseUrl}/services/aigc/text-generation/generation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-DashScope-SSE': 'enable',
        },
        body: JSON.stringify(dashscopeRequest),
        signal: request.config?.abortSignal
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`DashScope API error: ${response.status} ${errorText}`);
      }

      const dashscopeResponse = await response.json();
      
      // 转换响应格式
      return this.convertDashScopeToGemini(dashscopeResponse);

    } catch (error) {
      console.error('DashScope API call failed:', error);
      throw error;
    }
  }

  async generateContentStream(
    request: GenerateContentParameters,
    userPromptId: string,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    // 对于流式响应，先实现非流式版本然后模拟流式输出
    const response = await this.generateContent(request, userPromptId);
    return this.simulateStream(response);
  }

  async countTokens(request: CountTokensParameters): Promise<CountTokensResponse> {
    // DashScope doesn't provide a separate token counting endpoint
    // Use a rough estimation based on text length
    const text = JSON.stringify(request);
    const estimatedTokens = Math.ceil(text.length / 4);
    
    return {
      totalTokens: estimatedTokens,
    };
  }

  async embedContent(request: EmbedContentParameters): Promise<EmbedContentResponse> {
    throw new Error('Embedding not supported by DashScope implementation');
  }

  private convertGeminiToDashScope(contents: any): Array<{role: string, content: string}> {
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

  private convertDashScopeToGemini(dashscopeResponse: any): any {
    const choice = dashscopeResponse.output.choices[0];
    const message = choice.message;
    
    return {
      candidates: [{
        content: {
          role: 'model',
          parts: [{ text: message.content }],
        },
        finishReason: 'STOP' as any,
        index: 0,
      }],
      usageMetadata: {
        promptTokenCount: dashscopeResponse.output.usage.input_tokens,
        candidatesTokenCount: dashscopeResponse.output.usage.output_tokens,
        totalTokenCount: dashscopeResponse.output.usage.total_tokens,
      },
    } as GenerateContentResponse;
  }

  private async* simulateStream(response: GenerateContentResponse): AsyncGenerator<GenerateContentResponse> {
    const content = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const words = content.split(' ');
    const chunkSize = 5; // 每次返回5个单词

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
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}
