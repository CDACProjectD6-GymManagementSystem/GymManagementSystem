import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrainerNavbar from '../../components/TrainerNavbar';

const CardioEquipments = () => {
  const [equipments, setEquipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('all');

  // ✅ Fetch cardio equipment list
  useEffect(() => {
    axios.get('http://localhost:8080/trainer/equipments/cardio')
      .then(res => setEquipments(res.data))
      .catch(err => {
        console.error('Error fetching cardio equipments:', err);
        alert('Failed to load equipment. Please try again later.');
      });
  }, []);

  // ✅ Apply search filter
  let filtered = equipments.filter(eq =>
    eq.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Apply status-based filtering
  if (sortOption === 'maintenance') {
    filtered = filtered.filter(eq => eq.forMaintenance === true);
  } else if (sortOption === 'available') {
    filtered = filtered.filter(eq => eq.forMaintenance === false);
  }

  // ✅ Apply sorting if applicable
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
            {filtered.map(eq => (
              <div className="col-md-4 mb-3" key={eq.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">{eq.name}</h5>
                    <p><strong>Category:</strong> {eq.description}</p>
                    <p className={eq.forMaintenance ? 'text-danger' : 'text-success'}>
                      <strong>Status:</strong> {eq.forMaintenance ? 'Under Maintenance' : 'Available'}
                    </p>
                    <button
                      className={`btn ${eq.forMaintenance ? 'btn-success' : 'btn-warning'}`}
                      onClick={() =>
                        axios.put(`http://localhost:8080/trainer/equipments/${eq.id}/maintenance`, {
                          forMaintenance: !eq.forMaintenance
                        }).then(() =>
                          setEquipments(prev =>
                            prev.map(e =>
                              e.id === eq.id ? { ...e, forMaintenance: !eq.forMaintenance } : e
                            )
                          )
                        ).catch(err => {
                          console.error('Maintenance update failed:', err);
                          alert("Failed to update maintenance status.");
                        })
                      }
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

export default CardioEquipments;
