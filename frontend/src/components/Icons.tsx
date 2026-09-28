const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true } as const

export const SearchIcon = () => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
)
export const Facebook = () => (<svg {...base}><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.8v3h2.7V21h3z" /></svg>)
export const XIcon = () => (<svg {...base}><path d="M17.5 4h2.9l-6.3 7.2L21.5 20h-5.8l-4.5-5.9L6 20H3.1l6.7-7.7L2.7 4h5.9l4.1 5.4L17.5 4z" /></svg>)
export const LinkedIn = () => (<svg {...base}><path d="M6.9 9H4v11h2.9V9zM5.4 4a1.7 1.7 0 100 3.4 1.7 1.7 0 000-3.4zM20 20h-2.9v-5.4c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V20h-2.9V9h2.8v1.5c.4-.8 1.4-1.6 2.9-1.6 3 0 3.6 2 3.6 4.6V20z" /></svg>)
export const YouTube = () => (<svg {...base}><path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z" /></svg>)
export const Instagram = () => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>
)
