import { useSearchParams } from 'react-router-dom'
import PageShell from '../components/PageShell'
import SmartLink from '../components/SmartLink'
import { useContent } from '../hooks'
import { NAV } from '../config'
import defaults from '../data/defaults.json'
import type { Announcement } from '../types'

export default function Search() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').toLowerCase().trim()
  const news = useContent<Announcement>('announcements', defaults.announcements)
  const pages = NAV.flatMap((n) => (n.children ?? [{ label: n.label, to: n.to! }]))
  const hits = [
    ...pages.map((p) => ({ label: p.label, to: p.to })),
    ...news.map((a) => ({ label: a.title, to: a.link })),
  ].filter((h) => q && h.label.toLowerCase().includes(q))

  return (
    <PageShell title="Search" lead={q ? `Results for "${params.get('q')}"` : 'Type something in the search box.'}>
      {q && hits.length === 0 && <p>No results found.</p>}
      <ul className="doc-list">
        {hits.map((h) => <li key={h.label}><h3><SmartLink to={h.to}>{h.label}</SmartLink></h3></li>)}
      </ul>
    </PageShell>
  )
}
