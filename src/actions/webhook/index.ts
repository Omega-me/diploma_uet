'use server';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, CoreMessage } from 'ai';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const onGenerateSmartAiMessage = async (
  prompt: string,
  messages: CoreMessage[],
) => {
  const { text } = await generateText({
    model: google('gemini-1.5-pro-latest'),
    messages: [
      {
        role: 'system',
        content:
          `You are a helpful assistant.` +
          `Do not spread missinformation.` +
          `Do not offend anyone.`,
      },
      ...messages,
      {
        role: 'assistant',
        content: prompt + ` :Keep responses under 2 sentences`,
      },
    ],
  });

  return text;
};
