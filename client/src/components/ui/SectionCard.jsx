export function SectionCard({ eyebrow, title, description, action, children, className = "" }) {
  return (
    <section className={`section-card ${className}`.trim()}>
      {(eyebrow || title || description || action) && (
        <header className="section-card-header">
          <div>
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {title ? <h3>{title}</h3> : null}
            {description ? <p className="section-card-copy">{description}</p> : null}
          </div>
          {action ? <div className="section-card-action">{action}</div> : null}
        </header>
      )}
      {children}
    </section>
  );
}

