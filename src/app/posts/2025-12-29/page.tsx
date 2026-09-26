import Link from 'next/link'
import type { Metadata } from 'next'
import { Ramp } from '@/components/SiteHeader'
import {
  Section, P, Label, Note, Group, Groups, Motto, Mottos, NativeMotto, Insight, Diagram, Bullets, Steps, Stat,
} from '@/components/post'

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

const TOC = [
  ['00', 'Context'], ['01', 'How vanilla works'], ['02', 'What the pipeline produces'], ['03', 'The diversity problem'],
  ['04', 'The pipeline'], ['05', 'Cultural research'], ['06', 'Lifestyle personas'], ['07', 'Adaptive saturation'],
  ['08', 'Native-first generation'], ['09', 'Quality filter'], ['10', 'Cross-cultural gallery'], ['11', 'By the numbers'],
  ['12', "What's next"],
]

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

const VANILLA = [
  { culture: 'Norse', mottos: ['By Honor and Sword', 'Victory Through the Axe', 'Strength Over Weakness', 'Dare to be Bold'] },
  { culture: 'Byzantine', mottos: ['Wisdom is Strength', 'Cunning as the Fox', 'By Truth and Honor', 'Peace Over War'] },
  { culture: 'Arabic', mottos: ['By Honor and Truth', 'Wisdom Through God', 'Strength Over Adversity', 'Victory is Ours'] },
  { culture: 'Mongol', mottos: ['Victory Through the Bow', 'Bold with Sword in Hand', 'Triumph Over All', 'By Conquest and Valor'] },
]

const PIPELINE = [
  { culture: 'Norse', mottos: ['Blood dries; sagas live', 'What the steel takes, the skald keeps', 'Ravens need not wait', 'The unwounded man has no saga'] },
  { culture: 'Byzantine', mottos: ['The dead do not testify', 'Before the blade, the whisper', 'Gold speaks; iron listens', 'Every throne casts a shadow'] },
  { culture: 'Arabic', mottos: ['The ink of scholars outlasts the blood of kings', 'We trade in silk; we settle in steel', 'Hospitality to guests, ruin to foes', 'The desert teaches patience; we teach the desert'] },
  { culture: 'Mongol', mottos: ['The grass bends; we do not', 'Where our horses drink, our borders end', 'The sky is our roof, the earth our floor', 'We came from the steppe; we return with kingdoms'] },
  { culture: 'Celtic', mottos: ['We are those who never bowed', 'The battle endures; the clan endures', 'We are the fire that will not be smothered', 'While rock stands, we stand'] },
  { culture: 'Berber', mottos: ['We are the mountains; we do not fear the wind', 'He who comes as an enemy shall return as bone', 'Every mountain holds bones of those who tried to take it', 'The lion asks no one if he may eat'] },
]

const PATTERN_FREQUENCY = [
  ['steel/iron/sword', '15%'], ['wolf', '9%'], ['strength/strong', '9%'], ['blood', '8%'], ['honor', '7%'], ['death', '6%'],
]

const STEPPE_RESEARCH = [
  {
    title: 'Tengri (Eternal Blue Sky)',
    body: <>The supreme sky god governing all existence. Genghis Khan began declarations with “By the will of Eternal Blue Heaven.” Khans were “sons of Tengri,” receiving <em>kut</em> (heavenly spiritual force). Conquest wasn’t ambition; it was divine mandate.</>,
    note: 'Sacred phrases: “Tengri jarlykasyn” (Let Tengri reward you) • “Tengri-yin Kuchin” (Power of Tengri)',
  },
  {
    title: 'The Sulde (Spirit Banner)',
    body: <>A spear with the best stallion’s horsehair draped around its base. The warrior’s soul resided forever in those tufts. While living, it carried destiny; in death, it became the soul itself. The body was abandoned to nature, but the sulde lived on.</>,
    note: 'White banner for peace • Black banner raised in war • The soul lives in horsehair, not monuments',
  },
  {
    title: 'Börte Chino (The Wolf Origin)',
    body: <>The Secret History of the Mongols begins: “At the beginning there was a blue-grey wolf, born with his destiny ordained by Heaven Above. His wife was a fallow doe.” The wolf represents the sky; the deer symbolizes earth. Genghis Khan’s clan name relates to <em>böri</em> (wolf).</>,
    note: 'The wolf is ancestor, not enemy • Golden wolf heads erected before tents • “A spirit of nature and men”',
  },
  {
    title: 'Anda (Blood Brotherhood)',
    body: <>A sacred bond between two men who become brothers by choice, not birth. “Sworn friends share but a single life. They do not abandon one another: they are each a life’s safeguard for the other.” Genghis Khan and Jamukha swore anda three times.</>,
    note: 'The arrow parable: One arrow breaks easily; a bundle is unbreakable',
  },
]

const CONCEPT_TO_MOTTO = [
  ['Nomadic worldview, no walls or fortresses', 'The sky is our roof, the earth our floor'],
  ['Conquest as natural movement, divine mandate', 'Where our horses drink, our borders end'],
  ['Arrow parable: “One arrow breaks easily; many arrows are indestructible”', 'One arrow breaks; we are the bundle'],
  ['Sulde: the soul lives in horsehair, not the body', 'The sulde remembers what the body forgets'],
]

const PERSONAS = [
  {
    title: 'Martial persona',
    prompt: 'You are a Persian warrior-noble who remembers Rostam’s defiance and the Savaran cavalry that shook empires. Think of the farr blazing in battle, armored elephants bearing the sun-standard. Your motto should proclaim divine mandate for conquest—how your house stands as the bulwark against druj (chaos)...',
    mottos: ['Like Rostam in battle, like Zal in counsel', 'Our sword serves justice, not tyranny', 'Many foes we have seen; none remain'],
  },
  {
    title: 'Intrigue persona',
    prompt: 'You are a Persian courtier who knows that silence defeats the stupid and patience makes all things possible. Your cunning is the measured strike of the chess master, not the assassin’s crude blade. Think of secrets kept like gems in mud, the subtle word that topples thrones while you smile behind wine-cups...',
    mottos: ['Endure the night; dawn shall come', 'Judge us by our end, not our beginning', 'Though a jewel fall in mud, it remains a jewel'],
  },
  {
    title: 'Learning persona',
    prompt: 'You are a keeper of the Shahnameh’s wisdom, heir to Ferdowsi’s deathless words and Avestan knowledge. Your library preserves what the Arab conquest could not burn. Think of the farr that comes from understanding cosmic order, poetry that plants the seed of the Word...',
    mottos: ['In thought and word and deed: righteous', 'The sacred fire burns bright within our hearts', 'Speak truth, though it be bitter'],
  },
]

const NATIVE = [
  {
    language: 'Chinese (文言文 Literary Chinese)',
    lines: [
      ['不戰而屈人之兵，吾道也', 'To subdue the enemy without battle—this is our Way'],
      ['靜如山，疾如風', 'Still as the mountain, swift as the wind'],
      ['百世修文，一朝用武', 'A hundred generations cultivate learning; one dawn demands the sword'],
      ['祖鑄青銅，孫握其柄', 'The ancestors cast the bronze; the descendants grip the hilt'],
    ],
    note: 'Note the parallel structure (靜/疾, 百世/一朝), the four-character rhythm that echoes classical idioms, and concepts like 道 (Way) that carry Confucian/Daoist weight.',
  },
  {
    language: 'Ainu (Indigenous Japanese)',
    lines: [
      ['Kimun-kamuy hopunire ci=kor, wen kamuy ci=rayke.', 'We wear the bear-god’s disguise; we slay evil spirits.'],
      ['Okikurmi ru ci=oman.', 'We walk Okikurmi’s path.'],
      ['Kotan-kor-kamuy nukar-an kor, ci-sanke wa ek', 'When the owl watches, we emerge and come forth'],
      ['Nupuri ta, surku an.', 'In the mountains, poison waits.'],
    ],
    note: 'Ainu cosmology pervades: kimun-kamuy (bear-god), kotan-kor-kamuy (owl, village guardian spirit), Okikurmi (culture hero). The ci= prefix marks first-person plural—“we” as a clan.',
  },
  {
    language: 'Ancient Greek (Ἑλληνική)',
    lines: [
      ['Κλέος ἄφθιτον· τὸ σῶμα πίπτει, ἡ δόξα μένει.', 'Imperishable glory—the body falls, the fame remains.'],
      ['Μολὲ καὶ λάβε—εἰ δύνασαι.', 'Come and take—if you can.'],
      ['Αἷμα σπείρομεν, θερίζομεν ᾠδάς.', 'Blood we sow, songs we reap.'],
      ['Τῷ παραστάτῃ ζῶ, σὺν τῷ παραστάτῃ θνῄσκω.', 'For the man beside me I live, with him I die.'],
    ],
    note: 'The Homeric concept κλέος ἄφθιτον (imperishable glory) appears naturally. “Μολὲ καὶ λάβε” echoes Sparta’s legendary response to Xerxes. The παραστάτης (the man beside you in the phalanx) captures Greek warfare’s communal ethos.',
  },
]

const VOTES = [
  { tag: '[CGM]', motto: 'The blade remembers what the hand forgets', score: '3/3 ✓', pass: true },
  { tag: '[CG-]', motto: 'Fall seven times, rise eight', score: '2/3 ✓', pass: true },
  { tag: '[C--]', motto: 'Honor above all else', score: '1/3 ✗', pass: false },
  { tag: '[---]', motto: 'Victory or death', score: '0/3 ✗', pass: false },
]

const GALLERY = [
  {
    culture: 'Korean',
    entries: [
      ['The crane does not fight, yet all birds clear its path', 'The crane is one of the “Four Gentlemen” symbols in Korean/Chinese culture, representing nobility and longevity. The motto reflects Confucian ideals: moral authority achieved through virtue, not violence. A house that embodies this gains respect without needing to demand it.'],
      ['A name earned through virtue passes to descendants unworn', 'Reflects the Confucian emphasis on reputation (myeong) as inheritable treasure. Korean noble families traced their prestige through genealogical records (jokbo). Unlike material wealth that diminishes when divided, virtuous reputation grows across generations.'],
    ],
  },
  {
    culture: 'Akan (West African)',
    entries: [
      ['Before the Golden Stool, who will sleep?', 'The Sika Dwa Kofi (Golden Stool) contains the soul of the entire Asante nation, living, dead, and yet to be born. It’s more sacred than any king. When Okomfo Anokye conjured it from the sky, all leaders swore to defend it with their blood. This motto invokes that oath.'],
      ['Shame we flee; death, we go to meet it', 'Directly echoes the Akan proverb “Feree ne animguasee dee fanyinam owuo” (It is better to die than be disgraced). Honor (animuonyam) vs. shame (animguase) is the central axis of Akan ethics. A dishonored person is socially dead; physical death is preferable.'],
    ],
  },
  {
    culture: 'Baltic',
    entries: [
      ['Perkūnas hears the one who lies', 'Perkūnas is the Baltic thunder god, invoked when making solemn oaths. Breaking an oath meant divine punishment. Lithuania remained pagan until 1387, the last such state in Europe. This motto carries that pre-Christian worldview where gods actively police human conduct.'],
      ['A guest beneath the roof, a god beneath the roof', 'Sacred hospitality in Baltic culture meant guests were under divine protection. The host’s honor depended on the guest’s safety. This parallels similar concepts across Indo-European cultures but takes on special weight in the isolated Baltic highlands.'],
    ],
  },
  {
    culture: 'Albanian',
    entries: [
      ['What the fathers left, we do not sell', 'Reflects the Kanun (customary law code) which treats ancestral land and the family tower (kulla) as inalienable. Honor (nderi) passes through generations; selling inheritance would bring shame on all descendants. Albanian highland culture survived intact into the 20th century precisely because of this fierce attachment.'],
      ['We know the fields by name, the stones by blood', 'Blood feuds (gjakmarrja) were sacred obligations under the Kanun, and they shaped the landscape. The saying captures how Albanian families read their territory through generations of conflict and cultivation, each feature carrying memory.'],
    ],
  },
  {
    culture: 'Indian',
    entries: [
      ['The treasury full, dharma stands firm', 'Echoes the Sanskrit principle that righteous rule (dharma) requires material foundation. The prasasti (royal eulogy) tradition praised kings for both martial conquest and economic prosperity. A house that cannot feed its people cannot uphold dharma.'],
      ['Inscribed on copper-plate as long as moon and sun endure', 'This directly references the perpetuity formula used in actual medieval Indian copper-plate grants: “a-candr-arka-sama-kala” (as long as moon and sun endure). These grants recorded land donations and royal decrees, meant to last forever.'],
    ],
  },
  {
    culture: 'Gothic',
    entries: [
      ['Wanderings ended, the house stands', 'Captures the core Gothic paradox: a migration people who finally settled. The Goths moved from Scandinavia to Poland to the Black Sea to Italy to Spain, preserving memory of their journey for sixteen generations. This motto speaks to that tension between perpetual wandering and the desire to establish something lasting.'],
      ['Hold fast what the fathers won', 'Gothic nobility was earned through both blood and battle. Unlike settled peoples who inherited status passively, Gothic legitimacy required continuous demonstration of martial excellence. The Visigothic royal house was literally named “Balthi” (The Bold). This motto carries that ethos.'],
    ],
  },
]

const CULTURES = [
  ['European', 'Norse, Byzantine, Celtic (Goidelic, Brythonic), French, German, West Germanic, Gothic, Iberian, Italian, Slavic, Baltic, Balto-Finnic, Magyar, Vlach, Albanian, Basque, Caucasian'],
  ['Middle Eastern & Central Asian', 'Arabic, Persian, Israelite, Syriac, Steppe (Mongolic/Turkic), Sogdian, Tocharian, Alan-Scythian, Hunnic, Tungusic'],
  ['African', 'Berber, Egyptian, Ethiopian, East African, West African, Central African, Sahelian, Senegambian, Somalian, Akan, Yoruba, Bantu'],
  ['South & Southeast Asian', 'Indian, Dravidian, Tibetan, Burman, Mon-Khmer, Tai, Viet, Austronesian'],
  ['East Asian & Siberian', 'Chinese, Korean, Japanese, Ainu, Buyeo, Hmong-Mien, Qiangic, Nivkh, Samoyed, Ugric, Ugro-Permian, Volga Finnic'],
  ['Ancient/Classical', 'Ancient Greek'],
]

const link = 'text-[var(--accent)] underline decoration-1 underline-offset-[3px] hover:text-[var(--foreground)]'

export default function Post() {
  return (
    <main className="mx-auto max-w-[1120px] overflow-x-hidden px-5 md:px-10">
      <header className="pb-12 pt-14 md:grid md:grid-cols-[200px_1fr] md:gap-16 md:pb-16 md:pt-24">
        <div className="mono mb-5 flex gap-4 text-[var(--muted)] md:mb-0 md:flex-col md:gap-1 md:pt-3">
          <Link href="/" className="text-[var(--accent)] hover:text-[var(--foreground)]">← 001</Link>
          <span>29 dec 2025</span>
          <span className="hidden md:inline">crusader kings 3 · llms</span>
        </div>
        <div className="max-w-[760px]">
          <h1 className="text-[40px] leading-[1.05] tracking-[-0.015em] text-[var(--foreground)] md:text-[64px]">
            Teaching LLMs to Think in Old Norse
          </h1>
          <p className="mt-5 text-[21px] italic leading-[1.4] text-[var(--muted)] md:text-[24px]">
            Research, personas, and quality filtering for procedural text generation
          </p>
        </div>
      </header>

      <div className="border-t border-[var(--border)] pt-12 md:grid md:grid-cols-[200px_1fr] md:gap-16 md:pt-16">
        <nav className="mono hidden md:block">
          <div className="sticky top-8">
            <div className="mb-3 text-[var(--muted)]">contents</div>
            <ol className="space-y-1.5">
              {TOC.map(([n, t]) => (
                <li key={n}>
                  <a href={`#s${n}`} className="flex gap-3 text-[var(--muted)] hover:text-[var(--foreground)]">
                    <span className="text-[#5a5248]">{n}</span>
                    <span>{t.toLowerCase()}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <details className="mono mb-12 border-y border-[var(--border)] py-3 text-[var(--muted)] md:hidden">
          <summary className="cursor-pointer list-none">contents <span className="text-[var(--accent)]">+</span> 13 sections</summary>
          <ol className="mt-3 space-y-1.5">
            {TOC.map(([n, t]) => (
              <li key={n}><a href={`#s${n}`} className="flex gap-3"><span className="text-[#5a5248]">{n}</span>{t.toLowerCase()}</a></li>
            ))}
          </ol>
        </details>

      <article className="max-w-[680px]">

        <Section number="00" title="Context">
          <P>
            <strong>Crusader Kings 3</strong> is a medieval dynasty simulator. You play as a noble house across generations, scheming, conquering, marrying strategically, and trying not to get murdered by your own children.
          </P>
          <P>
            Every house has a <strong>motto</strong>, a short phrase that captures their identity. Think <em>“Winter is Coming”</em> or <em>“Ours is the Fury”</em>. These appear in-game on house screens and add flavor to the dynasty you’re building.
          </P>
          <P>
            The base game generates these procedurally, but the results feel generic. This project uses LLMs to generate <strong>14,000 culturally-authentic mottos</strong> across 53 cultures, so a Norse house sounds Viking, a Byzantine house sounds Roman, and an Irish house sounds Celtic.
          </P>
        </Section>

        <Section number="01" title="How vanilla works">
          <P>
            The base game uses <strong>template-based slot-filling</strong>. Sentence structures like “By $1$ and $2$” get filled from word pools:
          </P>
          <Diagram title="Vanilla CK3 motto system">
            {VANILLA_TEMPLATE}
          </Diagram>
          <P>
            This generates variety efficiently, with ~50,000 theoretical combinations from minimal content. But the mottos feel interchangeable. Here’s what different cultures get:
          </P>
          <Groups>
            {VANILLA.map(c => (
              <Group key={c.culture} label={c.culture.toLowerCase()}><Mottos items={c.mottos} /></Group>
            ))}
          </Groups>
          <P muted>
            They’re fine. But they could belong to any culture. Nothing about “By Honor and Sword” feels specifically Norse.
          </P>
        </Section>

        <Section number="02" title="What the pipeline produces">
          <P>The same cultures, with mottos generated by this pipeline:</P>
          <Groups>
            {PIPELINE.map(c => (
              <Group key={c.culture} label={c.culture.toLowerCase()}><Mottos items={c.mottos} /></Group>
            ))}
          </Groups>
          <Insight>
            The challenge isn’t generating mottos. It’s generating <em>diverse</em> mottos that feel authentically Norse, Byzantine, or Mongol, not generic fantasy that could be any culture.
          </Insight>
        </Section>

        <Section number="03" title="The diversity problem">
          <P>
            What happens if you just ask an LLM to generate Norse mottos with no context? I ran the experiment: <em>“Generate 100 Norse house mottos for a medieval strategy game.”</em>
          </P>
          <P>Here’s a sample of what came back:</P>
          <Groups>
            <Group label="naive output (actual)">
              <Mottos muted items={['Honor through blade and blood', 'The wolf remembers every slight', 'Steel sings our ancestors’ songs', 'Death before dishonor calls', 'The strong shall inherit all', 'Victory or Valhalla awaits']} />
            </Group>
            <Group label="pattern frequency">
              <div className="mono space-y-1 text-[var(--muted)]">
                {PATTERN_FREQUENCY.map(([pattern, pct]) => (
                  <div key={pattern} className="flex justify-between gap-4 border-b border-dotted border-[var(--border)] pb-1">
                    <span>{pattern}</span><span className="text-[var(--foreground)]">{pct}</span>
                  </div>
                ))}
              </div>
            </Group>
          </Groups>
          <P>
            These are <em>Norse-ish</em>, but not actually Norse. The giveaway:
          </P>
          <Group className="my-8">
            <div className="text-[22px] leading-[1.4] text-[var(--foreground)]">
              Out of 102 mottos, only <span className="text-[26px] text-[var(--accent)]">1</span> referenced actual Norse mythology (Valhalla/Odin/Thor).
            </div>
            <Note className="mt-2">The rest are generic medieval warrior tropes that could work for any culture.</Note>
          </Group>
          <P>
            Now compare to the pipeline output, which had access to deep cultural research:
          </P>
          <Groups>
            <Group label="naive (no context)">
              <Mottos muted items={['The wolf remembers every slight', 'Steel sings our ancestors’ songs', 'Iron will forged in battle']} />
              <Note className="mt-3">Generic warrior imagery. Could be any culture.</Note>
            </Group>
            <Group label="pipeline (with research)">
              <Mottos items={['The unwounded man has no saga', 'Blood dries; sagas live', 'The Norns carve; we answer']} />
              <Note className="mt-3 text-[var(--foreground)]">Saga tradition. Fate cosmology. Distinctly Norse.</Note>
            </Group>
          </Groups>
          <Insight>
            The naive model knows Norse surface aesthetics (wolves, steel, blood) but not Norse <em>philosophy</em>: that reputation outlives death, that fate is woven by the Norns, that the only immortality is the saga. The research stage provides that cultural DNA.
          </Insight>
        </Section>

        <Section number="04" title="The pipeline">
          <P>Five stages, each solving a specific problem:</P>
          <Steps steps={[
            { title: 'Deep Research', desc: 'Web search + LLM synthesis builds authentic cultural context for each of the 53 cultures. Not surface-level facts, but worldview: What did this culture value? How did they think about death, honor, legacy? What did their poetry sound like?' },
            { title: 'Persona Generation', desc: <>Six lifestyle voices per culture (martial, diplomacy, intrigue, stewardship, learning, prowess). A warrior’s motto sounds different from a scholar’s. Each persona is a rich prose description of <em>how this character thinks and speaks</em>.</> },
            { title: 'Adaptive Generation', desc: 'Generate in batches of 10, analyze thematic diversity after each batch, continue until “saturation” is detected. This avoids both under-generating (missing themes) and over-generating (endless variations of the same idea). Some cultures saturate at 15 mottos; others hit 70 before running out of fresh ground.' },
            { title: 'Quality Filter', desc: 'An LLM acts as a critical editor, rejecting generic or weak mottos. “The wolf never bows” gets cut; “The unwounded man has no saga” stays. Retention rate is remarkably consistent at ~70% across all cultures.' },
            { title: 'Format', desc: 'Text cleanup (normalize quotes, remove trailing periods, title case) and generate CK3 mod files with proper triggers so Norse mottos only appear for Norse houses, Arabic mottos for Arabic houses, etc.' },
          ]} />
          <P>
            The next sections dive deeper into the interesting parts: research, personas, and the saturation detection loop.
          </P>
        </Section>

        <Section number="05" title="Cultural research">
          <P>
            Each culture gets a research document built from web search + LLM synthesis. Not surface-level facts (“Mongols rode horses”) but the underlying worldview: What did this culture <em>value</em>? How did they think about death, honor, legacy? What did their poetry sound like?
          </P>
          <P>
            Here’s what the research captures for <strong>Steppe cultures</strong> (Mongolic, Turkic):
          </P>
          <Groups cols={1}>
            {STEPPE_RESEARCH.map(r => (
              <Group key={r.title} label={r.title.toLowerCase()}>
                <P className="mb-2">{r.body}</P>
                <Note>{r.note}</Note>
              </Group>
            ))}
          </Groups>
          <P>
            The research also captures <strong>authentic vocabulary</strong> (sulde, kut, anda, uran, tamga), <strong>anti-patterns to avoid</strong> (castle imagery, European feudal terms, agricultural metaphors), and <strong>linguistic style</strong> (terse commands, oral tradition rhythms, verb-final structures).
          </P>
          <P>
            This context shapes everything. When the model generates steppe mottos, it draws on these concepts:
          </P>
          <Groups>
            {CONCEPT_TO_MOTTO.map(([concept, motto]) => (
              <Group key={motto} label="research concept">
                <Note>{concept}</Note>
                <Label accent className="mb-1 mt-3">→ generated motto</Label>
                <Motto>{motto}</Motto>
              </Group>
            ))}
          </Groups>
          <Insight>
            The research document is ~500 lines of cultural context, proverbs, linguistic patterns, and anti-patterns. It’s the difference between “Mongols were warriors” and understanding that conquest was divine mandate from Tengri, that souls lived in horsehair banners, and that the wolf was ancestor, not enemy.
          </Insight>
        </Section>

        <Section number="06" title="Lifestyle personas">
          <P>
            A warrior’s motto sounds different from a scholar’s. Each culture gets six personas: rich prose descriptions of <em>how this character thinks and speaks</em>. Not labels, but voice.
          </P>
          <P>
            Here are three <strong>Persian</strong> personas and the mottos they produce:
          </P>
          <Groups cols={1}>
            {PERSONAS.map(p => (
              <Group key={p.title} label={p.title.toLowerCase()}>
                <p className="text-[17px] italic leading-[1.6] text-[var(--muted)]">“{p.prompt}”</p>
                <Label accent className="mb-1 mt-4">→ generated mottos</Label>
                <Mottos items={p.mottos} />
              </Group>
            ))}
          </Groups>
          <Insight>
            Same culture, completely different voices. The martial persona invokes Rostam and divine warfare. The intrigue persona speaks of patience and chess-like cunning. The learning persona echoes Zoroastrian triads and sacred fire. The persona isn’t just a label; it’s a character the model inhabits.
          </Insight>
        </Section>

        <Section number="07" title="Adaptive saturation">
          <P>
            Instead of generating a fixed number of mottos, we generate in batches and <strong>detect when we’ve saturated the thematic space</strong>:
          </P>
          <Diagram title="The saturation detection loop">
            {SATURATION_LOOP}
          </Diagram>
          <P className="mb-0">
            <strong>Saturation conditions</strong> (any triggers stop):
          </P>
          <Bullets items={[
            <><strong>No new patterns</strong>: After batch 3, no new structural patterns emerge</>,
            <><strong>Over-concentration</strong>: Single thematic category exceeds 30% of corpus</>,
            <><strong>Entropy drop</strong>: Diversity assessment drops to “low”</>,
            <><strong>Safety cap</strong>: Reached 70 mottos (hard limit)</>,
          ]} />
          <Insight>
            Saturation varies dramatically by culture. Norse martial hits 70 mottos before saturating. Some niche cultures saturate at 15. The adaptive approach handles this automatically, with no arbitrary limits.
          </Insight>
          <P muted>
            Results across 318 culture-lifestyle combinations: some saturate at just 2 mottos, others hit the 70-motto cap still finding fresh ground. If we’d used a fixed number (say, “generate 30 per combo”), we’d either waste capacity on rich cultures or force repetitive output from thin ones.
          </P>
        </Section>

        <Section number="08" title="Native-first generation">
          <P>
            A key technique: generate in the <em>native/historical language first</em>, then translate. When the model thinks in Classical Chinese, it reaches for four-character idioms and Confucian concepts that wouldn’t emerge from “write a Chinese-sounding English motto.”
          </P>
          <P>Here’s what this produces across three very different writing systems:</P>
          <Groups cols={1}>
            {NATIVE.map(n => (
              <Group key={n.language} label={n.language.toLowerCase()}>
                {n.lines.map(([native, english]) => <NativeMotto key={native} native={native} english={english} />)}
                <Note className="mt-3">{n.note}</Note>
              </Group>
            ))}
          </Groups>
          <Insight>
            When the LLM thinks in the native language, it reaches for concepts that wouldn’t surface otherwise: the Chinese 道 (Way), the Ainu kamuy (spirit-gods), the Greek κλέος (glory through song). The translation preserves this cultural DNA in a way that “generate an X-sounding English motto” never achieves.
          </Insight>
          <P muted>
            The translation step isn’t literal. It aims for <em>comprehensible</em> English that preserves cultural feel. “百世修文，一朝用武” could be translated word-for-word as “hundred generations cultivate writing, one morning use martial”—but “A hundred generations cultivate learning; one dawn demands the sword” carries the meaning and rhythm.
          </P>
        </Section>

        <Section number="09" title="Quality filter">
          <P>
            Generated mottos pass through a filter before making it to the final output. The framing that worked best: <strong>the HBO/BBC Historical Drama Test</strong>.
          </P>
          <Group label="the prompt" className="my-8">
            <p className="text-[19px] italic leading-[1.6] text-[var(--foreground)]">
              “You are a historical consultant for premium TV productions like HBO’s Rome or BBC’s The Last Kingdom. Would this phrase feel authentic and natural if spoken by a character or displayed on a banner in a prestige historical drama about this culture?”
            </p>
          </Group>
          <P>The criteria are surprisingly concrete:</P>
          <Bullets items={[
            <><strong>Could be carved on a medieval banner, seal, or tombstone</strong> — not just a phrase but something a house would choose to represent them forever</>,
            <><strong>A character in the show could say it with a straight face</strong> — the cringe test</>,
            <><strong>Feels specific to THIS culture’s values, imagery, religion</strong> — not generic warrior platitudes</>,
            <><strong>Evokes the right time period and worldview</strong> — no anachronisms</>,
          ]} />
          <P>
            The filter runs mottos through <strong>three different LLMs</strong> (Claude, GPT-4, Gemini), each applying the same test independently. A motto only passes if it gets <strong>2/3 or 3/3 TRUE votes</strong>.
          </P>
          <Group label="example vote distribution (japanese martial)" className="my-8">
            <div className="space-y-1">
              {VOTES.map(v => (
                <div key={v.tag} className="grid grid-cols-[52px_1fr_auto] items-baseline gap-3">
                  <span className={`mono ${v.pass ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}`}>{v.tag}</span>
                  <Motto muted={!v.pass}>{v.motto}</Motto>
                  <span className="mono text-[var(--muted)]">{v.score}</span>
                </div>
              ))}
            </div>
            <Note className="mt-3">
              [C] = Claude, [G] = GPT-4, [M] = Gemini. The multi-judge approach catches mottos that pass one model’s bar but not another’s.
            </Note>
          </Group>
          <Insight>
            Using multiple judges matters. Some models are more permissive than others. A motto that slips past one judge often fails another. The consensus requirement filters out the marginal cases that any single model might let through.
          </Insight>
          <P muted>
            Final retention rate: remarkably consistent <strong>~70%</strong> across all cultures. The filter is aggressive enough to cut the generic (“Honor above all else”) while preserving the distinctive (“The blade remembers what the hand forgets”).
          </P>
        </Section>

        <Section number="10" title="Cross-cultural gallery">
          <P>Final output samples with explanations of why each works:</P>
          <Groups cols={1}>
            {GALLERY.map(g => (
              <Group key={g.culture} label={g.culture.toLowerCase()}>
                <div className="space-y-4">
                  {g.entries.map(([motto, why]) => (
                    <div key={motto}>
                      <Motto>{motto}</Motto>
                      <Note className="mt-1">{why}</Note>
                    </div>
                  ))}
                </div>
              </Group>
            ))}
          </Groups>
        </Section>

        <Section number="11" title="By the numbers">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            <Stat value="53" label="cultures" />
            <Stat value="318" label="culture × lifestyle combos" />
            <Stat value="~14k" label="raw mottos generated" />
            <Stat value="~10k" label="after quality filter" />
          </div>
          <div className="mt-10 space-y-4">
            {CULTURES.map(([region, list]) => (
              <div key={region}>
                <Label className="mb-1">{region.toLowerCase()}</Label>
                <div className="text-[17px] leading-[1.55] text-[var(--muted)]">{list}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section number="12" title="What’s next">
          <P>
            The mod will be on the <strong>Steam Workshop</strong> soon. I’m still cleaning up a few edge cases and adding the remaining cultures.
          </P>
          <P>
            Beyond mottos, I’m exploring how these techniques might apply to other procedurally-generated text in CK3 and other Paradox games: character nicknames, event flavor text, dynasty legacies, realm names. The same principle holds: deep cultural research + persona-driven generation + quality filtering produces output that feels authentic rather than generic.
          </P>
          <P>
            <strong>If you’re an expert (or just knowledgeable) in any of these cultures</strong> and spot something wrong, please reach out. The pipeline is only as good as the research feeding it, and I’d rather fix inaccuracies than ship them. Especially for the less-documented cultures (Ainu, Akan, Sogdian, etc.), any corrections or additional context would be valuable.
          </P>
          <P muted>
            You can find me on Twitter/X at <a href="https://twitter.com/liggi" className={link}>@liggi</a> or email me at <a href="mailto:jasonliggi@gmail.com" className={link}>jasonliggi@gmail.com</a>.
          </P>
        </Section>

      </article>

      </div>
      <footer className="mono mb-10 mt-16 flex items-center justify-between border-t border-[var(--border)] pt-6 text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--foreground)]">← all writing</Link>
        <span className="flex items-center gap-3"><Ramp /> end of file</span>
      </footer>
    </main>
  )
}
