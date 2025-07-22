import React, { useEffect, useState } from "react";
import "../../styles/Admin.css";

const DashboardSection = () => {
  // Dummy data simulating database fetch
  const dummyUsers = [
    { id: 1, name: "John" },
    { id: 2, name: "Szilvia" },
    { id: 3, name: "Saurabh" },
  ];

  const dummySubscriptions = [
    { id: 1, userId: 1, active: true },
    { id: 2, userId: 2, active: false },
    { id: 3, userId: 3, active: true },
  ];

  const dummyPayments = [
    {
      payment_id: 1,
      membership_id: 1001,
      payment_date: "2025-07-22 10:10:00",
      amount: 1200.0,
      payment_status: "Success",
      payment_method: "UPI",
      transaction_id: "TXN1001UPI",
    },
    {
      payment_id: 2,
      membership_id: 1002,
      payment_date: "2025-07-21 16:20:00",
      amount: 950.5,
      payment_status: "Failed",
      payment_method: "Card",
      transaction_id: "TXN1002CARD",
    },
    {
      payment_id: 3,
      membership_id: 1001,
      payment_date: "2025-07-20 12:30:00",
      amount: 1100.75,
      payment_status: "Success",
      payment_method: "Cash",
      transaction_id: "TXN1003CASH",
    },
  ];

  // State initialization - simulate async fetch
  const [users, setUsers] = useState([]);
  const [subs, setSubs] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Simulate fetching data from DB/API
    setUsers(dummyUsers);
    setSubs(dummySubscriptions);
    setPayments(dummyPayments);
  }, []);

  // Derived data
  const totalUsers = users.length;
  const totalActiveSubs = subs.filter((s) => s.active).length;

  return (
    <div className="dashboard-card">
      <h2>Dashboard Overview</h2>

      <div className="dashboard-summaries">
        <div className="dashboard-summary-box">
          <div className="number">{totalUsers}</div>
          <div className="label">Total Users</div>
        </div>

        <div className="dashboard-summary-box">
          <div className="number">{totalActiveSubs}</div>
          <div className="label">Active Subscriptions</div>
        </div>
      </div>

      <div>
        <h3 className="dashboard-subheading">Recent Payments</h3>
        <div className="dashboard-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Membership ID</th>
                <th>Payment Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Method</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr className="no-data-row">
                  <td colSpan={7}>No payments found.</td>
                </tr>
              ) : (
                payments
                  .slice(-5)
                  .reverse()
                  .map((p) => (
                    <tr key={p.payment_id}>
                      <td>{p.payment_id}</td>
                      <td>{p.membership_id}</td>
                      <td>{p.payment_date}</td>
                      <td>₹{p.amount.toFixed(2)}</td>
                      <td>{p.payment_status}</td>
                      <td>{p.payment_method}</td>
                      <td>{p.transaction_id}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
