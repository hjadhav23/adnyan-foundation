import { useParams } from 'react-router-dom'
import PageShell from '../components/PageShell'
import NotFound from './NotFound'
import { Link } from 'react-router-dom'

const RESOURCES: Record<string, { title: string; lead: string; items: { title: string; note: string }[] }> = {
  books: { title: 'Books', lead: 'Books and publications by Adnyan.', items: [] },
  reports: { title: 'Reports and Studies', lead: 'Research, surveys and field studies.', items: [] },
  manuals: { title: 'Manuals and Guidebooks', lead: 'Practical guides for volunteers and partners.', items: [] },
  charters: { title: 'Charters and White Papers', lead: 'Policy papers and charters.', items: [] },
  documentaries: { title: 'Documentaries', lead: 'Films and videos about our work.', items: [] },
  'annual-reports': {
    title: 'Annual Reports',
    lead: 'Our yearly reports and catalogues.',
    items: [
      { title: 'Presentation Booklet 2026: The 15th Year', note: 'Available on request. Write to us for a copy.' },
      { title: 'Adnyan Research & Educational Trust Catalogue (13th edition)', note: 'Launched by Hon. Minister Shri Ramdas Athawale. Available on request.' },
    ],
  },
}

export default function Resources() {
  const { slug = '' } = useParams()
  const r = RESOURCES[slug]
  if (!r) return <NotFound />
  return (
    <PageShell title={r.title} lead={r.lead}>
      {r.items.length ? (
        <ul className="doc-list">
          {r.items.map((d) => <li key={d.title}><h3>{d.title}</h3><p>{d.note}</p></li>)}
        </ul>
      ) : (
        <div className="empty"><p>Nothing has been published in this section yet. New material will appear here soon.</p><Link to="/contact-us" className="btn btn-primary">Request a copy</Link></div>
      )}
    </PageShell>
  )
}
