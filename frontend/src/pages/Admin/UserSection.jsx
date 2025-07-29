import React, { useEffect, useState } from "react";
import "../../styles/Admin.css";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getSubscriptionNames,
} from "../../services/AdminService"; // Ensure getSubscriptionNames is exported here

const Input = ({ label, ...props }) => (
  <label style={{ display: "flex", flexDirection: "column", marginBottom: 12 }}>
    <span style={{ fontWeight: 600, marginBottom: 6, color: "#34495e" }}>
      {label}:
    </span>
    <input {...props} />
  </label>
);

const RadioGroup = ({ label, name, options, selectedValue, onChange }) => (
  <fieldset style={{ marginBottom: 16, border: "none", paddingLeft: 0 }}>
    <legend
      style={{ fontWeight: 600, color: "#004aad", marginBottom: 8 }}
    >
      {label}:
    </legend>
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
  const [subscriptionNames, setSubscriptionNames] = useState([]);
  const [editing, setEditing] = useState(null);
  const [uid, setUid] = useState(0);
  const [form, setForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    gender: "",
    subscriptionType: "",
  });

  // Fetch users and subscription names on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, subscriptions] = await Promise.all([
          getUsers(),
          getSubscriptionNames(),
        ]);
        setUsers(usersData);
        setSubscriptionNames(subscriptions);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        address: form.address,
        mobile: form.mobile,
        gender: form.gender.toUpperCase(),
        subscriptionType: form.subscriptionType,
      };

      // Include password only when adding or when editing and password is non-empty
      if (!editing || (editing !== null && form.password.trim() !== "")) {
        payload.password = form.password;
      }

      if (editing !== null) {
        // Update existing user
        await updateUser(uid, payload);
        setEditing(null);
      } else {
        // Add new user
        await addUser(payload);
      }

      // Refresh user list after add/update
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);

      // Reset form
      setForm({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobile: "",
        address: "",
        gender: "",
        subscriptionType: "",
      });
    } catch (error) {
      console.error("Failed to submit user:", error);
    }
  };

  const handleEdit = (idx) => {
    const user = users[idx];

    // Normalize gender string (first letter uppercase, rest lowercase)
    let normalizedGender = "";
    if (user.gender) {
      normalizedGender = user.gender.charAt(0).toUpperCase() + user.gender.slice(1).toLowerCase();
    }

    setForm({
      ...user,
      gender: normalizedGender,
      password: "",
    });
    setUid(user.id);
    setEditing(idx);
  };

  const handleDelete = async (idx) => {
    try {
      const userId = users[idx].id;
      await deleteUser(userId);

      const updatedUsers = await getUsers();
      setUsers(updatedUsers);

      if (editing === idx) setEditing(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setForm({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobile: "",
      address: "",
      gender: "",
      subscriptionType: "",
    });
  };

  return (
    <div className="user-card">
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

        {/* Password input field */}
        {editing === null ? (
          <Input
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        ) : (
          <Input
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Leave blank to keep unchanged"
            required={false}
          />
        )}

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
          <span style={{ fontWeight: 600, marginBottom: 6, color: "#34495e" }}>
            Subscription Type:
          </span>
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
            {subscriptionNames.length === 0 ? (
              <option disabled>Loading...</option>
            ) : (
              subscriptionNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))
            )}
          </select>
        </label>
        <button type="submit" className="admin-btn">
          {editing !== null ? "Update" : "Add"} User
        </button>
        {editing !== null && (
          <button type="button" className="admin-btn cancel" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Id</th>
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
              <td colSpan={9}>No users found.</td>
            </tr>
          ) : (
            users.map((user, i) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.address}</td>
                <td>{user.gender}</td>
                <td>{user.subscriptionType}</td>
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
