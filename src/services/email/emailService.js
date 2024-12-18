// Handles all email-related operations
import { EmailParser } from './emailParser.js';
import { EmailValidator } from './emailValidator.js';
import { ReplyGenerator } from './replyGenerator.js';

export class EmailService {
  constructor() {
    this.parser = new EmailParser();
    this.validator = new EmailValidator();
    this.replyGenerator = new ReplyGenerator();
  }

  async generateReply(emailContent, tone, context) {
    this.validator.validateEmail(emailContent);
    const parsedEmail = this.parser.parseEmail(emailContent);
    return await this.replyGenerator.generate(parsedEmail, tone, context);
  }
}