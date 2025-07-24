import React from 'react';
import { useParams } from 'react-router-dom';
import TrainerNavbar from '../../components/TrainerNavbar';

const EquipmentEditor = () => {
  const { userId } = useParams();

  return (
    <>
    <TrainerNavbar />
    <div className="container mt-4">
      <h3>Gym Equipment Plan for User ID: {userId}</h3>
      <textarea className="form-control" rows="6" defaultValue="Treadmill: 20 mins..." />
      <button className="btn btn-primary mt-3">Save Changes</button>
    </div>
    </>
  );
};

export default EquipmentEditor;
