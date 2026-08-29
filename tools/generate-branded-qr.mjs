import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QRCodeSVG } from 'qrcode.react';
import sharp from 'sharp';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const outputDirectory = path.join(projectRoot, 'public', 'downloads', 'qr');
const qrUrl = 'https://movin-freiburg.de/q/ehc-container';

await mkdir(outputDirectory, { recursive: true });

const transparentPixel = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E';
const baseQrMarkup = renderToStaticMarkup(
  React.createElement(QRCodeSVG, {
    value: qrUrl,
    title: 'MOVIN QR-Code EHC-Container',
    size: 1200,
    level: 'H',
    bgColor: '#ffffff',
    fgColor: '#0a0f4d',
    marginSize: 4,
    imageSettings: {
      src: transparentPixel,
      width: 296,
      height: 120,
      excavate: true,
    },
  }),
);
const qrMarkup = baseQrMarkup.replace(
  '</svg>',
  '<rect x="16.95" y="20.25" width="11.1" height="4.5" rx="0.65" fill="#ffffff"/>'
    + '<text x="22.5" y="23.25" text-anchor="middle" fill="#00aeb7" '
    + 'font-family="Arial, Helvetica, sans-serif" font-size="2.2" font-weight="900" '
    + 'letter-spacing="0.25">MOVIN</text></svg>',
);

const svgPath = path.join(outputDirectory, 'ehc-container-qr.svg');
const pngPath = path.join(outputDirectory, 'ehc-container-qr.png');

await writeFile(svgPath, `${qrMarkup}\n`, 'utf8');
await sharp(Buffer.from(qrMarkup), { density: 288 })
  .resize(2400, 2400, { kernel: sharp.kernel.nearest })
  .png({ compressionLevel: 9, palette: true })
  .toFile(pngPath);

console.log(`Generated ${path.relative(projectRoot, svgPath)}`);
console.log(`Generated ${path.relative(projectRoot, pngPath)}`);
