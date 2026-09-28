import { asset } from '../asset'
import PageShell from '../components/PageShell'
import Reveal from '../components/Reveal'
import { useContent } from '../hooks'
import defaults from '../data/defaults.json'
import type { TeamMember } from '../types'

export default function Team() {
  const team = useContent<TeamMember>('team', defaults.team)
  return (
    <PageShell title="Team" lead="The people behind Adnyan's work on the ground.">
      <div className="team-grid">
        {team.map((m, i) => (
          <Reveal key={m.id ?? i} delay={i * 60}>
            <article className="member">
              {m.photo ? <img src={asset(m.photo)} alt={m.name} /> : <div className="avatar" aria-hidden="true">{m.name.split(' ').filter((w) => /^[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0]).join('')}</div>}
              <h3>{m.name}</h3>
              <h4>{m.role}</h4>
              <p>{m.bio}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </PageShell>
  )
}
