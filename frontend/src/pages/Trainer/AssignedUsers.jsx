import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TrainerNavbar from '../../components/TrainerNavbar';

const dummyUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alex Johnson", email: "alex@example.com" },
  { id: 4, name: "Maria Garcia", email: "maria@example.com" }
];

const AssignedUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = dummyUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-4">
        <h3 className="mb-3">Assigned Users</h3>

        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* User Cards */}
        {filteredUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="row">
            {filteredUsers.map((user) => (
              <div className="col-md-6 mb-4" key={user.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title mb-1">{user.name}</h5>
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <Link to={`/trainer/user/${user.id}`} className="btn btn-sm btn-primary">
                        Profile
                      </Link>
                      <Link to={`/trainer/user/${user.id}/schedule`} className="btn btn-sm btn-secondary">
                        Schedule
                      </Link>
                      <Link to={`/trainer/user/${user.id}/diet`} className="btn btn-sm btn-success">
                        Diet
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AssignedUsers;
  