export class GmailConnection {
  constructor() {
    this.connectionCheckInterval = null;
    this.onConnectionChange = null;
    this.isConnected = false;
  }

  async initialize(onConnectionChange) {
    this.onConnectionChange = onConnectionChange;
    
    // Initial connection check
    const connected = await this.checkConnection();
    this.isConnected = connected;
    
    // Start monitoring
    if (connected) {
      this.startConnectionMonitoring();
    }
    
    return connected;
  }

  async checkConnection() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Check if we're on Gmail
      const isGmail = tab?.url?.includes('mail.google.com') || false;
      
      // Check if we can access Gmail DOM elements
      if (isGmail) {
        const emailContainer = document.querySelector('div.a3s.aiL');
        const replyBox = document.querySelector('div[role="textbox"][aria-label*="Reply"]');
        const isReady = emailContainer || replyBox;
        
        if (this.onConnectionChange) {
          this.onConnectionChange(isReady);
        }
        
        return isReady;
      }
      
      if (this.onConnectionChange) {
        this.onConnectionChange(false);
      }
      
      return false;
    } catch (error) {
      console.error('Connection check failed:', error);
      if (this.onConnectionChange) {
        this.onConnectionChange(false);
      }
      return false;
    }
  }

  async reconnect() {
    try {
      // First try to focus existing Gmail tab
      const tabs = await chrome.tabs.query({});
      const gmailTab = tabs.find(tab => tab.url?.includes('mail.google.com'));
      
      if (gmailTab) {
        await chrome.tabs.update(gmailTab.id, { active: true });
        await chrome.windows.update(gmailTab.windowId, { focused: true });
      } else {
        // Open new Gmail tab if none exists
        await chrome.tabs.create({ url: 'https://mail.google.com' });
      }
      
      // Wait for Gmail to load
      return new Promise(resolve => {
        setTimeout(async () => {
          const connected = await this.checkConnection();
          resolve(connected);
        }, 2000);
      });
    } catch (error) {
      console.error('Reconnection failed:', error);
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
        if (this.onConnectionChange) {
          this.onConnectionChange(connected);
        }
      }
    }, 2000);
  }

  stopConnectionMonitoring() {
    if (this.connectionCheckInterval) {
      clearInterval(this.connectionCheckInterval);
      this.connectionCheckInterval = null;
    }
  }
}