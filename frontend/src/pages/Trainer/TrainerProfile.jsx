import React, { useState } from 'react';
import TrainerNavbar from '../../components/TrainerNavbar';

const TrainerProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "Mike",
    lastName: "Anderson",
    email: "mike@gymmate.com",
    phone: "+61 412 345 678",
    photo: "/images/trainer_default.jpg"
  });

  const certifications = [
    "Certified Personal Trainer (CPT)",
    "CPR & First Aid",
    "Nutrition Specialist",
    "Strength & Conditioning Coach",
    "Functional Movement Screening (FMS)"
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(profile.photo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewPhoto(imageUrl);
      setProfile(prev => ({ ...prev, photo: imageUrl }));
    }
  };

  const handleSave = () => {
    console.log("Updated Profile:", profile);
    setIsEditing(false);
  };

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-4">
        <h2 className="mb-4">Trainer Profile</h2>
        <div className="row g-4">
          {/* Profile Image */}
          <div className="col-md-4 text-center">
            <img
              src={previewPhoto}
              alt="Trainer"
              className="img-fluid rounded-circle border shadow"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
            {isEditing && (
              <div className="mt-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="form-control"
                />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-3">
              {isEditing ? (
                <>
                  <button className="btn btn-success me-2" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              )}
            </div>

            <hr className="my-4" />

            {/* Certifications */}
            <div>
              <h5 className="mb-3">Certifications</h5>
              <ul className="list-group">
                {certifications.map((cert, idx) => (
                  <li key={idx} className="list-group-item">
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainerProfile;
