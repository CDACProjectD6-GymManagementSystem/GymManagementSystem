import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TrainerNavbar from '../../components/TrainerNavbar';

// Mock user database
const mockUserData = {
  1: { name: "John Doe" },
  2: { name: "Jane Smith" },
  3: { name: "Alex Johnson" }
};

const defaultSchedule = {
  Monday: "Chest",
  Tuesday: "Back",
  Wednesday: "Legs",
  Thursday: "Shoulders",
  Friday: "Arms",
  Saturday: "Cardio",
  Sunday: "Rest"
};

const UserSchedule = () => {
  const { userId } = useParams();
  const user = mockUserData[userId] || { name: "Unknown" };

  const [schedule, setSchedule] = useState(defaultSchedule);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (day, value) => {
    setSchedule(prev => ({ ...prev, [day]: value }));
  };

  const handleSave = () => {
    console.log("Updated schedule:", schedule);
    setIsEditing(false);
    // TODO: Save to API
  };

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-4">
        <h3 className="mb-4">
          Weekly Schedule for <span className="text-primary">{user.name}</span> (ID: {userId})
        </h3>

        <table className="table table-bordered shadow">
          <thead className="table-dark">
            <tr>
              <th>Day</th>
              <th>Workout</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(schedule).map(([day, workout]) => (
              <tr key={day}>
                <td><strong>{day}</strong></td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={workout}
                      onChange={(e) => handleChange(day, e.target.value)}
                    />
                  ) : (
                    workout
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-3">
          {isEditing ? (
            <>
              <button className="btn btn-success me-2" onClick={handleSave}>
                Save Schedule
              </button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
              Edit Schedule
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default UserSchedule;
