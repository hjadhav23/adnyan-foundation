import PageShell from '../components/PageShell'
import Reveal from '../components/Reveal'

const ITEMS = [
  { img: '/images/award-1.jpg', text: 'Felicitation by Shri Shiroor Mutt Swamiji, Udupi, Karnataka, for good performance in social work.' },
  { img: '/images/award-2.jpg', text: 'Felicitation by Forum for Fairness in Education for supporting the Right to Education Act 2011 Bill in Maharashtra.' },
  { img: '/images/award-3.jpg', text: 'Felicitation by Grampanchayat Wai, Satara, for the distribution of 440 free school bag kits.' },
]

export default function Awards() {
  return (
    <PageShell title="Awards" lead="Recognition for the Trust's social work.">
      <div className="award-grid">
        {ITEMS.map((a, i) => (
          <Reveal key={a.img} delay={i * 80}>
            <figure className="award"><img src={a.img} alt="" /><figcaption>{a.text}</figcaption></figure>
          </Reveal>
        ))}
      </div>
    </PageShell>
  )
}
