export function DataState({ isLoading, error, empty, children }) {
  if (isLoading) {
    return <div className="state-card">Loading data...</div>;
  }

  if (error) {
    return <div className="state-card is-error">{error}</div>;
  }

  if (empty) {
    return <div className="state-card">No records found.</div>;
  }

  return children;
}

