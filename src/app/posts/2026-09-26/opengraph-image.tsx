import { ogCard, ogSize, ogContentType, og } from '@/lib/og'

export const alt = 'A story engine for Crusader Kings 3, by Jason Liggi'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return ogCard({
    meta: '002 · 26 sep 2026 · crusader kings 3 · llms',
    footer: 'liggi.dev',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 84, lineHeight: 1.04, letterSpacing: '-0.015em', color: og.FG }}>A story engine for Crusader Kings 3</div>
        <div style={{ display: 'flex', marginTop: 40, paddingLeft: 24, borderLeft: `2px solid ${og.ACCENT}`, fontSize: 40, fontStyle: 'italic', color: og.ACCENT }}>
          “Nobody wrote the Maccus story. It was sitting in the save.”
        </div>
      </div>
    ),
  })
}
