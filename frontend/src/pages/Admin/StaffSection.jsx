import React, { useState, useEffect } from "react";
import "../../styles/Admin.css";
import {
  getAllReceptionists,
  addReceptionist,
  updateReceptionist,
  deleteReceptionist,
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
  const [form, setForm] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    expertise: "",
    certification: "",
    salary: "",
    address: "",
    password: "",
    gender: "MALE",
  });
  const [editing, setEditing] = useState(null);

  const staffFields =
    type === "trainer"
      ? [
          { name: "firstName", label: "First Name" },
          { name: "lastName", label: "Last Name" },
          { name: "email", label: "Email", type: "email" },
          { name: "mobile", label: "Mobile" },
          { name: "expertise", label: "Expertise" },
          { name: "certification", label: "Certification" },
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

  useEffect(() => {
    if (type === "recep") {
      setLoadingReceps(true);
      getAllReceptionists()
        .then((data) => {
          setReceps(data || []);
        })
        .catch((err) => {
          console.error("Failed to load receptionists:", err);
          setReceps([]);
        })
        .finally(() => setLoadingReceps(false));
    }
  }, [type]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleGenderChange = (e) => {
    setForm({ ...form, gender: e.target.value });
  };

  const resetForm = () =>
    setForm({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      expertise: "",
      certification: "",
      salary: "",
      address: "",
      password: "",
      gender: "MALE",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const entry = { ...form };

    if (type === "recep") {
      delete entry.expertise;
      delete entry.certification;

      if (!entry.password || entry.password.trim() === "") {
        delete entry.password;
      } else if (!entry.id) {
        if (!entry.password) {
          alert("Password must be provided for new receptionist.");
          return;
        }
      }

      try {
        if (!entry.id) {
          await addReceptionist(entry);
        } else {
          await updateReceptionist(entry.id, entry);
        }

        setLoadingReceps(true);
        const updatedReceps = await getAllReceptionists();
        setReceps(updatedReceps || []);
        setEditing(null);
        resetForm();
      } catch (error) {
        alert("Error saving receptionist. See console for details.");
        console.error(error);
      } finally {
        setLoadingReceps(false);
      }
    } else {
      if (editing !== null) {
        setStaffList(staffList.map((x, i) => (i === editing ? entry : x)));
        setEditing(null);
      } else {
        setStaffList([...staffList, entry]);
      }
      resetForm();
    }
  };

  const handleEdit = (i) => {
    setEditing(i);
    const staff = staffList[i];
    setForm({
      id: staff.id || null,
      firstName: staff.firstName || "",
      lastName: staff.lastName || "",
      email: staff.email || "",
      mobile: staff.mobile || "",
      expertise: staff.expertise || "",
      certification: staff.certification || "",
      salary: staff.salary || "",
      address: staff.address || "",
      password: "", 
      gender: staff.gender || "MALE",
    });
  };

  const handleDelete = async (i) => {
    const staff = staffList[i];

    if (type === "recep") {
      if (!staff.id) {
        alert("Receptionist ID missing, cannot delete.");
        return;
      }

      if (!window.confirm("Are you sure you want to delete this receptionist?")) {
        return;
      }

      try {
        await deleteReceptionist(staff.id);
        setReceps(receps.filter((_, idx) => idx !== i));
        if (editing === i) {
          setEditing(null);
          resetForm();
        }
      } catch (error) {
        alert("Error deleting receptionist. See console for details.");
        console.error(error);
      }
    } else {
      setStaffList(staffList.filter((_, idx) => idx !== i));
      if (editing === i) {
        setEditing(null);
        resetForm();
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

      {type === "recep" && loadingReceps && <p>Loading receptionists...</p>}

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
              required={
                field.name === "password"
                  ? type === "recep" && editing === null 
                  : true
              }
            />
          ) : null
        )}

        <label>Gender:</label>
        <div
          onChange={handleGenderChange}
          className="gender-radio-group"
          style={{ marginBottom: "1em" }}
        >
          <label>
            <input
              type="radio"
              name="gender"
              value="MALE"
              checked={form.gender === "MALE"}
            />{" "}
            Male
          </label>
          <label style={{ marginLeft: "1em" }}>
            <input
              type="radio"
              name="gender"
              value="FEMALE"
              checked={form.gender === "FEMALE"}
            />{" "}
            Female
          </label>
          <label style={{ marginLeft: "1em" }}>
            <input
              type="radio"
              name="gender"
              value="OTHER"
              checked={form.gender === "OTHER"}
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
            <tr key={s.id || i}>
              <td>{s.firstName}</td>
              <td>{s.lastName}</td>
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
