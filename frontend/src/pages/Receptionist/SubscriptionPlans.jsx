import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";

const plansData = [
  { id: 1, name: "Basic", price: 30, duration: "1 Month", description: "Access to gym during working hours" },
  { id: 2, name: "Standard", price: 80, duration: "3 Months", description: "Includes gym and pool access" },
  { id: 3, name: "Premium", price: 150, duration: "6 Months", description: "All access plus personal training" }
];

function SubscriptionPlans() {
  const [plans, setPlans] = useState(plansData);
  const [search, setSearch] = useState("");

  const handleDeletePlan = (id) => {
  if (window.confirm("Are you sure you want to delete this plan?")) {
    setPlans(prevPlans => prevPlans.filter(plan => plan.id !== id));
  }
};

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Form state for new plan
  const [newPlan, setNewPlan] = useState({
    name: "",
    price: "",
    duration: "",
    description: ""
  });

  const filtered = plans.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewPlan({ name: "", price: "", duration: "", description: "" }); // reset
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlan(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPlan = (e) => {
    e.preventDefault();

    // Basic validation
    if (!newPlan.name || !newPlan.price || !newPlan.duration) {
      alert("Please fill in all required fields.");
      return;
    }

    const priceNum = Number(newPlan.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert("Price must be a positive number.");
      return;
    }

    // Add new plan to list with unique id
    const newId = plans.length > 0 ? Math.max(...plans.map(p => p.id)) + 1 : 1;
    const planToAdd = {
      id: newId,
      name: newPlan.name,
      price: priceNum,
      duration: newPlan.duration,
      description: newPlan.description
    };

    setPlans(prev => [...prev, planToAdd]);
    handleCloseModal();
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4>Subscription Plans</h4>
          <small className="text-muted">Manage available subscription options</small>
        </div>
        <button className="btn btn-dark" onClick={handleShowModal}>+ Add Plan</button>
      </div>

      <input
        className="form-control mb-3"
        placeholder="Search plans..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ maxWidth: 320 }}
      />

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Price ($)</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td><b>{p.name}</b></td>
                <td>{p.price}</td>
                <td>{p.duration}</td>
                <td>{p.description}</td>
                <td>
                  <button className="btn btn-outline-secondary btn-sm me-2">
                    <FaEdit />
                  </button>
                  <button
  className="btn btn-outline-danger btn-sm"
  onClick={() => handleDeletePlan(p.id)}
>
  <FaTrash />
</button>

                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">No plans found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Plan Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Subscription Plan</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddPlan}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="planName">
              <Form.Label>Plan Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter plan name"
                name="name"
                value={newPlan.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="planPrice">
              <Form.Label>Price ($) *</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={newPlan.price}
                onChange={handleChange}
                min="1"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="planDuration">
              <Form.Label>Duration *</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 1 Month, 3 Months"
                name="duration"
                value={newPlan.duration}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="planDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Optional description"
                name="description"
                value={newPlan.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="dark" type="submit">
              Add Plan
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default SubscriptionPlans;
