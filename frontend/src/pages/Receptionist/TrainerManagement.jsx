import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";

// Initial dummy trainers data
const trainersData = [
  { id: 1, name: "Alice Brown", specialty: "Yoga", phone: "111-222-3333", email: "alice@fitgym.com" },
  { id: 2, name: "Bob Green", specialty: "Weightlifting", phone: "444-555-6666", email: "bob@fitgym.com" },
  { id: 3, name: "Cathy Blue", specialty: "Cardio", phone: "777-888-9999", email: "cathy@fitgym.com" }
];

function TrainerManagement() {
  const [trainers, setTrainers] = useState(trainersData);
  const [search, setSearch] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Form state for new trainer
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    specialty: "",
    phone: "",
    email: ""
  });

  const filtered = trainers.filter(
    t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.specialty.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewTrainer({ name: "", specialty: "", phone: "", email: "" }); // reset form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTrainer(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTrainer = (e) => {
    e.preventDefault();

    // Basic validation
    if (!newTrainer.name || !newTrainer.specialty || !newTrainer.phone || !newTrainer.email) {
      alert("Please fill in all fields.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newTrainer.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone number basic validation (digits, dashes, spaces, parentheses)
    const phoneRegex = /^[0-9-+()\s]+$/;
    if (!phoneRegex.test(newTrainer.phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    // Generate unique id (next max id + 1)
    const newId = trainers.length > 0 ? Math.max(...trainers.map(t => t.id)) + 1 : 1;
    const trainerToAdd = {
      id: newId,
      ...newTrainer
    };

    setTrainers(prev => [...prev, trainerToAdd]);
    handleCloseModal();
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4>Trainer Management</h4>
          <small className="text-muted">Manage your gym trainers</small>
        </div>
        <button className="btn btn-dark" onClick={handleShowModal}>+ Add Trainer</button>
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
              <th>Specialty</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td><b>{t.name}</b></td>
                <td>{t.specialty}</td>
                <td>{t.phone}</td>
                <td>{t.email}</td>
                <td>
                  <button className="btn btn-outline-secondary btn-sm me-2"><FaEdit /></button>
                  <button className="btn btn-outline-danger btn-sm"><FaTrash /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">No trainers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Trainer Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Trainer</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddTrainer}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="trainerName">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="name"
                value={newTrainer.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="trainerSpecialty">
              <Form.Label>Specialty *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter specialty (e.g. Yoga)"
                name="specialty"
                value={newTrainer.specialty}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="trainerPhone">
              <Form.Label>Phone *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phone"
                value={newTrainer.phone}
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
                value={newTrainer.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button variant="dark" type="submit">Add Trainer</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default TrainerManagement;
