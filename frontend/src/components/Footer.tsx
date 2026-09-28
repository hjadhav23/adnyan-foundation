import { Link } from 'react-router-dom'
import { SITE } from '../config'
import { Facebook, Instagram, LinkedIn, XIcon, YouTube } from './Icons'

export default function Footer() {
  const s = SITE.social
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand"><img src="/logo.jpg" alt={SITE.name} /></div>
          <p>{SITE.legal}. A non-profit working in education, health, women's empowerment and the environment.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <ul className="footer-links">
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/current-projects">Ongoing Projects</Link></li>
            <li><Link to="/our-team">Team</Link></li>
            <li><Link to="/awards">Awards</Link></li>
            <li><Link to="/resources/annual-reports">Annual Reports</Link></li>
          </ul>
        </div>
        <div>
          <h3>Donate</h3>
          <p>Your donation helps us continue our education, health and relief programmes. Contributions are eligible under 80G and 12AB.</p>
          <Link to="/donate" className="btn btn-light">Donate</Link>
        </div>
        <div>
          <h3>Contact Us</h3>
          <address>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
            Phone: <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a><br />
            {SITE.address}
          </address>
        </div>
      </div>
      <div className="footer-bar">
        <div className="footer-bar-in">
          <Link to="/get-involved" className="btn btn-outline-light">Get Involved</Link>
          <div className="social">
            <a href={s.x} aria-label="X"><XIcon /></a>
            <a href={s.facebook} aria-label="Facebook"><Facebook /></a>
            <a href={s.linkedin} aria-label="LinkedIn"><LinkedIn /></a>
            <a href={s.youtube} aria-label="YouTube"><YouTube /></a>
            <a href={s.instagram} aria-label="Instagram"><Instagram /></a>
          </div>
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
