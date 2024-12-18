import { MessageHandler } from './src/content/messageHandler.js';

const messageHandler = new MessageHandler();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  messageHandler.handleMessage(request);
  // Return true to indicate we'll send a response asynchronously
  return true;
});