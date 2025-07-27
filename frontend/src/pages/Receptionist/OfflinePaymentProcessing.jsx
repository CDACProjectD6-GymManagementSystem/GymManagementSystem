
import React, { useState, useEffect } from "react"; // Import useEffect
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";

// Dummy Data (replace with API calls to your Java backend)
const dummyMembers = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", isSubscribed: true, isActive: true },
  { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", isSubscribed: false, isActive: true },
  { id: 3, firstName: "Mike", lastName: "Johnson", email: "mike@example.com", isSubscribed: true, isActive: false },
  { id: 4, firstName: "Alice", lastName: "Wonder", email: "alice@example.com", isSubscribed: false, isActive: false },
];

const dummySubscriptionPlans = [
  { id: 101, name: "Basic Access", price: 30.00, discount: 0.0 },
  { id: 102, name: "Standard Elite", price: 80.00, discount: 10.0 },
  { id: 103, name: "Family Plus", price: 250.00, discount: 20.0 },
  { id: 104, name: "Elite Performance", price: 500.00, discount: 30.0 }
];

const paymentMethods = ["CASH", "CARD", "BANK_TRANSFER"];
const paymentStatuses = ["SUCCESS", "PENDING", "FAILED"];

function OfflinePaymentProcessing({ initialUserId }) { 
  const [paymentDetails, setPaymentDetails] = useState({
    userId: "",
    subscriptionId: "",
    amount: "",
    paymentMethod: "CASH",
    transactionId: "",
    status: "SUCCESS"
  });
  const [message, setMessage] = useState(null);

 useEffect(() => {
    if (initialUserId) {
      setPaymentDetails(prev => ({ ...prev, userId: initialUserId.toString() })); // Ensure it's a string for select value
    }
  }, [initialUserId]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleUserSelect = (e) => {
    const userId = e.target.value;
    setPaymentDetails(prev => ({ ...prev, userId }));
    setPaymentDetails(prev => ({ ...prev, subscriptionId: "", amount: "" }));
  };

  const handleSubscriptionSelect = (e) => {
    const subId = e.target.value;
    const selectedPlan = dummySubscriptionPlans.find(plan => plan.id === Number(subId));
    let calculatedAmount = "";
    if (selectedPlan) {
      calculatedAmount = selectedPlan.price - (selectedPlan.price * selectedPlan.discount / 100);
    }
    setPaymentDetails(prev => ({ ...prev, subscriptionId: subId, amount: calculatedAmount }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!paymentDetails.userId || !paymentDetails.subscriptionId || !paymentDetails.amount || !paymentDetails.paymentMethod) {
      setMessage({ type: "danger", text: "Please fill in all required fields." });
      return;
    }

    if (isNaN(Number(paymentDetails.amount)) || Number(paymentDetails.amount) <= 0) {
      setMessage({ type: "danger", text: "Amount must be a positive number." });
      return;
    }

    if ((paymentDetails.paymentMethod === "CARD" || paymentDetails.paymentMethod === "BANK_TRANSFER") && !paymentDetails.transactionId) {
        setMessage({ type: "danger", text: "Transaction ID is required for Card/Bank Transfer payments." });
        return;
    }

    const paymentPayload = {
        userId: Number(paymentDetails.userId),
        subscriptionId: Number(paymentDetails.subscriptionId),
        amount: Number(paymentDetails.amount),
        paymentMethod: paymentDetails.paymentMethod,
        transactionId: paymentDetails.transactionId || null,
        status: paymentDetails.status,
    };

    console.log("Submitting payment:", paymentPayload);
    setTimeout(() => {
      setMessage({ type: "success", text: "Payment recorded successfully!" });
      setPaymentDetails({
        userId: "",
        subscriptionId: "",
        amount: "",
        paymentMethod: "CASH",
        transactionId: "",
        status: "SUCCESS"
      });
    }, 1000);
  };

  const selectedMember = dummyMembers.find(m => m.id === Number(paymentDetails.userId));
  const selectedPlan = dummySubscriptionPlans.find(plan => plan.id === Number(paymentDetails.subscriptionId));

  return (
    <div className="bg-white rounded shadow p-4">
      <h4>Offline Payment Processing</h4>
      <small className="text-muted mb-4 d-block">Record payments for user subscriptions (e.g., cash, check, direct transfer).</small>

      {message && <Alert variant={message.type}>{message.text}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formUserId">
              <Form.Label>Select Member *</Form.Label>
              <Form.Select name="userId" value={paymentDetails.userId} onChange={handleUserSelect} required>
                <option value="">-- Select Member --</option>
                {dummyMembers.map(member => (
                  <option key={member.id} value={member.id}>{member.firstName} {member.lastName} ({member.email})</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formSubscriptionId">
              <Form.Label>Select Subscription Plan *</Form.Label>
              <Form.Select name="subscriptionId" value={paymentDetails.subscriptionId} onChange={handleSubscriptionSelect} required>
                <option value="">-- Select Plan --</option>
                {dummySubscriptionPlans.map(plan => (
                  <option key={plan.id} value={plan.id}>{plan.name} (${(plan.price - (plan.price * plan.discount / 100)).toFixed(2)})</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount Paid ($) *</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="amount"
                placeholder="Enter amount"
                value={paymentDetails.amount}
                onChange={handleChange}
                required
              />
               {selectedPlan && (
                <Form.Text className="text-muted">
                    Calculated: ${(selectedPlan.price - (selectedPlan.price * selectedPlan.discount / 100)).toFixed(2)}
                </Form.Text>
               )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formPaymentMethod">
              <Form.Label>Payment Method *</Form.Label>
              <Form.Select name="paymentMethod" value={paymentDetails.paymentMethod} onChange={handleChange} required>
                {paymentMethods.map(method => (
                  <option key={method} value={method}>{method.replace(/_/g, ' ')}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {(paymentDetails.paymentMethod === "CARD" || paymentDetails.paymentMethod === "BANK_TRANSFER") && (
            <Form.Group className="mb-3" controlId="formTransactionId">
                <Form.Label>Transaction ID (for Card/Bank Transfer) *</Form.Label>
                <Form.Control
                    type="text"
                    name="transactionId"
                    placeholder="Enter transaction ID"
                    value={paymentDetails.transactionId}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
        )}

        <Form.Group className="mb-4" controlId="formPaymentStatus">
          <Form.Label>Payment Status *</Form.Label>
          <Form.Select name="status" value={paymentDetails.status} onChange={handleChange} required>
            {paymentStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="dark" type="submit">
          Record Payment
        </Button>
      </Form>

      {selectedMember && selectedPlan && (
        <Card className="mt-4 p-3 bg-light">
          <h6>Payment Summary:</h6>
          <p><strong>Member:</strong> {selectedMember.firstName} {selectedMember.lastName}</p>
          <p><strong>Plan:</strong> {selectedPlan.name}</p>
          <p><strong>Amount to Pay:</strong> ${(selectedPlan.price - (selectedPlan.price * selectedPlan.discount / 100)).toFixed(2)}</p>
        </Card>
      )}

      {selectedMember && !selectedMember.isSubscribed && (
          <Alert variant="info" className="mt-3">
              This member is currently not subscribed. Recording payment will change their status.
          </Alert>
      )}
    </div>
  );
}

export default OfflinePaymentProcessing;