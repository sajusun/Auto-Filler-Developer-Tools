import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';

// Vibrant Solid Gradient DevFill {df}
const svgVibrant = `
<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="emGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
  </defs>
  <!-- Sleek rounded squircle -->
  <rect x="4" y="4" width="120" height="120" rx="30" fill="url(#emGrad)" />
  
  <!-- Subtle top inner highlight for depth -->
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

for (const size of [16, 32, 48, 128]) {
  const resvg = new Resvg(svgVibrant, { fitTo: { mode: 'width', value: size } });
  fs.writeFileSync(`test-vibrant-${size}.png`, resvg.render().asPng());
}
console.log('Saved vibrant test');
