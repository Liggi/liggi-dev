import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Teaching LLMs to Think in Old Norse",
  description: "Research, personas, and quality filtering for procedural text generation. How I generated 14,000 culturally-authentic house mottos for Crusader Kings 3.",
  openGraph: {
    title: "Teaching LLMs to Think in Old Norse",
    description: "Research, personas, and quality filtering for procedural text generation. How I generated 14,000 culturally-authentic house mottos for Crusader Kings 3.",
    type: "article",
    publishedTime: "2025-12-29",
  },
  twitter: {
    card: "summary",
    title: "Teaching LLMs to Think in Old Norse",
    description: "How I generated 14,000 culturally-authentic house mottos for Crusader Kings 3.",
  },
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4 md:hidden">
        <span className="text-xs text-[var(--muted)]">{number}</span>
        <h2 className="text-xl font-bold text-[var(--accent)]">{title}</h2>
      </div>
      <div className="hidden md:grid grid-cols-[auto_1fr] gap-6">
        <div className="w-12 border-r-2 border-[var(--border)] pr-4 pt-1 text-right text-xs text-[var(--muted)]">
          {number}
        </div>
        <div>
          <h2 className="mb-4 text-xl font-bold text-[var(--accent)]">{title}</h2>
          {children}
        </div>
      </div>
      <div className="md:hidden">
        {children}
      </div>
    </div>
  )
}

function Insight({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 border-2 border-[var(--accent)] bg-[var(--accent)]/5 p-4">
      <div className="mb-2 text-xs uppercase tracking-wider text-[var(--accent)]">Key Insight</div>
      <div className="text-sm leading-relaxed text-[var(--foreground)]">{children}</div>
    </div>
  )
}

function Step({ num, title, desc }: { num: number; title: string; desc: string }) {
  return (
    <div className="flex gap-4 border-b border-[var(--border)] py-3 last:border-0">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--accent)] text-sm font-bold text-[var(--accent)]">
        {num}
      </div>
      <div>
        <div className="font-bold text-[var(--foreground)]">{title}</div>
        <div className="text-sm text-[var(--muted)]">{desc}</div>
      </div>
    </div>
  )
}

function Diagram({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="my-6">
      {title && (
        <div className="mb-2 flex items-center gap-2 text-xs">
          <span className="text-[var(--accent)]">▸</span>
          <span className="uppercase tracking-wider text-[var(--muted)]">{title}</span>
        </div>
      )}
      <div className="overflow-x-auto rounded-sm border border-[var(--border)] bg-gradient-to-b from-[#0d0d0d] to-[#0a0a0a]">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />
        <pre className="p-3 md:p-5 font-mono text-[11px] md:text-[13px] leading-[1.6] tracking-wide text-[#b8b8b8]">
          {children}
        </pre>
      </div>
    </div>
  )
}

function MottoGallery({ culture, mottos }: { culture: string; mottos: { lifestyle: string; motto: string; native?: string }[] }) {
  return (
    <div className="mb-4">
      <div className="mb-2 text-xs uppercase tracking-wider text-[var(--accent)]">{culture}</div>
      {mottos.map((m, i) => (
        <div key={i} className="border-b border-[var(--border)] py-2 last:border-0">
          <span className="text-xs text-[var(--muted)] block mb-1 md:hidden">{m.lifestyle}</span>
          <div className="hidden md:grid grid-cols-[80px_1fr] gap-4">
            <span className="text-xs text-[var(--muted)]">{m.lifestyle}</span>
            <div>
              <span className="text-[var(--foreground)]">"{m.motto}"</span>
              {m.native && <div className="mt-1 text-xs italic text-[var(--muted)]">{m.native}</div>}
            </div>
          </div>
          <div className="md:hidden">
            <span className="text-[var(--foreground)]">"{m.motto}"</span>
            {m.native && <div className="mt-1 text-xs italic text-[var(--muted)]">{m.native}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

function CultureDefinition({ culture, themes, values, language, mottoStyle }: {
  culture: string
  themes: string
  values: string
  language: string
  mottoStyle: string
}) {
  return (
    <div className="my-4 border border-[var(--border)] bg-[var(--card)] p-4">
      <div className="mb-3 text-xs uppercase tracking-wider text-[var(--accent)]">{culture} culture definition</div>
      <div className="grid gap-2 text-sm">
        <div><span className="text-[var(--accent)]">themes:</span> <span className="text-[var(--foreground)]">{themes}</span></div>
        <div><span className="text-[var(--accent)]">values:</span> <span className="text-[var(--foreground)]">{values}</span></div>
        <div><span className="text-[var(--accent)]">language:</span> <span className="text-[var(--foreground)]">{language}</span></div>
        <div><span className="text-[var(--accent)]">motto style:</span> <span className="text-[var(--foreground)]">{mottoStyle}</span></div>
      </div>
    </div>
  )
}

function Comparison({ left, right, leftLabel, rightLabel }: {
  left: string[]
  right: string[]
  leftLabel: string
  rightLabel: string
}) {
  return (
    <div className="my-4 grid gap-4 md:grid-cols-2">
      <div className="border border-[var(--border)] bg-[var(--card)] p-4">
        <div className="mb-3 text-xs uppercase tracking-wider text-[var(--muted)]">{leftLabel}</div>
        {left.map((m, i) => (
          <div key={i} className="py-1 text-sm text-[var(--muted)]">"{m}"</div>
        ))}
      </div>
      <div className="border border-[var(--accent)] bg-[var(--accent)]/5 p-4">
        <div className="mb-3 text-xs uppercase tracking-wider text-[var(--accent)]">{rightLabel}</div>
        {right.map((m, i) => (
          <div key={i} className="py-1 text-sm text-[var(--foreground)]">"{m}"</div>
        ))}
      </div>
    </div>
  )
}

const PIPELINE_OVERVIEW = `
  ┌──────────────────────────────────────────────────────────────────┐
  │  1. RESEARCH          Deep cultural/linguistic research          │
  │  2. PERSONAS          6 lifestyle voices per culture             │
  │  3. ADAPTIVE GEN      Generate until saturation detected         │
  │  4. QUALITY FILTER    LLM rejects generic/weak mottos            │
  │  5. FORMAT            Text cleanup + CK3 mod files               │
  └──────────────────────────────────────────────────────────────────┘
`

const SATURATION_LOOP = `
  +-------------------------------------------+
  |   Generate batch of 10 mottos             |
  |   (using research + persona context)      |
  +---------------------+---------------------+
                        |
                        v
  +-------------------------------------------+
  |   Analyze cumulative corpus:              |
  |   - How many thematic categories?         |
  |   - Largest category < 30%?               |
  |   - Are new patterns emerging?            |
  |   - Entropy assessment (high/med/low)     |
  +---------------------+---------------------+
                        |
            +-----------+-----------+
            |                       |
            v                       v
  +------------------+   +------------------+
  |  NOT SATURATED   |   |    SATURATED     |
  |                  |   |                  |
  |  Loop back,      |   |  Stop. Move to   |
  |  generate more   |   |  next lifestyle  |
  +--------+---------+   +------------------+
           |
           +------+
                  v
           (back to top)
`

const VANILLA_TEMPLATE = `
  TEMPLATE:  "By $1$ and $2$"
                 │       │
                 ▼       ▼
  INSERT POOLS: [honor, truth, valor, strength, wisdom...]

  RESULT:  "By Honor and Truth"
           "By Valor and Wisdom"
           "By Strength and Honor"
           ...

  Same sentence structure, different word fills.
`

export default function Post() {
  return (
    <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
      <Link
        href="/"
        className="mb-6 inline-block text-xs text-[var(--muted)] hover:text-[var(--accent)]"
      >
        &larr; BACK TO INDEX
      </Link>

      {/* Mobile header */}
      <div className="mb-8 border-b-4 border-[var(--border)] pb-4 md:hidden">
        <div className="flex items-center gap-2 mb-2 text-xs text-[var(--muted)]">
          <span>FILE: <span className="text-[var(--accent)]">001</span></span>
          <span>•</span>
          <span>2025-12-29</span>
        </div>
        <h1 className="mb-1 text-2xl font-bold text-[var(--foreground)]">
          TEACHING LLMs TO THINK IN OLD NORSE
        </h1>
        <div className="text-xs text-[var(--muted)]">
          Research, personas, and quality filtering for procedural text generation
        </div>
      </div>

      {/* Desktop header */}
      <div className="mb-8 hidden md:grid grid-cols-[1fr_auto] gap-4 border-b-4 border-[var(--border)] pb-4">
        <div>
          <h1 className="mb-1 text-3xl font-bold text-[var(--foreground)]">
            TEACHING LLMs TO THINK IN OLD NORSE
          </h1>
          <div className="text-xs text-[var(--muted)]">
            Research, personas, and quality filtering for procedural text generation
          </div>
        </div>
        <div className="border-l-2 border-[var(--border)] pl-4 text-right">
          <div className="text-xs text-[var(--muted)]">FILE</div>
          <div className="text-sm text-[var(--accent)]">001</div>
          <div className="mt-2 text-xs text-[var(--muted)]">DATE</div>
          <div className="text-sm text-[var(--foreground)]">2025-12-29</div>
        </div>
      </div>

      <article className="max-w-4xl">

        {/* CONTEXT: What is this about */}
        <Section number="00" title="CONTEXT">
          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            <span className="font-bold text-[var(--accent)]">Crusader Kings 3</span> is a medieval dynasty simulator. You play as a noble house across generations, scheming, conquering, marrying strategically, and trying not to get murdered by your own children.
          </p>
          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            Every house has a <span className="font-bold text-[var(--accent)]">motto</span>, a short phrase that captures their identity. Think <em>"Winter is Coming"</em> or <em>"Ours is the Fury"</em>. These appear in-game on house screens and add flavor to the dynasty you're building.
          </p>
          <p className="text-sm leading-relaxed text-[var(--foreground)]">
            The base game generates these procedurally, but the results feel generic. This project uses LLMs to generate <strong>14,000 culturally-authentic mottos</strong> across 53 cultures, so a Norse house sounds Viking, a Byzantine house sounds Roman, and an Irish house sounds Celtic.
          </p>
        </Section>

        {/* HOW VANILLA WORKS */}
        <Section number="01" title="HOW VANILLA WORKS">
          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            The base game uses <span className="font-bold text-[var(--accent)]">template-based slot-filling</span>. Sentence structures like "By $1$ and $2$" get filled from word pools:
          </p>
          <Diagram title="Vanilla CK3 motto system">
            {VANILLA_TEMPLATE}
          </Diagram>
          <p className="mb-4 text-sm leading-relaxed text-[var(--foreground)]">
            This generates variety efficiently, with ~50,000 theoretical combinations from minimal content. But the mottos feel interchangeable. Here's what different cultures get:
          </p>

          <div className="my-4 grid gap-3 md:grid-cols-2">
            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-[var(--muted)]">Norse</div>
              <div className="space-y-1 text-sm text-[var(--foreground)]">
                <div>"By Honor and Sword"</div>
                <div>"Victory Through the Axe"</div>
                <div>"Strength Over Weakness"</div>
                <div>"Dare to be Bold"</div>
              </div>
            </div>
            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-[var(--muted)]">Byzantine</div>
              <div className="space-y-1 text-sm text-[var(--foreground)]">
                <div>"Wisdom is Strength"</div>
                <div>"Cunning as the Fox"</div>
                <div>"By Truth and Honor"</div>
                <div>"Peace Over War"</div>
              </div>
            </div>
            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-[var(--muted)]">Arabic</div>
              <div className="space-y-1 text-sm text-[var(--foreground)]">
                <div>"By Honor and Truth"</div>
                <div>"Wisdom Through God"</div>
                <div>"Strength Over Adversity"</div>
                <div>"Victory is Ours"</div>
              </div>
            </div>
            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-[var(--muted)]">Mongol</div>
              <div className="space-y-1 text-sm text-[var(--foreground)]">
                <div>"Victory Through the Bow"</div>
                <div>"Bold with Sword in Hand"</div>
                <div>"Triumph Over All"</div>
                <div>"By Conquest and Valor"</div>
              </div>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-[var(--muted)]">
            They're fine. But they could belong to any culture. Nothing about "By Honor and Sword" feels specifically Norse.
          </p>
        </Section>

        {/* WHAT THE PIPELINE PRODUCES */}
        <Section number="02" title="WHAT THE PIPELINE PRODUCES">
          <p className="mb-4 text-sm leading-relaxed text-[var(--foreground)]">
            The same cultures, with mottos generated by this pipeline:
          </p>

          <div className="my-4 grid gap-3 md:grid-cols-2">
            <div className="border border-sky-500/50 bg-sky-500/5 p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-sky-400">Norse</div>
              <div className="space-y-1 text-sm text-[var(--foreground)]">
                <div>"Blood dries; sagas live"</div>
                <div>"What the steel takes, the skald keeps"</div>
                <div>"Ravens need not wait"</div>
                <div>"The unwounded man has no saga"</div>
              </div>
            </div>
            <div className="border border-purple-500/50 bg-purple-500/5 p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-purple-400">Byzantine</div>
              <div className="space-y-1 text-sm text-[var(--foreground)]">
                <div>"The dead do not testify"</div>
                <div>"Before the blade, the whisper"</div>
                <div>"Gold speaks; iron listens"</div>
                <div>"Every throne casts a shadow"</div>
              </div>
            </div>
            <div className="border border-rose-500/50 bg-rose-500/5 p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-rose-400">Arabic</div>
              <div className="space-y-1 text-sm text-[var(--foreground)]">
                <div>"The ink of scholars outlasts the blood of kings"</div>
                <div>"We trade in silk; we settle in steel"</div>
                <div>"Hospitality to guests, ruin to foes"</div>
                <div>"The desert teaches patience; we teach the desert"</div>
              </div>
            </div>
            <div className="border border-orange-500/50 bg-orange-500/5 p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-orange-400">Mongol</div>
              <div className="space-y-1 text-sm text-[var(--foreground)]">
                <div>"The grass bends; we do not"</div>
                <div>"Where our horses drink, our borders end"</div>
                <div>"The sky is our roof, the earth our floor"</div>
                <div>"We came from the steppe; we return with kingdoms"</div>
              </div>
            </div>
          </div>

          <div className="my-4 grid gap-3 md:grid-cols-2">
            <div className="border border-emerald-500/50 bg-emerald-500/5 p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-emerald-400">Celtic</div>
              <div className="space-y-1 text-sm text-[var(--foreground)]">
                <div>"We are those who never bowed"</div>
                <div>"The battle endures; the clan endures"</div>
                <div>"We are the fire that will not be smothered"</div>
                <div>"While rock stands, we stand"</div>
              </div>
            </div>
            <div className="border border-amber-500/50 bg-amber-500/5 p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-amber-400">Berber</div>
              <div className="space-y-1 text-sm text-[var(--foreground)]">
                <div>"We are the mountains; we do not fear the wind"</div>
                <div>"He who comes as an enemy shall return as bone"</div>
                <div>"Every mountain holds bones of those who tried to take it"</div>
                <div>"The lion asks no one if he may eat"</div>
              </div>
            </div>
          </div>

          <Insight>
            The challenge isn't generating mottos. It's generating <em>diverse</em> mottos that feel authentically Norse, Byzantine, or Mongol, not generic fantasy that could be any culture.
          </Insight>
        </Section>

        {/* Why naive generation fails */}
        <Section number="03" title="THE DIVERSITY PROBLEM">
          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            What happens if you just ask an LLM to generate Norse mottos with no context? I ran the experiment: <em>"Generate 100 Norse house mottos for a medieval strategy game."</em>
          </p>

          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            Here's a sample of what came back:
          </p>

          <div className="my-4 grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
            <div className="border border-[var(--border)] bg-[var(--card)] p-3">
              <div className="mb-2 text-xs uppercase tracking-wider text-[var(--muted)]">Naive output (actual)</div>
              <div className="space-y-1 text-[var(--muted)]">
                <div>"Honor through blade and blood"</div>
                <div>"The wolf remembers every slight"</div>
                <div>"Steel sings our ancestors' songs"</div>
                <div>"Death before dishonor calls"</div>
                <div>"The strong shall inherit all"</div>
                <div>"Victory or Valhalla awaits"</div>
              </div>
            </div>
            <div className="border border-[var(--border)] bg-[var(--card)] p-3">
              <div className="mb-2 text-xs uppercase tracking-wider text-[var(--muted)]">Pattern frequency</div>
              <div className="space-y-1 font-mono text-xs text-[var(--muted)]">
                <div>steel/iron/sword .... 15%</div>
                <div>wolf ................ 9%</div>
                <div>strength/strong ..... 9%</div>
                <div>blood ............... 8%</div>
                <div>honor ............... 7%</div>
                <div>death ............... 6%</div>
              </div>
            </div>
          </div>

          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            These are <em>Norse-ish</em>, but not actually Norse. The giveaway:
          </p>

          <div className="my-4 border-2 border-red-500/30 bg-red-500/5 p-4">
            <div className="text-center text-sm text-[var(--foreground)]">
              Out of 102 mottos, only <span className="font-bold text-red-400">1</span> referenced actual Norse mythology (Valhalla/Odin/Thor).
            </div>
            <div className="mt-2 text-center text-xs text-[var(--muted)]">
              The rest are generic medieval warrior tropes that could work for any culture.
            </div>
          </div>

          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            Now compare to the pipeline output, which had access to deep cultural research:
          </p>

          <div className="my-4 grid gap-4 md:grid-cols-2">
            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-red-400">Naive (no context)</div>
              <div className="space-y-2 text-sm text-[var(--muted)]">
                <div>"The wolf remembers every slight"</div>
                <div>"Steel sings our ancestors' songs"</div>
                <div>"Iron will forged in battle"</div>
              </div>
              <div className="mt-3 text-xs text-[var(--muted)]">Generic warrior imagery. Could be any culture.</div>
            </div>
            <div className="border border-sky-500/50 bg-sky-500/5 p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-sky-400">Pipeline (with research)</div>
              <div className="space-y-2 text-sm text-[var(--foreground)]">
                <div>"The unwounded man has no saga"</div>
                <div>"Blood dries; sagas live"</div>
                <div>"The Norns carve; we answer"</div>
              </div>
              <div className="mt-3 text-xs text-[var(--foreground)]">Saga tradition. Fate cosmology. Distinctly Norse.</div>
            </div>
          </div>

          <Insight>
            The naive model knows Norse surface aesthetics (wolves, steel, blood) but not Norse <em>philosophy</em>: that reputation outlives death, that fate is woven by the Norns, that the only immortality is the saga. The research stage provides that cultural DNA.
          </Insight>
        </Section>

        {/* THE SOLUTION: Pipeline overview */}
        <Section number="04" title="THE PIPELINE">
          <p className="mb-4 text-sm leading-relaxed text-[var(--foreground)]">
            Five stages, each solving a specific problem:
          </p>
          <div className="my-4 space-y-4">
            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[var(--accent)] text-sm font-bold text-[var(--accent)]">1</div>
                <div className="font-bold text-[var(--foreground)]">Deep Research</div>
              </div>
              <p className="text-sm text-[var(--muted)]">
                Web search + LLM synthesis builds authentic cultural context for each of the 53 cultures. Not surface-level facts, but worldview: What did this culture value? How did they think about death, honor, legacy? What did their poetry sound like?
              </p>
            </div>
            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[var(--accent)] text-sm font-bold text-[var(--accent)]">2</div>
                <div className="font-bold text-[var(--foreground)]">Persona Generation</div>
              </div>
              <p className="text-sm text-[var(--muted)]">
                Six lifestyle voices per culture (martial, diplomacy, intrigue, stewardship, learning, prowess). A warrior's motto sounds different from a scholar's. Each persona is a rich prose description of <em>how this character thinks and speaks</em>.
              </p>
            </div>
            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[var(--accent)] text-sm font-bold text-[var(--accent)]">3</div>
                <div className="font-bold text-[var(--foreground)]">Adaptive Generation</div>
              </div>
              <p className="text-sm text-[var(--muted)]">
                Generate in batches of 10, analyze thematic diversity after each batch, continue until "saturation" is detected. This avoids both under-generating (missing themes) and over-generating (endless variations of the same idea). Some cultures saturate at 15 mottos; others hit 70 before running out of fresh ground.
              </p>
            </div>
            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[var(--accent)] text-sm font-bold text-[var(--accent)]">4</div>
                <div className="font-bold text-[var(--foreground)]">Quality Filter</div>
              </div>
              <p className="text-sm text-[var(--muted)]">
                An LLM acts as a critical editor, rejecting generic or weak mottos. "The wolf never bows" gets cut; "The unwounded man has no saga" stays. Retention rate is remarkably consistent at ~70% across all cultures.
              </p>
            </div>
            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[var(--accent)] text-sm font-bold text-[var(--accent)]">5</div>
                <div className="font-bold text-[var(--foreground)]">Format</div>
              </div>
              <p className="text-sm text-[var(--muted)]">
                Text cleanup (normalize quotes, remove trailing periods, title case) and generate CK3 mod files with proper triggers so Norse mottos only appear for Norse houses, Arabic mottos for Arabic houses, etc.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[var(--foreground)]">
            The next sections dive deeper into the interesting parts: research, personas, and the saturation detection loop.
          </p>
        </Section>

        {/* DEEP DIVE: Cultural Research */}
        <Section number="05" title="CULTURAL RESEARCH">
          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            Each culture gets a research document built from web search + LLM synthesis. Not surface-level facts ("Mongols rode horses") but the underlying worldview: What did this culture <em>value</em>? How did they think about death, honor, legacy? What did their poetry sound like?
          </p>

          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            Here's what the research captures for <span className="font-bold text-orange-400">Steppe cultures</span> (Mongolic, Turkic):
          </p>

          <div className="my-4 space-y-3">
            <div className="border border-orange-500/30 bg-orange-500/5 p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-orange-400">Tengri (Eternal Blue Sky)</div>
              <p className="text-sm text-[var(--foreground)]">
                The supreme sky god governing all existence. Genghis Khan began declarations with "By the will of Eternal Blue Heaven." Khans were "sons of Tengri," receiving <em>kut</em> (heavenly spiritual force). Conquest wasn't ambition; it was divine mandate.
              </p>
              <div className="mt-2 text-xs text-[var(--muted)]">
                Sacred phrases: "Tengri jarlykasyn" (Let Tengri reward you) • "Tengri-yin Kuchin" (Power of Tengri)
              </div>
            </div>

            <div className="border border-orange-500/30 bg-orange-500/5 p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-orange-400">The Sulde (Spirit Banner)</div>
              <p className="text-sm text-[var(--foreground)]">
                A spear with the best stallion's horsehair draped around its base. The warrior's soul resided forever in those tufts. While living, it carried destiny; in death, it became the soul itself. The body was abandoned to nature, but the sulde lived on.
              </p>
              <div className="mt-2 text-xs text-[var(--muted)]">
                White banner for peace • Black banner raised in war • The soul lives in horsehair, not monuments
              </div>
            </div>

            <div className="border border-orange-500/30 bg-orange-500/5 p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-orange-400">Börte Chino (The Wolf Origin)</div>
              <p className="text-sm text-[var(--foreground)]">
                The Secret History of the Mongols begins: "At the beginning there was a blue-grey wolf, born with his destiny ordained by Heaven Above. His wife was a fallow doe." The wolf represents the sky; the deer symbolizes earth. Genghis Khan's clan name relates to <em>böri</em> (wolf).
              </p>
              <div className="mt-2 text-xs text-[var(--muted)]">
                The wolf is ancestor, not enemy • Golden wolf heads erected before tents • "A spirit of nature and men"
              </div>
            </div>

            <div className="border border-orange-500/30 bg-orange-500/5 p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-orange-400">Anda (Blood Brotherhood)</div>
              <p className="text-sm text-[var(--foreground)]">
                A sacred bond between two men who become brothers by choice, not birth. "Sworn friends share but a single life. They do not abandon one another: they are each a life's safeguard for the other." Genghis Khan and Jamukha swore anda three times.
              </p>
              <div className="mt-2 text-xs text-[var(--muted)]">
                The arrow parable: One arrow breaks easily; a bundle is unbreakable
              </div>
            </div>
          </div>

          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            The research also captures <strong>authentic vocabulary</strong> (sulde, kut, anda, uran, tamga), <strong>anti-patterns to avoid</strong> (castle imagery, European feudal terms, agricultural metaphors), and <strong>linguistic style</strong> (terse commands, oral tradition rhythms, verb-final structures).
          </p>

          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            This context shapes everything. When the model generates steppe mottos, it draws on these concepts:
          </p>

          <div className="my-4 grid gap-3 md:grid-cols-2">
            <div className="border border-[var(--border)] bg-[var(--card)] p-3">
              <div className="mb-2 text-xs text-[var(--muted)]">Research concept:</div>
              <div className="text-xs text-[var(--muted)]">Nomadic worldview, no walls or fortresses</div>
              <div className="mt-2 text-xs text-orange-400">→ Generated motto:</div>
              <div className="text-sm text-[var(--foreground)]">"The sky is our roof, the earth our floor"</div>
            </div>
            <div className="border border-[var(--border)] bg-[var(--card)] p-3">
              <div className="mb-2 text-xs text-[var(--muted)]">Research concept:</div>
              <div className="text-xs text-[var(--muted)]">Conquest as natural movement, divine mandate</div>
              <div className="mt-2 text-xs text-orange-400">→ Generated motto:</div>
              <div className="text-sm text-[var(--foreground)]">"Where our horses drink, our borders end"</div>
            </div>
            <div className="border border-[var(--border)] bg-[var(--card)] p-3">
              <div className="mb-2 text-xs text-[var(--muted)]">Research concept:</div>
              <div className="text-xs text-[var(--muted)]">Arrow parable: "One arrow breaks easily; many arrows are indestructible"</div>
              <div className="mt-2 text-xs text-orange-400">→ Generated motto:</div>
              <div className="text-sm text-[var(--foreground)]">"One arrow breaks; we are the bundle"</div>
            </div>
            <div className="border border-[var(--border)] bg-[var(--card)] p-3">
              <div className="mb-2 text-xs text-[var(--muted)]">Research concept:</div>
              <div className="text-xs text-[var(--muted)]">Sulde: the soul lives in horsehair, not the body</div>
              <div className="mt-2 text-xs text-orange-400">→ Generated motto:</div>
              <div className="text-sm text-[var(--foreground)]">"The sulde remembers what the body forgets"</div>
            </div>
          </div>

          <Insight>
            The research document is ~500 lines of cultural context, proverbs, linguistic patterns, and anti-patterns. It's the difference between "Mongols were warriors" and understanding that conquest was divine mandate from Tengri, that souls lived in horsehair banners, and that the wolf was ancestor, not enemy.
          </Insight>
        </Section>

        {/* DEEP DIVE: Personas */}
        <Section number="06" title="LIFESTYLE PERSONAS">
          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            A warrior's motto sounds different from a scholar's. Each culture gets six personas: rich prose descriptions of <em>how this character thinks and speaks</em>. Not labels, but voice.
          </p>

          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            Here are three <span className="font-bold text-fuchsia-400">Persian</span> personas and the mottos they produce:
          </p>

          <div className="my-4 space-y-4">
            <div className="border border-fuchsia-500/30 bg-fuchsia-500/5 p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-fuchsia-400">Martial Persona</div>
              <p className="text-sm italic text-[var(--muted)]">
                "You are a Persian warrior-noble who remembers Rostam's defiance and the Savaran cavalry that shook empires. Think of the farr blazing in battle, armored elephants bearing the sun-standard. Your motto should proclaim divine mandate for conquest—how your house stands as the bulwark against druj (chaos)..."
              </p>
              <div className="mt-3 text-xs text-fuchsia-400">→ Generated mottos:</div>
              <div className="mt-1 grid gap-1 text-sm text-[var(--foreground)]">
                <div>"Like Rostam in battle, like Zal in counsel"</div>
                <div>"Our sword serves justice, not tyranny"</div>
                <div>"Many foes we have seen; none remain"</div>
              </div>
            </div>

            <div className="border border-fuchsia-500/30 bg-fuchsia-500/5 p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-fuchsia-400">Intrigue Persona</div>
              <p className="text-sm italic text-[var(--muted)]">
                "You are a Persian courtier who knows that silence defeats the stupid and patience makes all things possible. Your cunning is the measured strike of the chess master, not the assassin's crude blade. Think of secrets kept like gems in mud, the subtle word that topples thrones while you smile behind wine-cups..."
              </p>
              <div className="mt-3 text-xs text-fuchsia-400">→ Generated mottos:</div>
              <div className="mt-1 grid gap-1 text-sm text-[var(--foreground)]">
                <div>"Endure the night; dawn shall come"</div>
                <div>"Judge us by our end, not our beginning"</div>
                <div>"Though a jewel fall in mud, it remains a jewel"</div>
              </div>
            </div>

            <div className="border border-fuchsia-500/30 bg-fuchsia-500/5 p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-fuchsia-400">Learning Persona</div>
              <p className="text-sm italic text-[var(--muted)]">
                "You are a keeper of the Shahnameh's wisdom, heir to Ferdowsi's deathless words and Avestan knowledge. Your library preserves what the Arab conquest could not burn. Think of the farr that comes from understanding cosmic order, poetry that plants the seed of the Word..."
              </p>
              <div className="mt-3 text-xs text-fuchsia-400">→ Generated mottos:</div>
              <div className="mt-1 grid gap-1 text-sm text-[var(--foreground)]">
                <div>"In thought and word and deed: righteous"</div>
                <div>"The sacred fire burns bright within our hearts"</div>
                <div>"Speak truth, though it be bitter"</div>
              </div>
            </div>
          </div>

          <Insight>
            Same culture, completely different voices. The martial persona invokes Rostam and divine warfare. The intrigue persona speaks of patience and chess-like cunning. The learning persona echoes Zoroastrian triads and sacred fire. The persona isn't just a label; it's a character the model inhabits.
          </Insight>
        </Section>

        {/* DEEP DIVE: The Clever Bit - Adaptive Saturation */}
        <Section number="07" title="ADAPTIVE SATURATION">
          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            Instead of generating a fixed number of mottos, we generate in batches and <span className="font-bold text-[var(--accent)]">detect when we've saturated the thematic space</span>:
          </p>
          <Diagram title="The saturation detection loop">
            {SATURATION_LOOP}
          </Diagram>
          <p className="mt-4 text-sm leading-relaxed text-[var(--foreground)]">
            <strong>Saturation conditions</strong> (any triggers stop):
          </p>
          <ul className="my-3 space-y-1 text-sm text-[var(--foreground)]">
            <li>• <strong>No new patterns</strong>: After batch 3, no new structural patterns emerge</li>
            <li>• <strong>Over-concentration</strong>: Single thematic category exceeds 30% of corpus</li>
            <li>• <strong>Entropy drop</strong>: Diversity assessment drops to "low"</li>
            <li>• <strong>Safety cap</strong>: Reached 70 mottos (hard limit)</li>
          </ul>
          <Insight>
            Saturation varies dramatically by culture. Norse martial hits 70 mottos before saturating. Some niche cultures saturate at 15. The adaptive approach handles this automatically, with no arbitrary limits.
          </Insight>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
            Results across 318 culture-lifestyle combinations: some saturate at just 2 mottos, others hit the 70-motto cap still finding fresh ground. If we'd used a fixed number (say, "generate 30 per combo"), we'd either waste capacity on rich cultures or force repetitive output from thin ones.
          </p>
        </Section>

        {/* Native-first generation */}
        <Section number="08" title="NATIVE-FIRST GENERATION">
          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            A key technique: generate in the <em>native/historical language first</em>, then translate. When the model thinks in Classical Chinese, it reaches for four-character idioms and Confucian concepts that wouldn't emerge from "write a Chinese-sounding English motto."
          </p>

          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            Here's what this produces across three very different writing systems:
          </p>

          <div className="my-4 space-y-4">
            <div className="border border-red-500/30 bg-red-500/5 p-4">
              <div className="mb-3 text-xs uppercase tracking-wider text-red-400">Chinese (文言文 Literary Chinese)</div>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <div className="font-serif text-lg text-[var(--foreground)]">不戰而屈人之兵，吾道也</div>
                  <div className="text-sm text-[var(--muted)]">"To subdue the enemy without battle—this is our Way"</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-serif text-lg text-[var(--foreground)]">靜如山，疾如風</div>
                  <div className="text-sm text-[var(--muted)]">"Still as the mountain, swift as the wind"</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-serif text-lg text-[var(--foreground)]">百世修文，一朝用武</div>
                  <div className="text-sm text-[var(--muted)]">"A hundred generations cultivate learning; one dawn demands the sword"</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-serif text-lg text-[var(--foreground)]">祖鑄青銅，孫握其柄</div>
                  <div className="text-sm text-[var(--muted)]">"The ancestors cast the bronze; the descendants grip the hilt"</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--muted)]">
                Note the parallel structure (靜/疾, 百世/一朝), the four-character rhythm that echoes classical idioms, and concepts like 道 (Way) that carry Confucian/Daoist weight.
              </p>
            </div>

            <div className="border border-teal-500/30 bg-teal-500/5 p-4">
              <div className="mb-3 text-xs uppercase tracking-wider text-teal-400">Ainu (Indigenous Japanese)</div>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <div className="font-mono text-[var(--foreground)]">Kimun-kamuy hopunire ci=kor, wen kamuy ci=rayke.</div>
                  <div className="text-sm text-[var(--muted)]">"We wear the bear-god's disguise; we slay evil spirits."</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-mono text-[var(--foreground)]">Okikurmi ru ci=oman.</div>
                  <div className="text-sm text-[var(--muted)]">"We walk Okikurmi's path."</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-mono text-[var(--foreground)]">Kotan-kor-kamuy nukar-an kor, ci-sanke wa ek</div>
                  <div className="text-sm text-[var(--muted)]">"When the owl watches, we emerge and come forth"</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-mono text-[var(--foreground)]">Nupuri ta, surku an.</div>
                  <div className="text-sm text-[var(--muted)]">"In the mountains, poison waits."</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--muted)]">
                Ainu cosmology pervades: kimun-kamuy (bear-god), kotan-kor-kamuy (owl, village guardian spirit), Okikurmi (culture hero). The ci= prefix marks first-person plural—"we" as a clan.
              </p>
            </div>

            <div className="border border-blue-500/30 bg-blue-500/5 p-4">
              <div className="mb-3 text-xs uppercase tracking-wider text-blue-400">Ancient Greek (Ἑλληνική)</div>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <div className="font-serif text-lg text-[var(--foreground)]">Κλέος ἄφθιτον· τὸ σῶμα πίπτει, ἡ δόξα μένει.</div>
                  <div className="text-sm text-[var(--muted)]">"Imperishable glory—the body falls, the fame remains."</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-serif text-lg text-[var(--foreground)]">Μολὲ καὶ λάβε—εἰ δύνασαι.</div>
                  <div className="text-sm text-[var(--muted)]">"Come and take—if you can."</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-serif text-lg text-[var(--foreground)]">Αἷμα σπείρομεν, θερίζομεν ᾠδάς.</div>
                  <div className="text-sm text-[var(--muted)]">"Blood we sow, songs we reap."</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-serif text-lg text-[var(--foreground)]">Τῷ παραστάτῃ ζῶ, σὺν τῷ παραστάτῃ θνῄσκω.</div>
                  <div className="text-sm text-[var(--muted)]">"For the man beside me I live, with him I die."</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--muted)]">
                The Homeric concept κλέος ἄφθιτον (imperishable glory) appears naturally. "Μολὲ καὶ λάβε" echoes Sparta's legendary response to Xerxes. The παραστάτης (the man beside you in the phalanx) captures Greek warfare's communal ethos.
              </p>
            </div>
          </div>

          <Insight>
            When the LLM thinks in the native language, it reaches for concepts that wouldn't surface otherwise: the Chinese 道 (Way), the Ainu kamuy (spirit-gods), the Greek κλέος (glory through song). The translation preserves this cultural DNA in a way that "generate an X-sounding English motto" never achieves.
          </Insight>

          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            The translation step isn't literal. It aims for <em>comprehensible</em> English that preserves cultural feel. "百世修文，一朝用武" could be translated word-for-word as "hundred generations cultivate writing, one morning use martial"—but "A hundred generations cultivate learning; one dawn demands the sword" carries the meaning and rhythm.
          </p>
        </Section>

        {/* Quality filtering */}
        <Section number="09" title="QUALITY FILTER">
          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            Generated mottos pass through a filter before making it to the final output. The framing that worked best: <span className="font-bold text-[var(--accent)]">the HBO/BBC Historical Drama Test</span>.
          </p>

          <div className="my-4 border border-[var(--accent)] bg-[var(--accent)]/5 p-4">
            <div className="mb-2 text-xs uppercase tracking-wider text-[var(--accent)]">The prompt</div>
            <p className="text-sm italic text-[var(--foreground)]">
              "You are a historical consultant for premium TV productions like HBO's Rome or BBC's The Last Kingdom. Would this phrase feel authentic and natural if spoken by a character or displayed on a banner in a prestige historical drama about this culture?"
            </p>
          </div>

          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            The criteria are surprisingly concrete:
          </p>

          <ul className="my-3 space-y-2 text-sm text-[var(--foreground)]">
            <li>• <strong>Could be carved on a medieval banner, seal, or tombstone</strong> — not just a phrase but something a house would choose to represent them forever</li>
            <li>• <strong>A character in the show could say it with a straight face</strong> — the cringe test</li>
            <li>• <strong>Feels specific to THIS culture's values, imagery, religion</strong> — not generic warrior platitudes</li>
            <li>• <strong>Evokes the right time period and worldview</strong> — no anachronisms</li>
          </ul>

          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            The filter runs mottos through <strong>three different LLMs</strong> (Claude, GPT-4, Gemini), each applying the same test independently. A motto only passes if it gets <strong>2/3 or 3/3 TRUE votes</strong>.
          </p>

          <div className="my-4 border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="mb-3 text-xs uppercase tracking-wider text-[var(--muted)]">Example vote distribution (Japanese martial)</div>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex gap-4">
                <span className="text-green-400">[CGM]</span>
                <span className="text-[var(--foreground)]">"The blade remembers what the hand forgets"</span>
                <span className="text-[var(--muted)]">3/3 ✓</span>
              </div>
              <div className="flex gap-4">
                <span className="text-green-400">[CG-]</span>
                <span className="text-[var(--foreground)]">"Fall seven times, rise eight"</span>
                <span className="text-[var(--muted)]">2/3 ✓</span>
              </div>
              <div className="flex gap-4">
                <span className="text-red-400">[C--]</span>
                <span className="text-[var(--muted)]">"Honor above all else"</span>
                <span className="text-[var(--muted)]">1/3 ✗</span>
              </div>
              <div className="flex gap-4">
                <span className="text-red-400">[---]</span>
                <span className="text-[var(--muted)]">"Victory or death"</span>
                <span className="text-[var(--muted)]">0/3 ✗</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-[var(--muted)]">
              [C] = Claude, [G] = GPT-4, [M] = Gemini. The multi-judge approach catches mottos that pass one model's bar but not another's.
            </p>
          </div>

          <Insight>
            Using multiple judges matters. Some models are more permissive than others. A motto that slips past one judge often fails another. The consensus requirement filters out the marginal cases that any single model might let through.
          </Insight>

          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Final retention rate: remarkably consistent <strong>~70%</strong> across all cultures. The filter is aggressive enough to cut the generic ("Honor above all else") while preserving the distinctive ("The blade remembers what the hand forgets").
          </p>
        </Section>

        {/* Results: Cross-cultural gallery */}
        <Section number="10" title="CROSS-CULTURAL GALLERY">
          <p className="mb-4 text-sm leading-relaxed text-[var(--foreground)]">
            Final output samples with explanations of why each works:
          </p>

          <div className="space-y-6">
            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-3 text-xs uppercase tracking-wider text-[var(--accent)]">Korean</div>
              <div className="space-y-3">
                <div>
                  <div className="text-[var(--foreground)]">"The crane does not fight, yet all birds clear its path"</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">
                    The crane is one of the "Four Gentlemen" symbols in Korean/Chinese culture, representing nobility and longevity. The motto reflects Confucian ideals: moral authority achieved through virtue, not violence. A house that embodies this gains respect without needing to demand it.
                  </div>
                </div>
                <div>
                  <div className="text-[var(--foreground)]">"A name earned through virtue passes to descendants unworn"</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">
                    Reflects the Confucian emphasis on reputation (myeong) as inheritable treasure. Korean noble families traced their prestige through genealogical records (jokbo). Unlike material wealth that diminishes when divided, virtuous reputation grows across generations.
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-3 text-xs uppercase tracking-wider text-[var(--accent)]">Akan (West African)</div>
              <div className="space-y-3">
                <div>
                  <div className="text-[var(--foreground)]">"Before the Golden Stool, who will sleep?"</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">
                    The Sika Dwa Kofi (Golden Stool) contains the soul of the entire Asante nation, living, dead, and yet to be born. It's more sacred than any king. When Okomfo Anokye conjured it from the sky, all leaders swore to defend it with their blood. This motto invokes that oath.
                  </div>
                </div>
                <div>
                  <div className="text-[var(--foreground)]">"Shame we flee; death, we go to meet it"</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">
                    Directly echoes the Akan proverb "Feree ne animguasee dee fanyinam owuo" (It is better to die than be disgraced). Honor (animuonyam) vs. shame (animguase) is the central axis of Akan ethics. A dishonored person is socially dead; physical death is preferable.
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-3 text-xs uppercase tracking-wider text-[var(--accent)]">Baltic</div>
              <div className="space-y-3">
                <div>
                  <div className="text-[var(--foreground)]">"Perkūnas hears the one who lies"</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">
                    Perkūnas is the Baltic thunder god, invoked when making solemn oaths. Breaking an oath meant divine punishment. Lithuania remained pagan until 1387, the last such state in Europe. This motto carries that pre-Christian worldview where gods actively police human conduct.
                  </div>
                </div>
                <div>
                  <div className="text-[var(--foreground)]">"A guest beneath the roof, a god beneath the roof"</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">
                    Sacred hospitality in Baltic culture meant guests were under divine protection. The host's honor depended on the guest's safety. This parallels similar concepts across Indo-European cultures but takes on special weight in the isolated Baltic highlands.
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-3 text-xs uppercase tracking-wider text-[var(--accent)]">Albanian</div>
              <div className="space-y-3">
                <div>
                  <div className="text-[var(--foreground)]">"What the fathers left, we do not sell"</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">
                    Reflects the Kanun (customary law code) which treats ancestral land and the family tower (kulla) as inalienable. Honor (nderi) passes through generations; selling inheritance would bring shame on all descendants. Albanian highland culture survived intact into the 20th century precisely because of this fierce attachment.
                  </div>
                </div>
                <div>
                  <div className="text-[var(--foreground)]">"We know the fields by name, the stones by blood"</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">
                    Blood feuds (gjakmarrja) were sacred obligations under the Kanun, and they shaped the landscape. The saying captures how Albanian families read their territory through generations of conflict and cultivation, each feature carrying memory.
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-3 text-xs uppercase tracking-wider text-[var(--accent)]">Indian</div>
              <div className="space-y-3">
                <div>
                  <div className="text-[var(--foreground)]">"The treasury full, dharma stands firm"</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">
                    Echoes the Sanskrit principle that righteous rule (dharma) requires material foundation. The prasasti (royal eulogy) tradition praised kings for both martial conquest and economic prosperity. A house that cannot feed its people cannot uphold dharma.
                  </div>
                </div>
                <div>
                  <div className="text-[var(--foreground)]">"Inscribed on copper-plate as long as moon and sun endure"</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">
                    This directly references the perpetuity formula used in actual medieval Indian copper-plate grants: "a-candr-arka-sama-kala" (as long as moon and sun endure). These grants recorded land donations and royal decrees, meant to last forever.
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-3 text-xs uppercase tracking-wider text-[var(--accent)]">Gothic</div>
              <div className="space-y-3">
                <div>
                  <div className="text-[var(--foreground)]">"Wanderings ended, the house stands"</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">
                    Captures the core Gothic paradox: a migration people who finally settled. The Goths moved from Scandinavia to Poland to the Black Sea to Italy to Spain, preserving memory of their journey for sixteen generations. This motto speaks to that tension between perpetual wandering and the desire to establish something lasting.
                  </div>
                </div>
                <div>
                  <div className="text-[var(--foreground)]">"Hold fast what the fathers won"</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">
                    Gothic nobility was earned through both blood and battle. Unlike settled peoples who inherited status passively, Gothic legitimacy required continuous demonstration of martial excellence. The Visigothic royal house was literally named "Balthi" (The Bold). This motto carries that ethos.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Numbers */}
        <Section number="11" title="BY THE NUMBERS">
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="border border-[var(--border)] bg-[var(--card)] p-3 text-center">
              <div className="text-2xl font-bold text-[var(--accent)]">53</div>
              <div className="text-xs text-[var(--muted)]">cultures</div>
            </div>
            <div className="border border-[var(--border)] bg-[var(--card)] p-3 text-center">
              <div className="text-2xl font-bold text-[var(--accent)]">318</div>
              <div className="text-xs text-[var(--muted)]">culture × lifestyle combos</div>
            </div>
            <div className="border border-[var(--border)] bg-[var(--card)] p-3 text-center">
              <div className="text-2xl font-bold text-[var(--accent)]">~14k</div>
              <div className="text-xs text-[var(--muted)]">raw mottos generated</div>
            </div>
            <div className="border border-[var(--border)] bg-[var(--card)] p-3 text-center">
              <div className="text-2xl font-bold text-[var(--accent)]">~10k</div>
              <div className="text-xs text-[var(--muted)]">after quality filter</div>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <div>
              <span className="text-[var(--accent)]">European:</span>{' '}
              <span className="text-[var(--muted)]">Norse, Byzantine, Celtic (Goidelic, Brythonic), French, German, West Germanic, Gothic, Iberian, Italian, Slavic, Baltic, Balto-Finnic, Magyar, Vlach, Albanian, Basque, Caucasian</span>
            </div>
            <div>
              <span className="text-[var(--accent)]">Middle Eastern & Central Asian:</span>{' '}
              <span className="text-[var(--muted)]">Arabic, Persian, Israelite, Syriac, Steppe (Mongolic/Turkic), Sogdian, Tocharian, Alan-Scythian, Hunnic, Tungusic</span>
            </div>
            <div>
              <span className="text-[var(--accent)]">African:</span>{' '}
              <span className="text-[var(--muted)]">Berber, Egyptian, Ethiopian, East African, West African, Central African, Sahelian, Senegambian, Somalian, Akan, Yoruba, Bantu</span>
            </div>
            <div>
              <span className="text-[var(--accent)]">South & Southeast Asian:</span>{' '}
              <span className="text-[var(--muted)]">Indian, Dravidian, Tibetan, Burman, Mon-Khmer, Tai, Viet, Austronesian</span>
            </div>
            <div>
              <span className="text-[var(--accent)]">East Asian & Siberian:</span>{' '}
              <span className="text-[var(--muted)]">Chinese, Korean, Japanese, Ainu, Buyeo, Hmong-Mien, Qiangic, Nivkh, Samoyed, Ugric, Ugro-Permian, Volga Finnic</span>
            </div>
            <div>
              <span className="text-[var(--accent)]">Ancient/Classical:</span>{' '}
              <span className="text-[var(--muted)]">Ancient Greek</span>
            </div>
          </div>
        </Section>

        {/* What's next */}
        <Section number="12" title="WHAT'S NEXT">
          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            The mod will be on the <strong>Steam Workshop</strong> soon. I'm still cleaning up a few edge cases and adding the remaining cultures.
          </p>
          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            Beyond mottos, I'm exploring how these techniques might apply to other procedurally-generated text in CK3 and other Paradox games: character nicknames, event flavor text, dynasty legacies, realm names. The same principle holds: deep cultural research + persona-driven generation + quality filtering produces output that feels authentic rather than generic.
          </p>
          <p className="mb-3 text-sm leading-relaxed text-[var(--foreground)]">
            <strong className="text-[var(--accent)]">If you're an expert (or just knowledgeable) in any of these cultures</strong> and spot something wrong, please reach out. The pipeline is only as good as the research feeding it, and I'd rather fix inaccuracies than ship them. Especially for the less-documented cultures (Ainu, Akan, Sogdian, etc.), any corrections or additional context would be valuable.
          </p>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            You can find me on Twitter/X at <a href="https://twitter.com/liggi" className="text-[var(--accent)] hover:underline">@liggi</a> or email me at <a href="mailto:jasonliggi@gmail.com" className="text-[var(--accent)] hover:underline">jasonliggi@gmail.com</a>.
          </p>
        </Section>

      </article>

      <footer className="mt-12 border-t-2 border-[var(--border)] bg-[var(--card)] p-3">
        <div className="flex items-center justify-between text-xs text-[var(--muted)]">
          <span>END OF FILE</span>
          <span>█▓▒░ liggi.dev</span>
        </div>
      </footer>
    </main>
  )
}
