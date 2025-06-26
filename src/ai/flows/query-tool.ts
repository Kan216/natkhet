'use server';

/**
 * @fileOverview An AI agent that answers questions about astrology in Burmese.
 *
 * - astrologyQuery - A function that handles the astrology query process.
 * - AstrologyQueryInput - The input type for the astrologyQuery function.
 * - AstrologyQueryOutput - The return type for the astrologyQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const AstrologyQueryInputSchema = z.object({
  apiKey: z.string().describe('The user-provided Google AI API key.'),
  query: z.string().describe('The user query about astrology.'),
  zodiacSign: z.string().optional().describe('The zodiac sign the user is asking about.'),
});
export type AstrologyQueryInput = z.infer<typeof AstrologyQueryInputSchema>;

const AstrologyQueryOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query about astrology.'),
});
export type AstrologyQueryOutput = z.infer<typeof AstrologyQueryOutputSchema>;

export async function astrologyQuery(input: AstrologyQueryInput): Promise<AstrologyQueryOutput> {
  return astrologyQueryFlow(input);
}

const promptTemplate = `You are an expert astrologer. Please answer the following question about astrology in Burmese.
{{#if zodiacSign}}
The user is asking specifically about the {{zodiacSign}} zodiac sign.
{{/if}}

Question:
{{{query}}}`;

const astrologyQueryFlow = ai.defineFlow(
  {
    name: 'astrologyQueryFlow',
    inputSchema: AstrologyQueryInputSchema,
    outputSchema: AstrologyQueryOutputSchema,
  },
  async ({apiKey, ...inputData}) => {
    if (!apiKey) {
      throw new Error('API key is required.');
    }
    
    const instance = genkit({
      plugins: [googleAI({apiKey})],
      model: 'googleai/gemini-2.0-flash',
    });

    const localPrompt = instance.definePrompt({
      name: 'tempAstrologyQueryPrompt',
      input: {
        schema: z.object({
          query: z.string(),
          zodiacSign: z.string().optional(),
        }),
      },
      output: {schema: AstrologyQueryOutputSchema},
      prompt: promptTemplate,
    });

    const {output} = await localPrompt(inputData);
    if (!output) {
      throw new Error('AI did not return an answer.');
    }
    return output;
  }
);