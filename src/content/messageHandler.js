import { EmailProcessor } from './emailProcessor.js';

export class MessageHandler {
  constructor() {
    this.emailProcessor = new EmailProcessor();
  }

  async handleMessage(request) {
    try {
      switch (request.action) {
        case 'generateReply':
          await this.handleGenerateReply(request);
          break;
          
        case 'checkConnection':
          await this.handleConnectionCheck();
          break;
          
        case 'getEmailContent':
          await this.handleGetEmailContent();
          break;
      }
    } catch (error) {
      console.error('Message handler error:', error);
      this.sendResponse('error', error.message);
    }
  }

  async handleGenerateReply(request) {
    await this.emailProcessor.processEmail(request.tone, request.context);
    this.sendResponse('success', 'Reply generated successfully!');
  }

  async handleConnectionCheck() {
    const isConnected = await this.emailProcessor.checkConnection();
    this.sendResponse('connectionStatus', { connected: isConnected });
  }

  async handleGetEmailContent() {
    const content = await this.emailProcessor.getEmailContent();
    this.sendResponse('emailContent', { content });
  }

  sendResponse(type, data) {
    chrome.runtime.sendMessage({
      action: type,
      data: data
    });
  }
}