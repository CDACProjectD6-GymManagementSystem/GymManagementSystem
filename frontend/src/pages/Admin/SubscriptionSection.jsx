import React, { useState } from "react";
import "../../styles/Admin.css";

const Input = ({ label, ...props }) => (
  <label>
    {label} :
    <input {...props} />
  </label>
);

const RadioGroup = ({ label, name, options, selectedValue, onChange }) => (
  <fieldset style={{ marginBottom: 12, border: "none", paddingLeft: 0 }}>
    <legend style={{ fontWeight: 600, color: "#004aad", marginBottom: 6 }}>{label}:</legend>
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

const CheckboxGroup = ({ label, name, options, selectedValues, onChange }) => (
  <fieldset style={{ marginBottom: 12, border: "none", paddingLeft: 0 }}>
    <legend style={{ fontWeight: 600, color: "#004aad", marginBottom: 6 }}>{label}:</legend>
    {options.map(({ value, label: optionLabel }) => (
      <label key={value} style={{ marginRight: 16 }}>
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={selectedValues.includes(value)}
          onChange={onChange}
        />{" "}
        {optionLabel}
      </label>
    ))}
  </fieldset>
);

const SubscriptionSection = () => {
  const [packs, setPacks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    gymAccess: "Off-peak hours",
    dietConsultation: "Once at start",
    groupClasses: [],
    saunaAccess: "No",
    duration: "1 month",
    price: "",
    discount: "0%"
  });

  const durations = [
    "1 month", "2 months", "3 months", "4 months", "5 months", "6 months",
    "7 months", "8 months", "9 months", "10 months", "11 months", "12 months"
  ];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      // toggle logic for checkboxes (groupClasses)
      const checked = e.target.checked;
      setForm((prev) => {
        let updated = [...prev.groupClasses];
        if (checked) updated.push(value);
        else updated = updated.filter((v) => v !== value);
        return { ...prev, groupClasses: updated };
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing !== null) {
      setPacks(packs.map((p, idx) => (idx === editing ? form : p)));
      setEditing(null);
    } else {
      setPacks([...packs, form]);
    }
    setForm({
      name: "",
      description: "",
      gymAccess: "Off-peak hours",
      dietConsultation: "Once at start",
      groupClasses: [],
      saunaAccess: "No",
      duration: "1 month",
      price: "",
      discount: "0%"
    });
  };

  const handleEdit = (idx) => {
    setEditing(idx);
    setForm(packs[idx]);
  };

  const handleDelete = (idx) => {
    setPacks(packs.filter((_, i) => i !== idx));
    if (editing === idx) setEditing(null);
  };

  return (
    <div className="admin-card">
      <h2>Manage Subscriptions</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
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
          name="gymAccess"
          options={[
            { value: "Off-peak hours", label: "Off-peak hours" },
            { value: "Full Time", label: "Full Time" },
          ]}
          selectedValue={form.gymAccess}
          onChange={handleChange}
        />

        <RadioGroup
          label="Diet Consultation"
          name="dietConsultation"
          options={[
            { value: "Once at start", label: "Once at start" },
            { value: "Monthly", label: "Monthly" },
          ]}
          selectedValue={form.dietConsultation}
          onChange={handleChange}
        />

        <CheckboxGroup
          label="Group Classes"
          name="groupClasses"
          options={[
            { value: "Yoga", label: "Yoga" },
            { value: "Zumba", label: "Zumba" },
            { value: "HIIT", label: "HIIT" },
          ]}
          selectedValues={form.groupClasses}
          onChange={handleChange}
        />

        <RadioGroup
          label="Sauna Access"
          name="saunaAccess"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
          selectedValue={form.saunaAccess}
          onChange={handleChange}
        />

        <label style={{ marginBottom: 12, fontWeight: 600, color: "#004aad", display: "block" }}>
          Duration:
          <select
            name="duration"
            value={form.duration}
            onChange={handleChange}
            required
            style={{ marginLeft: 8, padding: "6px 12px", borderRadius: 4, border: "1px solid #004aad", fontFamily: "inherit" }}
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
          pattern="^\d+%$"
          title="Enter discount percentage like 0% or 15%"
          value={form.discount}
          onChange={handleChange}
          required
        />

        <button type="submit" className="admin-btn">{editing !== null ? "Update" : "Add"} Package</button>
        {editing !== null && (
          <button
            type="button"
            className="admin-btn cancel"
            onClick={() => {
              setEditing(null);
              setForm({
                name: "",
                description: "",
                gymAccess: "Off-peak hours",
                dietConsultation: "Once at start",
                groupClasses: [],
                saunaAccess: "No",
                duration: "1 month",
                price: "",
                discount: "0%"
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <table className="admin-table" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Gym Access</th>
            <th>Diet Consultation</th>
            <th>Group Classes</th>
            <th>Sauna Access</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packs.map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td style={{ whiteSpace: "pre-wrap" }}>{p.description}</td>
              <td>{p.gymAccess}</td>
              <td>{p.dietConsultation}</td>
              <td>{p.groupClasses.join(", ")}</td>
              <td>{p.saunaAccess}</td>
              <td>{p.duration}</td>
              <td>{p.price}</td>
              <td>{p.discount}</td>
              <td>
                <button className="admin-btn" onClick={() => handleEdit(i)}>Edit</button>
                <button className="admin-btn delete" onClick={() => handleDelete(i)}>Delete</button>
              </td>
            </tr>
          ))}
          {packs.length === 0 && (
            <tr className="no-data-row">
              <td colSpan={10}>No packages found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionSection;
