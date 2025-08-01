import React, { useEffect, useState } from "react";

const DashboardSection = () => {
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

  const [users, setUsers] = useState([]);
  const [subs, setSubs] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    setUsers(dummyUsers);
    setSubs(dummySubscriptions);
    setPayments(dummyPayments);
  }, []);

  const totalUsers = users.length;
  const totalActiveSubs = subs.filter((s) => s.active).length;

  return (
    <div className="container my-5">
      <div className="mx-auto p-4 bg-white shadow rounded-4" style={{maxWidth:880, minHeight: 650}}>
        <h2 className="text-center mb-4 fw-bold text-primary" style={{letterSpacing: '1px'}}>Admin Dashboard</h2>

        {/* Summary Cards */}
        <div className="row g-4 mb-4 justify-content-center">
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card text-center border-0 shadow-sm h-100 py-3">
              <div className="card-body">
                <div className="display-4 fw-bold text-primary">{totalUsers}</div>
                <div className="mt-2 fw-semibold fs-5 text-dark">Total Users</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card text-center border-0 shadow-sm h-100 py-3">
              <div className="card-body">
                <div className="display-4 fw-bold text-success">{totalActiveSubs}</div>
                <div className="mt-2 fw-semibold fs-5 text-dark">Active Subscriptions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <h3 className="text-center fw-bold mb-3" style={{letterSpacing: '0.5px', color: "#222"}}>Recent Payments</h3>
        <div className="table-responsive rounded-4 shadow-sm bg-light">
          <table className="table align-middle mb-0">
            <thead className="table-primary text-white">
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
                <tr>
                  <td colSpan={7} className="text-center fst-italic py-4 text-secondary bg-white">No payments found.</td>
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
                      <td>
                        {p.payment_status === "Success" ? (
                          <span className="badge bg-success">{p.payment_status}</span>
                        ) : (
                          <span className="badge bg-danger">{p.payment_status}</span>
                        )}
                      </td>
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
