'use client';

import { useState, useEffect } from 'react';
import {
  Crosshair,
  Factory,
  Crown,
  Rocket,
  Globe,
  Sparkles,
  TrendingUp,
  Eye
} from 'lucide-react';
import { createRoot } from 'react-dom/client';

// Map game names to icons
const gameIcons: Record<string, React.ReactNode> = {
  'Hearts of Iron': <Crosshair size={14} />,
  'Victoria': <Factory size={14} />,
  'Crusader Kings': <Crown size={14} />,
  'Stellaris': <Rocket size={14} />,
  'Europa Universalis': <Globe size={14} />,
  'At a Glance': <Eye size={14} />,
  'Cross-Game': <TrendingUp size={14} />,
  'Outlook': <Sparkles size={14} />,
};

const headingStyles = [
  {
    id: 'uppercase-refined',
    name: 'Uppercase',
    desc: 'Labels with icons',
    css: `
      .prose h2 {
        font-size: 0.8125rem;
        font-weight: 600;
        margin-top: 3rem;
        margin-bottom: 1.25rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #374151;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .prose h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-top: 1.75rem;
        margin-bottom: 0.5rem;
      }
    `,
  },
  {
    id: 'uppercase-bordered',
    name: 'Bordered',
    desc: 'With bottom border',
    css: `
      .prose h2 {
        font-size: 0.8125rem;
        font-weight: 600;
        margin-top: 3rem;
        margin-bottom: 1.25rem;
        padding-bottom: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #374151;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .prose h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-top: 1.75rem;
        margin-bottom: 0.5rem;
      }
    `,
  },
  {
    id: 'uppercase-large',
    name: 'Larger',
    desc: 'Bigger uppercase',
    css: `
      .prose h2 {
        font-size: 0.9375rem;
        font-weight: 700;
        margin-top: 3rem;
        margin-bottom: 1.25rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #1f2937;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .prose h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-top: 1.75rem;
        margin-bottom: 0.5rem;
      }
    `,
  },
  {
    id: 'uppercase-pill',
    name: 'Pill',
    desc: 'Background pill style',
    css: `
      .prose h2 {
        font-size: 0.75rem;
        font-weight: 600;
        margin-top: 3rem;
        margin-bottom: 1.25rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #374151;
        background: #f3f4f6;
        padding: 0.5rem 0.75rem;
        border-radius: 0.375rem;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      .prose h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-top: 1.75rem;
        margin-bottom: 0.5rem;
      }
    `,
  },
];

export function HeadingStyleSwitcher() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Remove old style
    const oldStyle = document.getElementById('heading-style');
    if (oldStyle) oldStyle.remove();

    // Add new style
    const style = document.createElement('style');
    style.id = 'heading-style';
    style.textContent = headingStyles[current].css;
    document.head.appendChild(style);

    // Add icons to H2s
    const h2s = document.querySelectorAll('.prose h2');
    h2s.forEach((h2) => {
      // Skip if already has icon
      if (h2.querySelector('.heading-icon')) return;

      const text = h2.textContent || '';
      for (const [game, icon] of Object.entries(gameIcons)) {
        if (text.includes(game)) {
          const iconSpan = document.createElement('span');
          iconSpan.className = 'heading-icon';
          h2.prepend(iconSpan);
          const root = createRoot(iconSpan);
          root.render(icon);
          break;
        }
      }
    });

    return () => {
      const el = document.getElementById('heading-style');
      if (el) el.remove();
    };
  }, [current]);

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 rounded-lg border border-black/10 bg-white/95 p-3 shadow-lg backdrop-blur">
      <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Heading Style</div>
      <div className="flex flex-wrap gap-1 max-w-xs">
        {headingStyles.map((style, i) => (
          <button
            key={style.id}
            onClick={() => setCurrent(i)}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              current === i
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
            title={style.desc}
          >
            {style.name}
          </button>
        ))}
      </div>
      <div className="text-xs text-neutral-400">{headingStyles[current].desc}</div>
    </div>
  );
}
