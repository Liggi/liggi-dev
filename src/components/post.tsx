// Building blocks for long-form posts: serif prose, mono labels, hairline groups, italic mottos.

type Children = { children: React.ReactNode }

export function Section({ number, title, children }: Children & { number: string; title: string }) {
  return (
    <section id={`s${number}`} className="mb-16 scroll-mt-8">
      <div className="mono mb-2 text-[var(--accent)]">{number}</div>
      <h2 className="mb-6 text-[30px] leading-[1.15] tracking-[-0.005em] text-[var(--foreground)] md:text-[34px]">{title}</h2>
      {children}
    </section>
  )
}

export function P({ muted, className = '', children }: Children & { muted?: boolean; className?: string }) {
  return (
    <p className={`mb-[1.15em] text-[19px] leading-[1.68] ${muted ? 'text-[var(--muted)]' : 'text-[var(--foreground)]'} ${className}`}>
      {children}
    </p>
  )
}

export function Label({ accent, className = '', children }: Children & { accent?: boolean; className?: string }) {
  return <div className={`mono mb-2.5 ${accent ? 'text-[var(--accent)]' : 'text-[var(--muted)]'} ${className}`}>{children}</div>
}

// Small explanatory text under a motto or group
export function Note({ className = '', children }: Children & { className?: string }) {
  return <div className={`text-[15.5px] leading-[1.55] text-[var(--muted)] ${className}`}>{children}</div>
}

// An open group: hairline rule above, a mono label, then content
export function Group({ label, className = '', children }: Children & { label?: React.ReactNode; className?: string }) {
  return (
    <div className={`border-t border-[var(--border)] pb-1 pt-4 ${className}`}>
      {label && <Label>{label}</Label>}
      {children}
    </div>
  )
}

export function Groups({ cols = 2, children }: Children & { cols?: 1 | 2 }) {
  return <div className={`my-8 grid gap-x-10 gap-y-6 ${cols === 2 ? 'md:grid-cols-2' : ''}`}>{children}</div>
}

export function Motto({ muted, children }: Children & { muted?: boolean }) {
  return <div className={`motto py-[0.2rem] ${muted ? 'text-[var(--muted)]' : ''}`}>“{children}”</div>
}

export function Mottos({ items, muted }: { items: string[]; muted?: boolean }) {
  return (
    <div>
      {items.map(m => <Motto key={m} muted={muted}>{m}</Motto>)}
    </div>
  )
}

// A motto in its original script, with the English below it
export function NativeMotto({ native, english }: { native: string; english: string }) {
  return (
    <div className="py-1.5">
      <div className="native text-[22px] leading-[1.4] text-[var(--foreground)]">{native}</div>
      <div className="motto mt-1 text-[var(--muted)]">“{english}”</div>
    </div>
  )
}

export function Insight({ children }: Children) {
  return (
    <aside className="my-10 border-l-2 border-[var(--accent)] pl-6">
      <Label accent>the point</Label>
      <div className="text-[22px] leading-[1.45] text-[var(--foreground)]">{children}</div>
    </aside>
  )
}

export function Diagram({ title, children }: Children & { title?: string }) {
  return (
    <figure className="my-8 md:-mx-10">
      <div className="overflow-x-auto bg-[#0f0d0a] outline outline-1 outline-[var(--border)]">
        <pre className="mono p-4 leading-[1.6] text-[#c9bfae] md:p-6">{children}</pre>
      </div>
      {title && <figcaption className="mono mt-3 text-[var(--muted)]">↳ {title.toLowerCase()}</figcaption>}
    </figure>
  )
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="my-4 text-[19px] leading-[1.6] text-[var(--foreground)]">
      {items.map((item, i) => (
        <li key={i} className="mb-2 flex gap-3">
          <span className="text-[var(--accent)]">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function Steps({ steps }: { steps: { title: string; desc: React.ReactNode }[] }) {
  return (
    <ol className="my-8">
      {steps.map((s, i) => (
        <li key={s.title} className="grid grid-cols-[28px_1fr] gap-x-3 border-t border-[var(--border)] py-4">
          <span className="mono pt-[7px] text-[var(--accent)]">{i + 1}</span>
          <div>
            <div className="text-[19px] font-semibold text-[var(--foreground)]">{s.title}</div>
            <P muted className="mb-0 mt-1">{s.desc}</P>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-[var(--border)] pt-4">
      <div className="mb-1.5 text-[44px] leading-none text-[var(--foreground)]">{value}</div>
      <div className="mono text-[var(--muted)]">{label}</div>
    </div>
  )
}
