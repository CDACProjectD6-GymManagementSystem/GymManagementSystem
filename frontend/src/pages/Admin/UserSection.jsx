import React, { useState } from "react";
import "../../styles/Admin.css";

const Input = ({ label, ...props }) => (
  <label style={{ display: "flex", flexDirection: "column", marginBottom: 12 }}>
    <span style={{ fontWeight: 600, marginBottom: 6, color: "#34495e" }}>{label}:</span>
    <input {...props} />
  </label>
);

const RadioGroup = ({ label, name, options, selectedValue, onChange }) => (
  <fieldset style={{ marginBottom: 16, border: "none", paddingLeft: 0 }}>
    <legend style={{ fontWeight: 600, color: "#004aad", marginBottom: 8 }}>{label}:</legend>
    {options.map(({ value, label: optionLabel }) => (
      <label
        key={value}
        style={{
          display: "inline-flex",
          alignItems: "center",
          marginRight: 24,
          cursor: "pointer",
          color: "#34495e",
          fontWeight: 500,
          fontSize: 15,
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={selectedValue === value}
          onChange={onChange}
          required
          style={{ marginRight: 8, width: 18, height: 18, cursor: "pointer", flexShrink: 0 }}
        />{" "}
        {optionLabel}
      </label>
    ))}
  </fieldset>
);

const UserSection = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    gender: "",
    subscriptionType: "", // New dropdown field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing !== null) {
      setUsers(users.map((u, idx) => (idx === editing ? form : u)));
      setEditing(null);
    } else {
      setUsers([...users, form]);
    }
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: "",
      gender: "",
      subscriptionType: "",
    });
  };

  const handleEdit = (idx) => {
    setEditing(idx);
    setForm(users[idx]);
  };

  const handleDelete = (idx) => {
    setUsers(users.filter((_, i) => i !== idx));
    if (editing === idx) setEditing(null);
  };

  return (
    <div className="admin-card">
      <h2>Manage Users</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <Input
          name="firstName"
          label="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <Input
          name="lastName"
          label="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          name="mobile"
          label="Mobile"
          value={form.mobile}
          onChange={handleChange}
          required
        />
        <Input
          name="address"
          label="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <RadioGroup
          label="Gender"
          name="gender"
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" },
          ]}
          selectedValue={form.gender}
          onChange={handleChange}
        />
        <label style={{ display: "flex", flexDirection: "column", marginBottom: 12 }}>
          <span style={{ fontWeight: 600, marginBottom: 6, color: "#34495e" }}>Subscription Type:</span>
          <select
            name="subscriptionType"
            value={form.subscriptionType}
            onChange={handleChange}
            required
            style={{
              padding: "12px 15px",
              fontSize: 16,
              borderRadius: 6,
              border: "1.5px solid #bdc3c7",
              outlineColor: "#1abc9c",
              fontFamily: "inherit",
              transition: "border-color 0.3s ease",
            }}
          >
            <option value="" disabled>
              Select subscription type
            </option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="Gold">Gold</option>
          </select>
        </label>
        <button type="submit" className="admin-btn">
          {editing !== null ? "Update" : "Add"} User
        </button>
        {editing !== null && (
          <button
            type="button"
            className="admin-btn cancel"
            onClick={() => {
              setEditing(null);
              setForm({
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                address: "",
                gender: "",
                subscriptionType: "",
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Subscription Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr className="no-data-row">
              <td colSpan={8}>No users found.</td>
            </tr>
          ) : (
            users.map((u, i) => (
              <tr key={i}>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.mobile}</td>
                <td>{u.address}</td>
                <td>{u.gender}</td>
                <td>{u.subscriptionType}</td>
                <td>
                  <button className="admin-btn" onClick={() => handleEdit(i)}>
                    Edit
                  </button>
                  <button className="admin-btn delete" onClick={() => handleDelete(i)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserSection;
