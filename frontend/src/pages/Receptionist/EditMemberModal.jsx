// src/pages/Receptionist/EditMemberModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditMemberModal({ isOpen, onClose, member, onUpdate }) {
  const [formData, setFormData] = useState(member || {});

  useEffect(() => {
    setFormData(member || {});
  }, [member]);

  if (!member) return null; // Return null if no member passed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Member</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name"
              value={formData.name || ''} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="memberId">
            <Form.Label>Member ID</Form.Label>
            <Form.Control 
              type="text" 
              name="memberId"
              value={formData.memberId || ''} 
              disabled 
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select 
              name="status" 
              value={formData.status || 'Active'} 
              onChange={handleChange} 
              required
            >
              <option>Active</option>
              <option>Expired</option>
              <option>Frozen</option>
              <option>New</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
