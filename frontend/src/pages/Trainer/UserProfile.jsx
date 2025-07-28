import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TrainerNavbar from '../../components/TrainerNavbar';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/trainer/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-4">
        <h3>User Profile</h3>
        <div className="card shadow p-4 mt-3">
          {loading ? (
            <p>Loading user details...</p>
          ) : user ? (
            <>
              <h5 className="mb-3">
                Name: <span className="text-primary">{user.firstName} {user.lastName}</span>
              </h5>
              <p><strong>Gender:</strong> {user.gender}</p>
              {/* Add more fields as needed from backend DTO */}
            </>
          ) : (
            <p>User not found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;

