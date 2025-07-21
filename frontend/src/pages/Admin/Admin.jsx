import React, { useState } from "react";
import "../../styles/Admin.css";
import Navbar from "./Navbar";
import UserSection from "./UserSection";
import StaffSection from "./StaffSection";
import SubscriptionSection from "./SubscriptionSection";
import EquipmentSection from "./EquipmentSection";

const sections = [
  "Manage Users",
  "Manage Staff",
  "Manage Subscription",
  "Manage Equipments",
];

export default function Admin() {
  const [current, setCurrent] = useState(sections[0]);
  return (
    <div className="admin-container">
      <Navbar items={sections} current={current} onNav={setCurrent} />
      {current === "Manage Users" && <UserSection />}
      {current === "Manage Staff" && <StaffSection />}
      {current === "Manage Subscription" && <SubscriptionSection />}
      {current === "Manage Equipments" && <EquipmentSection />}
    </div>
  );
}
