import { API_CONFIG } from '../config/constants.js';
import { getApiKey } from '../utils/storage.js';
import { DraftGenerator } from './draftGenerator.js';

export const generateAIReply = async (emailData, tone, context = {}) => {
  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error('Please enter your OpenAI API key in the settings.');
  }

  if (!emailData?.content) {
    throw new Error('No email content found to generate reply.');
  }

  const draftGenerator = new DraftGenerator(emailData.content, context);
  const prompt = draftGenerator.generatePrompt(tone);

  try {
    const response = await fetch(API_CONFIG.OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: API_CONFIG.MODEL,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate reply');
    }

    const data = await response.json();
    const generatedReply = data.choices[0]?.message?.content?.trim();
    
    if (!generatedReply) {
      throw new Error('No reply was generated. Please try again.');
    }

    return generatedReply;
  } catch (error) {
    if (error.message.includes('API key')) {
      throw new Error('Invalid API key. Please check your OpenAI API key in settings.');
    }
    throw new Error(`Failed to generate reply: ${error.message}`);
  }
};