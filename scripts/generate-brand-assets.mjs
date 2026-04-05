/**
 * SH 로고 PNG로 OG(1200×630), favicon.ico, app/icon.png 생성
 * 실행: node scripts/generate-brand-assets.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"
import pngToIco from "png-to-ico"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const sourcePng = path.join(__dirname, "source-sh-logo.png")

const OG_W = 1200
const OG_H = 630

async function main() {
  if (!fs.existsSync(sourcePng)) {
    console.error("Missing:", sourcePng)
    process.exit(1)
  }

  const logoBuf = fs.readFileSync(sourcePng)
  const meta = await sharp(logoBuf).metadata()
  const logoW = meta.width ?? 512
  const logoH = meta.height ?? 512

  // OG: 로고 높이 ≈ 캔버스의 72%
  const targetH = Math.round(OG_H * 0.72)
  const scale = targetH / logoH
  const resizedW = Math.round(logoW * scale)
  const resizedH = targetH

  const logoResized = await sharp(logoBuf)
    .resize(resizedW, resizedH, { fit: "inside", withoutEnlargement: false })
    .png()
    .toBuffer()

  const svgBg = `<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="og" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
  </defs>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#og)"/>
</svg>`

  const bgBuf = await sharp(Buffer.from(svgBg)).png().toBuffer()

  const left = Math.round((OG_W - resizedW) / 2)
  const top = Math.round((OG_H - resizedH) / 2)

  await sharp(bgBuf)
    .composite([{ input: logoResized, left, top }])
    .png()
    .toFile(path.join(root, "public", "og-image.png"))

  console.log("Wrote public/og-image.png", OG_W, "x", OG_H)

  // favicon: png-to-ico는 정사각형 PNG 1개로 48·32·16·256 멀티 해상도 ICO 생성
  const tmpSquare = path.join(__dirname, ".favicon-square-256.png")
  await sharp(logoBuf)
    .resize(256, 256, { fit: "cover", position: "centre" })
    .png()
    .toFile(tmpSquare)
  const icoBuf = await pngToIco(tmpSquare)
  fs.unlinkSync(tmpSquare)
  const faviconPathPublic = path.join(root, "public", "favicon.ico")
  const faviconPathApp = path.join(root, "app", "favicon.ico")
  fs.writeFileSync(faviconPathPublic, icoBuf)
  fs.writeFileSync(faviconPathApp, icoBuf)
  console.log("Wrote public/favicon.ico and app/favicon.ico")

  // Next 권장: app/icon.png (고해상도)
  await sharp(logoBuf)
    .resize(512, 512, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(root, "app", "icon.png"))
  console.log("Wrote app/icon.png (512)")

  const applePath = path.join(root, "app", "apple-icon.png")
  await sharp(logoBuf)
    .resize(180, 180, { fit: "cover", position: "centre" })
    .png()
    .toFile(applePath)
  fs.copyFileSync(applePath, path.join(root, "public", "apple-icon.png"))
  console.log("Wrote app/apple-icon.png and public/apple-icon.png (180)")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
