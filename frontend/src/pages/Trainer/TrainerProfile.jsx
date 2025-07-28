import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrainerNavbar from '../../components/TrainerNavbar';

const TrainerProfile = () => {
  const trainerId = 1;

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    certifications: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/trainer/profile/${trainerId}`)
      .then(response => {
        console.log("✅ API Response:", response.data);
        setProfile(response.data);
        setApiError("");
        setLoading(false);
      })
      .catch(error => {
        console.error("❌ API Error:", error);
        setApiError("Failed to load trainer profile.");
        setLoading(false);
      });
  }, [trainerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:8080/trainer/${trainerId}`, profile)
      .then(res => {
        console.log("✅ Profile updated:", res.data);
        setApiSuccess("Profile updated successfully.");
        setApiError("");
        setIsEditing(false);
      })
      .catch(err => {
        console.error("❌ Failed to update profile:", err);
        setApiError("Failed to update trainer profile.");
        setApiSuccess("");
      });
  };

  const certList = profile.certifications
    ? profile.certifications.split(',').map(c => c.trim()).filter(Boolean)
    : [];

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (apiError) return <div className="container mt-5 text-danger">{apiError}</div>;

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-4">
        <h2 className="mb-4">Trainer Profile</h2>

        {apiSuccess && <div className="alert alert-success">{apiSuccess}</div>}
        {apiError && <div className="alert alert-danger">{apiError}</div>}

        <div className="row g-4">
          <div className="col-md-12 col-lg-8">
            <form>
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
                  <label className="form-label">Mobile</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="mobile"
                    value={profile.mobile}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Certifications</label>
                  <div className="form-control" style={{ backgroundColor: "#f8f9fa" }}>
                    {certList.length > 0
                      ? certList.map((cert, idx) => (
                        <div key={idx}>{cert}</div>
                      ))
                      : <span className="text-muted">No certifications listed.</span>}
                  </div>
                </div>
              </div>

              <div className="mt-3">
                {isEditing ? (
                  <>
                    <button type="button" className="btn btn-success me-2" onClick={handleSave}>Save Changes</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                  </>
                ) : (
                  <button type="button" className="btn btn-dark" onClick={() => setIsEditing(true)}>Edit Profile</button>
                )}
              </div>
            </form>

            <hr className="my-4" />

            <div>
              <h5>Certifications</h5>
              {certList.length > 0 ? (
                <ul className="list-group">
                  {certList.map((cert, idx) => (
                    <li key={idx} className="list-group-item">
                      {cert}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted">No certifications listed.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainerProfile;
