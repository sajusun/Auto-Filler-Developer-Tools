import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

const outDir = path.resolve('store_assets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Store Logo 300x300 & 512x512
const logoSvg = `
<svg width="512" height="512" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="emGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="120" height="120" rx="30" fill="url(#emGrad)" />
  <path d="M 34 8 L 94 8 C 112 8 120 16 120 34 L 120 40 C 120 22 112 12 94 12 L 34 12 C 16 12 8 22 8 40 L 8 34 C 8 16 16 8 34 8 Z" fill="#ffffff" opacity="0.2" />

  <!-- Left Brace { -->
  <path d="M 30 34 C 23 34 20 38 20 44 L 20 54 C 20 59 15 62 11 64 C 15 66 20 69 20 74 L 20 84 C 20 90 23 94 30 94" 
        fill="none" stroke="#ffffff" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round" />

  <!-- 'df' text in pure white bold -->
  <text x="63" y="83" font-size="52" font-weight="900" font-family="'Segoe UI', -apple-system, Roboto, sans-serif" letter-spacing="-1" fill="#ffffff" text-anchor="middle">df</text>

  <!-- Right Brace } -->
  <path d="M 98 34 C 105 34 108 38 108 44 L 108 54 C 108 59 113 62 117 64 C 113 66 108 69 108 74 L 108 84 C 108 90 105 94 98 94" 
        fill="none" stroke="#ffffff" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
`;

const resvg300 = new Resvg(logoSvg, { fitTo: { mode: 'width', value: 300 } });
fs.writeFileSync(path.join(outDir, 'devfill-logo-300x300.png'), resvg300.render().asPng());
console.log('Generated devfill-logo-300x300.png');

// 2. Small Promotional Tile (440 x 280)
const promoSmallSvg = `
<svg width="440" height="280" viewBox="0 0 440 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a101d" />
      <stop offset="100%" stop-color="#04201a" />
    </linearGradient>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <rect width="440" height="280" fill="url(#bgGrad)" />
  <circle cx="220" cy="110" r="140" fill="#10b981" opacity="0.08" filter="blur(40px)" />
  
  <!-- Centered Logo Badge -->
  <g transform="translate(180, 50)" filter="url(#shadow)">
    <rect width="80" height="80" rx="20" fill="url(#brandGrad)" />
    <!-- Left Brace -->
    <path d="M 20 22 C 15 22 13 25 13 29 L 13 36 C 13 39 10 41 7 42 C 10 43 13 45 13 49 L 13 55 C 13 59 15 62 20 62" 
          fill="none" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" />
    <!-- df -->
    <text x="42" y="55" font-size="34" font-weight="900" font-family="'Segoe UI', Roboto, sans-serif" letter-spacing="-1" fill="#ffffff" text-anchor="middle">df</text>
    <!-- Right Brace -->
    <path d="M 64 22 C 69 22 71 25 71 29 L 71 36 C 71 39 74 41 77 42 C 74 43 71 45 71 49 L 71 55 C 71 59 69 62 64 62" 
          fill="none" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- Title & Subtitle -->
  <text x="220" y="175" font-size="28" font-weight="800" font-family="'Segoe UI', Roboto, sans-serif" fill="#ffffff" text-anchor="middle">DevFill</text>
  <text x="220" y="202" font-size="14" font-weight="600" font-family="'Segoe UI', Roboto, sans-serif" fill="#34d399" text-anchor="middle">Smart Dummy Form Filler for Developers</text>
  <text x="220" y="228" font-size="12" font-weight="500" font-family="'Segoe UI', Roboto, sans-serif" fill="#94a3b8" text-anchor="middle">React • Vue • Inertia.js • Alt+Shift+F</text>
</svg>
`;

const resvgPromo = new Resvg(promoSmallSvg, { fitTo: { mode: 'width', value: 440 } });
fs.writeFileSync(path.join(outDir, 'devfill-small-promo-440x280.png'), resvgPromo.render().asPng());
console.log('Generated devfill-small-promo-440x280.png');

// 3. Screenshot (1280 x 800)
const screenshotSvg = `
<svg width="1280" height="800" viewBox="0 0 1280 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#021c16" />
    </linearGradient>
    <linearGradient id="brand" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1280" height="800" fill="url(#bg)" />
  <circle cx="950" cy="400" r="300" fill="#10b981" opacity="0.06" filter="blur(80px)" />
  <circle cx="300" cy="500" r="250" fill="#06b6d4" opacity="0.05" filter="blur(80px)" />

  <!-- Top Header Title -->
  <text x="100" y="100" font-size="44" font-weight="900" font-family="'Segoe UI', Roboto, sans-serif" fill="#ffffff">DevFill — Instant Dummy Form Filler</text>
  <text x="100" y="145" font-size="20" font-weight="500" font-family="'Segoe UI', Roboto, sans-serif" fill="#94a3b8">Fill complex registration and checkout forms in 18ms with realistic, framework-reactive mock data.</text>

  <!-- Mock Webpage Form (Left Side) -->
  <g transform="translate(100, 200)" filter="url(#cardShadow)">
    <rect width="660" height="520" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
    
    <!-- Browser Mock Header -->
    <rect width="660" height="42" rx="16" fill="#0f172a" />
    <circle cx="25" cy="21" r="6" fill="#ef4444" />
    <circle cx="45" cy="21" r="6" fill="#f59e0b" />
    <circle cx="65" cy="21" r="6" fill="#10b981" />
    <text x="95" y="26" font-size="13" font-family="'Segoe UI', Roboto, sans-serif" fill="#64748b">https://myapp.test/register</text>

    <!-- Form Content -->
    <text x="40" y="80" font-size="22" font-weight="700" font-family="'Segoe UI', Roboto, sans-serif" fill="#f8fafc">User Registration Form</text>
    <text x="40" y="105" font-size="13" font-family="'Segoe UI', Roboto, sans-serif" fill="#94a3b8">Autofilled automatically with DevFill (Alt + Shift + F)</text>

    <!-- Input 1: Full Name -->
    <text x="40" y="145" font-size="13" font-weight="600" font-family="'Segoe UI', Roboto, sans-serif" fill="#cbd5e1">Full Name</text>
    <rect x="40" y="155" width="280" height="42" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="2" />
    <text x="55" y="181" font-size="14" font-family="'Segoe UI', Roboto, sans-serif" fill="#ffffff">Alex Morgan</text>

    <!-- Input 2: Email -->
    <text x="340" y="145" font-size="13" font-weight="600" font-family="'Segoe UI', Roboto, sans-serif" fill="#cbd5e1">Email Address</text>
    <rect x="340" y="155" width="280" height="42" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="2" />
    <text x="355" y="181" font-size="14" font-family="'Segoe UI', Roboto, sans-serif" fill="#ffffff">alex.morgan88@example.com</text>

    <!-- Input 3: Phone -->
    <text x="40" y="235" font-size="13" font-weight="600" font-family="'Segoe UI', Roboto, sans-serif" fill="#cbd5e1">Phone Number</text>
    <rect x="40" y="245" width="280" height="42" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="2" />
    <text x="55" y="271" font-size="14" font-family="'Segoe UI', Roboto, sans-serif" fill="#ffffff">+1 (555) 349-8201</text>

    <!-- Input 4: Company -->
    <text x="340" y="235" font-size="13" font-weight="600" font-family="'Segoe UI', Roboto, sans-serif" fill="#cbd5e1">Company</text>
    <rect x="340" y="245" width="280" height="42" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="2" />
    <text x="355" y="271" font-size="14" font-family="'Segoe UI', Roboto, sans-serif" fill="#ffffff">Apex Dynamics Inc.</text>

    <!-- Input 5: Password -->
    <text x="40" y="325" font-size="13" font-weight="600" font-family="'Segoe UI', Roboto, sans-serif" fill="#cbd5e1">Password</text>
    <rect x="40" y="335" width="280" height="42" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="2" />
    <text x="55" y="361" font-size="16" font-family="'Segoe UI', Roboto, sans-serif" fill="#10b981">•••••••••••••</text>

    <!-- Input 6: Confirm Password -->
    <text x="340" y="325" font-size="13" font-weight="600" font-family="'Segoe UI', Roboto, sans-serif" fill="#cbd5e1">Confirm Password (Synced)</text>
    <rect x="340" y="335" width="280" height="42" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="2" />
    <text x="355" y="361" font-size="16" font-family="'Segoe UI', Roboto, sans-serif" fill="#10b981">•••••••••••••</text>

    <!-- Success Badge -->
    <rect x="40" y="420" width="580" height="52" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
    <text x="60" y="452" font-size="15" font-weight="700" font-family="'Segoe UI', Roboto, sans-serif" fill="#34d399">⚡ 6 form fields populated in 18ms with React and Vue event binding</text>
  </g>

  <!-- DevFill Popup UI (Right Side) -->
  <g transform="translate(820, 200)" filter="url(#cardShadow)">
    <rect width="360" height="520" rx="20" fill="#0a101f" stroke="#1e293b" stroke-width="2" />
    
    <!-- Header -->
    <g transform="translate(24, 24)">
      <rect width="44" height="44" rx="12" fill="url(#brand)" />
      <text x="22" y="31" font-size="20" font-weight="900" font-family="'Segoe UI', Roboto, sans-serif" fill="#ffffff" text-anchor="middle">{df}</text>
      <text x="56" y="23" font-size="18" font-weight="800" font-family="'Segoe UI', Roboto, sans-serif" fill="#ffffff">DevFill</text>
      <text x="56" y="38" font-size="11" font-weight="500" font-family="'Segoe UI', Roboto, sans-serif" fill="#10b981">Smart Form Filler</text>
    </g>

    <!-- Locale Switcher -->
    <g transform="translate(24, 90)">
      <rect width="312" height="38" rx="8" fill="#111827" />
      <rect width="152" height="32" x="3" y="3" rx="6" fill="#10b981" />
      <text x="79" y="24" font-size="12" font-weight="700" font-family="'Segoe UI', Roboto, sans-serif" fill="#ffffff" text-anchor="middle">🌐 Global (US/UK)</text>
      <text x="233" y="24" font-size="12" font-weight="600" font-family="'Segoe UI', Roboto, sans-serif" fill="#94a3b8" text-anchor="middle">🇧🇩 Bangladesh</text>
    </g>

    <!-- Main Button: Fill All -->
    <g transform="translate(24, 150)">
      <rect width="312" height="52" rx="12" fill="url(#brand)" />
      <text x="156" y="32" font-size="16" font-weight="800" font-family="'Segoe UI', Roboto, sans-serif" fill="#ffffff" text-anchor="middle">⚡ Fill Active Form (Alt+Shift+F)</text>
    </g>

    <!-- Secondary Button: Clear Form -->
    <g transform="translate(24, 215)">
      <rect width="312" height="44" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1" />
      <text x="156" y="27" font-size="14" font-weight="700" font-family="'Segoe UI', Roboto, sans-serif" fill="#cbd5e1" text-anchor="middle">🧹 Clear Form Fields (Alt+Shift+C)</text>
    </g>

    <!-- Features Checklist Card -->
    <g transform="translate(24, 280)">
      <rect width="312" height="210" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1" />
      <text x="18" y="30" font-size="12" font-weight="700" font-family="'Segoe UI', Roboto, sans-serif" fill="#64748b">CORE CAPABILITIES</text>

      <text x="18" y="65" font-size="13" font-weight="600" font-family="'Segoe UI', Roboto, sans-serif" fill="#f8fafc">✓ React and Vue useState Reactive</text>
      <text x="18" y="100" font-size="13" font-weight="600" font-family="'Segoe UI', Roboto, sans-serif" fill="#f8fafc">✓ Synchronized Passwords</text>
      <text x="18" y="135" font-size="13" font-weight="600" font-family="'Segoe UI', Roboto, sans-serif" fill="#f8fafc">✓ 100% Offline and Privacy Safe</text>
      <text x="18" y="170" font-size="13" font-weight="600" font-family="'Segoe UI', Roboto, sans-serif" fill="#f8fafc">✓ Context Menu Single-Field Inject</text>
    </g>
  </g>
</svg>
`;

const resvgScreen = new Resvg(screenshotSvg, { fitTo: { mode: 'width', value: 1280 } });
fs.writeFileSync(path.join(outDir, 'devfill-screenshot-1280x800.png'), resvgScreen.render().asPng());
console.log('Generated devfill-screenshot-1280x800.png');
