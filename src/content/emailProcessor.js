import { getEmailContent, findReplyBox, insertReply } from '../utils/gmail.js';
import { generateAIReply } from '../services/openai.js';

export class EmailProcessor {
  async checkConnection() {
    try {
      const emailContainer = document.querySelector('div.a3s.aiL');
      const replyBox = document.querySelector('div[role="textbox"][aria-label*="Reply"]');
      return !!(emailContainer || replyBox);
    } catch (error) {
      return false;
    }
  }

  async processEmail(tone, context = '') {
    try {
      // Get email content
      const emailContent = await this.getEmailContent();
      if (!emailContent) {
        throw new Error('No email content found. Please open an email first.');
      }

      // Find reply box
      const replyBox = await this.getReplyBox();
      if (!replyBox) {
        throw new Error('Reply box not found. Please click Reply first.');
      }

      // Generate and insert reply
      const reply = await this.generateReply(emailContent, tone, context);
      await this.insertReply(replyBox, reply);
      
      return true;
    } catch (error) {
      throw new Error(`Failed to process email: ${error.message}`);
    }
  }

  async getEmailContent() {
    return getEmailContent();
  }

  async getReplyBox() {
    return findReplyBox();
  }

  async generateReply(emailContent, tone, context) {
    return await generateAIReply(emailContent, tone, context);
  }

  async insertReply(replyBox, reply) {
    return insertReply(replyBox, reply);
  }
}