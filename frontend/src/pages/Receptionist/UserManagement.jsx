import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";

// Dummy initial members data
const membersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@email.com",
    phone: "123-456-7890",
    membership: "Premium",
    status: "Active",
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@email.com",
    phone: "098-765-4321",
    membership: "Basic",
    status: "Active",
    joinDate: "2024-02-20"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@email.com",
    phone: "555-123-4567",
    membership: "Premium",
    status: "Expired",
    joinDate: "2023-12-10"
  }
];

function UserManagement() {
  const [members, setMembers] = useState(membersData);
  const [search, setSearch] = useState("");

  // Modal visibility state
  const [showModal, setShowModal] = useState(false);

  // Form state for new user
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    membership: "Basic",
    status: "Active",
    joinDate: ""
  });

  // Filter members by search input
  const filtered = members.filter(
    m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search)
  );

  // Open modal
  const handleShowModal = () => setShowModal(true);

  // Close modal and reset form
  const handleCloseModal = () => {
    setShowModal(false);
    setNewUser({
      name: "",
      email: "",
      phone: "",
      membership: "Basic",
      status: "Active",
      joinDate: ""
    });
  };

  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  // Add new user submit handler
  const handleAddUser = (e) => {
    e.preventDefault();

    // Basic validation
    if (!newUser.name || !newUser.email || !newUser.phone || !newUser.joinDate) {
      alert("Please fill in all required fields (name, email, phone, join date).");
      return;
    }

    // Optional: rudimentary email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Optional: rudimentary phone number check (digits and basic symbols)
    const phoneRegex = /^[0-9-+()\s]+$/;
    if (!phoneRegex.test(newUser.phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    // Generate unique ID for new user
    const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;

    // Create new user object
    const userToAdd = {
      id: newId,
      ...newUser
    };

    // Add to members list
    setMembers(prev => [...prev, userToAdd]);

    // Close modal and reset form
    handleCloseModal();
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4>User Management</h4>
          <small className="text-muted">Manage gym members and their information</small>
        </div>
        <button className="btn btn-dark" onClick={handleShowModal}>
          + Add User
        </button>
      </div>

      <input
        className="form-control mb-3"
        placeholder="Search users…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ maxWidth: 320 }}
      />

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Membership</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id}>
                <td><b>{m.name}</b></td>
                <td>{m.email}</td>
                <td>{m.phone}</td>
                <td>{m.membership}</td>
                <td>
                  <span className={`badge ${m.status === "Active" ? "bg-dark" : "bg-danger"}`}>
                    {m.status}
                  </span>
                </td>
                <td>{m.joinDate}</td>
                <td>
                  <button className="btn btn-outline-secondary btn-sm me-2"><FaEdit /></button>
                  <button className="btn btn-outline-danger btn-sm"><FaTrash /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddUser}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="name"
                value={newUser.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userEmail">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userPhone">
              <Form.Label>Phone *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phone"
                value={newUser.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userMembership">
              <Form.Label>Membership Type *</Form.Label>
              <Form.Select
                name="membership"
                value={newUser.membership}
                onChange={handleChange}
                required
              >
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="userStatus">
              <Form.Label>Status *</Form.Label>
              <Form.Select
                name="status"
                value={newUser.status}
                onChange={handleChange}
                required
              >
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="userJoinDate">
              <Form.Label>Join Date *</Form.Label>
              <Form.Control
                type="date"
                name="joinDate"
                value={newUser.joinDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="dark" type="submit">
              Add User
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default UserManagement;
