import { useState } from 'react';
import SectionHead from './SectionHead.jsx';

const FILTER_LABELS = { all: 'All', python: 'Python', react: 'React', vue: 'Vue' };

export default function Repositories({ repos, githubUser }) {
  const [filter, setFilter] = useState('all');

  const filters = ['all', ...new Set(repos.flatMap((repo) => repo.tags))];
  const visible = filter === 'all' ? repos : repos.filter((repo) => repo.tags.includes(filter));

  return (
    <section className="section" id="repositories">
      <div className="shell">
        <SectionHead
          index="02 / Open source"
          title="Repositories, ready to explore."
          intro="Filter the collection by stack, then open any card to view the repository on GitHub."
        />

        <div className="repo-tools">
          <div className="filter-bar" role="group" aria-label="Filter repositories">
            {filters.map((name) => (
              <button
                key={name}
                type="button"
                className={`filter-button${filter === name ? ' active' : ''}`}
                aria-pressed={filter === name}
                onClick={() => setFilter(name)}
              >
                {FILTER_LABELS[name] || name}
              </button>
            ))}
          </div>
          <span className="repo-count" aria-live="polite">
            {visible.length} {visible.length === 1 ? 'repository' : 'repositories'}
          </span>
        </div>

        <div className="repo-grid">
          {visible.map((repo) => (
            <a
              key={repo.name}
              className="repo-card"
              href={`https://github.com/${githubUser}/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="repo-top"><h3>{repo.name}</h3><span className="arrow" aria-hidden="true">↗</span></div>
              <p>{repo.description}</p>
              <div className="repo-meta">
                <span className="lang" style={{ '--lang': repo.color }}>{repo.language}</span>
                {repo.extra && <span>{repo.extra}</span>}
                {repo.stars > 0 && <span>★ {repo.stars}</span>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
