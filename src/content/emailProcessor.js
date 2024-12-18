import { getEmailContent, findReplyBox, insertReply } from '../utils/gmail.js';
import { generateAIReply } from '../services/openai.js';

export class EmailProcessor {
  async processEmail(tone) {
    const emailContent = await this.getEmailData();
    const replyBox = await this.getReplyBox();
    const reply = await this.generateReply(emailContent, tone);
    await this.insertReply(replyBox, reply);
  }

  async getEmailData() {
    const emailContent = getEmailContent();
    if (!emailContent) {
      throw new Error('No email content found. Please open an email first.');
    }
    return emailContent;
  }

  async getReplyBox() {
    const replyBox = findReplyBox();
    if (!replyBox) {
      throw new Error('Reply box not found. Please click Reply first.');
    }
    return replyBox;
  }

  async generateReply(emailContent, tone) {
    return await generateAIReply(emailContent, tone);
  }

  async insertReply(replyBox, reply) {
    return insertReply(replyBox, reply);
  }
}