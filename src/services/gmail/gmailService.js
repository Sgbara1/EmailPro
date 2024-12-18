// Handles Gmail-specific operations
import { GmailConnection } from './gmailConnection.js';
import { GmailDOMHandler } from './gmailDOMHandler.js';

export class GmailService {
  constructor() {
    this.connection = new GmailConnection();
    this.domHandler = new GmailDOMHandler();
  }

  async initialize(onConnectionChange) {
    await this.connection.initialize(onConnectionChange);
  }

  async getCurrentEmail() {
    return this.domHandler.getEmailContent();
  }

  async insertReply(replyText) {
    const replyBox = this.domHandler.findReplyBox();
    return this.domHandler.insertReply(replyBox, replyText);
  }
}