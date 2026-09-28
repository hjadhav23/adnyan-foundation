import PageShell from '../components/PageShell'
import { ContactForm, JoinForm, NewsletterForm } from '../components/Forms'
import { SITE } from '../config'

export function GetInvolved() {
  return (
    <PageShell title="Be Part of the Network" lead="Join a community of people who care about education, health and dignity.">
      <div className="narrow-form"><JoinForm kind="network" cta="Join the Network" /></div>
    </PageShell>
  )
}

export function Participate() {
  return (
    <PageShell title="Participate in Projects" lead="Volunteer for school kit drives, Anna Daan, health camps and cleaning drives.">
      <div className="narrow-form"><JoinForm kind="participate" cta="Sign Me Up" /></div>
    </PageShell>
  )
}

export function StayInformed() {
  return (
    <PageShell title="Stay Informed" lead="Get news of our drives, camps and stories in your inbox.">
      <div className="narrow-form"><NewsletterForm /></div>
    </PageShell>
  )
}

export function WorkWithUs() {
  return (
    <PageShell title="Work with us" lead="Join our team as a staff member, intern or professional volunteer.">
      <div className="narrow-form">
        <p>We welcome people with skills in teaching, health care, fundraising, design, media and accounts. Tell us about yourself, or write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
        <JoinForm kind="work" cta="Send Application" />
      </div>
    </PageShell>
  )
}

export function Contact() {
  return (
    <PageShell title="Contact Us" lead="We would love to hear from you.">
      <div className="split">
        <div className="prose">
          <h2>Administration Office</h2>
          <p>{SITE.address}</p>
          <p>Phone: <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a><br />Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />Web: {SITE.web}</p>
        </div>
        <ContactForm />
      </div>
    </PageShell>
  )
}
