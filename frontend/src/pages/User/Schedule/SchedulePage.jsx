import React, { useState } from "react";
import {
  FaFire,
  FaWeight,
  FaDumbbell,
  FaHeartbeat,
  FaCalendarAlt,
} from "react-icons/fa";
import "./SchedulePage.css";

const goalSchedules = [
  {
    key: "fat-loss",
    label: (
      <>
        <FaFire className="schedule-goalicon" color="#000" />
        Fat Loss
      </>
    ),
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
        <FaWeight className="schedule-goalicon" color="#000" />
        Body Recomp
      </>
    ),
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
        <FaDumbbell className="schedule-goalicon" color="#000" />
        Muscle Gain
      </>
    ),
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
        <FaHeartbeat className="schedule-goalicon" color="#000" />
        Endurance
      </>
    ),
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

const SchedulePage = () => {
  const [goalIdx, setGoalIdx] = useState(0);

  return (
    <div className="schedule-bg">
      <div className="schedule-root">
        {/* Left panel */}
        <div className="schedule-leftpanel">
          <div className="schedule-calendar">
            <FaCalendarAlt style={{ marginBottom: 2, marginRight: 7 }} />
            Weekly Schedules
          </div>
          <div>
            {goalSchedules.map((g, idx) => (
              <button
                key={g.key}
                className={`schedule-goalbtn${goalIdx === idx ? " selected" : ""}`}
                onClick={() => setGoalIdx(idx)}
              >
                <span className="schedule-goallabel">{g.label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Right panel: Week table */}
        <div className="schedule-tablepanel">
          <div className="schedule-tabletitle">
            {goalSchedules[goalIdx].label} Weekly Schedule
          </div>
          <div className="schedule-subtext">
            {goalSchedules[goalIdx].week.length} Days Training Plan
          </div>
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Workout</th>
              </tr>
            </thead>
            <tbody>
              {goalSchedules[goalIdx].week.map((row) => (
                <tr key={row.day}>
                  <td className="schedule-tbl-day">{row.day}</td>
                  <td className="schedule-tbl-workout">{row.workout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
