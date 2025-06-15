// Basic example of using ai-sdk-provider-claude-code with CommonJS
// This is the simplest possible usage without any system prompts

const { generateText } = require('ai');
const { claudeCode } = require('ai-sdk-provider-claude-code');

async function testClaudeCode() {
  try {
    console.log('Testing ai-sdk-provider-claude-code (Basic Example)...\n');
    
    // Create the model instance - defaults to using Claude's standard system prompt
    const model = claudeCode('sonnet');
    
    // A prompt that requires Claude to use its command-line tools
    const prompt = "What professional sports teams are playing today? Use command line tools to get today's current date.";
    
    console.log('Prompt:', prompt);
    console.log('\nGenerating response...\n');
    
    // Generate text using the prompt
    const { text, usage, finishReason } = await generateText({
      model: model,
      prompt: prompt,
    });
    
    console.log('Response:', text);
    console.log('\nFinish Reason:', finishReason);
    
    if (usage) {
      console.log('\nUsage:', usage);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.cause) {
      console.error('Cause:', error.cause);
    }
  }
}

// Run the test
testClaudeCode();