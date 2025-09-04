import React from 'react';

const CategoryFilter = ({ categories, value, onChange }) => {
  return (
    <select className="form-select" aria-label="Category filter" value={value} onChange={e => onChange(e.target.value)} style={{ width: 'auto' }}>
      <option value="">All Categories</option>
      {categories.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
  );
};

export default React.memo(CategoryFilter);
