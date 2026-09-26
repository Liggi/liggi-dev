import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

// Share cards in the site's style: warm near-black, serif display type, Departure Mono chrome.

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const BG = '#15130f'
const FG = '#ece5d8'
const MUTED = '#9a9082'
const BORDER = '#2f2a23'
const ACCENT = '#e8ad4f'

const font = (file: string) => readFile(join(process.cwd(), 'src/app/fonts/og', file))

// Departure Mono is drawn on an 11px grid; 22px keeps it crisp at 2×
const MONO = 22

export async function ogCard({ meta, children, footer }: { meta: string; children: React.ReactNode; footer: string }) {
  const [serif, serifItalic, mono] = await Promise.all([
    font('Newsreader-Display.ttf'), font('Newsreader-DisplayItalic.ttf'), font('DepartureMono-Regular.woff'),
  ])
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: BG, color: FG, padding: '64px 80px', fontFamily: 'Newsreader' }}>
        <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Departure', fontSize: MONO, color: MUTED }}>
          <div style={{ display: 'flex', color: ACCENT, letterSpacing: '-0.05em', marginRight: 18 }}>
            <span>█</span><span style={{ opacity: 0.65 }}>▓</span><span style={{ opacity: 0.4 }}>▒</span><span style={{ opacity: 0.2 }}>░</span>
          </div>
          <span>{meta}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>{children}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${BORDER}`, paddingTop: 24, fontFamily: 'Departure', fontSize: MONO, color: MUTED }}>
          <span style={{ color: FG }}>Jason Liggi</span>
          <span>{footer}</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Newsreader', data: serif, style: 'normal', weight: 400 },
        { name: 'Newsreader', data: serifItalic, style: 'italic', weight: 400 },
        { name: 'Departure', data: mono, style: 'normal', weight: 400 },
      ],
    },
  )
}

export const og = { FG, MUTED, ACCENT }
