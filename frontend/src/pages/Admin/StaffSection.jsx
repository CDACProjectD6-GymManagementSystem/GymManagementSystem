import React, { useState, useEffect } from "react";
import "../../styles/Admin.css";
import {
  getAllReceptionists,
  addReceptionist,
  updateReceptionist,
  deleteReceptionist,
  addTrainer,
  getAllTrainers,
  deleteTrainer,
  updateTrainer,
} from "../../services/AdminService";

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
  const [loadingReceps, setLoadingReceps] = useState(false);
  const [loadingTrainers, setLoadingTrainers] = useState(false);
  const [form, setForm] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    expertise: "",
    certifications: "",
    salary: "",
    address: "",
    password: "",
    gender: "MALE",
  });
  const [editing, setEditing] = useState(null);

  const staffFields = type === "trainer"
    ? [
        { name: "firstName", label: "First Name" },
        { name: "lastName", label: "Last Name" },
        { name: "email", label: "Email", type: "email" },
        { name: "mobile", label: "Mobile" },
        { name: "expertise", label: "Expertise" },
        { name: "certifications", label: "Certifications" },
        { name: "salary", label: "Salary" },
        { name: "address", label: "Address" },
        { name: "password", label: "Password", type: "password" },
      ]
    : [
        { name: "firstName", label: "First Name" },
        { name: "lastName", label: "Last Name" },
        { name: "email", label: "Email", type: "email" },
        { name: "mobile", label: "Mobile" },
        { name: "salary", label: "Salary" },
        { name: "address", label: "Address" },
        { name: "password", label: "Password", type: "password" },
      ];

  const staffList = type === "trainer" ? trainers : receps;
  const setStaffList = type === "trainer" ? setTrainers : setReceps;

  // Fetch data on type change
  useEffect(() => {
    if (type === "recep") {
      setLoadingReceps(true);
      getAllReceptionists()
        .then(setReceps)
        .catch(() => setReceps([]))
        .finally(() => setLoadingReceps(false));
    } else {
      setLoadingTrainers(true);
      getAllTrainers()
        .then(setTrainers)
        .catch(() => setTrainers([]))
        .finally(() => setLoadingTrainers(false));
    }
  }, [type]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (e) => {
    setForm(prev => ({ ...prev, gender: e.target.value }));
  };

  const resetForm = () => {
    setForm({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      expertise: "",
      certifications: "",
      salary: "",
      address: "",
      password: "",
      gender: "MALE",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const entry = { ...form };

    if (type === "recep") {
      // Remove trainer-only fields
      delete entry.expertise;
      delete entry.certifications;

      // Exclude password if blank on update
      if (editing !== null && (!entry.password || entry.password.trim() === "")) {
        delete entry.password;
      }
      // Require password on add
      if (!entry.id && (!entry.password || entry.password.trim() === "")) {
        alert("Password is required for new receptionist.");
        return;
      }

      try {
        if (!entry.id) {
          await addReceptionist(entry);
        } else {
          await updateReceptionist(entry.id, entry);
        }
        setLoadingReceps(true);
        const updatedReceps = await getAllReceptionists();
        setReceps(updatedReceps);
        setEditing(null);
        resetForm();
      } catch (err) {
        alert("Error saving receptionist");
        console.error(err);
      } finally {
        setLoadingReceps(false);
      }
    } else {
      // Trainer add/update
      // Exclude password if blank on update
      if (editing !== null && (!entry.password || entry.password.trim() === "")) {
        delete entry.password;
      }
      // Require password on add
      if (!entry.id && (!entry.password || entry.password.trim() === "")) {
        alert("Password is required for new trainer.");
        return;
      }
      try {
        if (!entry.id) {
          await addTrainer(entry);
          setLoadingTrainers(true);
          const updatedTrainers = await getAllTrainers();
          setTrainers(updatedTrainers);
          setLoadingTrainers(false);
        } else {
          await updateTrainer(entry.id, entry);
          setLoadingTrainers(true);
          const updatedTrainers = await getAllTrainers();
          setTrainers(updatedTrainers);
          setLoadingTrainers(false);
        }
        setEditing(null);
        resetForm();
      } catch (err) {
        alert("Error saving trainer");
        console.error(err);
      }
    }
  };

  const handleEdit = (i) => {
    const staff = staffList[i];
    setEditing(i);
    setForm({
      id: staff.id || null,
      firstName: staff.firstName || "",
      lastName: staff.lastName || "",
      email: staff.email || "",
      mobile: staff.mobile || "",
      expertise: staff.expertise || "",
      certifications: staff.certifications || "",
      salary: staff.salary || "",
      address: staff.address || "",
      password: "", // always blank on edit for security
      gender: staff.gender || "MALE",
    });
  };

  const handleDelete = async (i) => {
    const staff = staffList[i];

    if (type === "recep") {
      if (!staff.id) {
        alert("Receptionist ID missing");
        return;
      }
      if (!window.confirm("Are you sure you want to delete this receptionist?")) return;

      try {
        await deleteReceptionist(staff.id);
        setReceps(prev => prev.filter((_, idx) => idx !== i));
        if (editing === i) {
          setEditing(null);
          resetForm();
        }
      } catch (err) {
        alert("Error deleting receptionist");
        console.error(err);
      }
    } else {
      if (!staff.id) {
        alert("Trainer ID missing");
        return;
      }
      if (!window.confirm("Are you sure you want to delete this trainer?")) return;

      try {
        await deleteTrainer(staff.id);
        setLoadingTrainers(true);
        const updatedTrainers = await getAllTrainers();
        setTrainers(updatedTrainers);
        setLoadingTrainers(false);
        if (editing === i) {
          setEditing(null);
          resetForm();
        }
      } catch (err) {
        alert("Error deleting trainer");
        console.error(err);
      }
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
          onChange={e => {
            setType(e.target.value);
            setEditing(null);
            resetForm();
          }}
        >
          <option value="trainer">Trainer</option>
          <option value="recep">Receptionist</option>
        </select>
      </label>

      {type === "recep" && loadingReceps && <p>Loading receptionists...</p>}
      {type === "trainer" && loadingTrainers && <p>Loading trainers...</p>}

      <form className="admin-form" onSubmit={handleSubmit}>
        {staffFields.map(
          (field) =>
            field.name !== "gender" && (
              <Input
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type || "text"}
                value={form[field.name] || ""}
                onChange={handleFieldChange}
                required={
                  field.name === "password"
                    ? type === "recep" && editing === null
                    : true
                }
              />
            )
        )}

        <label>Gender:</label>
        <div className="gender-radio-group" style={{ marginBottom: "1em" }}>
          <label>
            <input
              type="radio"
              name="gender"
              value="MALE"
              checked={form.gender === "MALE"}
              onChange={handleGenderChange}
            />{" "}
            Male
          </label>
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="radio"
              name="gender"
              value="FEMALE"
              checked={form.gender === "FEMALE"}
              onChange={handleGenderChange}
            />{" "}
            Female
          </label>
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="radio"
              name="gender"
              value="OTHER"
              checked={form.gender === "OTHER"}
              onChange={handleGenderChange}
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

      <table className="admin-table" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            {type === "trainer" && <th>Expertise</th>}
            {type === "trainer" && <th>Certifications</th>}
            <th>Salary</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.length === 0 ? (
            <tr className="no-data-row">
              <td colSpan={type === "trainer" ? 9 : 7}>
                No {staffTitle.toLowerCase()}s found.
              </td>
            </tr>
          ) : (
            staffList.map((staff, index) => (
              <tr key={staff.id || index}>
                <td>{staff.firstName}</td>
                <td>{staff.lastName}</td>
                <td>{staff.email}</td>
                <td>{staff.mobile}</td>
                {type === "trainer" && <td>{staff.expertise}</td>}
                {type === "trainer" && <td>{staff.certifications}</td>}
                <td>{staff.salary}</td>
                <td>{staff.address}</td>
                <td>{staff.gender}</td>
                <td>
                  <button className="admin-btn" onClick={() => handleEdit(index)}>
                    Edit
                  </button>{" "}
                  <button
                    className="admin-btn delete"
                    onClick={() => handleDelete(index)}
                  >
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

export default StaffSection;
