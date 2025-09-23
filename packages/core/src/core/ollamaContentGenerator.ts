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
 * Ollama ContentGenerator implementation
 * 支持通过Ollama本地部署运行各种开源大模型
 */
export class OllamaContentGenerator implements ContentGenerator {
  private readonly baseUrl: string;
  private readonly model: string;

  constructor() {
    this.baseUrl = process.env['OLLAMA_BASE_URL'] || 'http://localhost:11434';
    this.model = process.env['OLLAMA_MODEL'] || 'llama3.2:latest';
    
    console.log('🦙 Ollama ContentGenerator: Initialized successfully');
    console.log(`   Model: ${this.model}`);
    console.log(`   API Endpoint: ${this.baseUrl}`);
    console.log(`   Local Deployment: ${this.baseUrl.includes('localhost') ? 'Yes' : 'No'}`);
  }

  async generateContent(
    request: GenerateContentParameters,
    userPromptId: string,
  ): Promise<GenerateContentResponse> {
    try {
      // 转换请求格式
      const messages = this.convertGeminiToOllama(request.contents);
      
      const ollamaRequest = {
        model: this.model,
        messages,
        options: {
          temperature: request.config?.temperature,
          top_p: request.config?.topP,
          num_predict: request.config?.maxOutputTokens,
        }
      };

      // 调用Ollama API
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ollamaRequest),
        signal: request.config?.abortSignal
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ollama API error: ${response.status} ${errorText}`);
      }

      const ollamaResponse = await response.json();
      
      // 转换响应格式
      return this.convertOllamaToGemini(ollamaResponse);

    } catch (error) {
      console.error('Ollama API call failed:', error);
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
    // Ollama doesn't provide a separate token counting endpoint
    // Use a rough estimation based on text length
    const text = JSON.stringify(request);
    const estimatedTokens = Math.ceil(text.length / 4);
    
    return {
      totalTokens: estimatedTokens,
    };
  }

  async embedContent(request: EmbedContentParameters): Promise<EmbedContentResponse> {
    throw new Error('Embedding not supported by Ollama implementation');
  }

  private convertGeminiToOllama(contents: any): Array<{role: string, content: string}> {
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

  private convertOllamaToGemini(ollamaResponse: any): any {
    return {
      candidates: [{
        content: {
          role: 'model',
          parts: [{ text: ollamaResponse.message.content }],
        },
        finishReason: 'STOP' as any,
        index: 0,
      }],
      usageMetadata: {
        promptTokenCount: ollamaResponse.prompt_eval_count || 0,
        candidatesTokenCount: ollamaResponse.eval_count || 0,
        totalTokenCount: (ollamaResponse.prompt_eval_count || 0) + (ollamaResponse.eval_count || 0),
      },
    } as GenerateContentResponse;
  }

  private async* simulateStream(response: GenerateContentResponse): AsyncGenerator<GenerateContentResponse> {
    const content = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const words = content.split(' ');
    const chunkSize = 3; // 每次返回3个单词

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
