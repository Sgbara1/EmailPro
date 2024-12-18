export const getApiKey = async () => {
  const result = await chrome.storage.sync.get('openaiApiKey');
  return result.openaiApiKey;
};

export const setApiKey = async (apiKey) => {
  await chrome.storage.sync.set({ openaiApiKey: apiKey });
};