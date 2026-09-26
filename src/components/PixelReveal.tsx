'use client'

import { useEffect, useRef } from 'react'

const BAYER = [
  [0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5],
].map(r => r.map(v => (v + 0.5) / 16))

const DELAY = 450
const DITHER_MS = 520
const RESOLVE_STEPS = [9, 7, 5, 4, 3, 2]
const STEP_MS = 80
const WORD_STAGGER = 140

function Word({ text, index }: { text: string; index: number }) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const span = spanRef.current
    const canvas = canvasRef.current
    if (!span || !canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let cancelled = false

    document.fonts.ready.then(() => {
      if (cancelled) return
      const cs = getComputedStyle(span)
      const rect = span.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const pad = Math.ceil(parseFloat(cs.fontSize) * 0.25)
      const w = Math.ceil(rect.width + pad * 2)
      const h = Math.ceil(rect.height + pad * 2)
      canvas.style.left = `${-pad}px`
      canvas.style.top = `${-pad}px`
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      canvas.width = w * dpr
      canvas.height = h * dpr

      // Crisp source glyphs, drawn once
      const src = document.createElement('canvas')
      src.width = canvas.width
      src.height = canvas.height
      const sctx = src.getContext('2d')!
      sctx.scale(dpr, dpr)
      sctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
      // The span's own colour is held transparent by CSS; the inherited colour is the real one
      sctx.fillStyle = getComputedStyle(span.parentElement!).color
      const m = sctx.measureText(text)
      sctx.textBaseline = 'alphabetic'
      const contentH = m.fontBoundingBoxAscent + m.fontBoundingBoxDescent
      const y = pad + (rect.height - contentH) / 2 + m.fontBoundingBoxAscent
      sctx.fillText(text, pad, y)

      const ctx = canvas.getContext('2d')!
      const small = document.createElement('canvas')
      const smctx = small.getContext('2d', { willReadFrequently: true })!

      const draw = (block: number, threshold: number) => {
        const bw = Math.max(1, Math.ceil(canvas.width / (block * dpr)))
        const bh = Math.max(1, Math.ceil(canvas.height / (block * dpr)))
        small.width = bw
        small.height = bh
        smctx.imageSmoothingEnabled = true
        smctx.drawImage(src, 0, 0, bw, bh)
        const img = smctx.getImageData(0, 0, bw, bh)
        const d = img.data
        for (let py = 0; py < bh; py++) {
          for (let px = 0; px < bw; px++) {
            const i = (py * bw + px) * 4
            const shown = BAYER[py % 4][px % 4] < threshold
            d[i + 3] = shown && d[i + 3] > 35 ? 255 : 0
          }
        }
        smctx.putImageData(img, 0, 0)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(small, 0, 0, bw * block * dpr, bh * block * dpr)
      }

      const frameAt = (t: number) => {
        if (t < DITHER_MS) return draw(RESOLVE_STEPS[0], t / DITHER_MS)
        const step = Math.floor((t - DITHER_MS) / STEP_MS)
        if (step < RESOLVE_STEPS.length) return draw(RESOLVE_STEPS[step], 1)
        return null
      }

      const finish = () => {
        canvas.style.display = 'none'
        span.style.color = ''
        span.style.animation = 'none'
      }

      // The CSS hold (.pixel-word) hides the text until now; keep it hidden while the canvas draws
      span.style.color = 'transparent'

      const start = performance.now() + DELAY + index * WORD_STAGGER
      const tick = (now: number) => {
        const t = now - start
        if (t < 0) draw(RESOLVE_STEPS[0], 0)
        else if (frameAt(t) === null) return finish()
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [text, index])

  return (
    <span ref={spanRef} className="pixel-word relative inline-block whitespace-nowrap">
      {text}
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute left-0 top-0 h-0 w-0" />
    </span>
  )
}

export function PixelReveal({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <Word text={w} index={i} />
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  )
}
