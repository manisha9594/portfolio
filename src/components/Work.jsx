import SectionHead from './SectionHead.jsx';

export default function Work({ projects }) {
  return (
    <section className="section" id="work">
      <div className="shell">
        <SectionHead
          index="01 / Selected work"
          title="AI systems built end to end."
          intro="Recent projects span job-search intelligence, real-time voice interaction, retrieval-augmented generation, and autonomous troubleshooting."
        />
        <div className="project-list">
          {projects.map((project, i) => (
            <article className="project" key={project.title}>
              <span className="project-number">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer">{project.title}</a> : project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-side">
                {project.status && <span className="project-state">{project.status}</span>}
                <div className="chips">
                  {project.tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
