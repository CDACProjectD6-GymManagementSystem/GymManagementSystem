import React from 'react';
import { alerts } from './mockData';

export default function MembershipAlerts() {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Membership Alerts</h5>
        <div className="list-group">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`list-group-item list-group-item-${alert.type === 'error' ? 'danger' : 'warning'} d-flex justify-content-between align-items-center`}
            >
              <div>
                <div className="fw-semibold">{alert.name}</div>
                <div className="small">{alert.message}</div>
              </div>
              <button className="btn btn-warning btn-sm">Renew</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
