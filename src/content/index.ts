import { DEFAULT_SETTINGS, DevFillSettings, MessageType } from '../types';
import { DevFillDomEngine } from './filler';

let currentSettings: DevFillSettings = { ...DEFAULT_SETTINGS };
let engine = new DevFillDomEngine(currentSettings);
let lastRightClickedElement: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null = null;

// Track right clicked element for context menu actions
document.addEventListener(
  'contextmenu',
  (event) => {
    const target = event.target;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement
    ) {
      lastRightClickedElement = target;
    } else {
      lastRightClickedElement = null;
    }
  },
  true
);

// Load settings from storage
function loadSettings(): void {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
      currentSettings = items as DevFillSettings;
      engine.updateSettings(currentSettings);
    });
  }
}

loadSettings();

// Listen for storage changes
if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync') {
      const updated: Partial<DevFillSettings> = {};
      for (const [key, change] of Object.entries(changes)) {
        // @ts-expect-error key indexing
        updated[key] = change.newValue;
      }
      currentSettings = { ...currentSettings, ...updated };
      engine.updateSettings(currentSettings);
    }
  });
}

// Listen for messages from popup or background script
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener(
    (message: MessageType, _sender, sendResponse: (response: unknown) => void) => {
      const startTime = performance.now();

      if (message.type === 'FILL_ALL') {
        if (message.settings) {
          engine.updateSettings(message.settings);
        }
        const filled = engine.fillAll();
        const duration = Math.round(performance.now() - startTime);
        showFloatingToast(`⚡ DevFill: ${filled} fields filled (${duration}ms)`);
        sendResponse({ success: true, filledCount: filled, durationMs: duration });
        return true;
      }

      if (message.type === 'CLEAR_ALL') {
        const cleared = engine.clearAll();
        showFloatingToast(`🧹 DevFill: Cleared ${cleared} fields`);
        sendResponse({ success: true, clearedCount: cleared });
        return true;
      }

      if (message.type === 'FILL_SINGLE') {
        const target = lastRightClickedElement || (document.activeElement as HTMLElement);
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        ) {
          if (message.settings) {
            engine.updateSettings(message.settings);
          }
          const ok = engine.fillElement(target, message.category);
          sendResponse({ success: ok, filledCount: ok ? 1 : 0 });
        } else {
          sendResponse({ success: false, filledCount: 0 });
        }
        return true;
      }

      if (message.type === 'GET_STATS') {
        const fillable = document.querySelectorAll('input:not([type="hidden"]), textarea, select').length;
        sendResponse({ fillableCount: fillable });
        return true;
      }

      return false;
    }
  );
}

function showFloatingToast(text: string): void {
  const existing = document.getElementById('devfill-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'devfill-toast';
  toast.textContent = text;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    padding: '10px 18px',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    zIndex: '2147483647',
    pointerEvents: 'none',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    transform: 'translateY(10px)',
    opacity: '0'
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateY(10px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}
