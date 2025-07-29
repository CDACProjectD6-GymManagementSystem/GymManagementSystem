import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TrainerNavbar from '../../components/TrainerNavbar';

const AssignedUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Replace this with dynamic trainer ID (e.g., from auth or localStorage)
  const trainerId = 1;

  useEffect(() => {
    const fetchAssignedUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/trainer/users/${trainerId}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching assigned users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedUsers();
  }, [trainerId]);

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-4">
        <h3 className="mb-3">Assigned Users</h3>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loading */}
        {loading ? (
          <p>Loading users...</p>
        ) : filteredUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="row">
            {filteredUsers.map((user) => (
              <div className="col-md-6 mb-4" key={user.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title mb-1">{`${user.firstName} ${user.lastName}`}</h5>
                      <p className="text-muted mb-0">Gender: {user.gender}</p>
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
