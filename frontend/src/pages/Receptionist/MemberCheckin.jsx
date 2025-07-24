import React, { useState } from 'react';
import { initialCheckedInMembers } from './mockData';

export default function MemberCheckin({ onNewMemberClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredMembers = initialCheckedInMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const statusVariants = {
  Active: 'success',
  Expired: 'danger',
  Frozen: 'primary',
  New: 'secondary',
};

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Member Check-in / Check-out</h5>
          <button className="btn btn-success" onClick={onNewMemberClick}>
            <i className="bi bi-person-plus me-1" /> New Member
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">
            <i className="bi bi-search" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Filter by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th>Member</th>
              <th>Check-in Time</th>
              <th>Status</th>
              <th style={{ width: 120 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((mem) => (
                <tr key={mem.id}>
                  <td className="d-flex align-items-center">
                    <img
                      src={`https://placehold.co/32x32/E2E8F0/4A5568?text=${mem.avatar}`}
                      className="rounded-circle me-2"
                      alt={mem.name}
                      width={32} height={32}
                    />
                    {mem.name}
                  </td>
                  <td>{mem.checkInTime}</td>
                  <td>
                    <span className={`badge bg-${statusVariants[mem.status] || 'secondary'}`}>
                    {mem.status}</span>
                  </td>
                  <td>
                    <button className="btn btn-outline-danger btn-sm">Check-out</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-muted py-3">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
