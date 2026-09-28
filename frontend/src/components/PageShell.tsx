import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export default function PageShell({ title, lead, children }: { title: string; lead?: string; children: ReactNode }) {
  return (
    <>
      <section className="page-banner">
        <div className="wrap">
          <p className="crumbs"><Link to="/">Home</Link> / {title}</p>
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
        </div>
      </section>
      <section className="page-body"><div className="wrap">{children}</div></section>
    </>
  )
}
