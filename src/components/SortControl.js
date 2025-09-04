import React from 'react';

const options = [
  { value: 'name_asc', label: 'Name A-Z' },
  { value: 'name_desc', label: 'Name Z-A' },
  { value: 'stock_asc', label: 'Stock Low-High' },
  { value: 'stock_desc', label: 'Stock High-Low' },
  { value: 'created_desc', label: 'Newest' },
  { value: 'created_asc', label: 'Oldest' }
];

const SortControl = ({ value, onChange }) => (
  <select className="form-select" aria-label="Sort" style={{ width: 'auto' }} value={value} onChange={e => onChange(e.target.value)}>
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

export default React.memo(SortControl);
