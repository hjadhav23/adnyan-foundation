import { useEffect, useState, type FormEvent } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { NAV, SITE } from '../config'
import { useScrolled } from '../hooks'
import { asset } from '../asset'
import { SearchIcon } from './Icons'

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const scrolled = useScrolled()
  const stuck = useScrolled(30)
  const [open, setOpen] = useState(false)
  const [sub, setSub] = useState<string | null>(null)
  const [searching, setSearching] = useState(false)
  const [q, setQ] = useState('')
  const solid = pathname !== '/' || scrolled || open

  useEffect(() => {
    if (!searching) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearching(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searching])

  const closeAll = () => { setOpen(false); setSub(null) }
  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`)
    setSearching(false)
    setQ('')
  }

  return (
    <>
      <header className={`site-header ${solid ? 'solid' : ''} ${stuck ? 'stuck' : ''}`}>
        <div className="header-in">
          <Link to="/" className="brand" onClick={closeAll} aria-label={`${SITE.name} home`}>
            <img src={asset('/logo.jpg')} alt="" />
            <span><b>Adnyan</b><small>Foundation</small></span>
          </Link>

          <nav className="nav" aria-label="Main">
            <ul>
              {NAV.map((item) => (
                <li key={item.label} className={item.children ? 'has-sub' : ''}>
                  {item.children ? (
                    <>
                      <button type="button" aria-haspopup="true">{item.label}</button>
                      <ul className="sub">
                        {item.children.map((c) => (
                          <li key={c.to}><NavLink to={c.to}>{c.label}</NavLink></li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <NavLink to={item.to!} className="donate-btn">{item.label}</NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <button type="button" className="icon-btn" aria-label="Search" onClick={() => setSearching(true)}><SearchIcon /></button>
          <button type="button" className={`burger ${open ? 'open' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <ul>
          {NAV.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <>
                  <button type="button" className="drawer-parent" aria-expanded={sub === item.label} onClick={() => setSub(sub === item.label ? null : item.label)}>
                    {item.label}<span className={sub === item.label ? 'chev up' : 'chev'} />
                  </button>
                  <ul className={`drawer-sub ${sub === item.label ? 'show' : ''}`}>
                    {item.children.map((c) => (
                      <li key={c.to}><Link to={c.to} onClick={closeAll}>{c.label}</Link></li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link to={item.to!} className="drawer-parent" onClick={closeAll}>{item.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </aside>
      {open && <button type="button" className="scrim" aria-label="Close menu" onClick={closeAll} />}

      {searching && (
        <div className="search-overlay" role="dialog" aria-label="Search">
          <form onSubmit={onSearch}>
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Hit enter to search or ESC to close" aria-label="Search the site" />
          </form>
          <button type="button" className="search-close" onClick={() => setSearching(false)}>Close Search</button>
        </div>
      )}
    </>
  )
}
