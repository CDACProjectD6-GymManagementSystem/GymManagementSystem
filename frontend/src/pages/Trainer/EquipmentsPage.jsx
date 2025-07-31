import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TrainerNavbar from '../../components/TrainerNavbar';
import '../../styles/EquipmentsPage.css';

// Map category enum to images
const categoryImages = {
  CARDIO: '/images/Cardio.png',
  STRENGTH: '/images/Strength.png',
  FLEXIBILITY: '/images/Flexibility.png',
  FREE_WEIGHTS: '/images/FreeWeights.png',
  RESISTANCE_MACHINES: '/images/ResistanceMachines.png'
};

const EquipmentsPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/trainer/equipments`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch equipment categories:', error);
      });
  }, []);

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-4">
        <h2 className="mb-4">Gym Equipment Categories</h2>
        <div className="row">
          {categories.map((cat, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 shadow text-center">
                <img
                  src={categoryImages[cat.category] || '/images/default.png'}
                  className="card-img-top equipment-image"
                  alt={cat.category}
                />
                <div className="card-body">
                  <h5 className="card-title">{cat.category.replace('_', ' ')} Equipment</h5>
                  <p className="card-text mb-1">
                    <strong>Active:</strong> {cat.activeCount}
                  </p>
                  <p className="card-text text-warning">
                    <strong>Under Maintenance:</strong> {cat.maintenanceCount}
                  </p>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => navigate(`/trainer/equipments/${cat.category.toLowerCase()}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EquipmentsPage;
