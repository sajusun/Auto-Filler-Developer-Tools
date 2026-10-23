import { FieldCategory } from '../types';

// Setup Context Menus on installation
chrome.runtime.onInstalled.addListener(() => {
  // Top-level action
  chrome.contextMenus.create({
    id: 'devfill-fill-all',
    title: '⚡ DevFill: Fill Entire Form (Alt+Shift+F)',
    contexts: ['editable', 'page']
  });

  chrome.contextMenus.create({
    id: 'devfill-separator',
    type: 'separator',
    contexts: ['editable']
  });

  // Targeted submenus for single field
  const singleFieldItems: { id: string; category: FieldCategory; title: string }[] = [
    { id: 'devfill-single-name', category: 'full_name', title: '👤 Fill with Full Name' },
    { id: 'devfill-single-email', category: 'email', title: '✉️ Fill with Test Email' },
    { id: 'devfill-single-phone', category: 'phone', title: '📞 Fill with Phone Number' },
    { id: 'devfill-single-password', category: 'password', title: '🔑 Fill with Test Password' },
    { id: 'devfill-single-company', category: 'company', title: '🏢 Fill with Company' },
    { id: 'devfill-single-address', category: 'address', title: '📍 Fill with Street Address' },
    { id: 'devfill-single-uuid', category: 'uuid', title: '🏷️ Fill with UUID / Token' }
  ];

  for (const item of singleFieldItems) {
    chrome.contextMenus.create({
      id: item.id,
      title: item.title,
      contexts: ['editable']
    });
  }

  // Clear action
  chrome.contextMenus.create({
    id: 'devfill-clear-all',
    title: '🧹 DevFill: Clear Form (Alt+Shift+C)',
    contexts: ['editable', 'page']
  });
});

// Handle Context Menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab || !tab.id) return;

  if (info.menuItemId === 'devfill-fill-all') {
    chrome.tabs.sendMessage(tab.id, { type: 'FILL_ALL' });
    return;
  }

  if (info.menuItemId === 'devfill-clear-all') {
    chrome.tabs.sendMessage(tab.id, { type: 'CLEAR_ALL' });
    return;
  }

  const categoryMap: Record<string, FieldCategory> = {
    'devfill-single-name': 'full_name',
    'devfill-single-email': 'email',
    'devfill-single-phone': 'phone',
    'devfill-single-password': 'password',
    'devfill-single-company': 'company',
    'devfill-single-address': 'address',
    'devfill-single-uuid': 'uuid'
  };

  const category = categoryMap[info.menuItemId as string];
  if (category) {
    chrome.tabs.sendMessage(tab.id, {
      type: 'FILL_SINGLE',
      category
    });
  }
});

// Handle Keyboard Shortcuts
chrome.commands.onCommand.addListener((command, tab) => {
  if (!tab || !tab.id) return;

  if (command === 'fill_form') {
    chrome.tabs.sendMessage(tab.id, { type: 'FILL_ALL' });
  } else if (command === 'clear_form') {
    chrome.tabs.sendMessage(tab.id, { type: 'CLEAR_ALL' });
  }
});
