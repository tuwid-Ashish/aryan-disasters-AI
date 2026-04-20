export function PageHero({ title, description, actions }) {
  return (
    <section className="page-hero">
      <div>
        <p className="eyebrow">Operations Surface</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {actions ? <div className="page-hero-actions">{actions}</div> : null}
    </section>
  );
}
