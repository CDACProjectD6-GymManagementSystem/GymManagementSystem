import React, { useState, useEffect } from "react";
import "../../styles/Admin.css";
import {
  addSubscription,
  getSubscriptions,
  deleteSubscription,
  updateSubscription,
} from "../../services/AdminService";

// Robust boolean normalizer for database oddities
const normalizeBoolean = (val) => {
  if (typeof val === "boolean") return val;
  if (typeof val === "number") return val === 1;
  if (typeof val === "string") {
    const v = val.trim().toLowerCase(); // Defensive
    return v === "true" || v === "yes" || v === "1";
  }
  return false;
};

const Input = ({ label, ...props }) => (
  <label>
    {label} :
    <input {...props} />
  </label>
);

const RadioGroup = ({ label, name, options, selectedValue, onChange }) => (
  <fieldset>
    <legend>{label}:</legend>
    {options.map(({ value, label: optionLabel }) => (
      <label key={value} style={{ marginRight: 16 }}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={selectedValue === value}
          onChange={onChange}
          required
        />{" "}
        {optionLabel}
      </label>
    ))}
  </fieldset>
);

const initialFormState = {
  id: "",
  name: "",
  description: "",
  access: "OFF_PEAK_HOURS",
  dietConsultation: false,
  sauna: false,
  duration: "1",
  price: "",
  discount: "0",
};

const SubscriptionSection = () => {
  const [packs, setPacks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const durations = [1,2,3,4,5,6,7,8,9,10,11,12];

  const loadSubscriptions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getSubscriptions();
      if (response.status === 204) {
        setPacks([]);
      } else {
        // Normalize booleans always
        const normalizedData = response.data.map((sub) => ({
          ...sub,
          dietConsultation: normalizeBoolean(sub.dietConsultation),
          sauna: normalizeBoolean(sub.sauna),
        }));
        setPacks(normalizedData);
      }
    } catch (err) {
      setError("Failed to fetch subscriptions: " +
               (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

  // Convert boolean to "true"/"false" for radio group
  const boolToString = (val) => (val ? "true" : "false");

  // Handle all changes for controlled form
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if ((name === "sauna" || name === "dietConsultation") && type === "radio") {
      setForm((prev) => ({
        ...prev,
        [name]: value === "true",
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    // Prepare correct-typed data for API
    const finalFormData = {
      ...form,
      dietConsultation: Boolean(form.dietConsultation),
      sauna: Boolean(form.sauna),
    };

    try {
      if (editing !== null) {
        await updateSubscription(form.id, finalFormData);
        setStatus("Package updated successfully!");
      } else {
        await addSubscription(finalFormData);
        setStatus("Package added successfully!");
      }
      setEditing(null);
      setForm(initialFormState);
      await loadSubscriptions();
    } catch (err) {
      setStatus(
        (editing !== null ? "Error updating package: " : "Error adding package: ") +
        (err.response?.data?.message || err.message)
      );
    }
  };

  const handleEdit = (idx) => {
    const sub = packs[idx];
    setEditing(idx);
    setForm({
      ...sub,
      dietConsultation: normalizeBoolean(sub.dietConsultation),
      sauna: normalizeBoolean(sub.sauna),
      duration: String(sub.duration),
      price: String(sub.price),
      discount: String(sub.discount),
    });
  };

  const handleDelete = async (idx) => {
    const subToDelete = packs[idx];
    if (!window.confirm(`Are you sure you want to delete package "${subToDelete.name}"?`)) {
      return;
    }
    setStatus(null);
    try {
      await deleteSubscription(subToDelete.id);
      setStatus("Package deleted successfully!");
      if (editing === idx) {
        setEditing(null);
        setForm(initialFormState);
      }
      await loadSubscriptions();
    } catch (err) {
      setStatus(
        "Error deleting package: " +
        (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="subscription-section-card">
      <h2>Manage Subscriptions</h2>

      {loading && <div>Loading subscriptions...</div>}
      {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
      {status && !error && (
        <div
          style={{
            margin: "10px 0",
            color: status.startsWith("Error") ? "red" : "green",
            fontWeight: 600,
          }}
        >
          {status}
        </div>
      )}

      {!loading && (
        <>
          <form className="admin-form" onSubmit={handleSubmit}>
            <Input
              name="id"
              label="Id"
              value={form.id}
              onChange={handleChange}
              required
              readOnly={editing !== null}
            />
            <Input
              name="name"
              label="Package Name"
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
            <RadioGroup
              label="Gym Access"
              name="access"
              options={[
                { value: "OFF_PEAK_HOURS", label: "Off-peak hours" },
                { value: "FULLTIME", label: "Full Time" },
              ]}
              selectedValue={form.access}
              onChange={handleChange}
            />
            <RadioGroup
              label="Diet Consultation"
              name="dietConsultation"
              options={[
                { value: "true", label: "Yes" },
                { value: "false", label: "No" },
              ]}
              selectedValue={boolToString(form.dietConsultation)}
              onChange={handleChange}
            />
            <RadioGroup
              label="Sauna Access"
              name="sauna"
              options={[
                { value: "true", label: "Yes" },
                { value: "false", label: "No" },
              ]}
              selectedValue={boolToString(form.sauna)}
              onChange={handleChange}
            />
            <label style={{
              marginBottom: 12,
              fontWeight: 600,
              color: "#004aad",
              display: "block",
            }}>
              Duration:
              <select
                name="duration"
                value={form.duration}
                onChange={handleChange}
                required
                style={{
                  marginLeft: 8,
                  padding: "6px 12px",
                  borderRadius: 4,
                  border: "1px solid #004aad",
                  fontFamily: "inherit",
                }}
              >
                {durations.map((dur) => (
                  <option key={dur} value={dur}>
                    {dur}
                  </option>
                ))}
              </select>
            </label>
            <Input
              name="price"
              label="Price"
              type="number"
              min="0"
              step="any"
              value={form.price}
              onChange={handleChange}
              required
            />
            <Input
              name="discount"
              label="Discount"
              value={form.discount}
              onChange={handleChange}
              required
            />
            <button type="submit" className="admin-btn">
              {editing !== null ? "Update" : "Add"} Package
            </button>
            {editing !== null && (
              <button
                type="button"
                className="admin-btn cancel"
                onClick={() => {
                  setEditing(null);
                  setForm(initialFormState);
                }}
              >
                Cancel
              </button>
            )}
          </form>

          <table className="admin-table" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Gym Access</th>
                <th>Diet Consultation</th>
                <th>Sauna Access</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {packs.length === 0 ? (
                <tr className="no-data-row">
                  <td colSpan={10}>No packages found.</td>
                </tr>
              ) : (
                packs.map((p, i) => (
                  <tr key={i}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td style={{ whiteSpace: "pre-wrap" }}>{p.description}</td>
                    <td>{p.access}</td>
                    <td>{normalizeBoolean(p.dietConsultation) ? "Yes" : "No"}</td>
                    <td>{normalizeBoolean(p.sauna) ? "Yes" : "No"}</td>
                    <td>{p.duration}</td>
                    <td>{p.price}</td>
                    <td>{p.discount}</td>
                    <td>
                      <button className="admin-btn" onClick={() => handleEdit(i)}>
                        Edit
                      </button>
                      <button
                        className="admin-btn delete"
                        onClick={() => handleDelete(i)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default SubscriptionSection;
