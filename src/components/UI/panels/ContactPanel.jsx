import React from 'react';

import OverlayShell from '../OverlayShell.jsx';
import { contact, aboutMe } from '../../../data/portfolio.js';

const links = [
  {
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 7L2 7" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'in/vaidehi-gupta13',
    href: contact.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v2" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'vidhigupta413',
    href: contact.github,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-4a3 3 0 0 0-1-2.5c3-.4 6-1.5 6-7a5 5 0 0 0-1.5-3.5 5 5 0 0 0-.1-3.5s-1.2-.4-4 1.5a13 13 0 0 0-7 0C5.6 1.6 4.4 2 4.4 2a5 5 0 0 0-.1 3.5A5 5 0 0 0 3 9c0 5.5 3 6.6 6 7a3 3 0 0 0-1 2.5V22" />
      </svg>
    ),
  },
  {
    label: 'Devpost',
    value: 'vidhi_gupta413',
    href: contact.devpost,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      </svg>
    ),
  },
];

export default function ContactPanel() {
  return (
    <OverlayShell
      title="Drop a note"
      subtitle={contact.closing}
      accent="07 — Mailbox"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-cafe-neon-purple/30 bg-black/35 p-4 transition hover:border-cafe-neon-pink/60 hover:shadow-glow-purple"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-cafe-neon-purple/40 bg-cafe-neon-purple/15 text-cafe-neon-glow">
              {l.icon}
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-cafe-neon-purple">{l.label}</p>
              <p className="text-sm text-white/85">{l.value}</p>
            </div>
          </a>
        ))}
      </div>

      <p className="mt-4 text-center text-[11px] uppercase tracking-widest text-cafe-neon-purple">
        {contact.location} · {contact.phone}
      </p>

      <p className="mt-6 text-center text-xs text-white/55">
        © {new Date().getFullYear()} {aboutMe.name} · Built with React Three Fiber, Tailwind, & a lot of chai.
      </p>
    </OverlayShell>
  );
}
