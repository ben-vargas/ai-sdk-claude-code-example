import { generateObject } from 'ai';
import { claudeCode } from 'ai-sdk-provider-claude-code';
import { z } from 'zod';

// Simple example of using generateObject with ai-sdk-provider-claude-code

async function main() {
  // Create the model instance
  const model = claudeCode('sonnet');
  
  // Define the schema for the object you want to generate
  const recipeSchema = z.object({
    name: z.string().describe('Name of the recipe'),
    servings: z.number().positive().describe('Number of servings'),
    prepTime: z.number().describe('Preparation time in minutes'),
    cookTime: z.number().describe('Cooking time in minutes'),
    ingredients: z.array(z.object({
      item: z.string(),
      amount: z.string(),
      unit: z.string().optional()
    })).describe('List of ingredients with amounts'),
    instructions: z.array(z.string()).describe('Step-by-step cooking instructions'),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    vegetarian: z.boolean()
  });
  
  try {
    console.log('Generating a recipe using Claude Code...\n');
    
    const { object } = await generateObject({
      model,
      schema: recipeSchema,
      prompt: 'Generate a recipe for chocolate chip cookies'
    });
    
    console.log('Generated Recipe:');
    console.log('================\n');
    console.log(`Name: ${object.name}`);
    console.log(`Servings: ${object.servings}`);
    console.log(`Prep Time: ${object.prepTime} minutes`);
    console.log(`Cook Time: ${object.cookTime} minutes`);
    console.log(`Difficulty: ${object.difficulty}`);
    console.log(`Vegetarian: ${object.vegetarian ? 'Yes' : 'No'}`);
    
    console.log('\nIngredients:');
    object.ingredients.forEach(ing => {
      console.log(`- ${ing.amount} ${ing.unit || ''} ${ing.item}`);
    });
    
    console.log('\nInstructions:');
    object.instructions.forEach((step, index) => {
      console.log(`${index + 1}. ${step}`);
    });
    
  } catch (error) {
    console.error('Error generating object:', error);
  }
}

main();