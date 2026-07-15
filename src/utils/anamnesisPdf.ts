import type { jsPDF as JsPdfType } from 'jspdf';

type PdfFormData = {
  name: string;
  vorname: string;
  geburtsdatum: string;
  email: string;
  schmerzenWo: string;
  hatSchmerzen: string;
  intensitaet: number;
  staendigSchmerzen: string;
  beschwerdenTrend: string;
  seitWann: string;
  glaubenHeilung: string;
  unfall: string;
  unfallWann: string;
  beweglichkeitVerschlechtert: string;
  beweglichkeitWo: string;
  gefuehlsstoerungen: string;
  gefuehlsstoerungenWo: string;
  symptome: Record<string, boolean>;
  kraftVerloren: string;
  kraftWo: string;
  gestuerzt: string;
  alltagEingeschraenkt: string;
  nachtruheGestoert: string;
  gehstreckeEingeschraenkt: string;
  treppensteigenNormal: string;
  hilfeWohnung: string;
  versorgenSelbst: string;
  versorgenFamilie: string;
  einschraenkungBeruf: string;
  wasWiederKoennen: string;
  lebenssituationZufriedenheit: number;
  stressFirma: string;
  stressFamilie: string;
  familienstand: string;
  kinder: string;
  kinderImHaus: string;
  beruf: string;
  hobbys: string;
  diagnosen: Record<string, boolean>;
  medikamente: string;
  gewichtVerloren: string;
  krebs: string;
  krebsWelche: string;
  nachtschweiss: string;
  fruehereUnfaelle: string;
  fruehereOperationen: string;
  andereBeschwerden: string;
  painPoints: string[];
};

type Answer = {
  number?: string;
  label: string;
  value?: string | number;
};

type PdfColor = [number, number, number];

const COLORS = {
  navy: [10, 15, 77] as PdfColor,
  teal: [18, 174, 181] as PdfColor,
  mint: [184, 239, 208] as PdfColor,
  text: [51, 65, 85] as PdfColor,
  muted: [108, 122, 134] as PdfColor,
  line: [217, 226, 232] as PdfColor,
  pale: [245, 251, 251] as PdfColor,
  paleTeal: [232, 248, 247] as PdfColor,
  white: [255, 255, 255] as PdfColor,
};

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 13;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const FOOTER_Y = 283;

const BODY_POINTS = [
  { id: 'head-f', cx: 50, cy: 15, r: 8, view: 'front' },
  { id: 'neck-f', cx: 50, cy: 28, r: 5, view: 'front' },
  { id: 'chest', cx: 50, cy: 45, r: 10, view: 'front' },
  { id: 'shoulder-l-f', cx: 32, cy: 40, r: 6, view: 'front' },
  { id: 'shoulder-r-f', cx: 68, cy: 40, r: 6, view: 'front' },
  { id: 'arm-l-f', cx: 25, cy: 65, r: 5, view: 'front' },
  { id: 'arm-r-f', cx: 75, cy: 65, r: 5, view: 'front' },
  { id: 'abdomen', cx: 50, cy: 65, r: 10, view: 'front' },
  { id: 'hip-l-f', cx: 40, cy: 85, r: 7, view: 'front' },
  { id: 'hip-r-f', cx: 60, cy: 85, r: 7, view: 'front' },
  { id: 'knee-l-f', cx: 40, cy: 130, r: 6, view: 'front' },
  { id: 'knee-r-f', cx: 60, cy: 130, r: 6, view: 'front' },
  { id: 'foot-l-f', cx: 40, cy: 180, r: 6, view: 'front' },
  { id: 'foot-r-f', cx: 60, cy: 180, r: 6, view: 'front' },
  { id: 'head-b', cx: 50, cy: 15, r: 8, view: 'back' },
  { id: 'neck-b', cx: 50, cy: 28, r: 5, view: 'back' },
  { id: 'upper-back', cx: 50, cy: 45, r: 10, view: 'back' },
  { id: 'lower-back', cx: 50, cy: 75, r: 10, view: 'back' },
  { id: 'shoulder-l-b', cx: 32, cy: 40, r: 6, view: 'back' },
  { id: 'shoulder-r-b', cx: 68, cy: 40, r: 6, view: 'back' },
  { id: 'buttocks', cx: 50, cy: 95, r: 12, view: 'back' },
  { id: 'thigh-l-b', cx: 40, cy: 115, r: 8, view: 'back' },
  { id: 'thigh-r-b', cx: 60, cy: 115, r: 8, view: 'back' },
  { id: 'calf-l-b', cx: 40, cy: 155, r: 7, view: 'back' },
  { id: 'calf-r-b', cx: 60, cy: 155, r: 7, view: 'back' },
];

const bodyPath = 'M50,2 C53,2 56,3 58,5 C61,8 62,12 62,16 C62,21 60,25 57,28 C59,30 61,32 63,35 C68,38 78,40 82,45 C86,50 88,60 88,75 C88,85 86,95 84,105 C83,110 80,115 75,115 C72,115 70,113 68,110 L72,185 C73,192 70,198 63,198 C58,198 54,195 52,190 L50,140 L48,190 C46,195 42,198 37,198 C30,198 27,192 28,185 L32,110 C30,113 28,115 25,115 C20,115 17,110 16,105 C14,95 12,85 12,75 C12,60 14,50 18,45 C22,40 32,38 37,35 C39,32 41,30 43,28 C40,25 38,21 38,16 C38,12 39,8 42,5 C44,3 47,2 50,2 Z';

function setFill(pdf: JsPdfType, color: PdfColor) {
  pdf.setFillColor(...color);
}

function setText(pdf: JsPdfType, color: PdfColor) {
  pdf.setTextColor(...color);
}

function setDraw(pdf: JsPdfType, color: PdfColor) {
  pdf.setDrawColor(...color);
}

function valueOrFallback(value?: string | number) {
  const normalized = String(value ?? '').trim();
  return normalized || 'Keine Angabe';
}

function mixColor(from: PdfColor, to: PdfColor, amount: number): PdfColor {
  return from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount)) as PdfColor;
}

function drawBrandStripe(pdf: JsPdfType) {
  const strips = 90;
  const stripWidth = PAGE_WIDTH / strips;
  for (let index = 0; index < strips; index += 1) {
    const progress = index / (strips - 1);
    const color = progress < 0.55
      ? mixColor(COLORS.navy, COLORS.teal, progress / 0.55)
      : mixColor(COLORS.teal, COLORS.mint, (progress - 0.55) / 0.45);
    setFill(pdf, color);
    pdf.rect(index * stripWidth, 0, stripWidth + 0.2, 2.2, 'F');
  }
}

async function fetchAsBase64(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Schrift konnte nicht geladen werden: ${url}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  let binary = '';
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return window.btoa(binary);
}

async function registerFonts(pdf: JsPdfType) {
  try {
    const [jakartaRegular, jakartaBold, outfitBold] = await Promise.all([
      fetchAsBase64('/fonts/plus-jakarta-sans-400-pdf.ttf'),
      fetchAsBase64('/fonts/plus-jakarta-sans-700-pdf.ttf'),
      fetchAsBase64('/fonts/outfit-700-pdf.ttf'),
    ]);
    pdf.addFileToVFS('PlusJakartaSans-Regular.ttf', jakartaRegular);
    pdf.addFont('PlusJakartaSans-Regular.ttf', 'PlusJakartaSans', 'normal');
    pdf.addFileToVFS('PlusJakartaSans-Bold.ttf', jakartaBold);
    pdf.addFont('PlusJakartaSans-Bold.ttf', 'PlusJakartaSans', 'bold');
    pdf.addFileToVFS('Outfit-Bold.ttf', outfitBold);
    pdf.addFont('Outfit-Bold.ttf', 'Outfit', 'normal');
    return { body: 'PlusJakartaSans', heading: 'Outfit' };
  } catch (error) {
    console.warn('PDF-Schriften konnten nicht eingebettet werden. Helvetica wird verwendet.', error);
    return { body: 'helvetica', heading: 'helvetica' };
  }
}

function createSvg(markup: string) {
  return new DOMParser().parseFromString(markup, 'image/svg+xml').documentElement as unknown as SVGSVGElement;
}

async function loadLogoSvg() {
  const response = await fetch('/images/logos/movin-logo-2026-horizontal-rgb-gradient.svg');
  if (!response.ok) throw new Error('MOVIN-Logo konnte nicht geladen werden.');
  return createSvg(await response.text());
}

function createBodyMapSvg(selectedPoints: string[]) {
  const selected = new Set(selectedPoints);
  const circles = BODY_POINTS.filter((point) => selected.has(point.id)).map((point) => {
    const offset = point.view === 'front' ? 0 : 120;
    return `<circle cx="${point.cx + offset}" cy="${point.cy}" r="${point.r}" fill="#12aeb5" fill-opacity="0.82" stroke="#0a0f4d" stroke-width="1.4" />`;
  }).join('');

  return createSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 214">
      <text x="50" y="8" text-anchor="middle" font-family="Arial" font-size="8" fill="#6c7a86">VORNE</text>
      <text x="170" y="8" text-anchor="middle" font-family="Arial" font-size="8" fill="#6c7a86">HINTEN</text>
      <g transform="translate(0 12)"><path d="${bodyPath}" fill="#f3f7f8" stroke="#b9c7cd" stroke-width="1.3" /></g>
      <g transform="translate(120 12)"><path d="${bodyPath}" fill="#f3f7f8" stroke="#b9c7cd" stroke-width="1.3" /></g>
      <g transform="translate(0 12)">${circles}</g>
    </svg>
  `);
}

function drawClipboardIcon(pdf: JsPdfType, x: number, y: number) {
  setFill(pdf, COLORS.paleTeal);
  pdf.roundedRect(x, y, 14, 14, 2.4, 2.4, 'F');
  setDraw(pdf, COLORS.teal);
  pdf.setLineWidth(0.65);
  pdf.roundedRect(x + 4.2, y + 3.6, 5.6, 7.3, 0.7, 0.7, 'S');
  pdf.line(x + 5.6, y + 2.8, x + 8.4, y + 2.8);
  pdf.line(x + 5.3, y + 6.1, x + 8.7, y + 6.1);
  pdf.line(x + 5.3, y + 8.1, x + 8.7, y + 8.1);
}

function drawHeaderText(pdf: JsPdfType, fonts: { body: string; heading: string }, compact = false) {
  if (compact) {
    pdf.setFont(fonts.heading, 'normal');
    pdf.setFontSize(16);
    setText(pdf, COLORS.navy);
    pdf.text('Anamnesebogen', MARGIN, 20);
    return;
  }

  drawClipboardIcon(pdf, MARGIN, 12);
  pdf.setFont(fonts.heading, 'normal');
  pdf.setFontSize(9.5);
  setText(pdf, COLORS.teal);
  pdf.text('DIGITALER ANAMNESEBOGEN', MARGIN + 18, 17);
  pdf.setFont(fonts.body, 'normal');
  pdf.setFontSize(7.5);
  setText(pdf, COLORS.muted);
  pdf.text('Biopsychosoziale Erhebung nach ICF', MARGIN + 18, 22);
}

async function drawLogo(pdf: JsPdfType, logoSvg: SVGSVGElement, svg2pdf: typeof import('svg2pdf.js').svg2pdf, compact = false) {
  const width = compact ? 44 : 50;
  const height = compact ? 18.5 : 21;
  const x = PAGE_WIDTH - MARGIN - width;
  const y = compact ? 8.2 : 8;
  await svg2pdf(logoSvg, pdf, { x, y, width, height });
}

function drawPageHeader(pdf: JsPdfType, fonts: { body: string; heading: string }, compact = false) {
  drawBrandStripe(pdf);
  drawHeaderText(pdf, fonts, compact);
}

function drawSectionTitle(pdf: JsPdfType, fonts: { body: string; heading: string }, y: number, number: string, title: string) {
  setFill(pdf, COLORS.navy);
  pdf.roundedRect(MARGIN, y, 7.2, 7.2, 1.4, 1.4, 'F');
  pdf.setFont(fonts.heading, 'normal');
  pdf.setFontSize(8.5);
  setText(pdf, COLORS.white);
  pdf.text(number, MARGIN + 3.6, y + 4.8, { align: 'center' });
  pdf.setFontSize(12);
  setText(pdf, COLORS.navy);
  pdf.text(title, MARGIN + 10.5, y + 5.2);
  setDraw(pdf, [201, 238, 240]);
  pdf.setLineWidth(0.35);
  pdf.line(MARGIN, y + 9.1, PAGE_WIDTH - MARGIN, y + 9.1);
  return y + 12.1;
}

function measureAnswer(pdf: JsPdfType, fonts: { body: string; heading: string }, answer: Answer, width: number) {
  pdf.setFont(fonts.body, 'normal');
  pdf.setFontSize(7.4);
  const labelWidth = Math.max(20, width * 0.46 - 7);
  const valueWidth = Math.max(22, width * 0.54 - 3);
  const labelLines = pdf.splitTextToSize(answer.label, labelWidth) as string[];
  const valueLines = pdf.splitTextToSize(valueOrFallback(answer.value), valueWidth) as string[];
  return Math.max(8.5, 3.15 * Math.max(labelLines.length, valueLines.length) + 3.1);
}

function drawAnswer(pdf: JsPdfType, fonts: { body: string; heading: string }, answer: Answer, x: number, y: number, width: number, height?: number) {
  const rowHeight = height ?? measureAnswer(pdf, fonts, answer, width);
  const numberWidth = answer.number ? 7 : 2;
  const labelWidth = Math.max(20, width * 0.46 - numberWidth);
  const valueX = x + numberWidth + labelWidth + 2.2;
  const valueWidth = x + width - valueX;

  setDraw(pdf, COLORS.line);
  pdf.setLineWidth(0.25);
  pdf.line(x, y + rowHeight, x + width, y + rowHeight);

  if (answer.number) {
    pdf.setFont(fonts.heading, 'normal');
    pdf.setFontSize(7.5);
    setText(pdf, COLORS.teal);
    pdf.text(answer.number, x, y + 4.1);
  }

  pdf.setFont(fonts.body, 'normal');
  pdf.setFontSize(7.4);
  setText(pdf, COLORS.muted);
  pdf.text(pdf.splitTextToSize(answer.label, labelWidth), x + numberWidth, y + 4.1, { lineHeightFactor: 1.3 });

  pdf.setFont(fonts.body, 'bold');
  pdf.setFontSize(7.6);
  setText(pdf, COLORS.navy);
  pdf.text(pdf.splitTextToSize(valueOrFallback(answer.value), valueWidth), valueX, y + 4.1, { lineHeightFactor: 1.3 });
  return rowHeight;
}

function measurePair(pdf: JsPdfType, fonts: { body: string; heading: string }, left: Answer, right?: Answer) {
  const gap = 6;
  const columnWidth = (CONTENT_WIDTH - gap) / 2;
  return Math.max(measureAnswer(pdf, fonts, left, columnWidth), right ? measureAnswer(pdf, fonts, right, columnWidth) : 0);
}

function drawPair(pdf: JsPdfType, fonts: { body: string; heading: string }, y: number, left: Answer, right?: Answer) {
  const gap = 6;
  const columnWidth = (CONTENT_WIDTH - gap) / 2;
  const height = measurePair(pdf, fonts, left, right);
  drawAnswer(pdf, fonts, left, MARGIN, y, columnWidth, height);
  if (right) drawAnswer(pdf, fonts, right, MARGIN + columnWidth + gap, y, columnWidth, height);
  return y + height;
}

function drawPersonalCard(pdf: JsPdfType, fonts: { body: string; heading: string }, data: PdfFormData, y: number) {
  setFill(pdf, COLORS.pale);
  pdf.roundedRect(MARGIN, y, CONTENT_WIDTH, 18, 2.5, 2.5, 'F');
  const columns = [
    { label: 'NAME', value: data.name, width: 62 },
    { label: 'VORNAME', value: data.vorname, width: 62 },
    { label: 'GEBURTSDATUM', value: data.geburtsdatum, width: 48 },
  ];
  let x = MARGIN + 4;
  columns.forEach((column) => {
    pdf.setFont(fonts.body, 'normal');
    pdf.setFontSize(6.6);
    setText(pdf, COLORS.teal);
    pdf.text(column.label, x, y + 5.1);
    pdf.setFont(fonts.body, 'bold');
    pdf.setFontSize(8.2);
    setText(pdf, COLORS.navy);
    pdf.text(pdf.splitTextToSize(valueOrFallback(column.value), column.width - 5), x, y + 11.2);
    setDraw(pdf, [159, 180, 189]);
    pdf.setLineWidth(0.25);
    pdf.line(x, y + 14.4, x + column.width - 6, y + 14.4);
    x += column.width;
  });
  return y + 22;
}

function drawProgress(pdf: JsPdfType, fonts: { body: string; heading: string }, y: number, label: string, value: number, low: string, high: string) {
  pdf.setFont(fonts.body, 'normal');
  pdf.setFontSize(7.5);
  setText(pdf, COLORS.muted);
  pdf.text(label, MARGIN, y + 3.2);
  pdf.setFont(fonts.heading, 'normal');
  pdf.setFontSize(11.5);
  setText(pdf, COLORS.teal);
  pdf.text(`${value}/10`, PAGE_WIDTH - MARGIN, y + 3.2, { align: 'right' });
  setFill(pdf, [230, 238, 240]);
  pdf.roundedRect(MARGIN, y + 6.2, CONTENT_WIDTH, 2.4, 1.2, 1.2, 'F');
  setFill(pdf, COLORS.teal);
  pdf.roundedRect(MARGIN, y + 6.2, CONTENT_WIDTH * Math.max(0, Math.min(10, value)) / 10, 2.4, 1.2, 1.2, 'F');
  pdf.setFont(fonts.body, 'normal');
  pdf.setFontSize(6.2);
  setText(pdf, COLORS.muted);
  pdf.text(low, MARGIN, y + 12.2);
  pdf.text(high, PAGE_WIDTH - MARGIN, y + 12.2, { align: 'right' });
  return y + 15.2;
}

function drawChecklist(pdf: JsPdfType, fonts: { body: string; heading: string }, y: number, title: string, values: Record<string, boolean>) {
  const items = Object.entries(values);
  const height = 13 + Math.ceil(items.length / 4) * 7;
  setFill(pdf, COLORS.pale);
  setDraw(pdf, [201, 238, 240]);
  pdf.roundedRect(MARGIN, y, CONTENT_WIDTH, height, 2, 2, 'FD');
  pdf.setFont(fonts.body, 'normal');
  pdf.setFontSize(6.8);
  setText(pdf, COLORS.teal);
  pdf.text(title, MARGIN + 4, y + 5.2);
  const columnWidth = (CONTENT_WIDTH - 8) / 4;
  items.forEach(([key, active], index) => {
    const column = index % 4;
    const row = Math.floor(index / 4);
    const x = MARGIN + 4 + column * columnWidth;
    const itemY = y + 10 + row * 7;
    setFill(pdf, active ? COLORS.teal : COLORS.white);
    setDraw(pdf, active ? COLORS.teal : [174, 188, 196]);
    pdf.roundedRect(x, itemY - 2.6, 3.5, 3.5, 0.6, 0.6, 'FD');
    if (active) {
      setDraw(pdf, COLORS.white);
      pdf.setLineWidth(0.45);
      pdf.line(x + 0.8, itemY - 0.8, x + 1.5, itemY);
      pdf.line(x + 1.5, itemY, x + 2.8, itemY - 1.7);
    }
    pdf.setFont(fonts.body, active ? 'bold' : 'normal');
    pdf.setFontSize(7);
    setText(pdf, active ? COLORS.navy : COLORS.muted);
    pdf.text(key.charAt(0).toUpperCase() + key.slice(1), x + 5.2, itemY);
  });
  return y + height + 3;
}

function drawFooter(pdf: JsPdfType, fonts: { body: string; heading: string }, page: number, total: number, patientName: string) {
  setDraw(pdf, [201, 238, 240]);
  pdf.setLineWidth(0.3);
  pdf.line(MARGIN, FOOTER_Y - 4, PAGE_WIDTH - MARGIN, FOOTER_Y - 4);
  pdf.setFont(fonts.body, 'bold');
  pdf.setFontSize(6.5);
  setText(pdf, COLORS.navy);
  pdf.text('MOVIN Physiotherapie | Digitaler Anamnesebogen', MARGIN, FOOTER_Y);
  pdf.setFontSize(6.1);
  setText(pdf, COLORS.muted);
  pdf.text(`Patient*in: ${patientName || 'Keine Angabe'} | Erstellt am ${new Date().toLocaleDateString('de-DE')}`, MARGIN, FOOTER_Y + 3.7);
  pdf.setFont(fonts.heading, 'normal');
  pdf.setFontSize(11);
  setText(pdf, COLORS.teal);
  pdf.text(`${page}/${total}`, PAGE_WIDTH - MARGIN, FOOTER_Y + 1.2, { align: 'right' });
}

export async function generateAnamnesisPdf(data: PdfFormData, selectedPainLabels: string[]) {
  const [{ jsPDF }, { svg2pdf }] = await Promise.all([
    import('jspdf'),
    import('svg2pdf.js'),
  ]);

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true, putOnlyUsedFonts: true });
  const fonts = await registerFonts(pdf);
  const logoSvg = await loadLogoSvg();
  const patientName = `${data.vorname} ${data.name}`.trim();
  const pageContentBottom = FOOTER_Y - 7;

  const addContinuationPage = async () => {
    pdf.addPage('a4', 'portrait');
    drawPageHeader(pdf, fonts, true);
    await drawLogo(pdf, logoSvg, svg2pdf, true);
    pdf.setFont(fonts.body, 'normal');
    pdf.setFontSize(7);
    setText(pdf, COLORS.muted);
    pdf.text(patientName || 'Keine Angabe', MARGIN, 25);
    return 32;
  };

  drawPageHeader(pdf, fonts);
  await drawLogo(pdf, logoSvg, svg2pdf);
  pdf.setFont(fonts.heading, 'normal');
  pdf.setFontSize(24);
  setText(pdf, COLORS.navy);
  pdf.text('Anamnesebogen', MARGIN, 43);
  pdf.setFont(fonts.body, 'normal');
  pdf.setFontSize(7.5);
  setText(pdf, COLORS.muted);
  pdf.text('Ihre Angaben unterstützen die Vorbereitung der physiotherapeutischen Behandlung und werden vertraulich verarbeitet.', MARGIN, 49);

  let y = drawPersonalCard(pdf, fonts, data, 55);
  y = drawSectionTitle(pdf, fonts, y, 'I', 'Körperfunktionen und Körperstrukturen');

  const problemLines = pdf.splitTextToSize(valueOrFallback(data.schmerzenWo), 102) as string[];
  const painLabelLines = pdf.splitTextToSize(selectedPainLabels.length ? selectedPainLabels.join(', ') : 'Keine Markierungen', 102) as string[];
  const problemCardHeight = Math.max(40, 15 + problemLines.length * 3.1 + painLabelLines.length * 3.1);
  setFill(pdf, [247, 253, 253]);
  setDraw(pdf, [201, 238, 240]);
  pdf.roundedRect(MARGIN, y, 112, problemCardHeight, 2, 2, 'FD');
  pdf.setFont(fonts.body, 'normal');
  pdf.setFontSize(6.8);
  setText(pdf, COLORS.teal);
  pdf.text('1. PROBLEME UND SCHMERZREGIONEN', MARGIN + 4, y + 5.5);
  pdf.setFontSize(7.8);
  setText(pdf, COLORS.navy);
  pdf.text(problemLines, MARGIN + 4, y + 11, { lineHeightFactor: 1.3 });
  const painLabelsY = y + 13 + problemLines.length * 3.1;
  pdf.setFontSize(6.5);
  setText(pdf, COLORS.muted);
  pdf.text('MARKIERTE KÖRPERSTELLEN', MARGIN + 4, painLabelsY);
  pdf.setFontSize(7.2);
  setText(pdf, COLORS.text);
  pdf.text(painLabelLines, MARGIN + 4, painLabelsY + 4.2, { lineHeightFactor: 1.3 });

  const bodyX = MARGIN + 117;
  const bodyWidth = CONTENT_WIDTH - 117;
  setFill(pdf, [250, 252, 252]);
  pdf.roundedRect(bodyX, y, bodyWidth, problemCardHeight, 2, 2, 'F');
  pdf.setFont(fonts.body, 'normal');
  pdf.setFontSize(6.4);
  setText(pdf, COLORS.teal);
  pdf.text('SCHMERZLOKALISATION', bodyX + bodyWidth / 2, y + 5.4, { align: 'center' });
  await svg2pdf(createBodyMapSvg(data.painPoints), pdf, {
    x: bodyX + 6,
    y: y + 7,
    width: bodyWidth - 12,
    height: problemCardHeight - 9,
  });
  y += problemCardHeight + 4;
  y = drawProgress(pdf, fonts, y, '2.1 Intensität der Schmerzen', data.intensitaet, '0 = keine Schmerzen', '10 = stärkste Schmerzen');

  const firstPageAnswers: Answer[] = [
    { number: '2.', label: 'Haben Sie Schmerzen?', value: data.hatSchmerzen },
    { number: '2.2', label: 'Ständig Schmerzen?', value: data.staendigSchmerzen },
    { number: '2.3', label: 'Entwicklung der Beschwerden', value: data.beschwerdenTrend },
    { number: '2.4', label: 'Seit wann bestehen die Schmerzen?', value: data.seitWann },
    { number: '2.5', label: 'Können die Schmerzen wieder weggehen?', value: data.glaubenHeilung },
    { number: '2.6', label: 'Unfall als Auslöser?', value: `${valueOrFallback(data.unfall)}${data.unfallWann ? ` - ${data.unfallWann}` : ''}` },
    { number: '3.', label: 'Beweglichkeit verschlechtert?', value: `${valueOrFallback(data.beweglichkeitVerschlechtert)}${data.beweglichkeitWo ? ` - ${data.beweglichkeitWo}` : ''}` },
    { number: '4.', label: 'Gefühlsstörungen?', value: `${valueOrFallback(data.gefuehlsstoerungen)}${data.gefuehlsstoerungenWo ? ` - ${data.gefuehlsstoerungenWo}` : ''}` },
    { number: '6.', label: 'Kraftverlust?', value: `${valueOrFallback(data.kraftVerloren)}${data.kraftWo ? ` - ${data.kraftWo}` : ''}` },
    { number: '6.2', label: 'Ungewollt gestürzt?', value: data.gestuerzt },
  ];

  for (let index = 0; index < firstPageAnswers.length; index += 2) {
    const left = firstPageAnswers[index];
    const right = firstPageAnswers[index + 1];
    const needed = measurePair(pdf, fonts, left, right);
    if (y + needed > pageContentBottom) y = await addContinuationPage();
    y = drawPair(pdf, fonts, y, left, right);
  }
  if (y + 35 > pageContentBottom) y = await addContinuationPage();
  y = drawChecklist(pdf, fonts, y + 4, '5. BEGLEITSYMPTOME', data.symptome);

  y = await addContinuationPage();
  y = drawSectionTitle(pdf, fonts, y, 'II', 'Aktivitäten');

  const drawAnswerPairs = async (answers: Answer[]) => {
    for (let index = 0; index < answers.length; index += 2) {
      const left = answers[index];
      const right = answers[index + 1];
      const needed = measurePair(pdf, fonts, left, right);
      if (y + needed > pageContentBottom) y = await addContinuationPage();
      y = drawPair(pdf, fonts, y, left, right);
    }
  };

  await drawAnswerPairs([
    { number: '1.', label: 'Wobei sind Sie im Alltag eingeschränkt?', value: data.alltagEingeschraenkt },
    { number: '2.', label: 'Ist Ihre Nachtruhe gestört?', value: data.nachtruheGestoert },
    { number: '3.', label: 'Ist Ihre Gehstrecke eingeschränkt?', value: data.gehstreckeEingeschraenkt },
    { number: '4.', label: 'Können Sie normal Treppen steigen?', value: data.treppensteigenNormal },
  ]);

  if (y + 14 > pageContentBottom) y = await addContinuationPage();
  y = drawSectionTitle(pdf, fonts, y + 4, 'III', 'Teilhabe (Partizipation)');
  await drawAnswerPairs([
    { number: '1.', label: 'Benötigen Sie Hilfe in der Wohnung?', value: data.hilfeWohnung },
    { number: '2.', label: 'Versorgen Sie sich selbst?', value: data.versorgenSelbst },
    { number: '3.', label: 'Versorgen Sie Ihre Familie?', value: data.versorgenFamilie },
    { number: '4.', label: 'Einschränkungen im Beruf?', value: data.einschraenkungBeruf },
  ]);
  const participationAnswer: Answer = { number: '5.', label: 'Was möchten Sie gerne wieder können?', value: data.wasWiederKoennen };
  const participationHeight = measureAnswer(pdf, fonts, participationAnswer, CONTENT_WIDTH);
  if (y + participationHeight + 19 > pageContentBottom) y = await addContinuationPage();
  y += drawAnswer(pdf, fonts, participationAnswer, MARGIN, y, CONTENT_WIDTH);
  y = drawProgress(pdf, fonts, y + 3, '6. Zufriedenheit mit der aktuellen Lebenssituation', data.lebenssituationZufriedenheit, '0 = sehr zufrieden', '10 = unzufrieden');

  if (y + 25 > pageContentBottom) y = await addContinuationPage();
  y = drawSectionTitle(pdf, fonts, y + 3, 'IV', 'Umweltfaktoren');
  await drawAnswerPairs([
    { number: '1.', label: 'Stress im beruflichen Umfeld?', value: data.stressFirma },
    { number: '2.', label: 'Stress im familiären Umfeld?', value: data.stressFamilie },
  ]);

  if (y + 25 > pageContentBottom) y = await addContinuationPage();
  y = drawSectionTitle(pdf, fonts, y + 3, 'V', 'Personenbezogene Faktoren und allgemeine Anamnese');
  await drawAnswerPairs([
    { number: '1.', label: 'Familienstand', value: data.familienstand },
    { number: '2.', label: 'Kinder / im Haushalt', value: `${valueOrFallback(data.kinder)}${data.kinderImHaus ? ` / ${data.kinderImHaus}` : ''}` },
    { number: '3.', label: 'Beruf', value: data.beruf },
    { number: '4.', label: 'Hobbys', value: data.hobbys },
  ]);

  if (y + 28 > pageContentBottom) y = await addContinuationPage();
  y = drawChecklist(pdf, fonts, y + 3, '5. DIAGNOSEN', data.diagnosen);
  await drawAnswerPairs([
    { number: '6.', label: 'Aktuelle Medikamente', value: data.medikamente },
    { number: '7.', label: 'Ungewollter Gewichtsverlust?', value: data.gewichtVerloren },
    { number: '8.', label: 'Frühere Krebserkrankung?', value: `${valueOrFallback(data.krebs)}${data.krebsWelche ? ` - ${data.krebsWelche}` : ''}` },
    { number: '9.', label: 'Nachtschweiß oder Fieberschübe?', value: data.nachtschweiss },
    { number: '10.', label: 'Frühere Unfälle', value: data.fruehereUnfaelle },
    { number: '11.', label: 'Frühere Operationen', value: data.fruehereOperationen },
  ]);
  const finalAnswer: Answer = { number: '12.', label: 'Weitere Beschwerden oder Besonderheiten', value: data.andereBeschwerden };
  const finalHeight = measureAnswer(pdf, fonts, finalAnswer, CONTENT_WIDTH);
  if (y + finalHeight > pageContentBottom) y = await addContinuationPage();
  drawAnswer(pdf, fonts, finalAnswer, MARGIN, y, CONTENT_WIDTH);

  const totalPages = pdf.getNumberOfPages();
  for (let page = 1; page <= totalPages; page += 1) {
    pdf.setPage(page);
    drawFooter(pdf, fonts, page, totalPages, patientName);
  }

  pdf.setProperties({
    title: `Anamnesebogen ${patientName || 'MOVIN'}`,
    subject: 'Digitaler physiotherapeutischer Anamnesebogen',
    author: 'MOVIN Physiotherapie',
    creator: 'MOVIN Website',
    keywords: 'MOVIN, Physiotherapie, Anamnesebogen, ICF',
  });

  return pdf;
}
