// Gmail DOM interaction utilities
export const getEmailContent = () => {
  // Try multiple selectors for email content
  const selectors = [
    'div.a3s.aiL', // Primary email content
    'div[data-message-id] div.ii.gt', // Alternative email content
    'div.gmail_quote' // Quoted content
  ];
  
  let emailContainer = null;
  for (const selector of selectors) {
    emailContainer = document.querySelector(selector);
    if (emailContainer) break;
  }

  if (!emailContainer) {
    throw new Error('Could not find email content. Please make sure you have an email open.');
  }
  
  // Extract email metadata more reliably
  const subjectElement = document.querySelector('h2.hP') || document.querySelector('[data-thread-subject]');
  const fromElement = document.querySelector('.gD') || document.querySelector('[email]');
  
  return {
    content: emailContainer.textContent.trim(),
    subject: subjectElement?.textContent?.trim() || '',
    from: fromElement?.getAttribute('email') || fromElement?.textContent?.trim() || '',
    to: document.querySelector('.g2')?.getAttribute('email') || ''
  };
};

export const findReplyBox = () => {
  // Try multiple selectors for reply box
  const selectors = [
    'div[role="textbox"][aria-label*="Reply"]',
    'div[contenteditable="true"][aria-label*="Reply"]',
    'div[g_editable="true"]'
  ];
  
  let replyBox = null;
  for (const selector of selectors) {
    replyBox = document.querySelector(selector);
    if (replyBox) break;
  }

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
    // Focus and clear existing content
    replyBox.focus();
    replyBox.innerHTML = '';
    
    // Format the reply text
    const formattedText = text
      .trim()
      .replace(/\n{3,}/g, '\n\n') // Remove excess newlines
      .replace(/\s+$/gm, ''); // Remove trailing spaces
    
    // Insert text in chunks to handle large replies
    const chunks = formattedText.match(/.{1,1000}/g) || [];
    for (const chunk of chunks) {
      replyBox.innerHTML += chunk;
      
      // Trigger input events to ensure Gmail registers the change
      replyBox.dispatchEvent(new Event('input', { bubbles: true }));
      replyBox.dispatchEvent(new Event('change', { bubbles: true }));
    }
    
    return true;
  } catch (error) {
    throw new Error('Failed to insert reply: ' + error.message);
  }
};