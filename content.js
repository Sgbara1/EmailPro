// Content script that runs in the Gmail page context
(() => {
  // Track connection status
  let isConnected = false;
  let retryCount = 0;
  const MAX_RETRIES = 5;

  // Initialize connection
  function initializeConnection() {
    if (retryCount >= MAX_RETRIES) {
      console.error('Failed to initialize Gmail connection after max retries');
      return;
    }

    try {
      // Check if we're in Gmail
      if (!window.location.hostname.includes('mail.google.com')) {
        throw new Error('Not in Gmail');
      }

      // Check for essential Gmail elements
      const emailContent = document.querySelector('div.a3s.aiL');
      const replyBox = document.querySelector('div[role="textbox"][aria-label*="Reply"]');

      if (!emailContent && !replyBox) {
        retryCount++;
        setTimeout(initializeConnection, 1000);
        return;
      }

      isConnected = true;
      console.log('Gmail connection established');

    } catch (error) {
      console.error('Connection error:', error);
      retryCount++;
      setTimeout(initializeConnection, 1000);
    }
  }

  // Handle messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Received message:', request);

    if (request.action === 'checkConnection') {
      sendResponse({ connected: isConnected });
      return true;
    }

    if (request.action === 'generateReply') {
      handleGenerateReply(request).then(sendResponse);
      return true; // Will respond asynchronously
    }
  });

  // Handle reply generation
  async function handleGenerateReply(request) {
    try {
      const emailContent = getEmailContent();
      if (!emailContent) {
        throw new Error('No email content found');
      }

      const replyBox = findReplyBox();
      if (!replyBox) {
        throw new Error('Reply box not found. Please click Reply first.');
      }

      // Insert the reply
      insertReply(replyBox, request.replyText);
      return { success: true };

    } catch (error) {
      console.error('Generate reply error:', error);
      return { error: error.message };
    }
  }

  // Gmail DOM interaction functions
  function getEmailContent() {
    const container = document.querySelector('div.a3s.aiL');
    return container?.textContent?.trim() || '';
  }

  function findReplyBox() {
    return document.querySelector('div[role="textbox"][aria-label*="Reply"]');
  }

  function insertReply(replyBox, text) {
    replyBox.focus();
    replyBox.innerHTML = text;
    replyBox.dispatchEvent(new Event('input', { bubbles: true }));
    replyBox.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // Start initialization
  initializeConnection();
})();