import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TrainerNavbar from '../../components/TrainerNavbar';

const DietPlanEditor = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState("Loading...");
  const [dietPlan, setDietPlan] = useState(null);
  const [originalDiet, setOriginalDiet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchDiet = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/trainer/user/${userId}/diet`);
        const data = response.data;

        const plan = {
          breakfast: data.diet?.breakfast || '',
          midSnack: data.diet?.midSnack || '',
          lunch: data.diet?.lunch || '',
          dinner: data.diet?.dinner || ''
        };

        setUserName(`${data.firstName} ${data.lastName}`);
        setDietPlan(plan);
        setOriginalDiet(plan); // for cancel button
      } catch (error) {
        console.error("Error fetching diet:", error);
        alert("Failed to load diet plan.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiet();
  }, [userId]);

  const handleChange = (meal, value) => {
    setDietPlan(prev => ({ ...prev, [meal]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        firstName: userName.split(" ")[0],
        lastName: userName.split(" ")[1],
        gender: "FEMALE", // Change this if needed or pull from user data
        diet: dietPlan
      };

      await axios.post(`http://localhost:8080/trainer/user/${userId}/diet`, payload);
      alert("Diet plan updated successfully!");
      setOriginalDiet(dietPlan); // update original
      setEditMode(false);
    } catch (error) {
      console.error("Error saving diet plan:", error);
      alert("Failed to update diet plan.");
    }
  };


  const handleCancel = () => {
    setDietPlan(originalDiet);
    setEditMode(false);
  };

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-4">
        <h3 className="mb-4">
          Diet Plan for <span className="text-primary">{userName}</span>
        </h3>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {["breakfast", "midSnack", "lunch", "dinner"].map((mealKey, index) => (
              <div className="mb-3" key={index}>
                <label className="form-label text-capitalize">{mealKey.replace(/([A-Z])/g, ' $1')}</label>
                {editMode ? (
                  <textarea
                    className="form-control"
                    rows="3"
                    value={dietPlan[mealKey]}
                    onChange={(e) => handleChange(mealKey, e.target.value)}
                  />
                ) : (
                  <p className="border rounded p-2 bg-light">{dietPlan[mealKey]}</p>
                )}
              </div>
            ))}

            {editMode ? (
              <div className="d-flex gap-3">
                <button className="btn btn-success" onClick={handleSave}>Save</button>
                <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit Diet Plan</button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DietPlanEditor;
