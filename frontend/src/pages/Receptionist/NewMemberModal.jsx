// src/pages/Receptionist/NewMemberModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function NewMemberModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    membershipType: 'Monthly',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('New member registered! (Demo)');
    onClose();
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      membershipType: 'Monthly',
    });
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>New Member Registration</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
              type="text" 
              name="firstName"
              value={formData.firstName} 
              onChange={handleChange} 
              required 
              placeholder="Enter first name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              type="text" 
              name="lastName"
              value={formData.lastName} 
              onChange={handleChange} 
              required 
              placeholder="Enter last name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type="email" 
              name="email"
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control 
              type="tel" 
              name="phone"
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="Enter phone number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="membershipType">
            <Form.Label>Membership Type</Form.Label>
            <Form.Select 
              name="membershipType" 
              value={formData.membershipType} 
              onChange={handleChange}
            >
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Annual</option>
              <option>Guest Pass</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Register Member
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
