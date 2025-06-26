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

const AstrologyQueryInputSchema = z.object({
  query: z.string().describe('The user query about astrology.'),
});
export type AstrologyQueryInput = z.infer<typeof AstrologyQueryInputSchema>;

const AstrologyQueryOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query about astrology.'),
});
export type AstrologyQueryOutput = z.infer<typeof AstrologyQueryOutputSchema>;

export async function astrologyQuery(input: AstrologyQueryInput): Promise<AstrologyQueryOutput> {
  return astrologyQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'astrologyQueryPrompt',
  input: {schema: AstrologyQueryInputSchema},
  output: {schema: AstrologyQueryOutputSchema},
  prompt: `You are an expert astrologer. Please answer the following question about astrology in Burmese:\n\n{{{query}}}`,
});

const astrologyQueryFlow = ai.defineFlow(
  {
    name: 'astrologyQueryFlow',
    inputSchema: AstrologyQueryInputSchema,
    outputSchema: AstrologyQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
