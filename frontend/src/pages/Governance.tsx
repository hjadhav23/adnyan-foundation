import PageShell from '../components/PageShell'
import { Link } from 'react-router-dom'

export default function Governance() {
  return (
    <PageShell title="Governance" lead="Accountable, transparent and compliant.">
      <div className="prose">
        <p>Adnyan Research &amp; Educational Trust is a registered public charitable trust, managed by its trustees who set the direction of the organization and oversee its programmes and finances.</p>
      </div>
      <div className="two-col">
        <article className="panel"><h2>Registrations</h2>
          <ul className="plain">
            <li>Registered under Section 12AB of the Income Tax Act</li>
            <li>Donations eligible under Section 80G</li>
            <li>Approved for CSR activities (Form CSR-1, Registrar of Companies)</li>
          </ul>
        </article>
        <article className="panel"><h2>Our Commitments</h2>
          <ul className="plain">
            <li>Separate books of account, audited every year</li>
            <li>Donation receipts issued for every contribution</li>
            <li>Funds used only for the Trust's charitable objects</li>
          </ul>
        </article>
      </div>
      <p>Governance documents and annual reports are shared on the <Link to="/resources/annual-reports">Annual Reports</Link> page. For any question, please <Link to="/contact-us">contact us</Link>.</p>
    </PageShell>
  )
}
