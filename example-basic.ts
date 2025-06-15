import { generateText, streamText } from 'ai';
import { claudeCode } from 'ai-sdk-provider-claude-code';

async function testClaudeCode() {
  try {
    console.log('Testing ai-sdk-provider-claude-code...\n');
    
    // Create the model instance with optional system prompt
    const model = claudeCode('sonnet', {
      customSystemPrompt: 'You are a helpful assistant that can use command line tools to get current information.'
    });
    
    // The specific prompt you requested
    const prompt = "What professional sports teams are playing today, be sure to use command line tools to get today's current date.";
    
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
    console.error('Error:', error instanceof Error ? error.message : error);
    if (error instanceof Error && error.cause) {
      console.error('Cause:', error.cause);
    }
  }
}

// Alternative: Test with streaming
async function testStreamingClaudeCode() {
  try {
    console.log('\n--- Testing Streaming Mode ---\n');
    
    const model = claudeCode('sonnet');
    const prompt = "What professional sports teams are playing today, be sure to use command line tools to get today's current date.";
    
    const { textStream } = await streamText({
      model: model,
      prompt: prompt,
    });
    
    console.log('Streaming response:');
    for await (const chunk of textStream) {
      process.stdout.write(chunk);
    }
    console.log('\n');
    
  } catch (error) {
    console.error('Streaming Error:', error instanceof Error ? error.message : error);
  }
}

// Run the tests
async function main() {
  await testClaudeCode();
  // Uncomment to test streaming:
  await testStreamingClaudeCode();
}

main();