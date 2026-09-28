import PageShell from '../components/PageShell'
import { BANK, SITE } from '../config'

export default function Donate() {
  const rows: [string, string][] = [
    ['Account Name', BANK.accountName], ['Bank', BANK.bank], ['Savings Account No.', BANK.account],
    ['IFSC Code', BANK.ifsc], ['Branch', BANK.branch], ['MICR Code', BANK.micr], ['UPI ID', BANK.upi],
  ]
  return (
    <PageShell title="Donate" lead="Your donation helps a child stay in school and a family stay fed.">
      <div className="split donate">
        <div>
          <p>Donations to Adnyan Research &amp; Educational Trust are eligible for tax benefits under CSR-1, Section 12AB and Section 80G. You can pay by bank transfer or scan the UPI code from any UPI app.</p>
          <table className="bank"><tbody>
            {rows.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}
          </tbody></table>
          <p>After donating, please email the transaction details to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> so we can send your receipt.</p>
        </div>
        <img className="qr" src="/images/upi-qr.jpg" alt="UPI QR code to donate to Adnyan Research and Educational Trust" />
      </div>
    </PageShell>
  )
}
