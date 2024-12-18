import { getEmailContent, findReplyBox, insertReply } from './src/utils/gmail.js';
import { generateAIReply } from './src/services/openai.js';

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'generateReply') {
    try {
      const emailContent = getEmailContent();
      if (!emailContent) {
        throw new Error('No email content found');
      }

      const replyBox = findReplyBox();
      if (!replyBox) {
        throw new Error('Reply box not found');
      }

      const aiReply = await generateAIReply(emailContent, request.tone);
      insertReply(replyBox, aiReply);
    } catch (error) {
      console.error('Error generating reply:', error);
      // Send error back to popup
      chrome.runtime.sendMessage({
        action: 'error',
        message: error.message
      });
    }
  }
});