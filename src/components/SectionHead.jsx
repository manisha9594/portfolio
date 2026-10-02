export default function SectionHead({ index, title, intro }) {
  return (
    <div className="section-head">
      <div><span className="section-index">{index}</span><h2>{title}</h2></div>
      <p className="section-intro">{intro}</p>
    </div>
  );
}
