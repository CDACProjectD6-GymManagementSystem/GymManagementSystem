import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TrainerNavbar from '../../components/TrainerNavbar';
import { getAssignedUsers } from '../../services/TrainerService';
import '../../styles/Trainer/AssignedUsers.css'; // NEW CSS FILE

const AssignedUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('a-z');
  const [loading, setLoading] = useState(true);

  const trainerId = 1; // Replace with dynamic ID if needed

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAssignedUsers(trainerId);
        setUsers(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [trainerId]);

  let filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === 'a-z') {
    filteredUsers.sort((a, b) =>
      `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
    );
  } else if (sortOption === 'z-a') {
    filteredUsers.sort((a, b) =>
      `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`)
    );
  }

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-4">
        <h2 className="section-title mb-4">Assigned Users</h2>

        <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
          <input
            type="text"
            className="form-control shadow-sm search-input"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="form-select shadow-sm w-auto"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="a-z">Sort: A–Z</option>
            <option value="z-a">Sort: Z–A</option>
          </select>
        </div>

        {loading ? (
          <p>Loading users...</p>
        ) : filteredUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="row">
            {filteredUsers.map((user) => (
              <div className="col-md-6 col-lg-4 mb-4" key={user.id}>
                <div className="user-card shadow-sm h-100">
                  <div className="user-card-body">
                    <div>
                      <h5 className="user-name">{`${user.firstName} ${user.lastName}`}</h5>
                      <p className="user-detail text-muted">Gender: {user.gender}</p>
                    </div>
                    <div className="button-group">
                      <Link to={`/trainer/user/${user.id}`} className="btn btn-outline-primary btn-sm">Profile</Link>
                      <Link to={`/trainer/user/${user.id}/schedule`} className="btn btn-outline-secondary btn-sm">Schedule</Link>
                      <Link to={`/trainer/user/${user.id}/diet`} className="btn btn-outline-success btn-sm">Diet</Link>
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
