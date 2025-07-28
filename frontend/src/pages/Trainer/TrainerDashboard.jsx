import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TrainerNavbar from '../../components/TrainerNavbar.jsx';

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const [assignedUsersCount, setAssignedUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Replace with logged-in trainerId if available via context/auth
  const trainerId = 1;

  useEffect(() => {
    const fetchAssignedUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/trainer/users/${trainerId}`);
        setAssignedUsersCount(response.data.length); // assuming it's a List<UserDTO>
      } catch (error) {
        console.error('Error fetching assigned users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedUsers();
  }, [trainerId]);

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-5">
        <h2 className="mb-4">Welcome, Trainer!</h2>
        <div className="row">

          {/* Assigned Users */}
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 text-center">
              <div className="card-body">
                <h5 className="card-title">Assigned Users</h5>
                <p className="card-text fs-4">
                  {loading ? 'Loading...' : `${assignedUsersCount} Users`}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/trainer/users')}
                >
                  View Users
                </button>
              </div>
            </div>
          </div>

          {/* Gym Equipments */}
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 text-center">
              <div className="card-body">
                <h5 className="card-title">Gym Equipments</h5>
                <p className="card-text">Manage and inspect equipment status.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/trainer/equipments')}
                >
                  Go to Equipments
                </button>
              </div>
            </div>
          </div>

          {/* Edit Profile */}
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 text-center">
              <div className="card-body">
                <h5 className="card-title">My Profile</h5>
                <p className="card-text">Update your personal details and bio.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/trainer/profile')}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default TrainerDashboard;
