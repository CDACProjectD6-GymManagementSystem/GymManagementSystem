import React, { useEffect, useState, useRef } from "react";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../services/ReceptionistService";
import { getSubscriptionNames } from "../../services/ReceptionistService";

import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const emptyUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  mobile: "",
  address: "",
  gender: "",
  subscriptionType: "",
};

const UserManagement = ({ onProceedToPayment, setGlobalAlert }) => {
  const [users, setUsers] = useState([]);
  const [subscriptionNames, setSubscriptionNames] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uiMessage, setUiMessage] = useState(null);
  const [savedUserId, setSavedUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(emptyUser);
  const [loading, setLoading] = useState(false);
  const [formDirty, setFormDirty] = useState(false); // for validation feedback
  const focusFirstInputRef = useRef(null);

  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      try {
        const [usersData, subscriptionData] = await Promise.all([
          getUsers(),
          getSubscriptionNames(),
        ]);
        setUsers(usersData);
        console.log(subscriptionData);
        setSubscriptionNames(subscriptionData);
      } catch (error) {
        setUiMessage({ type: "danger", text: "Failed to load user data." });
      } finally {
        setLoading(false);
      }
    };
    fetchInitial();
  }, []);

  // Focus first input on modal open
  useEffect(() => {
    if (showModal && focusFirstInputRef.current) {
      focusFirstInputRef.current.focus();
    }
  }, [showModal]);

  // Validation helpers
  function validateFields(fields) {
    const errors = {};
    if (!fields.firstName.trim()) errors.firstName = "First name is required.";
    if (!fields.lastName.trim()) errors.lastName = "Last name is required.";
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Valid email required.";
    if (!fields.mobile.trim() || !/^[0-9-+()\s]+$/.test(fields.mobile)) errors.mobile = "Valid mobile required.";
    if (!fields.address.trim()) errors.address = "Address is required.";
    if (!fields.gender) errors.gender = "Select gender.";
    // Password: required on add, or if editing & filled
    if (!editingId && !fields.password.trim()) errors.password = "Password required.";
    return errors;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFormDirty(true);
  };

  // Can be invoked with or without a user argument
  const handleShowModal = (userToEdit = null) => {
    setFormDirty(false);
    setSavedUserId(null);
    setUiMessage(null);
    if (userToEdit) {
      setEditingId(userToEdit.id);
      setCurrentUser({
        ...userToEdit,
        gender: userToEdit.gender
          ? userToEdit.gender.toUpperCase()
          : "MALE",
        password: "", // Reset password field
      });
    } else {
      setEditingId(null);
      setCurrentUser(emptyUser);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setSavedUserId(null);
    setFormDirty(false);
    setUiMessage(null);
    setCurrentUser(emptyUser);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    setFormDirty(true);
    const errors = validateFields(currentUser);
    if (Object.keys(errors).length) {
      setUiMessage({ type: "danger", text: "Please fill in all required fields." });
      return;
    }
    setLoading(true);
    const payload = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      address: currentUser.address,
      mobile: currentUser.mobile,
      gender: currentUser.gender.toUpperCase(),
      subscriptionType: currentUser.subscriptionType || "Basic",
    };
    if (!editingId || (editingId !== null && currentUser.password.trim() !== "")) {
      payload.password = currentUser.password;
    }
    try {
      // On success, show feedback and reload list
      if (editingId !== null) {
        await updateUser(editingId, payload);
        setUiMessage({ type: "success", text: "User updated successfully!" });
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
        setSavedUserId(editingId);
        if (setGlobalAlert)
          setGlobalAlert({ type: "success", text: `User "${currentUser.firstName}" updated.` });
      } else {
        await addUser(payload);
        setUiMessage({ type: "success", text: "User added successfully!" });
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
        const newUserId = updatedUsers.length > 0
          ? Math.max(...updatedUsers.map(u => u.id))
          : 1;
        setSavedUserId(newUserId);
        if (setGlobalAlert)
          setGlobalAlert({ type: "success", text: `User "${currentUser.firstName}" added.` });
      }
      setTimeout(() => {
        handleCloseModal();
      }, 1200);
    } catch (error) {
      setUiMessage({ type: "danger", text: "Error saving user. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setLoading(true);
      try {
        await deleteUser(userId);
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
        setUiMessage({ type: "success", text: "User deleted successfully!" });
        if (editingId === userId) handleCloseModal();
        if (setGlobalAlert)
          setGlobalAlert({ type: "success", text: "User deleted." });
      } catch (error) {
        setUiMessage({ type: "danger", text: "Error deleting user. Please try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleProceedToPaymentClick = () => {
    handleCloseModal();
    if (onProceedToPayment && savedUserId)
      onProceedToPayment(savedUserId);
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.mobile.includes(search)
  );

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4>User Management</h4>
          <small className="text-muted">Manage gym members and their information</small>
        </div>
        <button className="btn btn-dark" onClick={() => handleShowModal()} disabled={loading}>
          + Add User
        </button>
      </div>
      <input
        className="form-control mb-3"
        placeholder="Search users…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: 320 }}
        disabled={loading}
      />
      {loading && (
        <div className="text-center py-2">
          <Spinner animation="border" size="sm" /> Loading...
        </div>
      )}
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td><b>{user.firstName} {user.lastName}</b></td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.address}</td>
                  <td>{user.gender}</td>
                  <td>{user.subscriptionType || "N/A"}</td>
                  <td>
                    <button
                      className="btn btn-outline-secondary btn-sm me-2"
                      onClick={() => handleShowModal(user)}
                      disabled={loading}
                      aria-label={`Edit ${user.firstName} ${user.lastName}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={loading}
                      aria-label={`Delete ${user.firstName} ${user.lastName}`}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit User" : "Add New User"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveUser}>
          <Modal.Body>
            {uiMessage && <Alert variant={uiMessage.type}>{uiMessage.text}</Alert>}

            <Form.Group className="mb-3" controlId="userFirstName">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={currentUser.firstName}
                onChange={handleChange}
                required
                ref={focusFirstInputRef}
                aria-invalid={!!(formDirty && !currentUser.firstName)}
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
                aria-invalid={!!(formDirty && !currentUser.lastName)}
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
                aria-invalid={!!(formDirty && (!currentUser.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentUser.email)))}
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
                aria-invalid={!!(formDirty && (!currentUser.mobile || !/^[0-9-+()\s]+$/.test(currentUser.mobile)))}
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
                aria-invalid={!!(formDirty && !currentUser.address)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender *</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Male"
                  name="gender"
                  type="radio"
                  value="MALE"
                  checked={currentUser.gender === "MALE"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Female"
                  name="gender"
                  type="radio"
                  value="FEMALE"
                  checked={currentUser.gender === "FEMALE"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Other"
                  name="gender"
                  type="radio"
                  value="OTHER"
                  checked={currentUser.gender === "OTHER"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="userSubscription">
              <Form.Label>Membership Plan</Form.Label>
              <Form.Select
                name="subscriptionType"
                value={currentUser.subscriptionType}
                onChange={handleChange}
              >
                <option value="">-- Select Plan --</option>
                {subscriptionNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="userPassword">
              <Form.Label>
                Password {editingId ? "(Leave blank to keep unchanged)" : "*"}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder={editingId ? "Leave blank to keep unchanged" : "Password"}
                name="password"
                value={currentUser.password}
                onChange={handleChange}
                required={!editingId}
                aria-invalid={!!(formDirty && !editingId && !currentUser.password)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="dark"
              type="submit"
              disabled={loading || (savedUserId !== null && uiMessage?.type === "success")}
            >
              {loading ? <Spinner size="sm" animation="border" /> : (editingId ? "Update User" : "Add User")}
            </Button>
            {savedUserId && uiMessage?.type === "success" && (
              <Button
                variant="info"
                onClick={handleProceedToPaymentClick}
                className="ms-2"
              >
                Proceed to Payment
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
