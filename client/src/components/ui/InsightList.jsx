export function InsightList({ items }) {
  return (
    <div className="insight-list">
      {items.map((item) => (
        <article key={item.title} className="insight-item">
          <h4>{item.title}</h4>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}

