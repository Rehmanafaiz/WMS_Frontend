import React from 'react';

const Pagination = ({ page, pageSize, total, onPage, onPageSize }) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;
  return (
    <div className="d-flex align-items-center gap-2 flex-wrap">
      <div className="btn-group" role="group" aria-label="Pagination navigation">
        <button className="btn btn-outline-secondary" disabled={!canPrev} onClick={() => onPage(page - 1)}>&laquo;</button>
        <button className="btn btn-outline-secondary" disabled>{page} / {totalPages}</button>
        <button className="btn btn-outline-secondary" disabled={!canNext} onClick={() => onPage(page + 1)}>&raquo;</button>
      </div>
      <select className="form-select" style={{ width: 'auto' }} value={pageSize} onChange={e => onPageSize(Number(e.target.value))} aria-label="Items per page">
        {[10,20].map(size => <option key={size} value={size}>{size} / page</option>)}
      </select>
      <span className="text-muted small">Total: {total}</span>
    </div>
  );
};

export default React.memo(Pagination);
