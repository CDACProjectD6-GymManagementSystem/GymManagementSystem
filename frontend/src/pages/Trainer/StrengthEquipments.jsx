import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrainerNavbar from '../../components/TrainerNavbar';

const StrengthEquipments = () => {
  const [equipments, setEquipments] = useState([]);
  const [filter, setFilter] = useState('All');

  // Fetch from backend
  useEffect(() => {
    axios.get(`http://localhost:8080/trainer/equipments/strength`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEquipments(res.data);
        } else {
          console.error('Unexpected response format:', res.data);
          setEquipments([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching strength equipments:', err);
        setEquipments([]);
      });
  }, []);

  // Toggle maintenance
  const toggleMaintenance = (id, currentStatus) => {
    axios.put(`/api/equipments/${id}/maintenance`, { forMaintenance: !currentStatus })
      .then(() => {
        setEquipments((prev) =>
          prev.map((eq) =>
            eq.id === id ? { ...eq, forMaintenance: !currentStatus } : eq
          )
        );
      })
      .catch((err) => console.error('Failed to update maintenance status:', err));
  };

  // Get unique subcategories from `description` field
  const uniqueCategories = ['All', ...new Set(equipments.map((e) => e.description))];

  // Filter by subcategory (description)
  const filteredEquipments =
    filter === 'All'
      ? equipments
      : equipments.filter((eq) => eq.description === filter);

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
                      <strong>Category:</strong> {eq.description}
                    </p>
                    <p className={`card-text ${eq.forMaintenance ? 'text-danger' : 'text-success'}`}>
                      <strong>Status:</strong> {eq.forMaintenance ? 'Under Maintenance' : 'Active'}
                    </p>
                    <button
                      className={`btn ${eq.forMaintenance ? 'btn-success' : 'btn-warning'}`}
                      onClick={() => toggleMaintenance(eq.id, eq.forMaintenance)}
                    >
                      {eq.forMaintenance ? 'Unmark Maintenance' : 'Mark as Maintenance'}
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
