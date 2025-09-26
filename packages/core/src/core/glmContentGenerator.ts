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
  Content,
  CountTokensParameters,
  CountTokensResponse,
  EmbedContentParameters,
  EmbedContentResponse,
  FunctionCall,
  GenerateContentParameters,
  GenerateContentResponse,
  Part,
  Tool,
} from '@google/genai';
import type { ContentGenerator } from './contentGenerator.js';

// 工具执行器类型定义
export type ToolExecutor = {
  [functionName: string]: (...args: any[]) => Promise<any> | any;
};


type GlmTool = {
  type: 'function';
  function: {
    name: string;
    description?: string;
    parameters?: unknown;
  };
};

type GlmToolCall = {
  id?: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
};

type GlmMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content?: string | GlmMessageContentBlock[] | null;
  name?: string;
  tool_call_id?: string;
  tool_calls?: GlmToolCall[];
};

type GlmMessageContentBlock = {
  type?: string;
  text?: string;
};

type GlmChoice = {
  index?: number;
  message: GlmMessage;
  finish_reason?: string;
};

type GlmUsage = {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
};

type GlmResponse = {
  choices: GlmChoice[];
  usage?: GlmUsage;
};

/**
 * Zhipu AI GLM ContentGenerator implementation
 * Supports accessing GLM series models through Zhipu AI official API
 */
export class GlmContentGenerator implements ContentGenerator {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly model: string;

  constructor(toolExecutors?: ToolExecutor) {
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
    console.log(`   Tool Execution: 依赖Gemini原生工具系统 (获得UI交互体验)`);
  }

  async generateContent(
    request: GenerateContentParameters,
    _userPromptId: string,
  ): Promise<GenerateContentResponse> {
    try {
      // 转换请求格式
      const glmRequest = this.buildGlmRequestPayload(request, false);

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

      const glmResponse: GlmResponse = await response.json();
      // 转换响应格式并执行工具调用
      return await this.convertGlmToGemini(glmResponse, true);

    } catch (error) {
      console.error('智谱AI GLM API call failed:', error);
      throw error;
    }
  }

  async generateContentStream(
    request: GenerateContentParameters,
    _userPromptId: string,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    try {
      // 智谱AI支持原生流式响应
      const glmRequest = this.buildGlmRequestPayload(request, true);

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
      const response = await this.generateContent(request, _userPromptId);
      return this.simulateStream(response);
    }
  }

  async countTokens(request: CountTokensParameters): Promise<CountTokensResponse> {
    // 智谱AI提供token计算接口
    try {
      const messages = this.convertGeminiToGlmMessages(
        this.normalizeContents(request.contents as any),
      );

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




  private buildGlmRequestPayload(
    request: GenerateContentParameters,
    stream: boolean,
  ): {
    model: string;
    messages: GlmMessage[];
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    stream: boolean;
    tools?: GlmTool[];
    tool_choice?: 'auto' | 'none';
  } {
    const messages = this.convertGeminiToGlmMessages(
      this.normalizeContents(request.contents as any),
    );
    const payload: {
      model: string;
      messages: GlmMessage[];
      temperature?: number;
      max_tokens?: number;
      top_p?: number;
      stream: boolean;
      tools?: GlmTool[];
      tool_choice?: 'auto' | 'none';
    } = {
      model: this.model,
      messages,
      temperature: request.config?.temperature,
      max_tokens: request.config?.maxOutputTokens,
      top_p: request.config?.topP,
      stream,
    };

    const tools = this.convertTools(request.config?.tools as Tool[]);
    if (tools.length > 0) {
      payload.tools = tools;
      payload.tool_choice = 'auto';
    }

    return payload;
  }

  private convertGeminiToGlmMessages(contents: Content[]): GlmMessage[] {
    const messages: GlmMessage[] = [];

    for (const content of contents) {
      const textParts: string[] = [];
      const toolCalls: GlmToolCall[] = [];

      for (const part of content.parts ?? []) {
        if (part.text && part.text.trim()) {
          textParts.push(part.text);
        }

        if (part.functionCall) {
          toolCalls.push({
            id: part.functionCall.id || `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: 'function',
            function: {
              name: part.functionCall.name || 'unknown_function',
              arguments: JSON.stringify(part.functionCall.args ?? {}),
            },
          });
        }

        if (part.functionResponse) {
          messages.push({
            role: 'tool',
            tool_call_id: part.functionResponse.id || 'unknown',
            content: this.serializeFunctionResponse(part.functionResponse),
          });
        }
      }

      const text = textParts.join('\n').trim();
      if (text || toolCalls.length > 0) {
        const role = content.role === 'model' ? 'assistant' : (content.role as 'system' | 'user' | 'assistant' | 'tool');
        messages.push({
          role,
          content: text || undefined,
          tool_calls: toolCalls.length > 0 ? toolCalls : undefined,
        });
      }
    }

    return messages;
  }

  private convertTools(tools?: Tool[]): GlmTool[] {
    if (!tools) {
      return [];
    }

    const result: GlmTool[] = [];
    for (const tool of tools) {
      for (const declaration of tool.functionDeclarations ?? []) {
        if (!declaration?.name) {
          continue;
        }
        
        // 增强工具描述，向模型说明这是实际可执行的工具
        const enhancedDescription = declaration.description 
          ? `${declaration.description} [可执行工具 - 我会实际调用此功能]`
          : `${declaration.name} - 实际可执行的工具函数`;
          
        result.push({
          type: 'function',
          function: {
            name: declaration.name,
            description: enhancedDescription,
            parameters: declaration.parameters,
          },
        });
      }
    }
    
    console.log(`🔧 GLM工具转换完成: 已准备 ${result.length} 个可执行工具`);
    result.forEach(tool => {
      console.log(`   - ${tool.function.name}: ${tool.function.description}`);
    });
    
    return result;
  }

  private async convertGlmToGemini(glmResponse: GlmResponse, executeTools: boolean = true): Promise<GenerateContentResponse> {
    const choice = glmResponse.choices?.[0];
    if (!choice) {
      throw new Error('GLM response did not contain any choices.');
    }

    const parts: Part[] = [];
    const functionCalls: FunctionCall[] = [];
    const message = choice.message;
    
    // 处理工具调用
    if (message.tool_calls && message.tool_calls.length > 0) {
      console.log(`🔧 GLM返回了 ${message.tool_calls.length} 个工具调用`);
      
      for (const toolCall of message.tool_calls) {
        const args = this.safeParseJson(toolCall.function.arguments);
        const call: FunctionCall = {
          id: toolCall.id || `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: toolCall.function.name,
          args,
        };
        functionCalls.push(call);
        parts.push({ functionCall: call });
        
        console.log(`📋 工具调用: ${call.name}`, call.args);
      }

      // GLM不自己执行工具，而是返回FunctionCall给Gemini原生工具系统处理
      console.log('📤 GLM将工具调用返回给Gemini原生工具系统处理');
      
      // 注意：我们只返回functionCall parts，让Gemini原生工具系统来执行
      // 这样就能获得UI交互体验（确认对话框、结果显示等）
    }

    const textContent = this.extractAssistantText(message.content);
    if (textContent) {
      parts.push({ text: textContent });
    }

    const usage = glmResponse.usage ?? {};

    return {
      candidates: [
        {
          content: {
            role: 'model',
            parts,
          },
          finishReason: this.mapFinishReason(choice.finish_reason ?? 'stop'),
          index: choice.index ?? 0,
        },
      ],
      functionCalls: functionCalls.length > 0 ? functionCalls : undefined,
      text: textContent ?? undefined,
      usageMetadata: {
        promptTokenCount: usage.prompt_tokens ?? 0,
        candidatesTokenCount: usage.completion_tokens ?? 0,
        totalTokenCount: usage.total_tokens ?? 0,
      },
    } as GenerateContentResponse;
  }

  private async* handleGlmStream(response: Response): AsyncGenerator<GenerateContentResponse> {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('Stream reader not available');
    }

    // 累积工具调用数据
    let accumulatedToolCalls: GlmToolCall[] = [];
    let streamFinished = false;

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          streamFinished = true;
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ') && !line.includes('[DONE]')) {
            try {
              const data = JSON.parse(line.slice(6));
              const choice = data.choices?.[0];
              
              if (!choice) continue;

              // 处理普通文本内容
              if (choice.delta?.content) {
                yield {
                  candidates: [{
                    content: {
                      role: 'model',
                      parts: [{ text: choice.delta.content }],
                    },
                    finishReason: 'STOP' as any,
                    index: 0,
                  }],
                } as GenerateContentResponse;
              }

              // 处理工具调用（GLM在流式中可能分块发送tool_calls）
              if (choice.delta?.tool_calls) {
                for (const toolCall of choice.delta.tool_calls) {
                  // 查找或创建工具调用
                  let existingCall = accumulatedToolCalls.find(call => call.id === toolCall.id);
                  if (!existingCall) {
                    existingCall = {
                      id: toolCall.id,
                      type: 'function',
                      function: {
                        name: toolCall.function?.name || '',
                        arguments: ''
                      }
                    };
                    accumulatedToolCalls.push(existingCall);
                  }
                  
                  // 累积工具调用数据
                  if (toolCall.function?.name) {
                    existingCall.function.name = toolCall.function.name;
                  }
                  if (toolCall.function?.arguments) {
                    existingCall.function.arguments += toolCall.function.arguments;
                  }
                }
              }

              // 检查是否完成
              if (choice.finish_reason) {
                streamFinished = true;
              }
            } catch (e) {
              // 忽略解析错误
              console.warn('Stream parsing error:', e);
            }
          }
        }
      }

      // 流结束后，如果有工具调用，处理执行
      if (streamFinished && accumulatedToolCalls.length > 0) {
        console.log(`🔧 流式处理发现 ${accumulatedToolCalls.length} 个工具调用`);
        
        const functionCalls: FunctionCall[] = [];
        const parts: Part[] = [];

        // 转换工具调用格式
        for (const toolCall of accumulatedToolCalls) {
          const args = this.safeParseJson(toolCall.function.arguments);
          const call: FunctionCall = {
            id: toolCall.id,
            name: toolCall.function.name,
            args,
          };
          functionCalls.push(call);
          parts.push({ functionCall: call });
        }

        // GLM流式模式：将工具调用返回给Gemini原生工具系统处理
        console.log('📤 流式模式：GLM将工具调用返回给Gemini原生工具系统处理');

        // 输出工具调用结果
        yield {
          candidates: [{
            content: {
              role: 'model',
              parts,
            },
            finishReason: 'STOP' as any,
            index: 0,
          }],
          functionCalls,
        } as GenerateContentResponse;
      }

    } finally {
      reader.releaseLock();
    }
  }

  private mapFinishReason(
    reason: string,
  ): NonNullable<GenerateContentResponse['candidates']>[number]['finishReason'] {
    switch (reason) {
      case 'stop':
        return 'STOP' as any;
      case 'length':
        return 'MAX_TOKENS' as any;
      case 'content_filter':
        return 'SAFETY' as any;
      default:
        return 'STOP' as any;
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
          finishReason: 'STOP',
          index: 0,
        }],
      } as GenerateContentResponse;

      // 添加小延迟以模拟流式输出
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  private normalizeContents(contents: Content | Content[] | Part[] | Part | string): Content[] {
    if (Array.isArray(contents)) {
      if (contents.length === 0) {
        return [];
      }
      if ('role' in contents[0]!) {
        return contents as Content[];
      }
      return [
        {
          role: 'user',
          parts: this.toPartsList(contents as Part[] | Part),
        },
      ];
    }

    if (typeof contents === 'string') {
      return [
        {
          role: 'user',
          parts: [{ text: contents }],
        },
      ];
    }

    if ('role' in contents) {
      return [contents as Content];
    }

    return [
      {
        role: 'user',
        parts: this.toPartsList(contents as Part[] | Part),
      },
    ];
  }

  private toPartsList(value: Part[] | Part): Part[] {
    if (Array.isArray(value)) {
      return value;
    }
    return [value];
  }

  private serializeFunctionResponse(response: Part['functionResponse']): string {
    if (!response?.response) {
      return '';
    }

    const value = response.response;
    if (typeof value === 'string') {
      return value;
    }

    if (Array.isArray(value)) {
      return value
        .map((item) => {
          if (typeof item === 'string') {
            return item;
          }
          if (item && typeof item === 'object' && 'text' in item) {
            return String((item as { text?: string }).text ?? '');
          }
          return '';
        })
        .join('');
    }

    try {
      return JSON.stringify(value);
    } catch (error) {
      console.warn('Failed to serialize GLM tool response:', error);
      return String(value);
    }
  }

  private safeParseJson(value: string | undefined): Record<string, unknown> {
    if (!value) {
      return {};
    }

    try {
      const parsed = JSON.parse(value);
      return typeof parsed === 'object' && parsed !== null
        ? (parsed as Record<string, unknown>)
        : {};
    } catch (error) {
      console.warn('Failed to parse GLM tool call arguments:', error);
      return {};
    }
  }

  private extractAssistantText(
    content: GlmMessage['content'],
  ): string | undefined {
    if (typeof content === 'string') {
      const trimmed = content.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    }

    if (Array.isArray(content)) {
      const text = content
        .map((block) => (block.text ? block.text.trim() : ''))
        .filter((blockText) => blockText.length > 0)
        .join('');
      return text.length > 0 ? text : undefined;
    }

    return undefined;
  }
}
