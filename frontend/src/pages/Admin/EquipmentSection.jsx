import React, { useState, useEffect } from "react";
import "../../styles/Admin.css";
import {
  addEquipment,
  getAllEquipments,
  deleteEquipment,
  updateEquipment, // Import here
} from "../../services/AdminService";

const CATEGORY_OPTIONS = [
  "CARDIO",
  "STRENGTH",
  "FLEXIBILITY",
  "FREE_WEIGHTS",
  "RESISTANCE_MACHINES",
];

const Input = ({ label, ...props }) => (
  <label>
    {label} :
    <input {...props} />
  </label>
);

const Select = ({ label, options, ...props }) => (
  <label>
    {label} :
    <select {...props}>
      <option value="" disabled>
        Select Category
      </option>
      {options.map((cat) => (
        <option key={cat} value={cat}>
          {cat.replace(/_/g, " ")}
        </option>
      ))}
    </select>
  </label>
);

const EquipmentSection = () => {
  const [emps, setEmps] = useState([]);
  const [editing, setEditing] = useState(null); // holds row index if editing
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEquipment();
    // eslint-disable-next-line
  }, []);

  const fetchEquipment = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await getAllEquipments();
      setEmps(data);
    } catch (err) {
      setError("Could not load equipment list.");
    }
    setLoading(false);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (editing !== null) {
        // UPDATE: send PUT/PATCH to backend
        const { id, ...dto } = form;
        await updateEquipment(id, dto);
        await fetchEquipment(); // refresh
        setEditing(null);
      } else {
        await addEquipment(form);
        await fetchEquipment();
      }
      setForm({
        id: "",
        name: "",
        description: "",
        price: "",
        category: "",
      });
    } catch (err) {
      setError(
        "Failed to " +
          (editing !== null ? "update" : "add") +
          " equipment: " +
          (err?.response?.data?.message || err.message)
      );
    }
    setLoading(false);
  };

  const handleEdit = (idx) => {
    setEditing(idx);
    setForm({
      id: emps[idx].id ?? "",
      name: emps[idx].name ?? "",
      description: emps[idx].description ?? "",
      price: emps[idx].price ?? "",
      category: emps[idx].category ?? "",
    });
  };

  const handleDelete = async (idx) => {
    setError("");
    setLoading(true);
    try {
      const equipment = emps[idx];
      if (!equipment.id) {
        setError("Cannot determine equipment ID for deletion.");
        setLoading(false);
        return;
      }
      await deleteEquipment(equipment.id);
      await fetchEquipment();
      if (editing === idx) setEditing(null);
    } catch (err) {
      setError(
        "Failed to delete equipment: " +
          (err?.response?.data?.message || err.message)
      );
    }
    setLoading(false);
  };

  return (
    <div className="admin-card">
      <h2>Manage Equipment</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Equipment Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          name="description"
          label="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <Input
          name="price"
          label="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
        <Select
          name="category"
          label="Category"
          options={CATEGORY_OPTIONS}
          value={form.category}
          onChange={handleChange}
          required
        />
        <button type="submit" className="admin-btn" disabled={loading}>
          {loading
            ? "Saving..."
            : editing !== null
            ? "Update"
            : "Add"} Equipment
        </button>
        {editing !== null && (
          <button
            type="button"
            className="admin-btn cancel"
            onClick={() => {
              setEditing(null);
              setForm({
                id: "",
                name: "",
                description: "",
                price: "",
                category: "",
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>
      {error && <div className="error-message">{error}</div>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emps.map((e, i) => (
            <tr key={e.id ?? i}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.description}</td>
              <td>{e.price}</td>
              <td>
                {e.category ? e.category.toString().replace(/_/g, " ") : ""}
              </td>
              <td>
                <button className="admin-btn" onClick={() => handleEdit(i)}>
                  Edit
                </button>
                <button
                  className="admin-btn delete"
                  onClick={() => handleDelete(i)}
                  disabled={loading}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {emps.length === 0 && (
            <tr className="no-data-row">
              <td colSpan={6}>No equipment found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentSection;
