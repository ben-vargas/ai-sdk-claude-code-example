# AI SDK Provider Claude Code Examples

This repository contains examples demonstrating how to use the `ai-sdk-provider-claude-code` package which implements a custom community provider with the Vercel AI SDK.

## Prerequisites

- Node.js installed
- Claude Code CLI authenticated (`claude login`)

## Installation

```bash
npm install
```

## Running Examples

### Run All Examples

To run all examples in sequence:

```bash
npm run examples:all
```

This will demonstrate all the different ways to use ai-sdk-provider-claude-code.

## Available Examples

### Basic Usage

The simplest example showing how to use Claude Code with the AI SDK:

```bash
# TypeScript (recommended)
npm run example:basic

# CommonJS/JavaScript version (for legacy projects)
npm run example:basic:js
```

**Files:** 
- `example-basic.ts` - Full example with streaming support
- `example-basic.js` - Simple CommonJS example

### System Prompts

Examples showing three different ways to use system prompts:

```bash
npm run example:system-prompts
```

**File:** `example-system-prompts.ts`
- Method 1: Using `customSystemPrompt` in settings
- Method 2: Using system messages in the messages array
- Method 3: Using provider factory with default settings

### Object Generation (generateObject)

Simple example generating structured data with Zod schemas:

```bash
npm run example:generate-object
```

**File:** `example-generate-object.ts`
- Simple recipe generation example
- Shows how to use Zod schemas
- Formatted output display

### Comprehensive Object Generation Tests

Advanced examples of generateObject functionality:

```bash
npm run example:generate-object:comprehensive
```

**File:** `example-generate-object-comprehensive.ts`
- Basic object generation
- Nested objects
- Arrays of objects
- Streaming object generation
- Using system prompts with object generation

### Sports JSON Example

Real-world example that finds today's sports games and outputs as JSON:

```bash
npm run example:sports-json
```

**File:** `example-sports-json.ts`
- Uses Claude's tools to get current date
- Searches for sports games
- Returns structured JSON data
- Demonstrates practical use of generateObject

## Key Learnings

1. **System Prompts**: Use `customSystemPrompt` or `appendSystemPrompt` in the settings (not `system`)
2. **Object Generation**: The provider supports `generateObject` through prompt engineering
3. **Tool Usage**: Claude Code can use command-line tools when properly prompted
4. **Streaming**: Both text and object generation support streaming

## Common Issues

- If you get authentication errors, run `claude login` first
- The `system` parameter is not valid - use `customSystemPrompt` instead
- Object generation works through prompt engineering, not native JSON mode