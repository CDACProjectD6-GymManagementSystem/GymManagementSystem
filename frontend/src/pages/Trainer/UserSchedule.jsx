import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TrainerNavbar from '../../components/TrainerNavbar';

const UserSchedule = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState("Loading...");
  const [schedule, setSchedule] = useState({});
  const [originalSchedule, setOriginalSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [gender, setGender] = useState("");

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/trainer/user/${userId}/schedule`);
        const data = response.data;

        setUserName(`${data.firstName} ${data.lastName}`);
        setGender(data.gender || "OTHER"); // Keep gender for POST request

        const scheduleData = {
          Monday: data.schedule?.monday || '',
          Tuesday: data.schedule?.tuesday || '',
          Wednesday: data.schedule?.wednesday || '',
          Thursday: data.schedule?.thursday || '',
          Friday: data.schedule?.friday || '',
          Saturday: data.schedule?.saturday || '',
          Sunday: data.schedule?.sunday || ''
        };

        setSchedule(scheduleData);
        setOriginalSchedule(scheduleData);
      } catch (error) {
        console.error("Failed to fetch schedule:", error);
        alert("Could not load schedule.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [userId]);

  const handleChange = (day, value) => {
    setSchedule(prev => ({ ...prev, [day]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        firstName: userName.split(" ")[0],
        lastName: userName.split(" ")[1],
        gender: gender,
        schedule: {
          monday: schedule.Monday,
          tuesday: schedule.Tuesday,
          wednesday: schedule.Wednesday,
          thursday: schedule.Thursday,
          friday: schedule.Friday,
          saturday: schedule.Saturday,
          sunday: schedule.Sunday
        }
      };

      await axios.post(`http://localhost:8080/trainer/user/${userId}/schedule`, payload);
      alert("Schedule updated successfully!");
      setOriginalSchedule(schedule);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating schedule:", error);
      alert("Failed to update schedule.");
    }
  };

  const handleCancel = () => {
    setSchedule(originalSchedule);
    setIsEditing(false);
  };

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-4">
        <h3 className="mb-4">
          Weekly Schedule for <span className="text-primary">{userName}</span>
        </h3>

        {loading ? (
          <p>Loading schedule...</p>
        ) : (
          <>
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
                  <button className="btn btn-success me-2" onClick={handleSave}>Save Schedule</button>
                  <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Schedule</button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserSchedule;
