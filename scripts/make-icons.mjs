// Generates the favicon set from the █▓▒░ block mark, drawn on a 16px pixel grid.
// Writes src/app/icon.svg, src/app/favicon.ico (16/32/48) and src/app/apple-icon.png (180).
// Run: node scripts/make-icons.mjs
import { writeFileSync } from 'node:fs'
import { deflateSync } from 'node:zlib'

const BG = [0x15, 0x13, 0x0f]
const AMBER = [0xe8, 0xad, 0x4f]
const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]
const LEVELS = [1, 0.75, 0.5, 0.25] // █ ▓ ▒ ░

// 16×16 grid: four 3px-wide columns of ordered dither, 12px tall, 2px margin
const grid = Array.from({ length: 16 }, (_, y) => Array.from({ length: 16 }, (_, x) => {
  if (x < 2 || x > 13 || y < 2 || y > 13) return false
  const level = LEVELS[Math.floor((x - 2) / 3)]
  return (BAYER[y % 4][x % 4] + 0.5) / 16 < level
}))

function svg() {
  const rects = []
  grid.forEach((row, y) => row.forEach((on, x) => { if (on) rects.push(`<rect x="${x}" y="${y}" width="1" height="1"/>`) }))
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">` +
    `<rect width="16" height="16" fill="#15130f"/><g fill="#e8ad4f">${rects.join('')}</g></svg>\n`
}

// Nearest-neighbour render of the grid to RGBA, scale px per cell, centred on a size×size tile
function raster(size, scale) {
  const off = Math.floor((size - 16 * scale) / 2)
  const px = Buffer.alloc(size * size * 4)
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const gx = Math.floor((x - off) / scale), gy = Math.floor((y - off) / scale)
    const on = gx >= 0 && gx < 16 && gy >= 0 && gy < 16 && grid[gy][gx]
    const [r, g, b] = on ? AMBER : BG
    px.set([r, g, b, 255], (y * size + x) * 4)
  }
  return px
}

const CRC = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
const crc32 = buf => { let c = 0xffffffff; for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0 }

function png(size, scale) {
  const px = raster(size, scale)
  const rows = Buffer.alloc(size * (size * 4 + 1))
  for (let y = 0; y < size; y++) px.copy(rows, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4)
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
    const body = Buffer.concat([Buffer.from(type), data])
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body))
    return Buffer.concat([len, body, crc])
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr.set([8, 6, 0, 0, 0], 8)
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr), chunk('IDAT', deflateSync(rows)), chunk('IEND', Buffer.alloc(0)),
  ])
}

function ico(images) {
  const header = Buffer.alloc(6); header.writeUInt16LE(1, 2); header.writeUInt16LE(images.length, 4)
  let offset = 6 + 16 * images.length
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16)
    e.writeUInt8(size % 256, 0); e.writeUInt8(size % 256, 1); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6)
    e.writeUInt32LE(data.length, 8); e.writeUInt32LE(offset, 12)
    offset += data.length
    return e
  })
  return Buffer.concat([header, ...entries, ...images.map(i => i.data)])
}

writeFileSync('src/app/icon.svg', svg())
writeFileSync('src/app/favicon.ico', ico([16, 32, 48].map(size => ({ size, data: png(size, size / 16) }))))
writeFileSync('src/app/apple-icon.png', png(180, 11))
