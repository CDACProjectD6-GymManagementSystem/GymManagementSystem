import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

const dummyReceptionistProfile = {
  id: 1, 
  firstName: "Emily",
  lastName: "Clark",
  email: "emily.clark@fitgym.com",
  mobile: "987-654-3210",
  address: "456 Gym Ave, Metropolis",
  gender: "FEMALE",
  salary: 45000.00 // This field will not be displayed or editable in the UI
};

function ReceptionistProfile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    gender: "FEMALE" 
  });
  const [message, setMessage] = useState(null); 

  useEffect(() => {
  setProfile({
      firstName: dummyReceptionistProfile.firstName,
      lastName: dummyReceptionistProfile.lastName,
      email: dummyReceptionistProfile.email,
      mobile: dummyReceptionistProfile.mobile,
      address: dummyReceptionistProfile.address,
      gender: dummyReceptionistProfile.gender
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    setMessage(null); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!profile.firstName || !profile.lastName || !profile.email || !profile.mobile || !profile.address) {
      setMessage({ type: "danger", text: "Please fill in all required fields." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      setMessage({ type: "danger", text: "Please enter a valid email address." });
      return;
    }

    const mobileRegex = /^[0-9-+()\s]+$/;
    if (!mobileRegex.test(profile.mobile)) {
      setMessage({ type: "danger", text: "Please enter a valid mobile number." });
      return;
    }

    console.log("Saving receptionist profile:", profile);
    
    setTimeout(() => {
      setMessage({ type: "success", text: "Profile updated successfully!" });
    }, 1000);
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h4>My Profile</h4>
      <small className="text-muted mb-4 d-block">View and update your personal information.</small>

      {message && <Alert variant={message.type}>{message.text}</Alert>}

      <Card className="p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="profileFirstName">
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="profileLastName">
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="profileEmail">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="profileMobile">
            <Form.Label>Mobile *</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              value={profile.mobile}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="profileAddress">
            <Form.Label>Address *</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="profileGender">
            <Form.Label>Gender *</Form.Label>
            <Form.Select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              required
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </Form.Select>
          </Form.Group>

          <Button variant="dark" type="submit">
            Save Changes
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default ReceptionistProfile;