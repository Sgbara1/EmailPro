export class GmailIntegration {
  constructor() {
    this.isConnected = false;
    this.currentEmail = null;
  }

  async initialize() {
    try {
      // Check Gmail connection
      const connected = await this.checkGmailConnection();
      this.isConnected = connected;
      return connected;
    } catch (error) {
      console.error('Gmail initialization error:', error);
      throw new Error('Failed to connect to Gmail');
    }
  }

  async checkGmailConnection() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      return tab?.url?.includes('mail.google.com') || false;
    } catch (error) {
      return false;
    }
  }

  async sendReply(replyText) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      await chrome.tabs.sendMessage(tab.id, {
        action: 'sendReply',
        replyText: replyText
      });
      
      return true;
    } catch (error) {
      console.error('Send reply error:', error);
      throw new Error('Failed to send reply');
    }
  }

  async getCurrentEmail() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      const email = await chrome.tabs.sendMessage(tab.id, {
        action: 'getEmailContent'
      });
      
      this.currentEmail = email;
      return email;
    } catch (error) {
      console.error('Get email error:', error);
      throw new Error('Failed to get current email');
    }
  }
}