import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button, Form, Alert } from "react-bootstrap";

// Dummy Subscription Plans data (assuming you'd fetch this from backend /api/subscriptions)
const dummySubscriptionPlans = [
  { id: 101, name: "Basic Access" },
  { id: 102, name: "Standard Elite" },
  { id: 103, name: "Family Plus" },
  { id: 104, name: "Elite Performance" }
];

// Dummy initial members data - Updated to match UserEntity fields
const membersData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@email.com",
    mobile: "123-456-7890",
    address: "Pune",
    gender: "MALE",
    isSubscribed: true,
    isActive: true,
    subscriptionId: dummySubscriptionPlans[0],
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@email.com",
    mobile: "098-765-4321",
    address: "Mumbai",
    gender: "FEMALE",
    isSubscribed: true,
    isActive: true,
    subscriptionId: dummySubscriptionPlans[1],
    joinDate: "2024-02-20"
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike@email.com",
    mobile: "555-123-4567",
    address: "Goa",
    gender: "MALE",
    isSubscribed: false,
    isActive: false,
    subscriptionId: null,
    joinDate: "2023-12-10"
  }
];

function UserManagement({ onProceedToPayment }) {
  const [members, setMembers] = useState(membersData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null); 
  const [savedUserId, setSavedUserId] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    gender: "MALE",
    isSubscribed: false,
    isActive: true,
    subscriptionId: "",
    joinDate: ""
  });

  const filtered = members.filter(
    m =>
      `${m.firstName} ${m.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.mobile.includes(search)
  );

  const handleShowModal = (userToEdit = null) => {
    if (userToEdit) {
      setEditingId(userToEdit.id);
      setCurrentUser({
        ...userToEdit,
        subscriptionId: userToEdit.subscriptionId ? userToEdit.subscriptionId.id : ""
      });
    } else {
      setEditingId(null);
      setCurrentUser({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address: "",
        gender: "MALE",
        isSubscribed: false,
        isActive: true,
        subscriptionId: "",
        joinDate: ""
      });
    }
    setShowModal(true);
    setMessage(null); 
    setSavedUserId(null); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setSavedUserId(null); 
    setMessage(null); 
    setCurrentUser({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: "",
      gender: "MALE",
      isSubscribed: false,
      isActive: true,
      subscriptionId: "",
      joinDate: ""
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveUser = (e) => {
    e.preventDefault();

    if (!currentUser.firstName || !currentUser.lastName || !currentUser.email || !currentUser.mobile || !currentUser.address || !currentUser.joinDate) {
      setMessage({ type: "danger", text: "Please fill in all required fields." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(currentUser.email)) {
      setMessage({ type: "danger", text: "Please enter a valid email address." });
      return;
    }

    const mobileRegex = /^[0-9-+()\s]+$/;
    if (!mobileRegex.test(currentUser.mobile)) {
      setMessage({ type: "danger", text: "Please enter a valid mobile number." });
      return;
    }

    const selectedSubscription = dummySubscriptionPlans.find(plan => plan.id === Number(currentUser.subscriptionId));
    let userIdToSave = editingId;

    if (editingId !== null) {
      setMembers(members.map(m => (
        m.id === editingId
          ? { ...currentUser, id: editingId, subscriptionId: selectedSubscription }
          : m
      )));
      setMessage({ type: "success", text: "User updated successfully!" });
    } else {
      const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
      const userToAdd = {
        id: newId,
        ...currentUser,
        subscriptionId: selectedSubscription
      };
      setMembers(prev => [...prev, userToAdd]);
      userIdToSave = newId; 
      setMessage({ type: "success", text: "User added successfully! You can now proceed to payment." });
    }
    setSavedUserId(userIdToSave); 
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setMembers(members.filter(m => m.id !== id));
      setMessage({ type: "success", text: "User deleted successfully!" });
    }
  };

  const handleProceedToPaymentClick = () => {
    handleCloseModal(); // Close the UserManagement modal
    if (onProceedToPayment && savedUserId) {
        onProceedToPayment(savedUserId); // Call the callback to switch tab and pass user ID
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4>User Management</h4>
          <small className="text-muted">Manage gym members and their information</small>
        </div>
        <button className="btn btn-dark" onClick={() => handleShowModal()}>
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
              <th>Mobile</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Membership</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id}>
                <td><b>{m.firstName} {m.lastName}</b></td>
                <td>{m.email}</td>
                <td>{m.mobile}</td>
                <td>{m.address}</td>
                <td>{m.gender}</td>
                <td>{m.subscriptionId ? m.subscriptionId.name : "N/A"}</td>
                <td>
                  <span className={`badge ${m.isActive && m.isSubscribed ? "bg-dark" : "bg-danger"}`}>
                    {m.isActive && m.isSubscribed ? "Active" : "Inactive/Expired"}
                  </span>
                </td>
                <td>{m.joinDate}</td>
                <td>
                  <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleShowModal(m)}><FaEdit /></button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteUser(m.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-muted">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit User" : "Add New User"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveUser}>
          <Modal.Body>
            {message && <Alert variant={message.type}>{message.text}</Alert>} {/* Display alert message */}

            <Form.Group className="mb-3" controlId="userFirstName">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={currentUser.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userLastName">
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={currentUser.lastName}
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
                value={currentUser.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userMobile">
              <Form.Label>Mobile *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                name="mobile"
                value={currentUser.mobile}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userAddress">
              <Form.Label>Address *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={currentUser.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userGender">
              <Form.Label>Gender *</Form.Label>
              <Form.Select
                name="gender"
                value={currentUser.gender}
                onChange={handleChange}
                required
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="userSubscription">
              <Form.Label>Membership Plan</Form.Label>
              <Form.Select
                name="subscriptionId"
                value={currentUser.subscriptionId}
                onChange={handleChange}
              >
                <option value="">-- Select Plan --</option>
                {dummySubscriptionPlans.map(plan => (
                  <option key={plan.id} value={plan.id}>{plan.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="userJoinDate">
              <Form.Label>Join Date *</Form.Label>
              <Form.Control
                type="date"
                name="joinDate"
                value={currentUser.joinDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="dark" type="submit" disabled={savedUserId !== null && message?.type === "success"}>
              {editingId ? "Update User" : "Add User"}
            </Button>
            {savedUserId && ( // Show "Proceed to Payment" only if a user was successfully saved/updated
                <Button variant="info" onClick={handleProceedToPaymentClick} className="ms-2">
                    Proceed to Payment
                </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default UserManagement;