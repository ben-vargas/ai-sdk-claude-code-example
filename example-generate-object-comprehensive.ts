import { generateObject, streamObject } from 'ai';
import { claudeCode } from 'ai-sdk-provider-claude-code';
import { z } from 'zod';

// Example 1: Basic object generation
async function testBasicObject() {
  console.log('=== Testing Basic Object Generation ===\n');
  
  const model = claudeCode('sonnet');
  
  // Define a simple schema
  const schema = z.object({
    name: z.string().describe('Product name'),
    price: z.number().describe('Price in USD'),
    inStock: z.boolean().describe('Whether the item is in stock'),
    categories: z.array(z.string()).describe('Product categories')
  });
  
  try {
    const { object } = await generateObject({
      model,
      schema,
      prompt: 'Generate a product listing for a wireless mouse'
    });
    
    console.log('Generated object:', JSON.stringify(object, null, 2));
  } catch (error) {
    console.error('Basic object error:', error);
  }
}

// Example 2: Complex nested object
async function testNestedObject() {
  console.log('\n=== Testing Nested Object Generation ===\n');
  
  const model = claudeCode('sonnet');
  
  // Define a more complex schema
  const addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string().length(2),
    zipCode: z.string().regex(/^\d{5}$/)
  });
  
  const userSchema = z.object({
    id: z.number(),
    username: z.string().min(3).max(20),
    email: z.string().email(),
    profile: z.object({
      firstName: z.string(),
      lastName: z.string(),
      age: z.number().min(0).max(120),
      bio: z.string().optional(),
      address: addressSchema
    }),
    permissions: z.array(z.enum(['read', 'write', 'admin'])),
    isActive: z.boolean(),
    createdAt: z.string().describe('ISO 8601 date string')
  });
  
  try {
    const { object } = await generateObject({
      model,
      schema: userSchema,
      prompt: 'Generate a complete user profile for a software developer named Alex Chen who lives in San Francisco'
    });
    
    console.log('Generated user:', JSON.stringify(object, null, 2));
  } catch (error) {
    console.error('Nested object error:', error);
  }
}

// Example 3: Array of objects
async function testArrayGeneration() {
  console.log('\n=== Testing Array Generation ===\n');
  
  const model = claudeCode('sonnet');
  
  const taskSchema = z.object({
    tasks: z.array(z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      priority: z.enum(['low', 'medium', 'high']),
      completed: z.boolean(),
      dueDate: z.string().optional()
    }))
  });
  
  try {
    const { object } = await generateObject({
      model,
      schema: taskSchema,
      prompt: 'Generate a list of 5 tasks for building a web application'
    });
    
    console.log('Generated tasks:', JSON.stringify(object, null, 2));
  } catch (error) {
    console.error('Array generation error:', error);
  }
}

// Example 4: Streaming object generation
async function testStreamingObject() {
  console.log('\n=== Testing Streaming Object Generation ===\n');
  
  const model = claudeCode('sonnet');
  
  const weatherSchema = z.object({
    location: z.string(),
    temperature: z.object({
      value: z.number(),
      unit: z.enum(['celsius', 'fahrenheit'])
    }),
    conditions: z.string(),
    humidity: z.number().min(0).max(100),
    windSpeed: z.object({
      value: z.number(),
      unit: z.enum(['mph', 'kmh'])
    }),
    forecast: z.array(z.object({
      day: z.string(),
      high: z.number(),
      low: z.number(),
      conditions: z.string()
    }))
  });
  
  try {
    const { partialObjectStream, object } = await streamObject({
      model,
      schema: weatherSchema,
      prompt: 'Generate a weather report for New York City with a 3-day forecast'
    });
    
    console.log('Streaming partial objects:');
    for await (const partialObject of partialObjectStream) {
      console.log('Partial:', JSON.stringify(partialObject, null, 2));
      console.log('---');
    }
    
    const finalObject = await object;
    console.log('\nFinal object:', JSON.stringify(finalObject, null, 2));
  } catch (error) {
    console.error('Streaming object error:', error);
  }
}

// Example 5: Using system prompt for better results
async function testWithSystemPrompt() {
  console.log('\n=== Testing Object Generation with System Prompt ===\n');
  
  const model = claudeCode('sonnet', {
    customSystemPrompt: 'You are an API that always generates valid, realistic data. Follow the schema constraints precisely.'
  });
  
  const companySchema = z.object({
    name: z.string(),
    founded: z.number().min(1800).max(2024),
    industry: z.string(),
    headquarters: z.object({
      city: z.string(),
      country: z.string()
    }),
    employees: z.number().positive(),
    revenue: z.object({
      amount: z.number().positive(),
      currency: z.enum(['USD', 'EUR', 'GBP', 'JPY'])
    }),
    public: z.boolean(),
    ticker: z.string().optional().describe('Stock ticker symbol if public')
  });
  
  try {
    const { object } = await generateObject({
      model,
      schema: companySchema,
      prompt: 'Generate information for a fictional technology startup'
    });
    
    console.log('Generated company:', JSON.stringify(object, null, 2));
  } catch (error) {
    console.error('System prompt object error:', error);
  }
}

// Main function to run all tests
async function main() {
  console.log('Testing generateObject with ai-sdk-provider-claude-code\n');
  
  try {
    await testBasicObject();
    await testNestedObject();
    await testArrayGeneration();
    await testStreamingObject();
    await testWithSystemPrompt();
  } catch (error) {
    console.error('Main error:', error);
  }
}

// Run the tests
main();