export async function getApiKey() {
  try {
    const result = await chrome.storage.sync.get('openaiApiKey');
    return result.openaiApiKey;
  } catch (error) {
    console.error('Error getting API key:', error);
    throw new Error('Failed to retrieve API key from storage');
  }
}

export async function setApiKey(apiKey) {
  try {
    await chrome.storage.sync.set({ openaiApiKey: apiKey });
  } catch (error) {
    console.error('Error saving API key:', error);
    throw new Error('Failed to save API key to storage');
  }
}