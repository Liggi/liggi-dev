import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Ramp } from '@/components/SiteHeader'
import { Section, P, Group, Groups, Insight, Diagram } from '@/components/post'

const title = 'A story engine for Crusader Kings 3'
const description = 'LLMs, a save file, and a world of characters that remember what you did.'

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: 'Jason Liggi', url: 'https://www.liggi.dev' }],
  alternates: { canonical: '/posts/2026-09-26' },
  openGraph: {
    title,
    description,
    type: 'article',
    publishedTime: '2026-09-26',
    authors: ['Jason Liggi'],
    locale: 'en_GB',
    siteName: 'liggi.dev',
    url: '/posts/2026-09-26',
  },
  twitter: { card: 'summary_large_image', creator: '@liggi', title, description },
}

const TOC = [
  ['00', 'The idea'], ['01', 'How vanilla does it'], ['02', 'An LLM needs a seed'], ['03', 'The story engine'],
  ['04', 'Choices come back'], ['05', 'The game keeps its own history'], ['06', 'Not everything is about you'],
  ['07', 'Small moments'], ['08', 'An agent builds it'], ['09', "What's next"],
]

const ENGINE = `
  CK3 (the game's own simulation)
     |  save file + the engine's own chronicle
     v
  story engine
     - silences vanilla's random events
     - works out who matters to your character, and why
     - picks which situation deserves a scene
     - hands the model a brief of checked facts
     v
  LLM writes the scene
     v
  engine checks it: invented facts are thrown out
     v
  you choose -> real effects in the game -> remembered
`

function Arrows({ items }: { items: React.ReactNode[] }) {
  return (
    <div className="my-2">
      {items.map((item, i) => (
        <div key={i} className="mb-2 flex gap-3 text-[17px] leading-[1.55] text-[var(--foreground)]">
          <span className="mono pt-[3px] text-[var(--accent)]">→</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}

function Quote({ children }: { children: React.ReactNode }) {
  return <blockquote className="my-6 border-l border-[var(--border)] pl-6 text-[19px] italic leading-[1.6] text-[var(--foreground)]">{children}</blockquote>
}

export default function Post() {
  return (
    <main className="mx-auto max-w-[1120px] overflow-x-hidden px-5 md:px-10">
      <header className="pb-12 pt-14 md:grid md:grid-cols-[200px_1fr] md:gap-16 md:pb-16 md:pt-24">
        <div className="mono mb-5 flex gap-4 text-[var(--muted)] md:mb-0 md:flex-col md:gap-1 md:pt-3">
          <Link href="/" className="text-[var(--accent)] hover:text-[var(--foreground)]">← 002</Link>
          <span>26 sep 2026</span>
          <span className="hidden md:inline">crusader kings 3 · llms</span>
        </div>
        <div className="max-w-[760px]">
          <h1 className="text-[40px] leading-[1.05] tracking-[-0.015em] text-[var(--foreground)] md:text-[64px]">
            A story engine for Crusader Kings 3
          </h1>
          <p className="mt-5 text-[21px] italic leading-[1.4] text-[var(--muted)] md:text-[24px]">
            LLMs, a save file, and a world of characters that remember what you did
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
          <summary className="cursor-pointer list-none">contents <span className="text-[var(--accent)]">+</span> {TOC.length} sections</summary>
          <ol className="mt-3 space-y-1.5">
            {TOC.map(([n, t]) => (
              <li key={n}><a href={`#s${n}`} className="flex gap-3"><span className="text-[#5a5248]">{n}</span>{t.toLowerCase()}</a></li>
            ))}
          </ol>
        </details>

      <article className="max-w-[680px]">

        <Section number="00" title="The idea">
          <P>
            I’ve wanted a particular Crusader Kings mod for a long time. It would remove all of the game’s events, feasts and hunts included, and replace them with something that keeps track of the relationships between characters and builds a coherent story from them as the game goes. The story would be driven by the game’s engine, and it would feed back into it.
          </P>
          <P>
            This is something fun I’m playing with at the moment. I haven’t properly playtested it yet, but there are sparks, and this is how I imagine it working.
          </P>
        </Section>

        <Section number="01" title="How vanilla does it">
          <P>
            CK3’s writing is coherent. What I don’t like is the goofiness and the lack of relevance. Events are pre-written and drawn at random from pools, so everyone gets the same ones. The first live-written scene shows the difference:
          </P>
          <Groups>
            <Group label="vanilla · “second-in-command”">
              <P className="text-[17px]">You pick who takes over your camp if you fall, choosing between followers by their skill scores.</P>
            </Group>
            <Group label="live-written · “the knight’s petition”">
              <P className="text-[17px]">
                Eadmær finds me at the edge of the camp and walks me a little further before he speaks. “She is a good woman. We came to you the same morning, she and I. But I am the elder, and I am your sworn sword. Should the worst befall you, with Halfdan at war across the border, a camp needs a sword at its head.”
              </P>
            </Group>
          </Groups>
          <P>
            Eadmær, Beorhtgyth, the camp and Halfdan’s war are all real, taken from the game at the moment the scene fired. So are the options, and whichever you pick changes how they feel about you in the game.
          </P>
          <figure className="my-8 md:-mx-10">
            <Image src="/posts/2026-09-26/knights-petition.jpg" width={1388} height={748} alt="The Knight’s Petition event in Crusader Kings 3: Eadmær asks to be named to lead the camp, with Beorhtgyth in the background and three choices" className="h-auto w-full outline outline-1 outline-[var(--border)]" sizes="(min-width: 768px) 760px, 100vw" />
            <figcaption className="mono mt-3 text-[var(--muted)]">↳ the full scene in game, 29 may 867</figcaption>
          </figure>
        </Section>

        <Section number="02" title="An LLM needs a seed">
          <P>
            Having an LLM write the events doesn’t work on its own. An LLM only tells a limited number of stories, and it needs some sort of seed to make it vary enough. CK3’s game state is a particularly good seed.
          </P>
          <Groups>
            <Group label="thin input">
              <Arrows items={['“The rider comes from…”', '“The rider comes from…”']} />
              <P muted className="text-[17px]">Two of the first scenes opened the same way, and both were about whose handwriting was on a letter.</P>
            </Group>
            <Group label="from a real save">
              <Arrows items={[
                'Maccus once paid Eadric as a sellsword.',
                'Years later Eadric holds Maccus’s old county, and Maccus is a landless adventurer camped next door, pressing his claim to it.',
                'They’re friends, and Maccus’s daughter is betrothed to Eadric’s son.',
              ]} />
            </Group>
          </Groups>
          <P>Nobody wrote the Maccus story. It was sitting in the save.</P>
        </Section>

        <Section number="03" title="The story engine">
          <P>The model only writes. Everything around it is the story engine.</P>
          <Diagram title="How a scene gets made">{ENGINE}</Diagram>
          <P>
            Before a scene appears, and again when you click, the engine checks the facts still hold. If the world has moved on, the scene is dropped rather than showing you something that no longer matches the game.
          </P>
          <Insight>The LLM writes the scene. The engine decides what’s true, what matters, and what comes back later.</Insight>
        </Section>

        <Section number="04" title="Choices come back">
          <P>
            When Eadric turned Maccus away, Maccus still held it against him seven months later, and the game remembered why. That’s the part that doesn’t run out: a save only holds so many stories, but your own choices keep making new ones.
          </P>
        </Section>

        <Section number="05" title="The game keeps its own history">
          <P>
            A save forgets how things happened. Mine knew Eadric had taken Maccus’s county “in a holy war”, but not how, and I couldn’t remember either. So the engine now writes its own chronicle as the game runs:
          </P>
          <Quote>Ælla was executed by way of Blood Eagle, aged 45. His son Ælfgar inherited Northumbria.</Quote>
        </Section>

        <Section number="06" title="Not everything is about you">
          <P>
            The engine should be a storyteller rather than a director. It should ask questions like “who is your character?”, and not every situation should revolve around you. In one test scene another character, Thoræd, made his own decision through the game’s AI, and the player could only advise him or stand aside.
          </P>
        </Section>

        <Section number="07" title="Small moments">
          <P>Between the big scenes there are small ones, written from the people actually around you:</P>
          <Quote>Wulfwaru shares her bread round the fire while Cuthberht guards his own portion; you watch, and she laughs anyway.</Quote>
          <P>Cuthberht is greedy and Wulfwaru is sociable, in the game as well as the sentence.</P>
        </Section>

        <Section number="08" title="An agent builds it">
          <P>
            The surprise has been how well Opus 5.5 works as an agent on this. It edits the mod, launches the game, tests it, reflects, and goes again, and it’s making real progress on its own. A lot of that progress is learning the game. It found that inviting someone to visit your court quietly stripped him of his offices at his own court, which you only catch by running the game and looking.
          </P>
        </Section>

        <Section number="09" title="What’s next">
          <P>
            The next idea is a narrator: one agent that runs for the whole campaign and keeps a journal of what’s open, what’s been set up, and who your character is becoming. Then it’s playtesting, which is the only way to find out whether the sparks turn into stories.
          </P>
          <P>I’d love to do the same for Stellaris, but its engine doesn’t support it.</P>
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
