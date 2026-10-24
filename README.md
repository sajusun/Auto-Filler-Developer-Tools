<div align="center">

# ⚡ DevFill
### Smart Dummy Form Filler for Web Developers & QA Engineers

[![Manifest V3](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-12.x-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

**Stop typing the same dummy data into form fields 50 times a day.**  
Fill any complex web form in **18ms** with realistic, framework-reactive data.

[Features](#-key-features) • [Installation](#-installation--loading-in-browser) • [Hotkeys](#-keyboard-shortcuts) • [Framework Support](#-how-devfill-solves-the-reactvue-problem) • [Presets](#-data-presets)

</div>

---

## 💡 Why DevFill?

Most form-filling extensions break modern web applications built with **React, Vue, Inertia.js, or Angular** because setting `input.value = "..."` does not notify internal framework state trackers (`useState`).

**DevFill solves this fundamentally:**
- Uses prototype property descriptors (`HTMLInputElement.prototype.value.set`) to bypass synthetic value tracking.
- Dispatches bubbling synthetic `input`, `change`, and `blur` events.
- 100% Client-side, zero tracking, and lightweight (< 15KB runtime bundle).
- Tailored for both **Global** and **Bangladesh (BD)** development environments.

---

## ✨ Key Features

- **⚡ 1-Click Form Filling:** Fills text, email, phone, passwords, dates, radio buttons, checkboxes, dropdowns, and textareas.
- **🧠 Heuristic Field Intelligence:** Analyzes `id`, `name`, `placeholder`, `aria-label`, `autocomplete`, and associated `<label>` tags to infer the exact data type required.
- **🇧🇩 Localization & Presets:**
  - **Global / US:** Standard US/UK names, phone numbers `(555) 012-3456`, addresses.
  - **Bangladesh (BD):** Realistic Bengali names, operator-valid phone numbers (`+88017...`, `018...`), Dhaka/Chittagong addresses.
- **🔒 Test Password Synchronization:** Both `Password` and `Confirm Password` fields always receive the identical test password (e.g., `Password123!`), so you can immediately sign in.
- **⌨️ Instant Keyboard Hotkeys:** Fill or clear forms without ever lifting your hands from the keyboard.
- **🎯 Context Menu Actions:** Right-click directly on any field to inject specific data (e.g. "Fill with Phone Number", "Fill with UUID").
- **🎨 Visual Feedback:** Subtle green pulse highlight on filled fields so you instantly see what was populated.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Scope |
| :--- | :--- | :--- |
| <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> | **Fill Active Form** | Fills all visible fields on current page |
| <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd> | **Clear Active Form** | Resets all form fields and dropdowns |
| <kbd>Right Click</kbd> | **Single Field Inject** | Context menu on targeted input |

---

## 🚀 Installation & Loading in Browser

You can install DevFill into any Chromium-based browser (**Google Chrome, Microsoft Edge, Brave, Opera, Arc**) in 30 seconds:

1. Clone or download this repository:
   ```bash
   git clone https://github.com/sajusun/Auto-Filler-Developer-Tools.git
   cd devfill
   ```

2. Install dependencies and build:
   ```bash
   pnpm install
   pnpm run build
   ```

3. Load into Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in the top-right corner)
   - Click **Load unpacked**
   - Select the `devfill/dist` folder

🎉 **DevFill is now installed and active!** Pin it to your toolbar or press `Alt + Shift + F` on any form.

---

## 🛠️ How DevFill Solves the React/Vue Problem

In React 16+, inputs use an internal value tracker. Simply writing:
```js
// ❌ FAILS IN REACT/VUE
input.value = "John Doe";
input.dispatchEvent(new Event('input'));
```
does not trigger `onChange` because React's prototype value tracker sees no change.

DevFill invokes the native browser setter directly on the prototype:
```ts
// ✅ DEVFILL SOLUTION
const valueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value'
)?.set;

if (valueSetter) {
  valueSetter.call(element, dummyValue);
} else {
  element.value = dummyValue;
}

element.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
element.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
element.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));
```

---

## 📂 Project Architecture

```
devfill/
├── manifest.json              # Chrome Manifest V3 schema
├── package.json               # pnpm build pipeline & scripts
├── tsconfig.json              # TypeScript strict configuration
├── vite.config.ts             # Vite multi-entry builder
├── scripts/
│   ├── build.js               # Multi-target bundler (IIFE content script, ES background)
│   └── generate-icons.js      # Zero-dependency PNG icon generator
├── public/icons/              # High-res 16, 32, 48, 128px PNG icons
├── src/
│   ├── types/index.ts         # TypeScript interfaces & message contracts
│   ├── generator/             # Zero-dependency, ultra-fast dummy data engine
│   │   ├── names.ts           # Global + BD first/last names
│   │   ├── contacts.ts        # Emails, +880 & US phones, addresses
│   │   ├── words.ts           # Companies, jobs, UUIDs, dates, passwords
│   │   └── index.ts           # Unified generator facade
│   ├── content/               # Webpage Content Script
│   │   ├── detector.ts        # Heuristic field classifier
│   │   ├── filler.ts          # Reactive DOM engine (React/Vue compatible)
│   │   └── index.ts           # Tab coordinator & floating toast
│   ├── background/            # Manifest V3 Service Worker
│   │   └── index.ts           # Shortcut listener & context menus
│   ├── popup/                 # Sleek dark popup UI
│   │   ├── popup.html
│   │   ├── popup.css
│   │   └── popup.ts
│   └── options/               # Full preferences & settings page
│       ├── options.html
│       ├── options.css
│       └── options.ts
└── dist/                      # Ready-to-load unpacked Chrome Extension
```

---

## 💻 Local Development

Run development watcher:
```bash
pnpm run dev
```

Run TypeScript verification:
```bash
pnpm exec tsc --noEmit
```

Build for production:
```bash
pnpm run build
```

---

## 👨‍💻 Developer & Credits
**DevFill** is crafted with ❤️ by **[Sakhawat Hossain](https://sajusun.github.io)**.
- 🌐 **Portfolio & Website:** [https://sajusun.github.io](https://sajusun.github.io)
- 🐙 **GitHub:** [@sajusun](https://github.com/sajusun)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
Built with ❤️ by [Sakhawat Hossain](https://sajusun.github.io).
