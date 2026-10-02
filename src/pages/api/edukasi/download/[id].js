import fs from 'fs';
import path from 'path';
import { getEducationById } from '../../../../data/edukasi.js';

export const prerender = false;

export async function GET({ params }) {
  const { id } = params;
  const material = getEducationById(id);

  if (!material) {
    return new Response(JSON.stringify({ error: 'Materi edukasi tidak ditemukan' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const fileName = material.downloadName || `${material.id}.pdf`;
  let filePath = path.resolve(process.cwd(), 'public/documents', fileName);

  if (!fs.existsSync(filePath) && material.pdfUrl) {
    const rawName = path.basename(decodeURIComponent(material.pdfUrl));
    filePath = path.resolve(process.cwd(), 'public/documents', rawName);
  }

  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'public, max-age=86400'
      }
    });
  }

  // Fallback redirect to static public URL
  return new Response(null, {
    status: 302,
    headers: {
      'Location': material.pdfUrl
    }
  });
}
