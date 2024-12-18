export class PopupUI {
  constructor() {
    this.initializeElements();
    this.initializeEventListeners();
  }

  initializeElements() {
    // Main controls
    this.generateButton = document.getElementById('generateReply');
    this.sendButton = document.getElementById('sendReply');
    this.statusDiv = document.getElementById('status');
    this.toneSelect = document.getElementById('tone');
    this.contextInput = document.getElementById('context');
    
    // Gmail status
    this.gmailStatus = document.getElementById('gmailStatus');
    this.connectGmailButton = document.getElementById('connectGmail');
    
    // Settings
    this.settingsToggle = document.getElementById('toggleSettings');
    this.settingsContent = document.getElementById('settingsContent');
    this.apiKeyInput = document.getElementById('apiKey');
    this.toggleApiKeyButton = document.getElementById('toggleApiKey');
    this.saveSettingsButton = document.getElementById('saveSettings');

    // Initially disable controls until Gmail connection is confirmed
    this.disableControls();
  }

  initializeEventListeners() {
    // Settings toggle
    this.settingsToggle.addEventListener('click', () => {
      this.settingsContent.classList.toggle('hidden');
      this.settingsToggle.textContent = 
        this.settingsContent.classList.contains('hidden') ? '▼' : '▲';
    });

    // API key visibility toggle
    this.toggleApiKeyButton.addEventListener('click', () => {
      const type = this.apiKeyInput.type;
      this.apiKeyInput.type = type === 'password' ? 'text' : 'password';
      this.toggleApiKeyButton.textContent = type === 'password' ? '👁️‍🗨️' : '👁️';
    });
  }

  updateGmailStatus(connected) {
    const statusDot = this.gmailStatus.querySelector('.status-dot');
    const statusText = this.gmailStatus.querySelector('.status-text');
    
    if (connected) {
      statusDot.classList.add('connected');
      statusText.textContent = 'Connected to Gmail';
      this.connectGmailButton.disabled = true;
      this.enableControls();
    } else {
      statusDot.classList.remove('connected');
      statusText.textContent = 'Not connected to Gmail';
      this.connectGmailButton.disabled = false;
      this.disableControls();
    }
  }

  setStatus(message, type = 'pending') {
    this.statusDiv.textContent = message;
    this.statusDiv.className = `status-message ${type}`;
  }

  enableControls(isConnected = true) {
    if (isConnected) {
      this.generateButton.disabled = false;
      this.toneSelect.disabled = false;
      this.contextInput.disabled = false;
    }
  }

  disableControls() {
    this.generateButton.disabled = true;
    this.toneSelect.disabled = true;
    this.contextInput.disabled = true;
    this.sendButton.disabled = true;
  }

  getTone() {
    return this.toneSelect.value;
  }

  getContext() {
    return this.contextInput.value.trim();
  }

  enableSendButton() {
    this.sendButton.disabled = false;
  }
}