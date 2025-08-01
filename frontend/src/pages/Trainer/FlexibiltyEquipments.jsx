import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrainerNavbar from '../../components/TrainerNavbar';

const FlexibilityEquipments = () => {
  const [equipments, setEquipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('all');

  // ✅ Fetch flexibility equipments
  useEffect(() => {
    axios.get('http://localhost:8080/trainer/equipments/flexibility') 
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEquipments(res.data);
        } else {
          console.error('Unexpected response format:', res.data);
          setEquipments([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching flexibility equipments:', err);
        setEquipments([]);
      });
  }, []);

  // ✅ Toggle maintenance
  const toggleMaintenance = (id, currentStatus) => {
    axios.put(`http://localhost:8080/trainer/equipments/${id}/maintenance`, {
      forMaintenance: !currentStatus
    })
      .then(() => {
        setEquipments((prev) =>
          prev.map((eq) =>
            eq.id === id ? { ...eq, forMaintenance: !currentStatus } : eq
          )
        );
      })
      .catch((err) => {
        console.error('Failed to update maintenance status:', err);
        alert("Failed to update maintenance status.");
      });
  };

  // ✅ Filter and sort logic
  let filtered = equipments.filter(eq =>
    eq.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === 'maintenance') {
    filtered = filtered.filter(eq => eq.forMaintenance === true);
  } else if (sortOption === 'available') {
    filtered = filtered.filter(eq => eq.forMaintenance === false);
  }

  if (sortOption === 'a-z') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'z-a') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-4">
        <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="form-select w-auto"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="all">All</option>
            <option value="a-z">Sort: A–Z</option>
            <option value="z-a">Sort: Z–A</option>
            <option value="maintenance">Only Maintenance</option>
            <option value="available">Only Available</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p>No equipment found.</p>
        ) : (
          <div className="row">
            {filtered.map((eq) => (
              <div className="col-md-4 mb-3" key={eq.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">{eq.name}</h5>
                    <p className="card-text">
                      <strong>Category:</strong> {eq.description}
                    </p>
                    <p className={`card-text ${eq.forMaintenance ? 'text-danger' : 'text-success'}`}>
                      <strong>Status:</strong> {eq.forMaintenance ? 'Under Maintenance' : 'Available'}
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

export default FlexibilityEquipments;
