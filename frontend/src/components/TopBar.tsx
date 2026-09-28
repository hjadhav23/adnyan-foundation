import { Link } from 'react-router-dom'
import { SITE } from '../config'

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-in">
        <div className="topbar-left">
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a>
        </div>
        <ul className="topbar-right">
          <li><Link to="/donate">Sponsor a Child</Link></li>
          <li><a href={`https://${SITE.web}`} target="_blank" rel="noreferrer">{SITE.web}</a></li>
          <li><span className="badge" title="Donations eligible under Section 80G">80G</span></li>
          <li><span className="badge" title="Registered under Section 12AB">12AB</span></li>
        </ul>
      </div>
    </div>
  )
}
