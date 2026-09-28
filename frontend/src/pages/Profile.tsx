import { asset } from '../asset'
import PageShell from '../components/PageShell'
import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <PageShell title="Profile" lead="Adnyan Research & Educational Trust: awaken of literacy.">
      <div className="split">
        <div className="prose">
          <p>Adnyan Research &amp; Educational Trust is an Indian non-profit and non-governmental organization. It provides a sensitive, caring environment and career guidance for street and working children in Mumbai, Maharashtra. Contributions are eligible for tax benefits under CSR-1, 12AB and 80G.</p>
          <p>The Trust has worked in the education field for more than 15 years and has been part of the Right to Education movement since 2009.</p>
          <p>We work in Mumbai slums, Palghar, Musewadi, Manohar, Vada, Shegoan, Khed, Bhiwandi, Wai, Satara and Taluka Raigad in Maharashtra. Our main objective is to bring about a lasting development of Maharashtra.</p>
        </div>
        <img className="framed" src={asset('/images/kids-group.jpg')} alt="Children with school kits distributed by Adnyan" />
      </div>

      <div className="two-col">
        <article className="panel"><h2>Vision</h2><p>To improve the quality of life of oppressed, underprivileged and marginalised people. We envision a society where preventive and supportive health care is accessible to all, and where poverty or disease does not affect educational or employment opportunities.</p></article>
        <article className="panel"><h2>Mission</h2><p>Rural development through education, environment awareness, right to education, health, sanitation, capacity building and bio-diversity programmes, with a firm commitment to women's empowerment.</p></article>
      </div>

      <h2 className="h-block">Our Goals</h2>
      <ul className="goals">
        <li>Empower women abandoned by husbands and families, and girls from lower socio-economic segments.</li>
        <li>Ensure that every child can go to school and that education reaches more children each academic year.</li>
        <li>Make preventive health care and early screening available to poor communities.</li>
        <li>Support persons with disabilities, senior citizens and cancer patients with dignity.</li>
        <li>Protect the environment and encourage organic, sustainable farming.</li>
      </ul>

      <h2 className="h-block">What We Do</h2>
      <div className="areas">
        <article id="education"><h3>Education</h3><p>"Mission Education: awaken of literacy" helps ensure every child's right to education. We distribute school kits, run vocational guidance and training, and support children and women with educational aid.</p></article>
        <article id="health"><h3>Health and Care (Swastha Seva)</h3><p>Preventive health awareness sessions and free check-up camps in societies, schools and offices. Free food seva (Anna Daan), medical kits, wheelchairs, cataract surgery camps and support for cancer patients.</p></article>
        <article id="women"><h3>Women's Empowerment</h3><p>We help women step into leadership roles and become economically independent through self-help groups and entrepreneurial initiatives.</p></article>
        <article id="environment"><h3>Environment and Organic Farming</h3><p>Awareness programmes, tree plantation and cleaning drives, and technical training for farmers to adopt organic systems.</p></article>
      </div>
      <p className="center"><Link to="/current-projects" className="btn btn-primary">See Ongoing Projects</Link></p>
    </PageShell>
  )
}
