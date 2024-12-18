// Gmail DOM interaction utilities
export const getEmailContent = () => {
  // More specific selector for Gmail's email content
  const emailContainer = document.querySelector('div.a3s.aiL');
  if (!emailContainer) {
    throw new Error('Could not find email content. Please make sure you have an email open.');
  }
  
  // Extract email metadata
  const subjectElement = document.querySelector('h2.hP');
  const fromElement = document.querySelector('.gD');
  
  return {
    content: emailContainer.textContent.trim(),
    subject: subjectElement?.textContent || '',
    from: fromElement?.getAttribute('email') || '',
    to: document.querySelector('.g2')?.getAttribute('email') || ''
  };
};

export const findReplyBox = () => {
  // More specific selector for Gmail's reply box
  const replyBox = document.querySelector('div[role="textbox"][aria-label*="Reply"]');
  if (!replyBox) {
    throw new Error('Could not find reply box. Please click "Reply" first.');
  }
  return replyBox;
};

export const insertReply = (replyBox, text) => {
  if (!replyBox || !text) {
    throw new Error('Invalid reply box or text content.');
  }
  
  try {
    replyBox.focus();
    
    // Format the reply text with proper spacing
    const formattedText = text
      .trim()
      .replace(/\n{3,}/g, '\n\n') // Remove excess newlines
      .replace(/\s+$/gm, ''); // Remove trailing spaces
    
    replyBox.innerHTML = formattedText;
    
    // Trigger input event to ensure Gmail registers the change
    const inputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
    });
    replyBox.dispatchEvent(inputEvent);
    return true;
  } catch (error) {
    throw new Error('Failed to insert reply: ' + error.message);
  }
};