import { getApiKey, setApiKey } from '../utils/storage.js';

export const initializeSettings = async () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveButton = document.getElementById('saveSettings');
  
  // Load existing API key
  const apiKey = await getApiKey();
  if (apiKey) {
    apiKeyInput.value = apiKey;
  }
  
  // Save settings
  saveButton.addEventListener('click', async () => {
    const newApiKey = apiKeyInput.value.trim();
    if (newApiKey) {
      await setApiKey(newApiKey);
      document.getElementById('settingsStatus').textContent = 'Settings saved!';
    }
  });
};