# 🚀 DevFill – Smart Dummy Form Filler (Chrome Extension)
> **Production-Ready, Developer-Centric, Free & Open-Source Form Filler Extension**

---

## 📌 Executive Summary & Project Goal
**DevFill** হলো একটি মডার্ন, লাইটওয়েট এবং পাওয়ারফুল ব্রাউজার এক্সটেনশন (Manifest V3), যা ওয়েব ডেভেলপার এবং QA ইঞ্জিনিয়ারদের জন্য যেকোনো সাধারণ বা ফ্রেমওয়ার্ক-নির্ভর (React, Vue, Inertia.js, Angular, Laravel Blade) ওয়েব ফর্মকে তাৎক্ষণিকভাবে রিয়েলিস্টিক ডামি ডেটা দিয়ে ফিল করে দেয়। 

GitHub-এ ওপেন সোর্স এবং Chrome Web Store-এ ফ্রি পাবলিশ করার মাধ্যমে এটি একটি হাই-ইমপ্যাক্ট পোর্টফোলিও প্রোডাক্ট হবে যা আপনার TypeScript ও Frontend/Architectural স্কিলকে আন্তর্জাতিক পর্যায়ে তুলে ধরবে।

---

## 🎯 Key Features (What Makes It Stand Out)

1. **Smart Heuristic Field Detection:**
   - ফিল্ডের `name`, `id`, `placeholder`, `aria-label`, `type`, `autocomplete` ইত্যাদি অ্যাট্রিবিউট অ্যানালাইজ করে স্বয়ংক্রিয়ভাবে সঠিক ডেটা টাইপ সিলেক্ট করবে (যেমন: `first_name`, `email`, `phone`, `company`, `address`, `zip`, `credit_card`, `date`, `password`, `notes`)।

2. **Full Modern Framework Support (React / Vue / Inertia / Angular):**
   - সাধারণ স্ক্রিপ্ট দিয়ে ফিল করলে React/Vue-এর ইন্টারনাল স্টেট (useState) আপডেট হয় না।
   - DevFill নেটিভ `HTMLInputElement.prototype.value` সেটার ওভাররাইড এবং `input`, `change`, `blur` সিন্থেটিক ইভেন্ট ডিসপ্যাচ করে রিয়্যাক্টিভ স্টেট ১০০% সিঙ্ক করবে।

3. **Multiple Data Presets & Localization:**
   - **International / US Standard:** Fake Name, US Phone `(555) 012-3456`, Zip code, etc.
   - **Bangladesh / South Asia Preset:** BD Names, BD Phone Numbers (`+88017...`, `018...`), Local addresses (Dhaka, Chittagong, etc.) — যা লোকাল ডেভেলপারদের মধ্যে ভাইরাল হওয়ার মতো ফিচার!

4. **Developer Superpowers:**
   - **Keyboard Shortcut:** `Alt + Shift + F` চাপলেই পেজের সমস্ত ফর্ম ফিল্ড তাৎক্ষণিক পূরণ হবে।
   - **Context Menu (Right-Click):** যেকোনো সিঙ্গেল ইনপুটে রাইট ক্লিক করে নির্দিষ্ট ডেটা টাইপ (e.g. "Fill with Bangladeshi Phone", "Fill with UUID") ইনজেক্ট করা।
   - **Custom Password Rule:** ডেভেলপার নিজের পছন্দমতো ডিফল্ট পাসওয়ার্ড (e.g. `Password123!`) কনফিগার করে রাখতে পারবেন, যাতে রেজিস্ট্রেশন টেস্টিংয়ের পর লগইন করতে কোনো ঝামেলা না হয়।

5. **Zero Bloat & 100% Privacy:**
   - কোনো ভারী এক্সটার্নাল হেভি লাইব্রেরি (যেমন 5MB-র Faker.js) থাকবে না; কাস্টম অপ্টিমাইজড জেনারেটর ব্যবহার হবে (< 150KB টোটাল বিল্ড সাইজ)।
   - কোনো ডেটা ট্র্যাকিং বা এক্সটার্নাল সার্ভার কল নেই; ১০০% ক্লায়েন্ট-সাইড অফলাইন।

---

## 🏗️ Technical Architecture & Project Structure

- **Standard:** Manifest V3 (Latest Chrome / Edge / Brave compatible)
- **Language:** TypeScript
- **Bundler / Build Tool:** Vite + CRX / Multi-Entry TypeScript Bundler
- **Styling:** Modern Clean Vanilla CSS with Dark/Light Glassmorphic theme

```
devfill/
├── manifest.json              # Chrome Extension Manifest V3 configuration
├── package.json               # Dependencies, scripts, and build pipeline
├── tsconfig.json              # Strict TypeScript configuration
├── vite.config.ts             # Vite multi-entry or CRX build setup
├── icons/                     # 16x16, 32x32, 48x48, 128x128 SVG/PNG icons
├── src/
│   ├── background/            # Service Worker
│   │   ├── index.ts           # Context menu setup & global shortcut listener
│   ├── content/               # Content Script (Injected into active tab)
│   │   ├── index.ts           # Message listener & DOM coordinator
│   │   ├── detector.ts        # Smart input classifier (regex & attributes heuristic)
│   │   ├── filler.ts          # Reactive input filler (React/Vue/Angular compatible)
│   ├── generator/             # Data Generation Engine (Zero dependencies)
│   │   ├── index.ts           # Core facade
│   │   ├── names.ts           # First/last names (Global + BD presets)
│   │   ├── contact.ts         # Emails, phones (+880, US), addresses
│   │   ├── numbers.ts         # Numbers, currency, postal codes
│   │   ├── text.ts            # Lorem ipsum, sentences, bio
│   │   ├── dates.ts           # Past, future, birth dates
│   ├── popup/                 # Extension Action Popup UI
│   │   ├── popup.html         # Modern popup markup
│   │   ├── popup.css          # Sleek developer aesthetic (Dark mode)
│   │   ├── popup.ts           # Quick triggers, preset toggle, settings shortcut
│   ├── options/               # Comprehensive Settings & Custom Rules Page
│   │   ├── options.html       # Options layout
│   │   ├── options.css        # Options styling
│   │   ├── options.ts         # User preferences & custom regex rules manager
│   ├── types/                 # Shared TypeScript interfaces
│   │   └── index.ts           # Message contracts, field types, preset models
├── README.md                  # Professional open-source showcase README
└── PLAN.md                    # Roadmap & execution plan
```

---

## 🗓️ 5-Phase Implementation Plan

### Phase 1: Foundation & Project Scaffolding
- [ ] Initialize `devfill` folder and setup `package.json`, `tsconfig.json`, `vite.config.ts`.
- [ ] Create `manifest.json` with Manifest V3 specifications (permissions: `activeTab`, `storage`, `contextMenus`, `scripting`).
- [ ] Generate high-res branding assets (clean minimalist lightning / input logo in 16, 32, 48, 128px).

### Phase 2: Lightweight Data Generation Engine
- [ ] Create high-performance, zero-dependency generators for:
  - Personal info (First Name, Last Name, Full Name, Username)
  - Emails (randomized test emails + custom domain support like `@example.test`)
  - Phone numbers (Global E.164, US formatted, Bangladesh `+8801...` formatted)
  - Addresses (Street, City, Zip, Country)
  - Passwords (configurable default password e.g. `TestPass123!`)
  - Dates (YYYY-MM-DD, past dates for DOB, future for expiry)
  - Dropdowns (`<select>`), Radio buttons, Checkboxes, Textareas, Color pickers.

### Phase 3: Smart Detection & Reactive Filler Core
- [ ] Build `detector.ts` heuristic matching engine:
  - Inspect `type`, `name`, `id`, `placeholder`, `aria-label`, `autocomplete`, surrounding `<label>`.
- [ ] Build `filler.ts` with React/Vue synthetic event dispatcher:
  - Native prototype setter trigger (`Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set`).
  - Dispatch `input`, `change`, `blur` events with `bubbles: true`.
  - Handle nested form structures, custom web components, and dynamic forms.

### Phase 4: Developer UI, Hotkeys & Context Menu
- [ ] Build Service Worker for:
  - Hotkey listener: `Alt+Shift+F` trigger.
  - Context Menu integration (Right-click on any field -> Fill with specific data).
- [ ] Build sleek Popup UI:
  - "Fill This Page" primary action button with instant field counter.
  - Quick preset switch: [Global / US] vs [Bangladesh / Local].
  - Quick toggle: "Use Default Password" vs "Random Password".
  - Quick action: "Clear Form".
- [ ] Build Options Page for custom rules and user-defined defaults.

### Phase 5: Production Polish, Open-Source README & Web Store Bundle
- [ ] Build system optimization (Tree-shaking, minification, generating production `dist`).
- [ ] Comprehensive `README.md` with demo GIF, architecture diagram, installation steps, and contribution guide.
- [ ] Chrome Web Store readiness check (Privacy policy guidelines, store description, promo tiles info).

---

## 🚀 How This Elevates Your Developer Profile
1. **GitHub Star-worthy:** Developers love simple, fast, free tools that save 15 minutes of repetitive daily typing.
2. **Shows High-Level TypeScript & DOM Mastery:** Solving the React/Vue synthetic event problem demonstrates deep frontend mechanics.
3. **Product Mindset:** Demonstrates you don't just write code, you build finished, polished products with real end-user utility.
