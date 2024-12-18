import { PopupUI } from './src/popup/ui.js';
import { initializeSettings } from './src/popup/settings.js';
import { GmailConnection } from './src/services/gmailConnection.js';

document.addEventListener('DOMContentLoaded', async () => {
  const ui = new PopupUI();
  const gmailConnection = new GmailConnection();
  
  // Initialize settings
  await initializeSettings();

  // Initialize Gmail connection
  await gmailConnection.initialize((isConnected) => {
    ui.updateGmailStatus(isConnected);
    ui.enableControls(isConnected);
  });

  // Handle reconnect button
  ui.connectGmailButton.addEventListener('click', async () => {
    ui.setStatus('Reconnecting to Gmail...', 'pending');
    const success = await gmailConnection.reconnect();
    
    if (success) {
      ui.setStatus('Successfully opened Gmail. Please wait for connection...', 'success');
    } else {
      ui.setStatus('Failed to connect to Gmail', 'error');
    }
  });

  // Handle generate reply button
  ui.generateButton.addEventListener('click', async () => {
    ui.setStatus('Generating reply...', 'pending');
    ui.disableControls();
    
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab?.url?.includes('mail.google.com')) {
        throw new Error('Please open Gmail to use this extension');
      }
      
      await chrome.tabs.sendMessage(tab.id, {
        action: 'generateReply',
        tone: ui.getTone(),
        context: ui.getContext()
      });
      
    } catch (error) {
      ui.setStatus(`Error: ${error.message}`, 'error');
    }
  });

  // Handle messages from content script
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'error') {
      ui.setStatus(`Error: ${message.message}`, 'error');
      ui.enableControls();
    } else if (message.action === 'success') {
      ui.setStatus('Reply generated successfully!', 'success');
      ui.enableControls();
      ui.enableSendButton();
    }
  });

  // Clean up on window close
  window.addEventListener('unload', () => {
    gmailConnection.stopConnectionMonitoring();
  });
});