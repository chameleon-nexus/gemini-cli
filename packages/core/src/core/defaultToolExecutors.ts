/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Default tool executors for GLM function calling
 * These are the built-in tools available in interactive mode
 */

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import type { ToolExecutor } from './glmContentGenerator.js';

export const defaultToolExecutors: ToolExecutor = {
  /**
   * 写文件工具
   */
  write_file: async ({ file_path, filename, content }: { file_path?: string; filename?: string; content: string }) => {
    try {
      // 获取文件路径，优先使用file_path，fallback到filename
      const filePath = file_path || filename;
      if (!filePath) {
        throw new Error('必须提供文件路径（file_path或filename）');
      }
      
      // 安全检查：不允许写入系统关键目录
      const resolvedPath = path.resolve(filePath);
      const cwd = process.cwd();
      
      // 检查是否在当前工作目录下
      if (!resolvedPath.startsWith(cwd)) {
        throw new Error('只允许在当前工作目录下创建文件');
      }
      
      // 创建目录（如果不存在）
      const dir = path.dirname(resolvedPath);
      await fs.mkdir(dir, { recursive: true });
      
      // 写入文件
      await fs.writeFile(resolvedPath, content, 'utf8');
      
      return {
        success: true,
        message: `文件 ${filePath} 创建成功`,
        path: resolvedPath,
        size: content.length
      };
    } catch (error) {
      throw new Error(`文件写入失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  /**
   * 读文件工具
   */
  read_file: async ({ filename }: { filename: string }) => {
    try {
      const resolvedPath = path.resolve(filename);
      const content = await fs.readFile(resolvedPath, 'utf8');
      const stats = await fs.stat(resolvedPath);
      
      return {
        filename,
        path: resolvedPath,
        content,
        size: stats.size,
        modified: stats.mtime.toISOString()
      };
    } catch (error) {
      throw new Error(`文件读取失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  /**
   * 获取当前时间工具
   */
  get_current_time: async () => {
    const now = new Date();
    return {
      timestamp: now.toISOString(),
      formatted: now.toLocaleString('zh-CN', { 
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      timezone: 'Asia/Shanghai',
      unix: Math.floor(now.getTime() / 1000)
    };
  },

  /**
   * 数学计算工具
   */
  calculate: async ({ expression }: { expression: string }) => {
    try {
      // 安全的数学表达式求值
      const allowedChars = /^[0-9+\-*/().\s]+$/;
      if (!allowedChars.test(expression)) {
        throw new Error('表达式包含不允许的字符');
      }
      
      if (expression.length > 100) {
        throw new Error('表达式过长');
      }
      
      const result = Function(`"use strict"; return (${expression})`)();
      
      if (typeof result !== 'number' || !isFinite(result)) {
        throw new Error('计算结果无效');
      }
      
      return {
        expression,
        result,
        type: typeof result
      };
    } catch (error) {
      throw new Error(`计算表达式错误: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  /**
   * 执行shell命令工具（谨慎使用）
   */
  execute_command: async ({ command }: { command: string }) => {
    try {
      // 安全检查：禁止危险命令
      const dangerousCommands = ['rm', 'del', 'format', 'fdisk', 'sudo', 'su'];
      const lowerCommand = command.toLowerCase();
      
      for (const dangerous of dangerousCommands) {
        if (lowerCommand.includes(dangerous)) {
          throw new Error(`禁止执行危险命令: ${dangerous}`);
        }
      }
      
      if (command.length > 200) {
        throw new Error('命令过长');
      }
      
      const output = execSync(command, { 
        encoding: 'utf8', 
        timeout: 10000, // 10秒超时
        maxBuffer: 1024 * 1024 // 1MB输出限制
      });
      
      return {
        command,
        output: output.toString(),
        success: true
      };
    } catch (error) {
      throw new Error(`命令执行失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  /**
   * 列出目录内容工具
   */
  list_directory: async ({ directory = '.' }: { directory?: string } = {}) => {
    try {
      const resolvedPath = path.resolve(directory);
      const items = await fs.readdir(resolvedPath, { withFileTypes: true });
      
      const result = [];
      for (const item of items) {
        const itemPath = path.join(resolvedPath, item.name);
        const stats = await fs.stat(itemPath);
        
        result.push({
          name: item.name,
          type: item.isDirectory() ? 'directory' : 'file',
          size: stats.size,
          modified: stats.mtime.toISOString()
        });
      }
      
      return {
        directory: resolvedPath,
        items: result,
        count: result.length
      };
    } catch (error) {
      throw new Error(`目录列表失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
};

/**
 * 获取默认工具声明（用于GLM API）
 */
export const getDefaultToolDeclarations = () => [
  {
    functionDeclarations: [
      {
        name: 'write_file',
        description: '创建文件并写入内容',
        parameters: {
          type: 'object',
          properties: {
            file_path: { type: 'string', description: '文件路径（相对或绝对路径）' },
            filename: { type: 'string', description: '文件名（相对路径）' },
            content: { type: 'string', description: '文件内容' }
          },
          required: ['content']
        }
      },
      {
        name: 'read_file',
        description: '读取文件内容',
        parameters: {
          type: 'object',
          properties: {
            filename: { type: 'string', description: '文件名（相对路径）' }
          },
          required: ['filename']
        }
      },
      {
        name: 'get_current_time',
        description: '获取当前系统时间',
        parameters: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'calculate',
        description: '计算数学表达式',
        parameters: {
          type: 'object',
          properties: {
            expression: { type: 'string', description: '数学表达式，如 "2 + 3 * 4"' }
          },
          required: ['expression']
        }
      },
      {
        name: 'execute_command',
        description: '执行shell命令（安全模式）',
        parameters: {
          type: 'object',
          properties: {
            command: { type: 'string', description: 'shell命令' }
          },
          required: ['command']
        }
      },
      {
        name: 'list_directory',
        description: '列出目录内容',
        parameters: {
          type: 'object',
          properties: {
            directory: { type: 'string', description: '目录路径，默认为当前目录' }
          }
        }
      }
    ]
  }
];
