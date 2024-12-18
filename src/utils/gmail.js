export const getEmailContent = () => {
  const emailContainer = document.querySelector('.a3s.aiL');
  return emailContainer ? emailContainer.textContent.trim() : '';
};

export const findReplyBox = () => {
  return document.querySelector('[role="textbox"][aria-label*="Reply"]');
};

export const insertReply = (replyBox, text) => {
  if (!replyBox) return false;
  
  replyBox.focus();
  replyBox.textContent = text;
  
  const inputEvent = new InputEvent('input', {
    bubbles: true,
    cancelable: true,
  });
  replyBox.dispatchEvent(inputEvent);
  
  return true;
};