import { useEffect, useState } from 'react'
import SmartLink from './SmartLink'

const SLIDES = [
  { title: 'EDUCATION', text: 'Mission Education: every child has a right to learn and to stay in school', image: '/images/slide-education.jpg', to: '/profile#education' },
  { title: 'HEALTH & CARE', text: 'Swastha Seva: preventive health awareness, medical camps and support for patients', image: '/images/slide-health.jpg', to: '/profile#health' },
  { title: 'ENVIRONMENT', text: 'Protecting nature through awareness, plantation drives and organic farming', image: '/images/slide-environment.jpg', to: '/profile#environment' },
]

export default function Slider() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const go = (n: number) => setI((n + SLIDES.length) % SLIDES.length)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((c) => (c + 1) % SLIDES.length), 6500)
    return () => clearInterval(t)
  }, [paused])

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Featured work"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {SLIDES.map((s, n) => (
        <div key={s.title} className={`slide ${n === i ? 'active' : ''}`} aria-hidden={n !== i}>
          <div className="slide-bg" style={{ backgroundImage: `url(${s.image})` }} />
          <div className="slide-shade" />
          <div className="slide-content">
            <h1>{s.title}</h1>
            <h5>{s.text}</h5>
            <SmartLink to={s.to} className="btn btn-outline-light">Know More</SmartLink>
          </div>
        </div>
      ))}
      <button type="button" className="arrow prev" aria-label="Previous slide" onClick={() => go(i - 1)}>&#8249;</button>
      <button type="button" className="arrow next" aria-label="Next slide" onClick={() => go(i + 1)}>&#8250;</button>
      <div className="dots">
        {SLIDES.map((s, n) => (
          <button key={s.title} type="button" className={n === i ? 'on' : ''} aria-label={`Slide ${n + 1}`} onClick={() => setI(n)} />
        ))}
      </div>
    </section>
  )
}
