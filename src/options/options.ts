import { DEFAULT_SETTINGS, DevFillSettings, PresetLocale } from '../types';

let currentSettings: DevFillSettings = { ...DEFAULT_SETTINGS };

const selectLocale = document.getElementById('select-locale') as HTMLSelectElement;
const inputEmailDomain = document.getElementById('input-email-domain') as HTMLInputElement;
const toggleFixedPassword = document.getElementById('toggle-fixed-password') as HTMLInputElement;
const inputDefaultPassword = document.getElementById('input-default-password') as HTMLInputElement;
const groupDefaultPassword = document.getElementById('group-default-password') as HTMLDivElement;
const toggleHighlight = document.getElementById('toggle-highlight') as HTMLInputElement;
const toggleHidden = document.getElementById('toggle-hidden') as HTMLInputElement;
const btnSave = document.getElementById('btn-save') as HTMLButtonElement;
const toast = document.getElementById('toast') as HTMLDivElement;

function init(): void {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
      currentSettings = items as DevFillSettings;
      populateForm();
    });
  } else {
    populateForm();
  }
}

function populateForm(): void {
  selectLocale.value = currentSettings.locale;
  inputEmailDomain.value = currentSettings.emailDomain;
  toggleFixedPassword.checked = currentSettings.useFixedPassword;
  inputDefaultPassword.value = currentSettings.defaultPassword;
  toggleHighlight.checked = currentSettings.highlightFields;
  toggleHidden.checked = currentSettings.fillHiddenFields;

  updatePasswordVisibility();
}

function updatePasswordVisibility(): void {
  if (toggleFixedPassword.checked) {
    groupDefaultPassword.style.display = 'flex';
  } else {
    groupDefaultPassword.style.display = 'none';
  }
}

toggleFixedPassword.addEventListener('change', updatePasswordVisibility);

btnSave.addEventListener('click', () => {
  const updated: DevFillSettings = {
    locale: selectLocale.value as PresetLocale,
    emailDomain: inputEmailDomain.value.trim().replace(/^@/, '') || 'example.com',
    useFixedPassword: toggleFixedPassword.checked,
    defaultPassword: inputDefaultPassword.value.trim() || 'Password123!',
    highlightFields: toggleHighlight.checked,
    fillHiddenFields: toggleHidden.checked
  };

  currentSettings = updated;

  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.set(updated, () => {
      showToast('Settings saved successfully!');
    });
  } else {
    showToast('Settings saved (local preview mode)');
  }
});

function showToast(message: string): void {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

document.addEventListener('DOMContentLoaded', init);
