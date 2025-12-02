const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function generate() {
  const src = path.join(__dirname, '..', 'project', 'images', 'ICONO_app2.jpg');
  const outDir = path.join(__dirname, '..', 'project', 'images');
  await ensureDir(outDir);

  const targets = [
    { size: 180, name: 'burger-icon-180.png', fit: 'cover' },
    { size: 192, name: 'burger-icon-192.png', fit: 'cover' },
    { size: 512, name: 'burger-icon-512.png', fit: 'cover' },
  ];

  // Ícono maskable: con padding transparente y contenido contenido
  const maskableName = 'burger-icon-maskable-512.png';
  const maskableOut = path.join(outDir, maskableName);
  await sharp(src)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(maskableOut);
  console.log('✓', maskableName);

  for (const t of targets) {
    const out = path.join(outDir, t.name);
    await sharp(src)
      .resize(t.size, t.size, { fit: t.fit })
      .png()
      .toFile(out);
    console.log('✓', t.name);
  }

  console.log('Íconos generados en', outDir);
}

generate().catch((err) => {
  console.error('Error generando íconos:', err);
  process.exit(1);
});

