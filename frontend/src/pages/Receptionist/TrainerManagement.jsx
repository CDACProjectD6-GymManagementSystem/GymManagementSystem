// TrainerManagement.jsx
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";

const trainersData = [
  {
    id: 1,
    firstName: "Alice", //
    lastName: "Brown", //
    expertise: "Yoga", // Maps to 'expertise'
    mobile: "111-222-3333", // Maps to 'mobile'
    email: "alice@fitgym.com", //
    gender: "FEMALE", // Added gender
    salary: 50000.00, // Added salary
    certifications: "RYT 200, Certified Yoga Instructor" // Added certifications
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Green",
    expertise: "Weightlifting", //
    mobile: "444-555-6666", //
    email: "bob@fitgym.com", //
    gender: "MALE", //
    salary: 60000.00, //
    certifications: "CSCS, ACE Certified Personal Trainer" //
  },
  {
    id: 3,
    firstName: "Cathy",
    lastName: "Blue",
    expertise: "Cardio", //
    mobile: "777-888-9999", //
    email: "cathy@fitgym.com", //
    gender: "FEMALE", //
    salary: 55000.00, //
    certifications: "Spin Instructor, HIIT Specialist" //
  }
];

function TrainerManagement() {
  const [trainers, setTrainers] = useState(trainersData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form state for new/editing trainer - Updated to match BaseEntity/Trainer fields
  const [currentTrainer, setCurrentTrainer] = useState({
    firstName: "", //
    lastName: "", //
    expertise: "", // Maps to 'expertise'
    mobile: "", // Maps to 'mobile'
    email: "", //
    gender: "MALE", // Added gender
    certifications: "" // Added certifications
  });

  const filtered = trainers.filter(
    t =>
      `${t.firstName} ${t.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      t.expertise.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleShowModal = (trainerToEdit = null) => {
    if (trainerToEdit) {
      setEditingId(trainerToEdit.id);
      setCurrentTrainer({ ...trainerToEdit });
    } else {
      setEditingId(null);
      setCurrentTrainer({
        firstName: "",
        lastName: "",
        expertise: "",
        mobile: "",
        email: "",
        gender: "MALE",
        certifications: ""
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setCurrentTrainer({
      firstName: "",
      lastName: "",
      expertise: "",
      mobile: "",
      email: "",
      gender: "MALE",
      certifications: ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTrainer(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveTrainer = (e) => {
    e.preventDefault();

    if (!currentTrainer.firstName || !currentTrainer.lastName || !currentTrainer.expertise || !currentTrainer.mobile || !currentTrainer.email || !currentTrainer.certifications) {
      alert("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(currentTrainer.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const mobileRegex = /^[0-9-+()\s]+$/;
    if (!mobileRegex.test(currentTrainer.mobile)) {
      alert("Please enter a valid mobile number.");
      return;
    }

    if (editingId !== null) {
      setTrainers(trainers.map(t => (t.id === editingId ? { ...currentTrainer, id: editingId } : t)));
      alert("Trainer updated successfully!");
    } else {
      const newId = trainers.length > 0 ? Math.max(...trainers.map(t => t.id)) + 1 : 1;
      const trainerToAdd = {
        id: newId,
        ...currentTrainer
      };
      setTrainers(prev => [...prev, trainerToAdd]);
      alert("Trainer added successfully!");
    }

    handleCloseModal();
  };

  const handleDeleteTrainer = (id) => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      setTrainers(trainers.filter(t => t.id !== id));
      alert("Trainer deleted successfully!");
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4>Trainer Management</h4>
          <small className="text-muted">Manage your gym trainers</small>
        </div>
        <button className="btn btn-dark" onClick={() => handleShowModal()}>+ Add Trainer</button>
      </div>

      <input
        className="form-control mb-3"
        placeholder="Search trainers..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ maxWidth: 320 }}
      />

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Expertise</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Certifications</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td><b>{t.firstName} {t.lastName}</b></td> {/* Display first and last name */}
                <td>{t.expertise}</td> {/* Display expertise */}
                <td>{t.mobile}</td> {/* Display mobile */}
                <td>{t.email}</td> {/* */}
                <td>{t.gender}</td> {/* Display gender */}
                <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={t.certifications}>{t.certifications}</td> {/* Display certifications */}
                <td>
                  <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleShowModal(t)}><FaEdit /></button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteTrainer(t.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-muted">No trainers found.</td> {/* Adjusted colspan */}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Trainer Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Trainer" : "Add New Trainer"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveTrainer}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="trainerFirstName">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={currentTrainer.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="trainerLastName">
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={currentTrainer.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="trainerExpertise">
              <Form.Label>Expertise *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter expertise (e.g. Yoga, Weightlifting)"
                name="expertise"
                value={currentTrainer.expertise}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="trainerMobile">
              <Form.Label>Mobile *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                name="mobile"
                value={currentTrainer.mobile}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="trainerEmail">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={currentTrainer.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="trainerGender">
              <Form.Label>Gender *</Form.Label>
              <Form.Select
                name="gender"
                value={currentTrainer.gender}
                onChange={handleChange}
                required
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="trainerCertifications">
              <Form.Label>Certifications *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Comma-separated certifications (e.g., NASM, ACE)"
                name="certifications"
                value={currentTrainer.certifications}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button variant="dark" type="submit">{editingId ? "Update Trainer" : "Add Trainer"}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default TrainerManagement;