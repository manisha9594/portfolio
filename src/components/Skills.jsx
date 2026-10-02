import SectionHead from './SectionHead.jsx';

export default function Skills({ skills }) {
  return (
    <section className="section" id="skills">
      <div className="shell">
        <SectionHead
          index="03 / Capabilities"
          title="A full-stack foundation for applied AI."
          intro="From model-facing orchestration to resilient APIs and polished interfaces, I work across the system rather than one isolated layer."
        />
        <div className="capabilities">
          {skills.map((group) => (
            <article className="capability" key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
