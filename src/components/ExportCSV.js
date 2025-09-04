import React from 'react';

export default function ExportCSV({ data, filename = 'export.csv', columns }) {
  const handleExport = () => {
    const csvRows = [];
    csvRows.push(columns.map(col => col.label).join(','));
    data.forEach(row => {
      csvRows.push(columns.map(col => JSON.stringify(row[col.key] ?? '')).join(','));
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return <button className="btn btn-outline-primary" onClick={handleExport}>Export CSV</button>;
}
