import React, { useState } from "react";
import "../../styles/Admin.css";

const Input = ({ label, ...props }) => (
  <label>
    {label}:
    <input {...props} />
  </label>
);

const UserSection = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", mobile: "",address:""});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing !== null) {
      setUsers(users.map((u, idx) => (idx === editing ? form : u)));
      setEditing(null);
    } else {
      setUsers([...users, form]);
    }
    setForm({ firstName: "", lastName: "", email: "", mobile: "",address:"" });
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
        <Input name="firstName" label="First Name" value={form.firstName} onChange={handleChange} required />
        <Input name="lastName" label="Last Name" value={form.lastName} onChange={handleChange} required />
        <Input name="email" label="Email" type="email" value={form.email} onChange={handleChange} required />
        <Input name="mobile" label="Mobile" value={form.mobile} onChange={handleChange} required />
        <Input name="address" label="Address" value={form.address} onChange={handleChange} required />
        <button type="submit" className="admin-btn">{editing !== null ? "Update" : "Add"} User</button>
        {editing !== null && (
          <button
            type="button"
            className="admin-btn cancel"
            onClick={() => {
              setEditing(null);
              setForm({ firstName: "", lastName: "", email: "", mobile: "",address:"" });
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <table className="admin-table">
        <thead>
          <tr>
            <th>First Name</th><th>Last Name</th><th>Email</th><th>Mobile</th><th>Address</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.mobile}</td>
              <td>{u.address}</td>
              <td>
                <button className="admin-btn" onClick={() => handleEdit(i)}>Edit</button>
                <button className="admin-btn delete" onClick={() => handleDelete(i)}>Delete</button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr className="no-data-row">
              <td colSpan={5}>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserSection;
