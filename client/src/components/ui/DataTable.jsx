export function DataTable({ columns, rows, emptyLabel = "No records found." }) {
  if (!rows.length) {
    return <div className="state-card">{emptyLabel}</div>;
  }

  return (
    <div className="table-shell">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={`${row.id}-${column.key}`} data-label={column.label}>
                  <span className="table-cell-label">{column.label}</span>
                  <span className="table-cell-value">{column.render ? column.render(row) : row[column.key]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
