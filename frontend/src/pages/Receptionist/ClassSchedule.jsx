import React from 'react';
import { classes } from './mockData';

export default function ClassSchedule() {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Class & Trainer Schedule</h5>
        <ul className="list-group list-group-flush mt-3">
          {classes.map((cls) => (
            <li key={cls.id} className={`list-group-item d-flex justify-content-between align-items-center`}>
              <div>
                <div className="fw-semibold">{cls.name}</div>
                <div className="small text-muted">
                  <i className="bi bi-clock me-1" /> {cls.time} &mdash; {cls.trainer}
                </div>
              </div>
              <div className="text-end">
                <span className="badge bg-secondary mb-1">{cls.spots}</span>
                <br />
                <button className="btn btn-link btn-sm">
                  {cls.isFull ? 'View Waitlist' : 'Manage Bookings'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
