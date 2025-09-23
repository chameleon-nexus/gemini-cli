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
 * OpenRouter ContentGenerator implementation
 * 支持通过OpenRouter访问多个AI模型提供商
 */
export class OpenrouterContentGenerator implements ContentGenerator {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly model: string;

  constructor() {
    // 统一环境变量支持，优先使用引擎特定变量，fallback到通用变量
    this.baseUrl = process.env['OPENROUTER_BASE_URL'] || process.env['AI_BASE_URL'] || 'https://openrouter.ai/api/v1';
    this.apiKey = process.env['OPENROUTER_API_KEY'] || process.env['AI_API_KEY'] || (() => {
      throw new Error('API key not found. Please set one of: OPENROUTER_API_KEY or AI_API_KEY environment variable.');
    })();
    this.model = process.env['OPENROUTER_MODEL'] || process.env['AI_MODEL'] || 'anthropic/claude-3.5-sonnet';
    
    console.log('🌐 OpenRouter ContentGenerator: Initialized successfully');
    console.log(`   Model: ${this.model}`);
    console.log(`   API Endpoint: ${this.baseUrl}`);
  }

  async generateContent(
    request: GenerateContentParameters,
    userPromptId: string,
  ): Promise<GenerateContentResponse> {
    try {
      // 转换请求格式
      const messages = this.convertGeminiToOpenRouter(request.contents);
      
      const openrouterRequest = {
        model: this.model,
        messages,
        temperature: request.config?.temperature,
        max_tokens: request.config?.maxOutputTokens,
        top_p: request.config?.topP,
        stream: false
      };

      // 调用OpenRouter API
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'https://github.com/chameleon-nexus-tech/gemini-cli',
          'X-Title': 'Gemini CLI - OpenRouter Integration',
        },
        body: JSON.stringify(openrouterRequest),
        signal: request.config?.abortSignal
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} ${errorText}`);
      }

      const openrouterResponse = await response.json();
      
      // 转换响应格式
      return this.convertOpenRouterToGemini(openrouterResponse);

    } catch (error) {
      console.error('OpenRouter API call failed:', error);
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
    // OpenRouter doesn't provide a separate token counting endpoint
    // Use a rough estimation based on text length
    const text = JSON.stringify(request);
    const estimatedTokens = Math.ceil(text.length / 4);
    
    return {
      totalTokens: estimatedTokens,
    };
  }

  async embedContent(request: EmbedContentParameters): Promise<EmbedContentResponse> {
    throw new Error('Embedding not supported by OpenRouter implementation');
  }

  private convertGeminiToOpenRouter(contents: any): Array<{role: string, content: string}> {
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

  private convertOpenRouterToGemini(openrouterResponse: any): any {
    const choice = openrouterResponse.choices[0];
    const message = choice.message;
    
    return {
      candidates: [{
        content: {
          role: 'model',
          parts: [{ text: message.content }],
        },
        finishReason: 'STOP' as any,
        index: choice.index,
      }],
      usageMetadata: {
        promptTokenCount: openrouterResponse.usage.prompt_tokens,
        candidatesTokenCount: openrouterResponse.usage.completion_tokens,
        totalTokenCount: openrouterResponse.usage.total_tokens,
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
