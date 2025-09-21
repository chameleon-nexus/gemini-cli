# Gemini CLI (Chameleon Nexus Tech Edition)

[![npm version](https://badge.fury.io/js/%40chameleon-nexus-tech%2Fgemini-cli.svg)](https://badge.fury.io/js/%40chameleon-nexus-tech%2Fgemini-cli)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**A customized version of Gemini CLI that uses Volcengine AI instead of Google Gemini API**

> ⚠️ **Important Notice**: This is a modified version of [Google Gemini CLI](https://github.com/google-gemini/gemini-cli). Original project copyright belongs to Google LLC under Apache 2.0 License.

## 🚀 Features

- ✅ **Full Compatibility**: Maintains all original Gemini CLI functionality and interface
- ✅ **Volcengine Integration**: Automatically routes all requests to Volcengine AI  
- ✅ **Chinese Optimized**: Optimized for Chinese conversations
- ✅ **Seamless Replacement**: Drop-in replacement with no usage changes required

## 📦 Installation

```bash
npm install -g @chameleon-nexus-tech/gemini-cli
```

## 🔧 Configuration

### Environment Variables

Configure the following environment variables to use Volcengine AI:

```bash
# Required: Your Volcengine API Key (choose one method)
export VOLCENGINE_API_KEY="your-volcengine-api-key-here"
# OR use the standard Gemini environment variable for compatibility
export GEMINI_API_KEY="your-volcengine-api-key-here"

# Optional: Custom Volcengine base URL 
export VOLCENGINE_BASE_URL="https://ark.cn-beijing.volces.com/api/v3"

# Optional: Custom model selection
export VOLCENGINE_MODEL="deepseek-v3-250324"
```

### Windows PowerShell Configuration

```powershell
# Set API Key
$env:VOLCENGINE_API_KEY="your-volcengine-api-key-here"
# Or
$env:GEMINI_API_KEY="your-volcengine-api-key-here"

# Optional: Custom configuration
$env:VOLCENGINE_BASE_URL="https://ark.cn-beijing.volces.com/api/v3"
$env:VOLCENGINE_MODEL="deepseek-v3-250324"
```

### Environment Variable Priority

The system checks for API keys in this order:
1. `VOLCENGINE_API_KEY` (highest priority)
2. `GEMINI_API_KEY` (fallback for compatibility)
3. Hardcoded fallback key (for testing)

### Default Configuration

- **API Endpoint**: `https://ark.cn-beijing.volces.com/api/v3` (Volcengine Beijing)
- **Default Model**: `deepseek-v3-250324` (DeepSeek V3)
- **Timeout**: 30 seconds for API calls
- **Authentication**: Environment variable based

## 🚀 Usage

### Direct Question Mode

```bash
gemini "Hello, please introduce yourself"
```

### Interactive Mode

```bash
gemini
```

Then select "2. Use Gemini API Key" and press Enter to start chatting.

## 🔧 Technical Implementation

### Core Features Implemented

✅ **Complete API Replacement**: All Google Gemini API calls redirected to Volcengine AI  
✅ **Environment Variable Support**: Flexible configuration via multiple environment variables  
✅ **Format Translation**: Seamless conversion between Gemini and Volcengine API formats  
✅ **Streaming Compatibility**: Maintains original streaming response behavior  
✅ **Error Handling**: Robust error handling with 30-second timeout protection  
✅ **Authentication Fallback**: Multiple API key sources with priority system  
✅ **Model Flexibility**: Configurable model selection (defaults to DeepSeek V3)  

### Modified Files

1. **`packages/core/src/core/contentGenerator.ts`**
   - Modified `createContentGenerator()` to instantiate `VolcengineContentGenerator`
   - Added conditional logic for `AuthType.USE_GEMINI` and `AuthType.USE_VERTEX_AI`
   - Maintained full compatibility with original authentication flow

2. **`packages/core/src/core/volcengineContentGenerator.ts`** *(NEW FILE)*
   - Implements `ContentGenerator` interface for Volcengine AI
   - Handles request/response format conversion
   - Manages environment variable configuration
   - Provides streaming response simulation
   - Includes comprehensive error handling

### API Format Conversion Details

**Request Translation**:
- Converts Gemini `Content[]` format to Volcengine message format
- Maps roles: `user` → `user`, `model` → `assistant`
- Extracts text content from Gemini parts array
- Applies generation config (temperature, topP, maxTokens)

**Response Mapping**:
- Transforms Volcengine completion to Gemini candidate format
- Maps finish reasons and safety ratings
- Preserves token usage metadata
- Maintains compatibility with original response structure

**Configuration Management**:
- Environment variable precedence system
- Automatic fallback to hardcoded values for testing
- Support for custom endpoints and models
- Cross-platform compatibility (Linux/macOS/Windows)

## 📋 License Compliance

This project is based on [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) and follows Apache 2.0 License requirements:

### Original Project Information

- **Original Project**: Google Gemini CLI
- **Original Copyright**: Copyright 2025 Google LLC
- **Original License**: Apache License 2.0
- **Original Repository**: https://github.com/google-gemini/gemini-cli

### Modification Statement

In accordance with Apache 2.0 License Section 4:

- ✅ Retained original Apache 2.0 license
- ✅ Retained original copyright notices
- ✅ Clearly marked modifications
- ✅ Included complete license text

### Detailed Modifications

The following files were modified to redirect API calls from Google Gemini to Volcengine AI:

1. **Content Generator Logic** (`packages/core/src/core/contentGenerator.ts`)
   - Modified `createContentGenerator` function to instantiate `VolcengineContentGenerator` instead of `GoogleGenAI`
   - Added conditional logic to use Volcengine for both `AuthType.USE_GEMINI` and `AuthType.USE_VERTEX_AI`

2. **Volcengine Adapter** (`packages/core/src/core/volcengineContentGenerator.ts`) - **NEW FILE**
   - Implemented `ContentGenerator` interface for Volcengine AI
   - Added request/response format conversion between Gemini and Volcengine APIs
   - Implemented streaming simulation for compatibility
   - Added proper error handling and timeout management

## 🔄 Migration from Original Gemini CLI

If you're migrating from the original Google Gemini CLI:

1. **Uninstall original**: `npm uninstall -g @google/gemini-cli`
2. **Install this version**: `npm install -g @chameleon-nexus-tech/gemini-cli`
3. **Set API key**: `export VOLCENGINE_API_KEY="your-key"`
4. **Use as before**: All commands remain the same

## 🔗 Related Links

- [Original Project (Google Gemini CLI)](https://github.com/google-gemini/gemini-cli)
- [Volcengine AI Platform](https://www.volcengine.com/products/ai)
- [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

## 🐛 Issue Reporting

If you encounter any issues, please report them on [GitHub Issues](https://github.com/chameleon-nexus/gemini-cli/issues).

## 🤝 Contributing

Contributions are welcome! Please ensure:

1. Follow the original project's code style
2. Include appropriate tests
3. Update relevant documentation
4. Respect the Apache 2.0 license terms

## 📝 Changelog

### v1.0.0
- Initial release with Volcengine AI integration
- Full compatibility with original Gemini CLI
- Environment variable configuration support
- Chinese language optimization

---

**Disclaimer**: This project is not affiliated with Google or Volcengine. Please comply with the terms of service of the respective platforms when using this software.