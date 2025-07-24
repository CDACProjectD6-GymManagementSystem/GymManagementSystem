import React from 'react';

export default function StatCard({ title, value, icon, color }) {
  return (
    <div className={`card border-0 shadow-sm`}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <div className="text-muted small">{title}</div>
          <div className="h4 fw-bold">{value}</div>
        </div>
        <div>
          <i className={`bi ${icon} fs-2 text-${color}`} />
        </div>
      </div>
    </div>
  );
}
