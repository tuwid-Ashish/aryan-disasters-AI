export function MetricGrid({ items }) {
  return (
    <div className="metric-grid">
      {items.map((item) => (
        <article key={item.label} className="metric-card">
          <div className="metric-card-top">
            <span>{item.label}</span>
            {item.badge ? <em>{item.badge}</em> : null}
          </div>
          <strong>{item.value}</strong>
          <p>{item.note}</p>
        </article>
      ))}
    </div>
  );
}
