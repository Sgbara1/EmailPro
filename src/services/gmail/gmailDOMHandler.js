// Handles Gmail DOM interactions
export class GmailDOMHandler {
  getEmailContent() {
    const emailContainer = document.querySelector('div.a3s.aiL');
    if (!emailContainer) {
      throw new Error('Email content not found');
    }

    return {
      content: emailContainer.textContent.trim(),
      subject: document.querySelector('h2.hP')?.textContent || '',
      from: document.querySelector('.gD')?.getAttribute('email') || '',
      to: document.querySelector('.g2')?.getAttribute('email') || ''
    };
  }

  findReplyBox() {
    const replyBox = document.querySelector('div[role="textbox"][aria-label*="Reply"]');
    if (!replyBox) {
      throw new Error('Reply box not found');
    }
    return replyBox;
  }

  insertReply(replyBox, text) {
    if (!replyBox || !text) {
      throw new Error('Invalid reply box or text');
    }

    replyBox.focus();
    replyBox.innerHTML = text;
    
    const inputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
    });
    replyBox.dispatchEvent(inputEvent);
    
    return true;
  }
}