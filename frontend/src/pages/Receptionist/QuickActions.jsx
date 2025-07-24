import React from 'react';

export default function QuickActions() {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Quick Actions</h5>
        <div className="d-grid gap-2">
          <button className="btn btn-outline-primary">
            <i className="bi bi-credit-card-2-front me-1" /> Process Payment
          </button>
          <button className="btn btn-outline-success">
            <i className="bi bi-basket me-1" /> Retail Sale
          </button>
          <button className="btn btn-outline-warning">
            <i className="bi bi-ticket-detailed me-1" /> Issue Guest Pass
          </button>
          <button className="btn btn-outline-info">
            <i className="bi bi-envelope me-1" /> Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
