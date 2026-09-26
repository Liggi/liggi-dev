import { ogCard, ogSize, ogContentType, og } from '@/lib/og'

export const alt = 'Jason Liggi: software engineer. LLM obsessive. i spend a lot of time figuring out how to make LLMs do interesting things.'
export const size = ogSize
export const contentType = ogContentType

// Word by word so the italic accent flows inline with the rest of the line
const WORDS = 'software engineer. LLM obsessive. i spend a lot of time figuring out how to make LLMs do interesting things'.split(' ')
const ACCENT_FROM = WORDS.indexOf('interesting')

export default function Image() {
  return ogCard({
    meta: 'liggi.dev',
    footer: 'writing · about',
    children: (
      <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 68, lineHeight: 1.12, letterSpacing: '-0.01em', color: og.FG }}>
        {WORDS.map((w, i) => (
          <div key={i} style={{ display: 'flex', marginRight: 17 }}>
            <span style={i >= ACCENT_FROM ? { fontStyle: 'italic', color: og.ACCENT } : {}}>{w}</span>
            {i === WORDS.length - 1 && <span>.</span>}
          </div>
        ))}
      </div>
    ),
  })
}
