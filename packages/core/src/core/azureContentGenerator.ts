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
 * Azure OpenAI ContentGenerator implementation
 * 支持通过Azure OpenAI服务访问GPT系列模型
 */
export class AzureContentGenerator implements ContentGenerator {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly model: string;
  private readonly apiVersion: string;

  constructor() {
    this.baseUrl = process.env['AZURE_BASE_URL'] || (() => {
      throw new Error('Azure base URL not found. Please set AZURE_BASE_URL environment variable.');
    })();
    this.apiKey = process.env['AZURE_API_KEY'] || (() => {
      throw new Error('API key not found. Please set AZURE_API_KEY environment variable.');
    })();
    this.model = process.env['AZURE_MODEL'] || 'gpt-4';
    this.apiVersion = process.env['AZURE_API_VERSION'] || '2024-02-15-preview';
    
    console.log('☁️ Azure OpenAI ContentGenerator: Initialized successfully');
    console.log(`   Model: ${this.model}`);
    console.log(`   API Endpoint: ${this.baseUrl}`);
    console.log(`   API Version: ${this.apiVersion}`);
  }

  async generateContent(
    request: GenerateContentParameters,
    userPromptId: string,
  ): Promise<GenerateContentResponse> {
    try {
      // 转换请求格式
      const messages = this.convertGeminiToAzure(request.contents);
      
      const azureRequest = {
        messages,
        temperature: request.config?.temperature,
        max_tokens: request.config?.maxOutputTokens,
        top_p: request.config?.topP,
        stream: false
      };

      // 调用Azure OpenAI API
      const response = await fetch(`${this.baseUrl}/openai/deployments/${this.model}/chat/completions?api-version=${this.apiVersion}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify(azureRequest),
        signal: request.config?.abortSignal
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Azure OpenAI API error: ${response.status} ${errorText}`);
      }

      const azureResponse = await response.json();
      
      // 转换响应格式
      return this.convertAzureToGemini(azureResponse);

    } catch (error) {
      console.error('Azure OpenAI API call failed:', error);
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
    // Azure OpenAI doesn't provide a separate token counting endpoint
    // Use a rough estimation based on text length
    const text = JSON.stringify(request);
    const estimatedTokens = Math.ceil(text.length / 4);
    
    return {
      totalTokens: estimatedTokens,
    };
  }

  async embedContent(request: EmbedContentParameters): Promise<EmbedContentResponse> {
    throw new Error('Embedding not supported by Azure OpenAI implementation');
  }

  private convertGeminiToAzure(contents: any): Array<{role: string, content: string}> {
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

  private convertAzureToGemini(azureResponse: any): any {
    const choice = azureResponse.choices[0];
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
        promptTokenCount: azureResponse.usage.prompt_tokens,
        candidatesTokenCount: azureResponse.usage.completion_tokens,
        totalTokenCount: azureResponse.usage.total_tokens,
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
