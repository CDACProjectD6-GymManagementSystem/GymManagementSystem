import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TrainerNavbar from '../../components/TrainerNavbar';

// Mock user data
const mockUserData = {
  1: { name: "John Doe" },
  2: { name: "Jane Smith" },
  3: { name: "Alex Johnson" }
};

// Default diet plan structure
const defaultDiet = {
  breakfast: "Oatmeal with fruits and a boiled egg",
  midSnack: "A banana or protein bar",
  lunch: "Grilled chicken with brown rice and veggies",
  dinner: "Baked salmon with sweet potato and salad"
};

const DietPlanEditor = () => {
  const { userId } = useParams();
  const user = mockUserData[userId] || { name: "Unknown" };

  const [dietPlan, setDietPlan] = useState(defaultDiet);

  const handleChange = (meal, value) => {
    setDietPlan(prev => ({ ...prev, [meal]: value }));
  };

  const handleSave = () => {
    console.log("Updated Diet Plan for User ID:", userId, dietPlan);
    // TODO: Save to backend API
    alert("Diet plan saved successfully!");
  };

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-4">
        <h3 className="mb-4">
          Diet Plan for <span className="text-primary">{user.name}</span> (ID: {userId})
        </h3>

        <div className="mb-3">
          <label className="form-label">Breakfast</label>
          <textarea
            className="form-control"
            rows="3"
            value={dietPlan.breakfast}
            onChange={(e) => handleChange('breakfast', e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mid Snack</label>
          <textarea
            className="form-control"
            rows="2"
            value={dietPlan.midSnack}
            onChange={(e) => handleChange('midSnack', e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Lunch</label>
          <textarea
            className="form-control"
            rows="3"
            value={dietPlan.lunch}
            onChange={(e) => handleChange('lunch', e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dinner</label>
          <textarea
            className="form-control"
            rows="3"
            value={dietPlan.dinner}
            onChange={(e) => handleChange('dinner', e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </>
  );
};

export default DietPlanEditor;
