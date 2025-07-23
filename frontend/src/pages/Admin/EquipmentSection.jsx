import React, { useState } from "react";
import "../../styles/Admin.css";

const Input = ({ label, ...props }) => (
  <label>
    {label}:
    <input {...props} />
  </label>
);

const EquipmentSection = () => {
  const [emps, setEmps] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", quantity: "",dateOfInstallation:"" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing !== null) {
      setEmps(emps.map((e, idx) => (idx === editing ? form : e)));
      setEditing(null);
    } else setEmps([...emps, form]);
    setForm({ name: "", description: "", quantity: "" });
  };
  const handleEdit = (idx) => { setEditing(idx); setForm(emps[idx]); };
  const handleDelete = (idx) => {
    setEmps(emps.filter((_, i) => i !== idx));
    if (editing === idx) setEditing(null);
  };
  return (
    <div className="admin-card">
      <h2>Manage Equipment</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <Input name="name" label="Equipment Name" value={form.name} onChange={handleChange} required />
        <Input name="description" label="Description" value={form.description} onChange={handleChange} required />
        <Input name="quantity" label="Quantity" type="number" value={form.quantity} onChange={handleChange} required />
        <Input name="dateOfInstallation" label="Date Of Installation" type="date" value={form.dateOfInstallation} onChange={handleChange} required />
        <Input name="price" label="Price" type="number" value={form.price} onChange={handleChange} required />
      
        <button type="submit" className="admin-btn">
          {editing !== null ? "Update" : "Add"} Equipment
        </button>
        {editing !== null && (
          <button
            type="button"
            className="admin-btn cancel"
            onClick={() => {
              setEditing(null);
              setForm({ name: "", description: "", quantity: "" ,dateOfInstallation:"",price:"" });
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th><th>Description</th><th>Quantity</th><th>Date Of Installation</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emps.map((e, i) => (
            <tr key={i}>
              <td>{e.name}</td>
              <td>{e.description}</td>
              <td>{e.quantity}</td>
              <td>{e.dateOfInstallation}</td>
              <td>{e.price}</td>
              <td>
                <button className="admin-btn" onClick={() => handleEdit(i)}>Edit</button>
                <button className="admin-btn delete" onClick={() => handleDelete(i)}>Delete</button>
              </td>
            </tr>
          ))}
          {emps.length === 0 && (
            <tr className="no-data-row">
              <td colSpan={4}>No equipment found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentSection;
