// SubscriptionPlans.jsx
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

// Field options for UI based on backend entity
const gymAccessOptions = [ // Corresponds to Subscription.GymAccess enum
  { value: "OFF_PEAK_HOURS", label: "Off-peak hours" },
  { value: "FULLTIME", label: "Full Time" }
];

// Mismatch Note: dietConsultation is boolean in backend.
// Frontend previously had "Once at start" / "Monthly".
// For now, mapping boolean to a simple Yes/No, assuming 'true' means consultation is available.
const dietConsultationOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" }
];

const groupClassOptions = [ //
  { value: "Yoga", label: "Yoga" },
  { value: "Zumba", label: "Zumba" },
  { value: "HIIT", label: "HIIT" },
  { value: "Pilates", label: "Pilates" },
  { value: "Spin", label: "Spin" }
];

const durations = Array.from({ length: 12 }, (_, i) => i + 1); // 1 to 12 months (integers)

// Demo data - Mapped to match Java Subscription entity fields
const plansData = [
  {
    id: 1,
    name: "Basic Access",
    description: "Simple gym access during off-peak hours with basic facilities.",
    access: "OFF_PEAK_HOURS", // Matches GymAccess enum
    dietConsultation: false, // Mapped to boolean
    groupClasses: ["Yoga"], // Maps to List<String>
    isSauna: false, // Maps to boolean
    duration: 1, // Number of months
    price: 30.0, // Maps to double
    discount: 0.0, // Maps to double
    isActive: true // Maps to boolean
  },
  {
    id: 2,
    name: "Standard Elite",
    description: "Full-time gym access, includes Zumba classes and monthly diet consultation.",
    access: "FULLTIME",
    dietConsultation: true,
    groupClasses: ["Zumba"],
    isSauna: true,
    duration: 3,
    price: 80.0,
    discount: 10.0,
    isActive: true
  },
  {
  id: 3,
  name: "Family Plus",
  description: "Membership for up to 4 family members, including access to group yoga and family swim hours.",
  access: "FULLTIME",
  dietConsultation: false,
  groupClasses: ["Yoga", "HIIT"],
  isSauna: true,
  duration: 6,
  price: 250.0,
  discount: 20.0,
  isActive: true
},
{
  id: 4,
  name: "Elite Performance",
  description: "All facility access, unlimited personal training, free sports nutrition workshops, and priority booking.",
  access: "FULLTIME",
  dietConsultation: true,
  groupClasses: ["HIIT", "Yoga", "Zumba"],
  isSauna: true,
  duration: 12,
  price: 500.0,
  discount: 30.0,
  isActive: true
}
];

function SubscriptionPlans() {
  const [plans, setPlans] = useState(plansData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const defaultPlan = {
    name: "",
    description: "",
    access: "OFF_PEAK_HOURS", // Default GymAccess
    dietConsultation: false, // Default boolean
    groupClasses: [], // Default empty list
    isSauna: false, // Default boolean
    duration: 1, // Default to 1 month
    price: "",
    discount: 0.0,
    isActive: true // Default to active
  };
  const [currentPlan, setCurrentPlan] = useState(defaultPlan);

  const filtered = plans.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleShowModal = (planToEdit = null) => {
    if (planToEdit) {
      setEditingId(planToEdit.id);
      setCurrentPlan({ ...planToEdit });
    } else {
      setEditingId(null);
      setCurrentPlan(defaultPlan);
    }
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setCurrentPlan(defaultPlan);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "groupClasses") {
      setCurrentPlan(prev => {
        const prevList = prev.groupClasses || [];
        return {
          ...prev,
          groupClasses: checked
            ? [...prevList, value]
            : prevList.filter((v) => v !== value)
        };
      });
    } else if (name === "dietConsultation" || name === "isSauna" || name === "isActive") {
        setCurrentPlan(prev => ({ // Handle boolean values from radio/checkbox
            ...prev,
            [name]: value === "true" // Convert string "true"/"false" from radio to boolean
        }));
    } else {
      setCurrentPlan(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSavePlan = (e) => {
    e.preventDefault();

    if (!currentPlan.name || !currentPlan.price || !currentPlan.duration) {
      alert("Please fill in all required fields.");
      return;
    }
    if (isNaN(Number(currentPlan.price)) || Number(currentPlan.price) <= 0) {
      alert("Price must be a positive number.");
      return;
    }
    if (isNaN(Number(currentPlan.discount)) || Number(currentPlan.discount) < 0 || Number(currentPlan.discount) > 100) {
        alert("Discount must be a number between 0 and 100.");
        return;
    }

    // Convert price and discount to numbers before saving
    const planToSave = {
        ...currentPlan,
        price: Number(currentPlan.price),
        discount: Number(currentPlan.discount)
    };

    if (editingId !== null) {
      setPlans(plans.map(p => (p.id === editingId ? { ...planToSave, id: editingId } : p)));
      alert("Subscription plan updated successfully!");
    } else {
      const newId = plans.length ? Math.max(...plans.map(p => p.id)) + 1 : 1;
      setPlans([...plans, { ...planToSave, id: newId }]);
      alert("Subscription plan added successfully!");
    }
    handleCloseModal();
  };

  const handleDeletePlan = (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter(p => p.id !== id));
      alert("Subscription plan deleted successfully!");
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4>Subscription Plans</h4>
          <small className="text-muted">Manage available subscription options</small>
        </div>
        <button className="btn btn-dark" onClick={() => handleShowModal()}>+ Add Plan</button>
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
              <th>Name</th>
              <th>Description</th>
              <th>Gym Access</th>
              <th>Diet Consultation</th>
              <th>Group Classes</th>
              <th>Sauna Access</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="11" className="text-center text-muted">No plans found.</td> {/* Adjusted colspan */}
              </tr>
            )}
            {filtered.map(p => (
              <tr key={p.id}>
                <td><b>{p.name}</b></td>
                <td style={{whiteSpace:'pre-wrap'}}>{p.description}</td>
                <td>{gymAccessOptions.find(opt => opt.value === p.access)?.label}</td> {/* Display label for enum */}
                <td>{p.dietConsultation ? "Yes" : "No"}</td> {/* Display Yes/No for boolean */}
                <td>{Array.isArray(p.groupClasses) ? p.groupClasses.join(", ") : ""}</td>
                <td>{p.isSauna ? "Yes" : "No"}</td> {/* Display Yes/No for boolean */}
                <td>{p.duration} month{p.duration > 1 ? 's' : ''}</td> {/* Display duration in months */}
                <td>${p.price.toFixed(2)}</td> {/* Display price */}
                <td>{p.discount.toFixed(0)}%</td> {/* Display discount */}
                <td>
                  <span className={`badge ${p.isActive ? "bg-dark" : "bg-danger"}`}>
                    {p.isActive ? "Yes" : "No"} {/* Display isActive status */}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleShowModal(p)}>
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
          </tbody>
        </table>
      </div>

      {/* Add/Edit Plan Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit" : "Add New"} Subscription Plan</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSavePlan}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="planName">
              <Form.Label>Plan Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter plan name"
                name="name"
                value={currentPlan.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="planDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Plan description"
                name="description"
                value={currentPlan.description}
                onChange={handleChange}
              />
            </Form.Group>
            
            {/* Gym Access */}
            <Form.Group className="mb-3">
              <Form.Label>Gym Access *</Form.Label>
              <div>
                {gymAccessOptions.map(opt => (
                    <Form.Check
                        inline
                        key={opt.value}
                        label={opt.label}
                        type="radio"
                        name="access"
                        value={opt.value}
                        checked={currentPlan.access === opt.value}
                        onChange={handleChange}
                        required
                    />
                ))}
              </div>
            </Form.Group>

            {/* Diet Consultation */}
            <Form.Group className="mb-3">
              <Form.Label>Diet Consultation *</Form.Label>
              <div>
                {dietConsultationOptions.map(opt => (
                    <Form.Check
                        inline
                        key={opt.value.toString()}
                        label={opt.label}
                        type="radio"
                        name="dietConsultation"
                        value={opt.value.toString()} // Convert boolean to string for radio value
                        checked={currentPlan.dietConsultation === opt.value}
                        onChange={handleChange}
                        required
                    />
                ))}
              </div>
            </Form.Group>

            {/* Group Classes */}
            <Form.Group className="mb-3">
              <Form.Label>Group Classes</Form.Label>
              <div>
                {groupClassOptions.map(opt => (
                  <Form.Check
                    inline
                    key={opt.value}
                    label={opt.label}
                    name="groupClasses"
                    type="checkbox"
                    value={opt.value}
                    checked={currentPlan.groupClasses.includes(opt.value)}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </Form.Group>
            
            {/* Sauna Access */}
            <Form.Group className="mb-3">
              <Form.Label>Sauna Access *</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Yes"
                  name="isSauna"
                  value="true"
                  checked={currentPlan.isSauna === true}
                  onChange={handleChange}
                  required
                />
                <Form.Check
                  inline
                  type="radio"
                  label="No"
                  name="isSauna"
                  value="false"
                  checked={currentPlan.isSauna === false}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            {/* Duration */}
            <Form.Group className="mb-3" controlId="planDuration">
              <Form.Label>Duration (Months) *</Form.Label>
              <Form.Select
                name="duration"
                value={currentPlan.duration}
                onChange={handleChange}
                required
              >
                {durations.map((dur) => (
                  <option key={dur} value={dur}>{dur} month{dur > 1 ? 's' : ''}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Price */}
            <Form.Group className="mb-3" controlId="planPrice">
              <Form.Label>Price ($) *</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={currentPlan.price}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                required
              />
            </Form.Group>

            {/* Discount */}
            <Form.Group className="mb-3" controlId="planDiscount">
              <Form.Label>Discount (%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g. 10"
                name="discount"
                value={currentPlan.discount}
                onChange={handleChange}
                min="0"
                max="100"
                required
              />
            </Form.Group>

            {/* Is Active */}
            <Form.Group className="mb-3" controlId="planIsActive">
              <Form.Check
                type="checkbox"
                label="Is Active"
                name="isActive"
                checked={currentPlan.isActive}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="dark" type="submit">
              {editingId ? "Update Plan" : "Add Plan"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default SubscriptionPlans;