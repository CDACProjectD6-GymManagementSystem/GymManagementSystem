// TrainerAssignment.jsx
import React, { useState } from "react";

// Updated membersData to use firstName and lastName
const membersData = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 2, firstName: "Jane", lastName: "Smith" },
  { id: 3, firstName: "Mike", lastName: "Johnson" }
];

// Updated trainersData to use firstName and lastName
const trainersData = [
  { id: 1, firstName: "Alice", lastName: "Brown" },
  { id: 2, firstName: "Bob", lastName: "Green" },
  { id: 3, firstName: "Cathy", lastName: "Blue" }
];

function TrainerAssignment() {
  // stores assignments as { memberId: trainerId }
  const [assignments, setAssignments] = useState({});

  const handleAssign = (memberId, trainerId) => {
    setAssignments(prev => ({ ...prev, [memberId]: trainerId }));
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h4>Trainer Assignment</h4>
      <small className="text-muted mb-3 d-block">Assign trainers to gym members</small>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Assigned Trainer</th>
            </tr>
          </thead>
          <tbody>
            {membersData.map(member => (
              <tr key={member.id}>
                <td><b>{member.firstName} {member.lastName}</b></td> {/* Display full name */}
                <td>
                  <select
                    className="form-select"
                    value={assignments[member.id] || ""}
                    onChange={e => handleAssign(member.id, Number(e.target.value))}
                  >
                    <option value="">-- Select Trainer --</option>
                    {trainersData.map(trainer => (
                      <option key={trainer.id} value={trainer.id}>
                        {trainer.firstName} {trainer.lastName} {/* Display full name */}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {membersData.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center text-muted">No members available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TrainerAssignment;