
import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { Eye, PencilSquare } from 'react-bootstrap-icons';

export default function MembersPage({ onNewMemberClick, members, onEditClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(members);

  useEffect(() => {
    setFilteredMembers(
      members.filter(
        (m) =>
          m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (m.memberId?.toLowerCase() || '').includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, members]);

  const statusVariants = {
    Active: 'success',
    Expired: 'danger',
    Frozen: 'primary',
    New: 'secondary',
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Member Management</h5>
          <Button variant="primary" onClick={onNewMemberClick}>
            <PencilSquare className="me-1" />
            Add Member
          </Button>
        </div>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <i className="bi bi-search" />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by name or member ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Table responsive hover size="sm" className="mb-0">
          <thead className="table-light">
            <tr>
              <th>Member</th>
              <th>Member ID</th>
              <th>Join Date</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.memberId}</td>
                  <td>{member.joinDate}</td>
                  <td>
                    <span className={`badge bg-${statusVariants[member.status] || 'secondary'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <Button variant="outline-secondary" size="sm" className="me-2" title="View">
                      <Eye />
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => onEditClick(member)}
                      title="Edit"
                    >
                      <PencilSquare />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-muted py-3">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
