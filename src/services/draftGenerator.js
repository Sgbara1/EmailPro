import { TONE_PROMPTS } from '../config/constants.js';

export class DraftGenerator {
  constructor(emailContent, context = {}) {
    this.emailContent = emailContent;
    this.context = context;
  }

  generatePrompt(tone) {
    const contextStr = this.context.customNotes 
      ? `\nContext: ${this.context.customNotes}`
      : '';
      
    return `
      ${TONE_PROMPTS[tone]}
      
      Original email:
      "${this.emailContent}"
      ${contextStr}
      
      Instructions:
      1. Start with an appropriate greeting
      2. Acknowledge the main points from the original email
      3. Provide a clear and relevant response
      4. End with a professional closing
      5. Keep the tone ${tone}
    `;
  }

  extractEmailParts(email) {
    return {
      subject: email.subject || '',
      sender: email.from || '',
      recipient: email.to || '',
      content: email.content || ''
    };
  }
};