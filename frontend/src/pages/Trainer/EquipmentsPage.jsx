import React from 'react';
import { useNavigate } from 'react-router-dom';
import TrainerNavbar from '../../components/TrainerNavbar';
import '../../styles/EquipmentsPage.css'; // optional: custom styling file

const categories = [
  {
    title: 'Cardio Equipment',
    image: '/images/Cardio.png',
    route: 'cardio',
    activeCount: 10,
    maintenanceCount: 2
  },
  {
    title: 'Strength Equipment',
    image: '/images/Strength.png',
    route: 'strength',
    activeCount: 8,
    maintenanceCount: 1
  }
];

const EquipmentsPage = () => {
  const navigate = useNavigate();

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
                  src={cat.image}
                  className="card-img-top equipment-image"
                  alt={cat.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{cat.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Active:</strong> {cat.activeCount}
                  </p>
                  <p className="card-text text-warning">
                    <strong>Under Maintenance:</strong> {cat.maintenanceCount}
                  </p>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => navigate(`/trainer/equipments/${cat.route}`)}
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
