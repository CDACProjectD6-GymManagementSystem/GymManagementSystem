import React, { useState } from 'react';
import TrainerNavbar from '../../components/TrainerNavbar';

const initialEquipments = [
  { id: 1, name: 'Leg Press Machine', category: 'Legs', isUnderMaintenance: false },
  { id: 2, name: 'Chest Press Machine', category: 'Chest', isUnderMaintenance: true },
  { id: 3, name: 'Squat Rack', category: 'Legs', isUnderMaintenance: false },
  { id: 4, name: 'Lat Pulldown', category: 'Back', isUnderMaintenance: false },
  { id: 5, name: 'Incline Bench Press', category: 'Chest', isUnderMaintenance: true },
  { id: 6, name: 'Deadlift Platform', category: 'Back', isUnderMaintenance: false },
  { id: 7, name: 'Shoulder Press Machine', category: 'Shoulders', isUnderMaintenance: false },
  { id: 8, name: 'Lateral Raise Machine', category: 'Shoulders', isUnderMaintenance: false },
  { id: 9, name: 'Seated Calf Raise', category: 'Calves', isUnderMaintenance: false },
  { id: 10, name: 'Standing Calf Raise', category: 'Calves', isUnderMaintenance: true },
  { id: 11, name: 'Dumbbell Rack', category: 'Dumbbell Rack', isUnderMaintenance: false },
  { id: 12, name: 'Preacher Curl Bench', category: 'Arms', isUnderMaintenance: false },
  { id: 13, name: 'Bicep Curl Machine', category: 'Arms', isUnderMaintenance: true },
  { id: 14, name: 'Cable Crunch Station', category: 'Abs', isUnderMaintenance: false },
  { id: 15, name: 'Decline Sit-Up Bench', category: 'Abs', isUnderMaintenance: false }
];


const StrengthEquipments = () => {
  const [equipments, setEquipments] = useState(initialEquipments);
  const [filter, setFilter] = useState('All');

  const toggleMaintenance = (id) => {
    setEquipments((prev) =>
      prev.map((eq) =>
        eq.id === id ? { ...eq, isUnderMaintenance: !eq.isUnderMaintenance } : eq
      )
    );
  };

  const filteredEquipments = filter === 'All'
    ? equipments
    : equipments.filter((eq) => eq.category === filter);

  const uniqueCategories = ['All', ...new Set(initialEquipments.map((e) => e.category))];

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Strength Equipments</h3>
          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {uniqueCategories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {filteredEquipments.length === 0 ? (
          <p>No equipment found for selected category.</p>
        ) : (
          <div className="row">
            {filteredEquipments.map((eq) => (
              <div className="col-md-4 mb-3" key={eq.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">{eq.name}</h5>
                    <p className="card-text">
                      <strong>Category:</strong> {eq.category}
                    </p>
                    <p className={`card-text ${eq.isUnderMaintenance ? 'text-danger' : 'text-success'}`}>
                      Status: {eq.isUnderMaintenance ? 'Under Maintenance' : 'Active'}
                    </p>
                    <button
                      className={`btn ${eq.isUnderMaintenance ? 'btn-success' : 'btn-warning'}`}
                      onClick={() => toggleMaintenance(eq.id)}
                    >
                      {eq.isUnderMaintenance ? 'Unmark Maintenance' : 'Mark as Maintenance'}
                    </button>
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

export default StrengthEquipments;
