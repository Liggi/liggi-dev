import { ogCard, ogSize, ogContentType, og } from '@/lib/og'

export const alt = 'Teaching LLMs to Think in Old Norse, by Jason Liggi'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return ogCard({
    meta: '001 · 29 dec 2025 · crusader kings 3 · llms',
    footer: 'liggi.dev',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 84, lineHeight: 1.04, letterSpacing: '-0.015em', color: og.FG }}>Teaching LLMs to Think in Old Norse</div>
        <div style={{ display: 'flex', marginTop: 40, paddingLeft: 24, borderLeft: `2px solid ${og.ACCENT}`, fontSize: 40, fontStyle: 'italic', color: og.ACCENT }}>
          “The unwounded man has no saga”
        </div>
      </div>
    ),
  })
}
