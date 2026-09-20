import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseImagesDir = path.resolve(__dirname, '../public/images');

const subdirs = ['brand', 'about', 'berita', 'edukasi', 'taman', 'komunitas'];
subdirs.forEach(sub => {
  const dirPath = path.join(baseImagesDir, sub);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Create Brand Logo SVG
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="gLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4FAE6F"/>
      <stop offset="100%" stop-color="#1B6B3A"/>
    </linearGradient>
    <linearGradient id="gAccent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF7EB3"/>
      <stop offset="100%" stop-color="#E5588E"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="18" fill="#EAF5EC"/>
  <path d="M32 10C18 15 11 25 11 36a21 21 0 0 0 42 0c0-11-7-21-21-26Z" fill="#D2EBD7"/>
  <path d="M31 52V24" stroke="#1B6B3A" stroke-width="3" stroke-linecap="round"/>
  <path d="M31 34c-1.5-8-8-12-15-12 0 8 5.5 13 15 12Z" fill="url(#gLeaf)"/>
  <path d="M31 42c1.5-9 8-13 16-13 0 9-6.5 14-16 13Z" fill="#1B6B3A"/>
  <circle cx="45" cy="18" r="4.5" fill="url(#gAccent)"/>
  <circle cx="16" cy="42" r="3.5" fill="#8256C4"/>
</svg>`;

fs.writeFileSync(path.join(baseImagesDir, 'brand/logo.svg'), logoSvg.trim());
console.log('Saved brand logo.svg');

// List of curated real-world images from reliable public Unsplash photo IDs (Nature, Community, Parks, Mangroves, Waste Management)
const imagesToFetch = [
  // About / Foto Kelompok
  {
    category: 'about',
    filename: 'foto-kelompok.webp',
    url: 'https://images.unsplash.com/photo-1544654803-b69140b285a1?auto=format&fit=crop&w=1200&q=80',
    title: 'Foto Tim & Relawan Komunitas Cangkruk Hijau'
  },
  {
    category: 'about',
    filename: 'aksi-penanaman.webp',
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80',
    title: 'Aksi Bersama Tanam Pohon'
  },

  // Berita Images
  {
    category: 'berita',
    filename: 'bank-sampah-rungkut.webp',
    url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    title: 'Pemilahan Sampah Bank Sampah'
  },
  {
    category: 'berita',
    filename: 'taman-harmoni-keputih.webp',
    url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
    title: 'Taman Kota RTH Surabaya'
  },
  {
    category: 'berita',
    filename: 'uji-emisi-kendaraan.webp',
    url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    title: 'Langit Kota & Uji Emisi'
  },
  {
    category: 'berita',
    filename: 'kali-surabaya-bersih.webp',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    title: 'Aksi Bersih Sungai Brantas'
  },
  {
    category: 'berita',
    filename: 'mangrove-wonorejo.webp',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    title: 'Kawasan Konservasi Mangrove Pamurbaya'
  },
  {
    category: 'berita',
    filename: 'urban-farming-jambangan.webp',
    url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    title: 'Kebun Urban Farming Komunitas'
  },
  {
    category: 'berita',
    filename: 'pesisir-kenjeran.webp',
    url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80',
    title: 'Aksi Bersih Pesisir Kenjeran'
  },
  {
    category: 'berita',
    filename: 'edukasi-sekolah-hijau.webp',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    title: 'Edukasi Lingkungan Sekolah'
  },

  // Edukasi Images
  {
    category: 'edukasi',
    filename: 'panduan-kompos.webp',
    url: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&w=800&q=80',
    title: 'Kompos Rumah Tangga'
  },
  {
    category: 'edukasi',
    filename: 'kajian-rth.webp',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    title: 'Kajian RTH Surabaya'
  },
  {
    category: 'edukasi',
    filename: 'modul-pilah-sampah.webp',
    url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    title: 'Modul Pilah Sampah'
  },
  {
    category: 'edukasi',
    filename: 'buku-saku-air.webp',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    title: 'Konservasi Air Bersih'
  },
  {
    category: 'edukasi',
    filename: 'urban-farming.webp',
    url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    title: 'Urban Farming Organik'
  },
  {
    category: 'edukasi',
    filename: 'kualitas-udara.webp',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    title: 'Kualitas Udara Kota'
  },

  // Taman RTH Images
  {
    category: 'taman',
    filename: 'taman-bungkul.webp',
    url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
    title: 'Taman Bungkul Wonokromo'
  },
  {
    category: 'taman',
    filename: 'kebun-raya-mangrove.webp',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    title: 'Kebun Raya Mangrove Gunung Anyar'
  },
  {
    category: 'taman',
    filename: 'taman-flora.webp',
    url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    title: 'Taman Flora Bratang'
  },
  {
    category: 'taman',
    filename: 'hutan-bambu-keputih.webp',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    title: 'Hutan Bambu Keputih Sukolilo'
  },
  {
    category: 'taman',
    filename: 'kebun-bibit-wonorejo.webp',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    title: 'Kebun Bibit Wonorejo Rungkut'
  },
  {
    category: 'taman',
    filename: 'taman-harmoni.webp',
    url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
    title: 'Taman Harmoni Keputih'
  },

  // Komunitas Avatars / Logos
  {
    category: 'komunitas',
    filename: 'nol-sampah-sby.webp',
    url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=300&q=80',
    title: 'Komunitas Nol Sampah Surabaya'
  },
  {
    category: 'komunitas',
    filename: 'ecoton-foundation.webp',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=300&q=80',
    title: 'ECOTON Foundation'
  },
  {
    category: 'komunitas',
    filename: 'tunas-hijau-indonesia.webp',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=300&q=80',
    title: 'Tunas Hijau Indonesia'
  },
  {
    category: 'komunitas',
    filename: 'kophi-jatim.webp',
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=300&q=80',
    title: 'KOPHI Jawa Timur'
  },
  {
    category: 'komunitas',
    filename: 'greenpeace-id.webp',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=300&q=80',
    title: 'Greenpeace Indonesia Relawan'
  },
  {
    category: 'komunitas',
    filename: 'sahabat-mangrove-sby.webp',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&q=80',
    title: 'Sahabat Mangrove Surabaya'
  }
];

// Fallback SVG generator in case network download fails or times out
function createFallbackImage(title, category) {
  const bgColors = {
    about: ['#1B6B3A', '#3E9B5F'],
    berita: ['#2F8A50', '#133A22'],
    edukasi: ['#3E9B5F', '#8256C4'],
    taman: ['#1B6B3A', '#4FAE6F'],
    komunitas: ['#E5588E', '#1B6B3A']
  };
  const [c1, c2] = bgColors[category] || ['#1B6B3A', '#4FAE6F'];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#grad)"/>
    <circle cx="680" cy="120" r="140" fill="#ffffff" opacity="0.08"/>
    <circle cx="120" cy="380" r="180" fill="#ffffff" opacity="0.06"/>
    <path d="M0 420 Q 200 360, 400 410 T 800 390 L 800 500 L 0 500 Z" fill="#ffffff" opacity="0.12"/>
    <text x="50" y="240" fill="#ffffff" font-family="Plus Jakarta Sans, sans-serif" font-size="28" font-weight="700">${title}</text>
    <text x="50" y="280" fill="#EAF5EC" font-family="Plus Jakarta Sans, sans-serif" font-size="18">Cangkruk Hijau Surabaya</text>
  </svg>`;
}

async function downloadAll() {
  console.log(`Starting asset population (${imagesToFetch.length} files)...`);
  
  for (const item of imagesToFetch) {
    const destPath = path.join(baseImagesDir, item.category, item.filename);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(item.url, { signal: controller.signal });
      clearTimeout(timeout);
      
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(destPath, Buffer.from(buffer));
        console.log(`✓ Downloaded ${item.category}/${item.filename} (${buffer.byteLength} bytes)`);
        continue;
      }
    } catch (err) {
      console.warn(`! Fetch failed for ${item.filename}, generating fallback SVG asset: ${err.message}`);
    }

    // If fetch failed or timed out, write a clean fallback SVG file so the app never has broken asset links
    const fallbackSvg = createFallbackImage(item.title, item.category);
    fs.writeFileSync(destPath, Buffer.from(fallbackSvg));
    console.log(`✓ Generated fallback visual: ${item.category}/${item.filename}`);
  }
  console.log('All image assets successfully synchronized!');
}

downloadAll();
