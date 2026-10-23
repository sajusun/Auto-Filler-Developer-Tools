import { DEFAULT_SETTINGS, DevFillSettings, FillResult } from '../types';

let currentSettings: DevFillSettings = { ...DEFAULT_SETTINGS };

const btnFillAll = document.getElementById('btn-fill-all') as HTMLButtonElement;
const btnClearAll = document.getElementById('btn-clear-all') as HTMLButtonElement;
const btnOptions = document.getElementById('btn-options') as HTMLButtonElement;
const statusText = document.getElementById('status-text') as HTMLSpanElement;
const presetGlobal = document.getElementById('preset-global') as HTMLButtonElement;
const presetBd = document.getElementById('preset-bd') as HTMLButtonElement;
const toggleFixedPassword = document.getElementById('toggle-fixed-password') as HTMLInputElement;
const passwordHint = document.getElementById('password-hint') as HTMLSpanElement;

// Load settings
function init(): void {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
      currentSettings = items as DevFillSettings;
      updateUI();
    });
  }

  checkPageInputs();
}

function updateUI(): void {
  // Locale pills
  if (currentSettings.locale === 'bangladesh') {
    presetBd.classList.add('active');
    presetGlobal.classList.remove('active');
  } else {
    presetGlobal.classList.add('active');
    presetBd.classList.remove('active');
  }

  // Password toggle & hint
  toggleFixedPassword.checked = currentSettings.useFixedPassword;
  passwordHint.textContent = currentSettings.useFixedPassword
    ? currentSettings.defaultPassword || 'Password123!'
    : 'Randomized passwords';
}

function saveSettings(partial: Partial<DevFillSettings>): void {
  currentSettings = { ...currentSettings, ...partial };
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.set(currentSettings);
  }
  updateUI();
}

// Check how many inputs are on active page
async function checkPageInputs(): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) return;

  try {
    chrome.tabs.sendMessage(tab.id, { type: 'GET_STATS' }, (response) => {
      if (chrome.runtime.lastError || !response) {
        statusText.textContent = 'Ready to fill active page';
        return;
      }
      const count = response.fillableCount || 0;
      statusText.textContent = count > 0 ? `Found ${count} inputs on page` : 'Ready to fill active page';
    });
  } catch {
    statusText.textContent = 'Ready to fill active page';
  }
}

// Trigger Fill All
btnFillAll.addEventListener('click', async () => {
  statusText.textContent = 'Filling form...';
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) {
    statusText.textContent = 'Error: No active tab found';
    return;
  }

  chrome.tabs.sendMessage(
    tab.id,
    { type: 'FILL_ALL', settings: currentSettings },
    (response: FillResult) => {
      if (chrome.runtime.lastError) {
        statusText.textContent = 'Cannot access this tab (system page)';
        return;
      }
      if (response && response.success) {
        statusText.textContent = `⚡ Filled ${response.filledCount} fields in ${response.durationMs}ms`;
      } else {
        statusText.textContent = 'No eligible fields found';
      }
    }
  );
});

// Trigger Clear All
btnClearAll.addEventListener('click', async () => {
  statusText.textContent = 'Clearing form...';
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) return;

  chrome.tabs.sendMessage(tab.id, { type: 'CLEAR_ALL' }, (response) => {
    if (chrome.runtime.lastError) {
      statusText.textContent = 'Cannot access this tab';
      return;
    }
    const count = response?.clearedCount ?? 0;
    statusText.textContent = `🧹 Cleared ${count} fields`;
  });
});

// Preset switcher
presetGlobal.addEventListener('click', () => saveSettings({ locale: 'global' }));
presetBd.addEventListener('click', () => saveSettings({ locale: 'bangladesh' }));

// Fixed password switcher
toggleFixedPassword.addEventListener('change', () => {
  saveSettings({ useFixedPassword: toggleFixedPassword.checked });
});

// Open options page
btnOptions.addEventListener('click', () => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options/options.html'));
  }
});

document.addEventListener('DOMContentLoaded', init);
