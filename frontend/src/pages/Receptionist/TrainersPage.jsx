// src/pages/Receptionist/TrainersPage.jsx
import React, { useState } from 'react';
import { Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { CalendarEvent, Award } from 'react-bootstrap-icons';
import { allTrainers as initialTrainers } from './mockData';

export default function TrainersPage() {
  const [trainers, setTrainers] = useState(initialTrainers);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', specialty: '', avatarUrl: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTrainer = (e) => {
    e.preventDefault();
    const newTrainer = {
      id: trainers.length + 1, // For demo: simple ID increment
      name: formData.name,
      specialty: formData.specialty,
      avatarUrl: formData.avatarUrl || `https://placehold.co/100x100/93C5FD/1E40AF?text=${formData.name.charAt(0)}`,
    };
    setTrainers(prev => [...prev, newTrainer]);
    setShowModal(false);
    setFormData({ name: '', specialty: '', avatarUrl: '' });
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5>Trainer Profiles</h5>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Trainer
        </Button>
      </div>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {trainers.map(trainer => (
          <Col key={trainer.id}>
            <Card className="h-100 text-center shadow-sm">
              <Card.Img
                variant="top"
                src={trainer.avatarUrl}
                alt={trainer.name}
                style={{ objectFit: 'cover', height: '150px' }}
              />
              <Card.Body>
                <Card.Title>{trainer.name}</Card.Title>
                <Card.Text className="text-muted d-flex align-items-center justify-content-center">
                  <Award className="me-2 text-primary" />
                  {trainer.specialty}
                </Card.Text>
                <Button variant="primary" className="mt-3 d-flex align-items-center justify-content-center mx-auto">
                  <CalendarEvent className="me-2" /> View Schedule
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Trainer Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Trainer</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddTrainer}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="trainerName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter trainer name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="trainerSpecialty">
              <Form.Label>Specialty</Form.Label>
              <Form.Control
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                required
                placeholder="Enter specialty"
              />
            </Form.Group>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Trainer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
