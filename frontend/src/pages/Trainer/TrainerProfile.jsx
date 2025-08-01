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
    imageUrl: '',
    imagePublicId: '',
  });

  const [originalProfile, setOriginalProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  // Load profile on mount
  useEffect(() => {
    axios.get(`http://localhost:8080/trainer/profile/${trainerId}`)
      .then(res => {
        setProfile(res.data);
        setOriginalProfile(res.data);
      })
      .catch(() => setApiError("Failed to load trainer profile"));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Handle photo selection
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  // Upload photo and update state
  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    setUploading(true);

    try {
      const res = await axios.post(`http://localhost:8080/trainer/upload/${trainerId}`, formData);
      setProfile(prev => ({
        ...prev,
        imageUrl: res.data.secure_url,
        imagePublicId: res.data.public_id,
      }));
      setApiSuccess("Photo uploaded successfully");
      setApiError('');
    } catch {
      setApiError("Failed to upload photo");
      setApiSuccess('');
    }

    setUploading(false);
    setSelectedFile(null);
  };

  // Delete photo from Cloudinary + DB
  const handleDeletePhoto = async () => {
    try {
      await axios.delete(`http://localhost:8080/trainer/delete/${trainerId}`);
      setProfile(prev => ({
        ...prev,
        imageUrl: '',
        imagePublicId: ''
      }));
      setApiSuccess("Photo deleted successfully");
      setApiError('');
    } catch {
      setApiError("Failed to delete photo");
      setApiSuccess('');
    }
  };

  // Save profile changes
  const handleSave = () => {
    axios.put(`http://localhost:8080/trainer/${trainerId}`, profile)
      .then(() => {
        setOriginalProfile(profile);
        setIsEditing(false);
        setApiSuccess("Profile updated successfully");
        setApiError('');
      })
      .catch(() => {
        setApiError("Failed to update trainer profile");
        setApiSuccess('');
      });
  };

  // Cancel editing and restore original state
  const handleCancel = () => {
    setProfile(originalProfile);
    setSelectedFile(null);
    setApiSuccess('');
    setApiError('');
    setIsEditing(false);
  };

  const certList = profile.certifications
    ? profile.certifications.split(',').map(c => c.trim()).filter(Boolean)
    : [];

  return (
    <>
      <TrainerNavbar />
      <div className="container mt-4">
        <h2 className="mb-3">Trainer Profile</h2>

        {apiSuccess && <div className="alert alert-success">{apiSuccess}</div>}
        {apiError && <div className="alert alert-danger">{apiError}</div>}

        <div className="row">
          {/* Left: Unified Profile Photo Section */}
          <div className="col-md-4 mb-4">
            <h5>Profile Photo</h5>
            {profile.imageUrl ? (
              <>
                <img
                  src={profile.imageUrl}
                  alt="Trainer"
                  className="img-thumbnail mb-2"
                  style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                />
                {isEditing && (
                  <button className="btn btn-danger btn-sm mb-2" onClick={handleDeletePhoto}>
                    Delete Photo
                  </button>
                )}
              </>
            ) : (
              <div className="text-muted mb-2">No profile photo uploaded.</div>
            )}

            {isEditing && (
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            )}
          </div>

          {/* Right: Form Section */}
          <div className="col-md-8">
            <form>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  className="form-control"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  className="form-control"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mobile</label>
                <input
                  className="form-control"
                  name="mobile"
                  value={profile.mobile}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Certifications</label>
                <textarea
                  className="form-control"
                  name="certifications"
                  value={profile.certifications}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              {isEditing ? (
                <div className="mb-3">
                  <button className="btn btn-success me-2" type="button" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button className="btn btn-secondary" type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="btn btn-dark" type="button" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              )}
            </form>

            <hr />
            <h5>Certifications</h5>
            {certList.length > 0 ? (
              <ul className="list-group">
                {certList.map((cert, idx) => (
                  <li key={idx} className="list-group-item">{cert}</li>
                ))}
              </ul>
            ) : (
              <div className="text-muted">No certifications listed.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainerProfile;
