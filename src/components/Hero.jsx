import { ArrowRight } from './Icons.jsx';

export default function Hero({ profile }) {
  return (
    <header className="hero">
      <div className="shell hero-grid">
        <div>
          <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> {profile.availability}</p>
          <h1>{profile.firstName}<br /><span className="accent">{profile.lastName}.</span></h1>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions">
            <a className="button" href={profile.github} target="_blank" rel="noopener noreferrer">
              Explore GitHub <ArrowRight />
            </a>
            <a className="button secondary" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <aside className="hero-aside" aria-label="Professional summary">
          <dl>
            {profile.facts.map((fact) => (
              <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
            ))}
          </dl>
        </aside>
      </div>
    </header>
  );
}
