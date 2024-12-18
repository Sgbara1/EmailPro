import { EmailProcessor } from './emailProcessor.js';

export class MessageHandler {
  constructor() {
    this.emailProcessor = new EmailProcessor();
  }

  async handleMessage(request) {
    if (request.action !== 'generateReply') {
      return;
    }

    try {
      await this.emailProcessor.processEmail(request.tone);
      this.sendResponse('success', 'Reply generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      this.sendResponse('error', error.message);
    }
  }

  sendResponse(type, message) {
    chrome.runtime.sendMessage({
      action: type,
      message: message
    });
  }
}