import { initializeSettings } from './src/popup/settings.js';

document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generateReply');
  const statusDiv = document.getElementById('status');
  const toneSelect = document.getElementById('tone');

  // Initialize settings panel
  initializeSettings();

  generateButton.addEventListener('click', async () => {
    const tone = toneSelect.value;
    statusDiv.textContent = 'Generating reply...';
    
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      await chrome.tabs.sendMessage(tab.id, {
        action: 'generateReply',
        tone: tone
      });
      
      statusDiv.textContent = 'Reply generated successfully!';
    } catch (error) {
      statusDiv.textContent = 'Error: ' + error.message;
      console.error('Error:', error);
    }
  });
});