export class GmailConnection {
  constructor() {
    this.connectionCheckInterval = null;
    this.onConnectionChange = null;
  }

  async initialize(onConnectionChange) {
    this.onConnectionChange = onConnectionChange;
    await this.checkConnection();
    this.startConnectionMonitoring();
  }

  async checkConnection() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const isConnected = tab?.url?.includes('mail.google.com') || false;
      
      if (this.onConnectionChange) {
        this.onConnectionChange(isConnected);
      }
      
      return isConnected;
    } catch (error) {
      console.error('Connection check failed:', error);
      if (this.onConnectionChange) {
        this.onConnectionChange(false);
      }
      return false;
    }
  }

  startConnectionMonitoring() {
    // Check connection status every 5 seconds
    this.connectionCheckInterval = setInterval(() => {
      this.checkConnection();
    }, 5000);
  }

  stopConnectionMonitoring() {
    if (this.connectionCheckInterval) {
      clearInterval(this.connectionCheckInterval);
      this.connectionCheckInterval = null;
    }
  }

  async reconnect() {
    try {
      // Open Gmail in a new tab if not already open
      const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!currentTab?.url?.includes('mail.google.com')) {
        await chrome.tabs.create({ url: 'https://mail.google.com' });
      }
      
      return true;
    } catch (error) {
      console.error('Reconnection failed:', error);
      return false;
    }
  }
}