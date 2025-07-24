import React, { useState } from 'react';
import TrainerNavbar from '../../components/TrainerNavbar';

const initialEquipments = [
  { id: 1, name: 'Treadmill', category: 'Treadmill Machines', isUnderMaintenance: false },
  { id: 2, name: 'Incline Treadmill', category: 'Treadmill Machines', isUnderMaintenance: true },
  { id: 3, name: 'Stationary Bike', category: 'Bikes', isUnderMaintenance: false },
  { id: 4, name: 'Recumbent Bike', category: 'Bikes', isUnderMaintenance: false },
  { id: 5, name: 'Elliptical Trainer', category: 'Ellipticals', isUnderMaintenance: false },
  { id: 6, name: 'Cross Trainer', category: 'Ellipticals', isUnderMaintenance: true },
  { id: 7, name: 'Rowing Machine', category: 'Rowers', isUnderMaintenance: false },
  { id: 8, name: 'Air Bike', category: 'Bikes', isUnderMaintenance: false },
  { id: 9, name: 'Stair Climber', category: 'Climbers', isUnderMaintenance: false },
  { id: 10, name: 'Spin Bike', category: 'Bikes', isUnderMaintenance: true }
];

const CardioEquipments = () => {
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
          <h3>Cardio Equipments</h3>
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

export default CardioEquipments;
