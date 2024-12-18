// Handles OpenAI API interactions
import { API_CONFIG } from '../../config/constants.js';
import { getApiKey } from '../../utils/storage.js';

export class OpenAIService {
  async generateResponse(prompt) {
    const apiKey = await getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    try {
      const response = await fetch(API_CONFIG.OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: API_CONFIG.MODEL,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('OpenAI API request failed');
      }

      const data = await response.json();
      return data.choices[0]?.message?.content?.trim();
    } catch (error) {
      throw new Error(`AI generation failed: ${error.message}`);
    }
  }
}