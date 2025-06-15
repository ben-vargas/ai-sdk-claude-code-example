import { generateText, streamText } from 'ai';
import { claudeCode } from 'ai-sdk-provider-claude-code';

async function testClaudeCode() {
  try {
    console.log('Testing ai-sdk-provider-claude-code with correct system prompt configuration...\n');
    
    // CORRECT: Use customSystemPrompt or appendSystemPrompt in the settings
    const model = claudeCode('sonnet', {
      customSystemPrompt: 'You are a helpful assistant that can use command line tools to get current information.',
      // Alternative: appendSystemPrompt: 'Always check the current date when asked about "today".'
    });
    
    // The specific prompt you requested
    const prompt = "What professional sports teams are playing today, be sure to use command line tools to get today's current date.";
    
    console.log('Prompt:', prompt);
    console.log('\nGenerating response...\n');
    
    // Generate text using the prompt
    const { text, usage, finishReason, providerMetadata } = await generateText({
      model: model,
      prompt: prompt,
    });
    
    console.log('Response:', text);
    console.log('\nFinish Reason:', finishReason);
    
    if (usage) {
      console.log('\nUsage:', usage);
    }
    
    if (providerMetadata?.['claude-code']) {
      console.log('\nProvider Metadata:', providerMetadata['claude-code']);
    }
    
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    if (error instanceof Error && error.cause) {
      console.error('Cause:', error.cause);
    }
  }
}

// Alternative: Using system messages in the messages array
async function testWithSystemMessage() {
  try {
    console.log('\n--- Testing with System Message in Messages Array ---\n');
    
    const model = claudeCode('sonnet');
    
    // System messages can be included in the messages array
    const { text } = await generateText({
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that can use command line tools to get current information.'
        },
        {
          role: 'user',
          content: "What professional sports teams are playing today, be sure to use command line tools to get today's current date."
        }
      ],
    });
    
    console.log('Response:', text);
    
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
  }
}

// Alternative: Using the provider factory with default settings
async function testWithProviderFactory() {
  try {
    console.log('\n--- Testing with Provider Factory Default Settings ---\n');
    
    // Import the factory function
    const { createClaudeCode } = await import('ai-sdk-provider-claude-code');
    
    // Create a custom provider with default system prompt
    const customProvider = createClaudeCode({
      defaultSettings: {
        customSystemPrompt: 'You are a helpful assistant that can use command line tools to get current information.',
      }
    });
    
    const model = customProvider('sonnet');
    
    const { text } = await generateText({
      model: model,
      prompt: "What professional sports teams are playing today, be sure to use command line tools to get today's current date.",
    });
    
    console.log('Response:', text);
    
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
  }
}

// Run the tests
async function main() {
  await testClaudeCode();
  await testWithSystemMessage();
  await testWithProviderFactory();
}

main();