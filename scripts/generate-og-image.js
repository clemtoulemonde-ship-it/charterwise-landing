// Generates public/og-image.png — 1200×630 social card for CharterWise
// Run: node scripts/generate-og-image.js
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLEAT_PATH = `
  M 202.5,330.5
  C 258.161,342.387 311.494,351.054 365.5,356.5
  C 369.964,357.644 374.63,358.31 379.5,358.5
  C 386.32,359.487 391.32,360.153 396.5,360.5
  C 404.655,361.533 412.988,362.2 421.5,362.5
  C 428.639,363.707 435.972,364.374 443.5,364.5
  C 455.284,366.01 463.284,366.677 471.5,366.5
  C 480.744,367.458 487.077,367.791 493.5,367.5
  C 505.5,368.833 517.5,368.833 529.5,367.5
  C 539.354,367.364 549.021,366.698 558.5,365.5
  C 571.699,365.155 584.699,364.155 597.5,362.5
  C 645.039,358.315 692.372,352.481 739.5,345
  C 741.974,344.963 743.974,344.13 745.5,342.5
  C 748.5,343.5 785.88,336.381 823.213,329.048
  C 860.5,321.5 867.535,321.326 874.535,321.659
  C 881.5,322.5 882.833,322.5 883.5,322.5
  C 912.556,333.234 925.389,354.234 922,385.5
  C 917.871,402.964 907.371,414.797 890.5,421
  C 858.466,431.673 826.133,441.34 793.5,450
  C 730.137,472.869 703.97,517.702 715,584.5
  C 719.175,603.175 726.842,620.175 738,635.5
  C 752.286,646.393 768.119,654.226 785.5,659
  C 799.407,664.915 807.241,675.415 809,690.5
  C 809.667,708.167 809.667,725.833 809,743.5
  C 807.878,745.624 806.378,747.457 804.5,749
  C 608.834,749.5 413.167,749.667 217.5,749.5
  C 213.618,748.789 211.118,746.456 210,742.5
  C 209.333,726.5 209.333,710.5 210,694.5
  C 210.921,681.487 216.421,670.987 226.5,663
  C 238.486,657.248 250.82,652.248 263.5,648
  C 267.069,646.058 270.402,643.892 273.5,641.5
  C 284.658,632.904 292.158,622.237 297,609.5
  C 301.899,596.904 305.066,583.904 306.5,570.5
  C 307.166,566.347 307.499,562.013 307.5,557.5
  C 307.68,550.928 307.014,544.595 305.5,538.5
  C 299.993,503.994 281.993,478.161 251.5,461
  C 229.485,450.384 206.485,442.884 182.5,438.5
  C 166.332,433.201 149.999,428.034 133.5,423
  C 99.0441,409.416 88.5441,385.249 102,350.5
  C 115.026,327.24 134.859,317.74 161.5,322
  C 175.279,324.362 188.946,327.195 202.5,330.5
  Z
  M 466.5,512.5
  C 495.167,512.5 523.833,512.5 552.5,512.5
  C 556.833,513.866 561.166,515.366 565.5,517
  C 568.704,520.036 571.704,523.203 574.5,526.5
  C 576.05,535.373 576.717,544.373 576.5,553.5
  C 575.146,568.572 574.479,583.739 574.5,599
  C 576.115,617.742 576.615,636.576 576,655.5
  C 574.032,658.813 572.032,662.146 570,665.5
  C 565.453,668.358 560.62,670.525 555.5,672
  C 524.833,672.667 494.167,672.667 463.5,672
  C 459.75,670.181 457.5,670.5 455.07,667.732
  C 452.237,665.399 449,663.5 448.482,660.977
  C 447.148,658.977 445,657.5 444.943,654.189
  C 444.11,651.189 442.5,648.5 442.5,611.5
  C 442.5,574.5 442.5,537.5 442.5,537.5
  C 443.856,531.93 446.023,526.597 449,521.5
  C 454.441,517.638 460.274,514.638 466.5,512.5
  Z
`.trim();

const W = 1200;
const H = 630;

// Cleat bounding box: x ~102–925, y ~321–749. Scale to ~160px wide, left-aligned.
const ICON_SCALE = 0.19;
const origCX = 513;
const origCY = 535;
const targetCX = 148;
const targetCY = H / 2 - 20;
const tx = targetCX - origCX * ICON_SCALE;
const ty = targetCY - origCY * ICON_SCALE;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#1B3A5C"/>

  <!-- Subtle grid texture -->
  <rect width="${W}" height="${H}" fill="url(#grid)" opacity="0.04"/>
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-width="0.5"/>
    </pattern>
  </defs>

  <!-- Gold accent bar on left -->
  <rect x="0" y="0" width="6" height="${H}" fill="#D4A843"/>

  <!-- Cleat icon -->
  <g transform="translate(${tx.toFixed(2)}, ${ty.toFixed(2)}) scale(${ICON_SCALE})" opacity="0.9">
    <path fill="#FFFFFF" fill-rule="evenodd" stroke="none" d="${CLEAT_PATH}"/>
  </g>

  <!-- Divider -->
  <line x1="300" y1="80" x2="300" y2="${H - 80}" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>

  <!-- WordMark -->
  <text
    x="348"
    y="238"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="72"
    font-weight="800"
    fill="#FFFFFF"
    letter-spacing="-1"
  >CharterWise</text>

  <!-- Gold underline -->
  <rect x="348" y="258" width="120" height="4" rx="2" fill="#D4A843"/>

  <!-- Tagline -->
  <text
    x="348"
    y="320"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="28"
    font-weight="400"
    fill="rgba(255,255,255,0.75)"
    letter-spacing="0.5"
  >Know your boat before you sail.</text>

  <!-- Feature pills -->
  <rect x="348" y="368" width="190" height="36" rx="18" fill="rgba(255,255,255,0.1)"/>
  <text x="443" y="391" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="rgba(255,255,255,0.85)" text-anchor="middle">Condition Score</text>

  <rect x="552" y="368" width="178" height="36" rx="18" fill="rgba(255,255,255,0.1)"/>
  <text x="641" y="391" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="rgba(255,255,255,0.85)" text-anchor="middle">Pick-up Reports</text>

  <rect x="744" y="368" width="130" height="36" rx="18" fill="rgba(255,255,255,0.1)"/>
  <text x="809" y="391" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="rgba(255,255,255,0.85)" text-anchor="middle">Reviews</text>

  <!-- TestFlight badge -->
  <rect x="348" y="448" width="270" height="52" rx="12" fill="#D4A843"/>
  <text x="483" y="480" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="18" font-weight="700" fill="#1B3A5C" text-anchor="middle">iOS Beta on TestFlight</text>

  <!-- URL -->
  <text
    x="348"
    y="560"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="20"
    font-weight="400"
    fill="rgba(255,255,255,0.4)"
    letter-spacing="1"
  >charterwise.app</text>
</svg>`;

const outPath = path.join(__dirname, '../public/og-image.png');

sharp(Buffer.from(svg))
  .png()
  .toFile(outPath)
  .then(() => console.log(`✅ og-image.png written → ${outPath}`))
  .catch(err => { console.error('❌ Failed:', err.message); process.exit(1); });
