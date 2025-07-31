import React, { useState } from "react";
import "../../styles/Admin.css";

const Input = ({ label, ...props }) => (
  <label>
    {label} :
    <input {...props} />
  </label>
);

const StaffSection = () => {
  const [type, setType] = useState("trainer");
  const [trainers, setTrainers] = useState([]);
  const [receps, setReceps] = useState([]);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    expertise: "",
    certification: "",
    salary: "",
    address: "",
    password: "",
    gender: "Male", // Default to Male
  });
  const [editing, setEditing] = useState(null);

  const staffFields =
    type === "trainer"
      ? [
          { name: "firstname", label: "First Name" },
          { name: "lastname", label: "Last Name" },
          { name: "email", label: "Email", type: "email" },
          { name: "mobile", label: "Mobile" },
          { name: "expertise", label: "Expertise" },
          { name: "certification", label: "Certification" },
          { name: "salary", label: "Salary" },
          { name: "address", label: "Address" },
          { name: "password", label: "Password", type: "password" },
        ]
      : [
          { name: "firstname", label: "First Name" },
          { name: "lastname", label: "Last Name" },
          { name: "email", label: "Email", type: "email" },
          { name: "mobile", label: "Mobile" },
          { name: "salary", label: "Salary" },
          { name: "address", label: "Address" },
          { name: "password", label: "Password", type: "password" },
        ];

  const staffList = type === "trainer" ? trainers : receps;
  const setStaffList = type === "trainer" ? setTrainers : setReceps;

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleGenderChange = (e) => {
    setForm({ ...form, gender: e.target.value });
  };

  const resetForm = () =>
    setForm({
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      expertise: "",
      certification: "",
      salary: "",
      address: "",
      password: "",
      gender: "Male",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = { ...form };
    if (type === "recep") {
      delete entry.expertise;
      delete entry.certification;
    }
    if (editing !== null) {
      setStaffList(staffList.map((x, i) => (i === editing ? entry : x)));
      setEditing(null);
    } else {
      setStaffList([...staffList, entry]);
    }
    resetForm();
  };

  const handleEdit = (i) => {
    setEditing(i);
    setForm({
      ...staffList[i],
      expertise: staffList[i].expertise || "",
      certification: staffList[i].certification || "",
      salary: staffList[i].salary || "",
      address: staffList[i].address || "",
      password: staffList[i].password || "",
      gender: staffList[i].gender || "Male",
    });
  };

  const handleDelete = (i) => {
    setStaffList(staffList.filter((_, idx) => idx !== i));
    if (editing === i) {
      setEditing(null);
      resetForm();
    }
  };

  const staffTitle = type === "trainer" ? "Trainer" : "Receptionist";

  return (
    <div className="admin-card">
      <h2>Manage Staff</h2>
      <label className="admin-select-label">
        Staff Type:
        <select
          className="admin-select"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setEditing(null);
            resetForm();
          }}
        >
          <option value="trainer">Trainer</option>
          <option value="recep">Receptionist</option>
        </select>
      </label>
      <form className="admin-form" onSubmit={handleSubmit}>
        {staffFields.map((field) =>
          field.name !== "gender" ? (
            <Input
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type || "text"}
              value={form[field.name] || ""}
              onChange={handleFieldChange}
              required
            />
          ) : null
        )}

        {/* Gender radio buttons */}
        <label>Gender:</label>
        <div onChange={handleGenderChange} className="gender-radio-group" style={{ marginBottom: "1em" }}>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={form.gender === "Male"}
            />{" "}
            Male
          </label>
          <label style={{ marginLeft: "1em" }}>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={form.gender === "Female"}
            />{" "}
            Female
          </label>
          <label style={{ marginLeft: "1em" }}>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={form.gender === "Other"}
            />{" "}
            Other
          </label>
        </div>

        <button type="submit" className="admin-btn">
          {editing !== null ? "Update" : "Add"} {staffTitle}
        </button>
        {editing !== null && (
          <button
            type="button"
            className="admin-btn cancel"
            onClick={() => {
              setEditing(null);
              resetForm();
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
            {type === "trainer" && <th>Expertise</th>}
            {type === "trainer" && <th>Certification</th>}
            <th>Salary</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((s, i) => (
            <tr key={i}>
              <td>{s.firstname}</td>
              <td>{s.lastname}</td>
              <td>{s.email}</td>
              <td>{s.mobile}</td>
              {type === "trainer" && <td>{s.expertise}</td>}
              {type === "trainer" && <td>{s.certification}</td>}
              <td>{s.salary}</td>
              <td>{s.address}</td>
              <td>{s.gender}</td>
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
          ))}
          {staffList.length === 0 && (
            <tr className="no-data-row">
              <td colSpan={type === "trainer" ? 9 : 7}>
                No {staffTitle.toLowerCase()}s found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffSection;
