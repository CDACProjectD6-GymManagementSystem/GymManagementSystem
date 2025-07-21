import React, { useState } from "react";
import "../../styles/Admin.css";

const Input = ({ label, ...props }) => (
  <label>
    {label}:
    <input {...props} />
  </label>
);

const SubscriptionSection = () => {
  const [packs, setPacks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ packagename: "", description: "", price: "", duration: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing !== null) {
      setPacks(packs.map((p, idx) => (idx === editing ? form : p)));
      setEditing(null);
    } else {
      setPacks([...packs, form]);
    }
    setForm({ packagename: "", description: "", price: "", duration: "" });
  };
  const handleEdit = (idx) => { setEditing(idx); setForm(packs[idx]); };
  const handleDelete = (idx) => {
    setPacks(packs.filter((_, i) => i !== idx));
    if (editing === idx) setEditing(null);
  };
  return (
    <div className="admin-card">
      <h2>Manage Subscriptions</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <Input name="packagename" label="Package Name" value={form.packagename} onChange={handleChange} required />
        <Input name="description" label="Description" value={form.description} onChange={handleChange} required />
        <Input name="price" label="Price" type="number" value={form.price} onChange={handleChange} required />
        <Input name="duration" label="Duration (months)" value={form.duration} onChange={handleChange} required />
        <button type="submit" className="admin-btn">{editing !== null ? "Update" : "Add"} Package</button>
        {editing !== null && (
          <button type="button" className="admin-btn cancel"
            onClick={() => {
              setEditing(null);
              setForm({ packagename: "", description: "", price: "", duration: "" });
            }}
          >Cancel</button>
        )}
      </form>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th><th>Description</th><th>Price</th><th>Duration</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packs.map((p, i) => (
            <tr key={i}>
              <td>{p.packagename}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>{p.duration}</td>
              <td>
                <button className="admin-btn" onClick={() => handleEdit(i)}>Edit</button>
                <button className="admin-btn delete" onClick={() => handleDelete(i)}>Delete</button>
              </td>
            </tr>
          ))}
          {packs.length === 0 && (
            <tr className="no-data-row">
              <td colSpan={5}>No packages found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionSection;
