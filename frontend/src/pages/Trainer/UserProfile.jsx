import React from 'react';
import { useParams } from 'react-router-dom';
import TrainerNavbar from '../../components/TrainerNavbar';

const mockUserData = {
  1: {
    name: "John Doe",
    age: 28,
    gender: "Male",
    goals: "Build muscle and improve stamina",
    experienceLevel: "Intermediate",
    membership: "Gold"
  },
  2: {
    name: "Jane Smith",
    age: 34,
    gender: "Female",
    goals: "Lose weight and increase flexibility",
    experienceLevel: "Beginner",
    membership: "Silver"
  }
};

const UserProfile = () => {
  const { userId } = useParams();
  const user = mockUserData[userId] || {
    name: "Unknown",
    age: "N/A",
    gender: "N/A",
    goals: "N/A",
    experienceLevel: "N/A",
    membership: "N/A"
  };

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-4">
        <h3>User Profile</h3>
        <div className="card shadow p-4 mt-3">
          <h5 className="mb-3">Name: <span className="text-primary">{user.name}</span></h5>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Fitness Goals:</strong> {user.goals}</p>
          <p><strong>Experience Level:</strong> {user.experienceLevel}</p>
          <p><strong>Membership Type:</strong> {user.membership}</p>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
