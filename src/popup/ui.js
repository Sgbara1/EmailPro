export class PopupUI {
  constructor() {
    this.initializeElements();
    this.initializeEventListeners();
  }

  initializeElements() {
    // Main controls
    this.generateButton = document.getElementById('generateReply');
    this.statusDiv = document.getElementById('status');
    this.toneSelect = document.getElementById('tone');
    this.contextInput = document.getElementById('context');
    
    // Gmail status
    this.gmailStatus = document.getElementById('gmailStatus');
    this.connectGmailButton = document.getElementById('connectGmail');
    
    // Settings
    this.apiKeyInput = document.getElementById('apiKey');
    this.saveSettingsButton = document.getElementById('saveSettings');
  }

  initializeEventListeners() {
    // API key visibility toggle
    document.getElementById('toggleApiKey').addEventListener('click', () => {
      const type = this.apiKeyInput.type;
      this.apiKeyInput.type = type === 'password' ? 'text' : 'password';
    });
  }

  updateGmailStatus(connected) {
    const statusDot = this.gmailStatus.querySelector('.status-dot');
    const statusText = this.gmailStatus.querySelector('.status-text');
    
    if (connected) {
      statusDot.classList.add('connected');
      statusText.textContent = 'Connected to Gmail';
      this.enableControls();
    } else {
      statusDot.classList.remove('connected');
      statusText.textContent = 'Not connected to Gmail';
      this.disableControls();
    }
  }

  setStatus(message, type = 'info') {
    this.statusDiv.textContent = message;
    this.statusDiv.className = `status-message ${type}`;
  }

  enableControls() {
    this.generateButton.disabled = false;
    this.toneSelect.disabled = false;
    this.contextInput.disabled = false;
  }

  disableControls() {
    this.generateButton.disabled = true;
    this.toneSelect.disabled = true;
    this.contextInput.disabled = true;
  }

  getTone() {
    return this.toneSelect.value;
  }

  getContext() {
    return this.contextInput.value.trim();
  }
}