import PageShell from '../components/PageShell'
import Reveal from '../components/Reveal'

const ONGOING = [
  { img: '/images/slum-school.jpg', title: 'Mission Education', text: 'School bag kits and learning material for children from Mumbai slums and rural schools so that no child drops out for lack of basics.' },
  { img: '/images/story-annadaan.jpg', title: 'Anna Daan (Food Seva)', text: 'Free meals and fruit for patients and relatives staying outside Tata Cancer Hospital, K.E.M. and T.B. Hospital, and at large community gatherings.' },
  { img: '/images/story-wheelchairs.jpg', title: 'Swastha Seva', text: 'Preventive health awareness, free check-up camps, wheelchairs, medical kits and support for cancer patients.' },
  { img: '/images/women.jpg', title: "Women's Empowerment", text: 'Self-help groups and entrepreneurial initiatives that help women lead and earn in their communities.' },
  { img: '/images/organic-farming.jpg', title: 'Environment and Organic Farming', text: 'Awareness programmes, cleaning and plantation drives, and training for farmers to adopt organic systems.' },
  { img: '/images/village.jpg', title: 'Relief for Tribal Communities', text: 'Cooking utensils, food grains and essentials for Adhivasi families living close to Mumbai.' },
]

const PREVIOUS = [
  { year: '2010', text: 'Felicitated for promoting a green environment in society.' },
  { year: '2012', text: 'Job fair organised, with nearly 2,160 jobs offered on the spot.' },
  { year: '2013', text: 'Free medical camp with 1,620 diabetes machines distributed.' },
  { year: '2014', text: 'Free school bag kits for children in Meenavali, Satara; tree plantation drive.' },
  { year: '2020', text: 'During lockdown: 5,400 cakes and 1,800 sets of 14 utensils distributed across Mumbai.' },
  { year: '2022', text: '2,000 wheelchairs distributed; medical camp with 2,750 diabetes machines and strips; bedsheets and support for 891 senior citizens.' },
  { year: '2023', text: 'School kits for 2,750 children; cloth bags for 3,600 people; Anna Daan for 40,000 followers over three days; 960 blanket and daily-use kits for blind students.' },
  { year: '2024', text: 'Anna Daan for 3,600 people at Chaitya Bhoomi; night gowns and walkers for 1,250 seniors; cleaning drive in F/South Ward.' },
]

export function Ongoing() {
  return (
    <PageShell title="Ongoing Projects" lead="Programmes that run year after year across Mumbai and Maharashtra.">
      <div className="card-grid">
        {ONGOING.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 80}>
            <article className="card"><div className="card-img" style={{ backgroundImage: `url(${p.img})` }} /><div className="card-body"><h3>{p.title}</h3><p>{p.text}</p></div></article>
          </Reveal>
        ))}
      </div>
    </PageShell>
  )
}

export function Previous() {
  return (
    <PageShell title="Previous Projects" lead="A look back at what our volunteers and supporters have achieved.">
      <ol className="timeline">
        {PREVIOUS.map((p) => (
          <li key={p.year}><span className="year">{p.year}</span><p>{p.text}</p></li>
        ))}
      </ol>
    </PageShell>
  )
}
