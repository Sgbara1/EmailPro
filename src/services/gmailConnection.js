export class GmailConnection {
  constructor() {
    this.isConnected = false;
    this.connectionCheckInterval = null;
  }

  async initialize() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab?.url?.includes('mail.google.com')) {
        throw new Error('Please open Gmail to use this extension');
      }

      // Check connection with content script
      const response = await chrome.tabs.sendMessage(tab.id, { action: 'checkConnection' });
      this.isConnected = response?.connected || false;

      // Start monitoring connection
      this.startConnectionMonitoring();

      return this.isConnected;

    } catch (error) {
      console.error('Gmail connection error:', error);
      return false;
    }
  }

  async checkConnection() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const response = await chrome.tabs.sendMessage(tab.id, { action: 'checkConnection' });
      return response?.connected || false;
    } catch {
      return false;
    }
  }

  startConnectionMonitoring() {
    if (this.connectionCheckInterval) {
      clearInterval(this.connectionCheckInterval);
    }

    this.connectionCheckInterval = setInterval(async () => {
      const connected = await this.checkConnection();
      if (connected !== this.isConnected) {
        this.isConnected = connected;
        // Notify UI of connection change
        chrome.runtime.sendMessage({ 
          action: 'connectionStatus', 
          connected: this.isConnected 
        });
      }
    }, 2000);
  }

  stopConnectionMonitoring() {
    if (this.connectionCheckInterval) {
      clearInterval(this.connectionCheckInterval);
    }
  }
}