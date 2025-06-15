import { generateObject } from 'ai';
import { claudeCode } from 'ai-sdk-provider-claude-code';
import { z } from 'zod';

async function testSportsGamesJSON() {
  try {
    console.log('Testing ai-sdk-provider-claude-code with generateObject...\n');
    
    // Create the model instance with system prompt that enables tool use
    const model = claudeCode('sonnet', {
      customSystemPrompt: 'You are a helpful assistant that can use command line tools to get current information. Always use the date command to get the current date before searching for sports games.'
    });
    
    // Define the schema for sports games
    const sportsGamesSchema = z.object({
      currentDate: z.string().describe('The current date in YYYY-MM-DD format'),
      dayOfWeek: z.string().describe('The day of the week'),
      games: z.array(z.object({
        sport: z.string().describe('The sport type (e.g., NBA, NFL, NHL, MLB)'),
        homeTeam: z.string().describe('The home team name'),
        awayTeam: z.string().describe('The away team name'),
        time: z.string().describe('Game time in local timezone'),
        venue: z.string().optional().describe('The venue/stadium name'),
        tvNetwork: z.string().optional().describe('TV network broadcasting the game')
      })).describe('List of professional sports games today'),
      totalGames: z.number().describe('Total number of games found'),
      dataSource: z.string().describe('Where the information was obtained from')
    });
    
    const prompt = "What professional sports teams are playing today? Use command line tools to get today's current date and then find the games. Return the results in a structured format.";
    
    console.log('Prompt:', prompt);
    console.log('\nGenerating structured response...\n');
    
    // Generate object using the prompt
    const { object, usage, finishReason } = await generateObject({
      model: model,
      schema: sportsGamesSchema,
      prompt: prompt,
    });
    
    console.log('Sports Games Today:');
    console.log('==================\n');
    console.log(`Date: ${object.currentDate} (${object.dayOfWeek})`);
    console.log(`Total Games: ${object.totalGames}`);
    console.log(`Data Source: ${object.dataSource}\n`);
    
    if (object.games.length > 0) {
      console.log('Games:');
      object.games.forEach((game, index) => {
        console.log(`\n${index + 1}. ${game.sport}`);
        console.log(`   ${game.awayTeam} @ ${game.homeTeam}`);
        console.log(`   Time: ${game.time}`);
        if (game.venue) console.log(`   Venue: ${game.venue}`);
        if (game.tvNetwork) console.log(`   TV: ${game.tvNetwork}`);
      });
    } else {
      console.log('No games found for today.');
    }
    
    console.log('\n\nRaw JSON Output:');
    console.log(JSON.stringify(object, null, 2));
    
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

// Alternative: Simpler schema for basic game information
async function testSimpleSportsJSON() {
  try {
    console.log('\n\n--- Testing with Simplified Schema ---\n');
    
    const model = claudeCode('sonnet', {
      customSystemPrompt: 'You are a helpful assistant that can use command line tools to get current information.'
    });
    
    // Simpler schema
    const simpleGamesSchema = z.object({
      date: z.string(),
      games: z.array(z.object({
        sport: z.string(),
        matchup: z.string().describe('Away Team vs Home Team'),
        time: z.string()
      }))
    });
    
    const { object } = await generateObject({
      model: model,
      schema: simpleGamesSchema,
      prompt: "Find today's professional sports games using command line tools to get the current date.",
    });
    
    console.log('Simple Games List:');
    console.log(`Date: ${object.date}`);
    object.games.forEach(game => {
      console.log(`- ${game.sport}: ${game.matchup} at ${game.time}`);
    });
    
  } catch (error) {
    console.error('Simple JSON Error:', error instanceof Error ? error.message : error);
  }
}

// Run the tests
async function main() {
  await testSportsGamesJSON();
  // Uncomment to test simplified version:
  await testSimpleSportsJSON();
}

main();