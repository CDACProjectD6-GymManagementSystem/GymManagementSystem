import React, { useState } from "react";
import {
  FaFire,
  FaWeight,
  FaDumbbell,
  FaHeartbeat,
  FaCalendarAlt,
  FaCheck,
  FaUserCheck,
} from "react-icons/fa";

const goalSchedules = [
  {
    key: "fat-loss",
    label: (
      <>
        <FaFire style={{ marginBottom: 2, marginRight: 9 }} color="#ff6f61" />
        Fat Loss
      </>
    ),
    color: "#ff6f61",
    week: [
      { day: "Monday", workout: "Full Body HIIT" },
      { day: "Tuesday", workout: "Active Rest / Walk" },
      { day: "Wednesday", workout: "Upper Body Circuit" },
      { day: "Thursday", workout: "Yoga & Core Stability" },
      { day: "Friday", workout: "Lower Body Burn" },
      { day: "Saturday", workout: "Zumba/Cardio Fun" },
      { day: "Sunday", workout: "Rest or Light Walk" }
    ],
  },
  {
    key: "body-recomp",
    label: (
      <>
        <FaWeight style={{ marginBottom: 2, marginRight: 9 }} color="#8b5cf6" />
        Body Recomp
      </>
    ),
    color: "#8b5cf6",
    week: [
      { day: "Monday", workout: "Push (Chest, Shoulders, Triceps)" },
      { day: "Tuesday", workout: "Pull (Back, Biceps, Rear Delts)" },
      { day: "Wednesday", workout: "Legs (Quads, Glutes, Hamstrings)" },
      { day: "Thursday", workout: "Core & Cardio" },
      { day: "Friday", workout: "Full Body Strength" },
      { day: "Saturday", workout: "Active Recovery (Yoga or Walk)" },
      { day: "Sunday", workout: "Rest" }
    ],
  },
  {
    key: "muscle-gain",
    label: (
      <>
        <FaDumbbell style={{ marginBottom: 2, marginRight: 9 }} color="#f7c948" />
        Muscle Gain
      </>
    ),
    color: "#f7c948",
    week: [
      { day: "Monday", workout: "Chest & Triceps" },
      { day: "Tuesday", workout: "Back & Biceps" },
      { day: "Wednesday", workout: "Legs (Heavy + Calves)" },
      { day: "Thursday", workout: "Shoulders & Abs" },
      { day: "Friday", workout: "Upper Body Power" },
      { day: "Saturday", workout: "Glutes & Hamstrings" },
      { day: "Sunday", workout: "Rest / Stretch" }
    ],
  },
  {
    key: "endurance",
    label: (
      <>
        <FaHeartbeat style={{ marginBottom: 2, marginRight: 9 }} color="#12b981" />
        Endurance
      </>
    ),
    color: "#12b981",
    week: [
      { day: "Monday", workout: "Interval Run + Core" },
      { day: "Tuesday", workout: "Circuit Training (Total Body)" },
      { day: "Wednesday", workout: "Swim or Bike" },
      { day: "Thursday", workout: "Steady-State Cardio + Mobility" },
      { day: "Friday", workout: "Track Sprints/Agility" },
      { day: "Saturday", workout: "Endurance Hike/Long Walk" },
      { day: "Sunday", workout: "Rest or Yoga" }
    ],
  },
];

const getFormattedDate = () =>
  new Date().toLocaleString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    hour12: true,
  });

const SchedulePage = () => {
  const [log, setLog] = useState([]);
  const [goalIdx, setGoalIdx] = useState(0);

  const add = (type) =>
    setLog((prev) => [
      ...prev,
      { type, time: new Date().toLocaleTimeString() },
    ]);

  return (
    <div
      style={{
        minHeight: "98vh",
        width: "100vw",
        background: "#181a1b",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1640,
          margin: "34px auto",
          borderRadius: 32,
          background: "#23272b",
          boxShadow: "0 12px 48px 0 #f7c94833",
          display: "flex",
          flexWrap: "wrap",
          minHeight: 620,
          alignItems: "stretch",
        }}
      >
        {/* Left panel: Goals + Attendance */}
        <div
          style={{
            minWidth: 325,
            maxWidth: 420,
            background: "linear-gradient(120deg,#181a1b 66%,#23272b 100%)",
            padding: "44px 24px 18px 28px",
            borderRadius: "32px 0 0 32px",
            borderRight: "2px solid #222",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: "1 1 325px",
            gap: 22,
          }}
        >
          <div>
            <div
              style={{
                fontWeight: "bold",
                color: "#f7c948",
                fontSize: 23,
                marginBottom: 22,
                textAlign: "center",
                letterSpacing: 0.8,
              }}
            >
              <FaCalendarAlt style={{ marginBottom: 3, marginRight: 8 }} />
              {getFormattedDate()}
            </div>
            {goalSchedules.map((g, idx) => (
              <button
                key={g.key}
                className="btn w-100 text-start d-flex align-items-center"
                style={{
                  fontWeight: 800,
                  fontSize: 20,
                  marginBottom: 12,
                  background: goalIdx === idx ? g.color : "#222",
                  color: goalIdx === idx ? "#181a1b" : "#f7c948",
                  border: `2.1px solid ${g.color}`,
                  borderRadius: 11,
                  padding: "14px 18px",
                  boxShadow: goalIdx === idx ? `0 3px 16px 0 ${g.color}72` : "none",
                  transition: "all .16s",
                }}
                onClick={() => setGoalIdx(idx)}
              >
                <span style={{ fontSize: 23 }}>{g.label}</span>
              </button>
            ))}
          </div>
          <div>
            <div
              style={{
                fontWeight: 800,
                marginTop: 30,
                color: "#f7c948",
                fontSize: 21,
                textAlign: "center",
                marginBottom: 12,
                letterSpacing: 0.2,
              }}
            >
              Attendance
            </div>
            <div className="text-center mb-3">
              <button
                className="btn btn-success me-2"
                style={{
                  fontWeight: 800,
                  color: "#181a1b",
                  borderRadius: 10,
                  minWidth: 92,
                  boxShadow: "0 2px 8px #26d38529",
                  marginBottom: 5,
                }}
                onClick={() => add("In")}
              >
                <FaUserCheck className="mb-1 me-1" />Check In
              </button>
              <button
                className="btn btn-danger"
                style={{
                  fontWeight: 800,
                  color: "#fff",
                  borderRadius: 10,
                  minWidth: 92,
                  boxShadow: "0 2px 8px #e11d4829",
                  marginBottom: 5,
                }}
                onClick={() => add("Out")}
              >
                <FaCheck className="mb-1 me-1" />Check Out
              </button>
            </div>
            <ul className="list-group mx-auto" style={{ maxWidth: 265, background: "none" }}>
              {log.map((l, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between"
                  style={{
                    background: l.type === "In"
                      ? "linear-gradient(90deg,#234,#181a1b 85%)"
                      : "linear-gradient(90deg,#3d2424,#181a1b 85%)",
                    color: l.type === "In" ? "#12d496" : "#e76b7b",
                    border: "none",
                    borderRadius: 6,
                    fontWeight: 700,
                    marginBottom: 4,
                    fontSize: 16,
                  }}
                >
                  {l.type}
                  <span style={{ color: "#fffde4", fontWeight: 500 }}>{l.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Right panel: Week table */}
        <div
          style={{
            flex: "3 1 500px",
            borderRadius: "0 32px 32px 0",
            padding: "56px 52px",
            background: "#222329",
            minWidth: 340,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            className="fw-bold gradient-heading mb-1"
            style={{ fontSize: 33, color: "#fff700", letterSpacing: 1.1 }}
          >
            {goalSchedules[goalIdx].label} Weekly Schedule
          </h2>
          <div
            style={{
              margin: "12px 0 22px 0",
              fontWeight: 700,
              color: goalSchedules[goalIdx].color,
              letterSpacing: 0.2,
              fontSize: 20,
            }}
          >
            {goalSchedules[goalIdx].week.length} Days Training Plan
          </div>
          <table
            className="table table-dark table-striped text-center table-bordered"
            style={{
              borderRadius: 18,
              background: "#282a36",
              border: "1.8px solid #34364a",
              color: "#fff",
              minWidth: 320,
              overflow: "hidden",
              fontSize: 17,
            }}
          >
            <thead>
              <tr style={{ borderTop: 0, background: "#23272b" }}>
                <th style={{ width: 128, color: "#f7c948", fontSize: 19 }}>Day</th>
                <th style={{ color: "#ffecb3", fontSize: 19 }}>Workout</th>
              </tr>
            </thead>
            <tbody>
              {goalSchedules[goalIdx].week.map((row) => (
                <tr key={row.day}>
                  <td style={{ fontWeight: 800, color: "#f7c948" }}>
                    {row.day}
                  </td>
                  <td style={{ color: "#fffde4" }}>{row.workout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Heading accent */}
      <style>
        {`
        .gradient-heading {
          background: linear-gradient(90deg,#f7c948,#ffecb3 50%,#fff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        `}
      </style>
    </div>
  );
};

export default SchedulePage;
