// Handles AI reply generation
import { OpenAIService } from '../ai/openAIService.js';
import { PromptBuilder } from '../ai/promptBuilder.js';

export class ReplyGenerator {
  constructor() {
    this.aiService = new OpenAIService();
    this.promptBuilder = new PromptBuilder();
  }

  async generate(parsedEmail, tone, context) {
    const prompt = this.promptBuilder.buildPrompt(parsedEmail, tone, context);
    return await this.aiService.generateResponse(prompt);
  }
}