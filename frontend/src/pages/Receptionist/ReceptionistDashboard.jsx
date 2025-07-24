import React from "react";
import UserManagement from "./UserManagement";
import TrainerManagement from "./TrainerManagement";
import SubscriptionPlans from "./SubscriptionPlans";
import TrainerAssignment from "./TrainerAssignment";


function ReceptionistDashboard() {
  const [activeTab, setActiveTab] = React.useState("user");

  const renderContent = () => {
    switch (activeTab) {
      case "user":
        return <UserManagement />;
      case "trainer":
        return <TrainerManagement />;
      case "plans":
        return <SubscriptionPlans />;
      case "assignment":
        return <TrainerAssignment />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-fill p-4 bg-light">{renderContent()}</main>
    </div>
  );
}

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="bg-dark text-white p-3" style={{ width: 250 }}>
      <div className="mb-4">
        <strong>FitGym Pro</strong>
        <div style={{ fontSize: 14 }}>Receptionist Panel</div>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <button
            className={`nav-link btn btn-link text-start ${activeTab === "user" ? "text-white fw-bold" : "text-secondary"}`}
            onClick={() => setActiveTab("user")}
          >
            User Management
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link btn btn-link text-start ${activeTab === "trainer" ? "text-white fw-bold" : "text-secondary"}`}
            onClick={() => setActiveTab("trainer")}
          >
            Trainer Management
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link btn btn-link text-start ${activeTab === "plans" ? "text-white fw-bold" : "text-secondary"}`}
            onClick={() => setActiveTab("plans")}
          >
            Subscription Plans
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link btn btn-link text-start ${activeTab === "assignment" ? "text-white fw-bold" : "text-secondary"}`}
            onClick={() => setActiveTab("assignment")}
          >
            Trainer Assignment
          </button>
        </li>
      </ul>
    </div>
  );
}


export default ReceptionistDashboard;
