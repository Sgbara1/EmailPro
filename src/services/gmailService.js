// Handles Gmail-specific operations
export class GmailService {
  constructor() {
    this.isConnected = false;
    this.retryAttempts = 0;
    this.maxRetries = 3;
  }

  async connect() {
    while (this.retryAttempts < this.maxRetries) {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        if (!tab?.url?.includes('mail.google.com')) {
          throw new Error('Please open Gmail to use this extension');
        }

        // Check if we can access Gmail elements
        const result = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            const emailContent = document.querySelector('div.a3s.aiL');
            const replyBox = document.querySelector('div[role="textbox"][aria-label*="Reply"]');
            return { hasEmail: !!emailContent, hasReplyBox: !!replyBox };
          }
        });

        const { hasEmail, hasReplyBox } = result[0].result;
        
        if (!hasEmail && !hasReplyBox) {
          throw new Error('Please open an email in Gmail');
        }

        this.isConnected = true;
        return true;

      } catch (error) {
        this.retryAttempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    this.retryAttempts = 0;
    return false;
  }

  async getEmailContent() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const emailContainer = document.querySelector('div.a3s.aiL');
        const subject = document.querySelector('h2.hP')?.textContent || '';
        const from = document.querySelector('.gD')?.getAttribute('email') || '';
        
        return {
          content: emailContainer?.textContent?.trim() || '',
          subject: subject.trim(),
          from: from.trim()
        };
      }
    });

    return result[0].result;
  }

  async insertReply(replyText) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    return await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [replyText],
      func: (reply) => {
        const replyBox = document.querySelector('div[role="textbox"][aria-label*="Reply"]');
        if (!replyBox) {
          throw new Error('Please click Reply first');
        }

        replyBox.focus();
        replyBox.innerHTML = reply;
        
        // Trigger input events
        replyBox.dispatchEvent(new Event('input', { bubbles: true }));
        replyBox.dispatchEvent(new Event('change', { bubbles: true }));
        
        return true;
      }
    });
  }
}