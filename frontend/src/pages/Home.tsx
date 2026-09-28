import { Link } from 'react-router-dom'
import Slider from '../components/Slider'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import SmartLink from '../components/SmartLink'
import { useContent } from '../hooks'
import defaults from '../data/defaults.json'
import type { Announcement, Call, Stat, Story } from '../types'

export default function Home() {
  const announcements = useContent<Announcement>('announcements', defaults.announcements)
  const stories = useContent<Story>('stories', defaults.stories)
  const calls = useContent<Call>('calls', defaults.calls)
  const stats = useContent<Stat>('stats', defaults.stats)

  return (
    <>
      <Slider />

      <section className="section overview">
        <Reveal className="wrap narrow center">
          <h2>Overview</h2>
          <p>Adnyan Research &amp; Educational Trust is an Indian non-profit, non-governmental organization that provides a caring environment and career guidance for street and working children in Mumbai, Maharashtra.</p>
          <p>For more than 15 years we have worked in education, health and medical support, women's empowerment, disaster relief and environmental awareness. We have been part of the Right to Education movement since 2009.</p>
          <p>Our overall goal is to empower women and girls from lower socio-economic segments, and to bring about lasting development across Maharashtra.</p>
          <Link to="/profile" className="btn btn-primary">Learn More</Link>
        </Reveal>
      </section>

      <section className="section soft">
        <div className="wrap">
          <Reveal><h2 className="section-title">Latest <em>Announcements</em></h2></Reveal>
          <ul className="announce">
            {announcements.map((a, i) => (
              <li key={a.id ?? i}>
                <Reveal delay={i * 60}>
                  <div className="announce-row">
                    <h3>{a.title}</h3>
                    <SmartLink to={a.link || '#'} className="more">Learn more</SmartLink>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal><h2 className="section-title">Stories of <em>Change</em></h2></Reveal>
          <div className="story-grid">
            {stories.map((s, i) => (
              <Reveal key={s.id ?? i} delay={i * 80}>
                <SmartLink to={s.link || '#'} className="story">
                  <div className="story-img" style={{ backgroundImage: `url(${s.image})` }} />
                  <div className="story-text">
                    <h3>{s.title}</h3>
                    <h4>{s.subtitle}</h4>
                    <span className="more">Learn more</span>
                  </div>
                </SmartLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <Reveal><h2 className="section-title">Latest <em>Calls</em></h2></Reveal>
          <div className="call-grid">
            {calls.map((c, i) => (
              <Reveal key={c.id ?? i} delay={i * 100}>
                <SmartLink to={c.link || '#'} className="call">
                  <h4>{c.kicker}</h4>
                  <h3>{c.title}</h3>
                  <span className="more">Learn more</span>
                </SmartLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section impact">
        <div className="wrap">
          <h2 className="section-title light">Impact <em>Numbers</em></h2>
          <div className="stats">
            {stats.map((s, i) => <Counter key={s.id ?? i} value={Number(s.value)} label={s.label} />)}
          </div>
        </div>
      </section>
    </>
  )
}
