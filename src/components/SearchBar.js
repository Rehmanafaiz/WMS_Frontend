import React, { useState, useEffect, useMemo } from 'react';
import { debounce } from '../utils/debounce';

const SearchBar = ({ onSearch, delay = 300, placeholder = 'Search...' }) => {
  const [value, setValue] = useState('');

  const debounced = useMemo(() => debounce(onSearch, delay), [onSearch, delay]);

  useEffect(() => {
    debounced(value.trim());
  }, [value, debounced]);

  return (
    <input
      aria-label="Search"
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};

export default React.memo(SearchBar);
