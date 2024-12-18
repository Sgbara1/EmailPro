// Builds prompts for AI
import { TONE_PROMPTS } from '../../config/constants.js';

export class PromptBuilder {
  buildPrompt(parsedEmail, tone, context) {
    const basePrompt = TONE_PROMPTS[tone];
    const contextStr = context ? `\nContext: ${context}` : '';
    
    return `
      ${basePrompt}
      
      Original email:
      Subject: ${parsedEmail.metadata.subject}
      From: ${parsedEmail.metadata.from}
      Content: "${parsedEmail.content}"
      ${contextStr}
      
      Instructions:
      1. Start with an appropriate greeting
      2. Address the main points
      3. Maintain ${tone} tone
      4. End professionally
    `.trim();
  }
}