import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { educationMaterials } from '../src/data/edukasi.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../public/documents');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function escapePdfText(text) {
  if (!text) return '';
  return String(text).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function createSimplePdf({ title, topic, type, pagesCount, highlights, description }) {
  const streamLines = [
    'BT',
    '/F1 18 Tf',
    '50 780 Td',
    `(CANGKRUK HIJAU - ${escapePdfText((type || 'MODUL EDUKASI').toUpperCase())}) Tj`,
    '/F2 10 Tf',
    '0 -18 Td',
    `(${escapePdfText('Portal Informasi & Kolaborasi Komunitas Lingkungan Surabaya')}) Tj`,
    '0 -10 Td',
    'ET',
    // Draw a decorative line
    'q',
    '0.11 0.42 0.23 rg', // #1B6B3A in RGB
    '50 742 512 3 re',
    'f',
    'Q',
    'BT',
    '/F1 13 Tf',
    '50 715 Td',
    `(${escapePdfText(title)}) Tj`,
    '/F2 10.5 Tf',
    '0 -22 Td',
    `(${escapePdfText('Topik: ' + topic + '  |  Estimasi Tebal: ' + pagesCount + ' hlm  |  Edisi: 2026')}) Tj`,
    '0 -24 Td',
    '/F1 11.5 Tf',
    `(${escapePdfText('Ringkasan Materi:')}) Tj`,
    '/F2 10 Tf',
    '0 -18 Td',
    `(${escapePdfText(description)}) Tj`,
    '0 -26 Td',
    '/F1 11.5 Tf',
    `(${escapePdfText('Poin-Poin Utama / Materi Pembahasan:')}) Tj`,
    '/F2 10 Tf'
  ];

  let currentOffset = -18;
  if (highlights && Array.isArray(highlights)) {
    highlights.forEach((point, idx) => {
      streamLines.push(`0 ${currentOffset} Td`);
      streamLines.push(`(${idx + 1}. ${escapePdfText(point)}) Tj`);
      currentOffset = -16;
    });
  }

  streamLines.push('0 -30 Td');
  streamLines.push('/F1 10.5 Tf');
  streamLines.push(`(${escapePdfText('Hak Cipta & Penggunaan:')}) Tj`);
  streamLines.push('/F2 9.5 Tf');
  streamLines.push('0 -16 Td');
  streamLines.push(`(${escapePdfText('Materi ini diterbitkan secara terbuka oleh Cangkruk Hijau untuk kepentingan edukasi publik.')}) Tj`);
  streamLines.push('0 -14 Td');
  streamLines.push(`(${escapePdfText('Kunjungi website kami di https://cangkrukhijau.vercel.app/edukasi untuk update modul terbaru.')}) Tj`);
  streamLines.push('ET');

  const contentStream = streamLines.join('\n');
  const streamLength = Buffer.byteLength(contentStream, 'utf-8');

  const objects = [];
  
  // 1: Catalog
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  // 2: Pages
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  // 3: Page
  objects.push('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n');
  // 4: Contents
  objects.push(`4 0 obj\n<< /Length ${streamLength} >>\nstream\n${contentStream}\nendstream\nendobj\n`);
  // 5: Font F1 (Helvetica-Bold)
  objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n');
  // 6: Font F2 (Helvetica)
  objects.push('6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');

  let body = '%PDF-1.4\n';
  const xrefOffsets = [0];

  for (let i = 0; i < objects.length; i++) {
    xrefOffsets.push(Buffer.byteLength(body, 'utf-8'));
    body += objects[i];
  }

  const startXref = Buffer.byteLength(body, 'utf-8');
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    xref += String(xrefOffsets[i]).padStart(10, '0') + ' 00000 n \n';
  }

  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
  return Buffer.from(body + xref + trailer, 'utf-8');
}

console.log(`Generating ${educationMaterials.length} PDF documents...`);

educationMaterials.forEach((mat) => {
  const fileName = mat.downloadName || `${mat.id}.pdf`;
  const pdfBuffer = createSimplePdf({
    title: mat.title,
    topic: mat.topic,
    type: mat.type,
    pagesCount: mat.pagesCount,
    description: mat.description,
    highlights: mat.highlights,
  });
  const filePath = path.join(targetDir, fileName);
  fs.writeFileSync(filePath, pdfBuffer);
  console.log(`✓ Generated: ${fileName} (${pdfBuffer.length} bytes)`);
});

console.log('All PDF documents generated successfully in public/documents/');
