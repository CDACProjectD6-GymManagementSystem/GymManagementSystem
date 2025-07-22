import React, { useState, useEffect } from "react";
import { FaWeight, FaFire, FaDumbbell, FaHeartbeat } from "react-icons/fa";

const goalPlans = [
  {
    key: "fat-loss",
    label: (
      <>
        <FaFire style={{ marginRight: 7, marginBottom: 2 }} color="#f7c948" />
        Fat Loss / Calorie Deficit
      </>
    ),
    summary:
      "Goal: Fat loss | Daily Calories: ~1500–1700 kcal | Macro: High protein, low carb, low fat",
    color: "#f7c948",
    meals: [
      { type: "Breakfast", desc: "Oats with skim milk + 1 boiled egg + black coffee", cals: 300 },
      { type: "Snack", desc: "Apple + green tea", cals: 100 },
      { type: "Lunch", desc: "Grilled chicken (100g) + quinoa (1 cup) + salad (olive oil, lemon dressing)", cals: 400 },
      { type: "Snack", desc: "Greek yogurt (low-fat) + 5 almonds", cals: 150 },
      { type: "Dinner", desc: "Stir-fried vegetables + tofu (100g) + soup", cals: 400 },
      { type: "Water", desc: "3–4 litres", cals: null },
    ],
  },
  {
    key: "body-recomp",
    label: (
      <>
        <FaWeight style={{ marginRight: 7, marginBottom: 2 }} color="#f7c948" />
        Weight Loss + Muscle Gain
      </>
    ),
    summary:
      "Goal: Lose fat + build lean muscle | Daily Calories: ~1800–2000 kcal | Macro: High protein, moderate carb, moderate fat",
    color: "#f7c948",
    meals: [
      { type: "Breakfast", desc: "2 eggs + 2 multigrain toasts + banana + black coffee", cals: 350 },
      { type: "Snack", desc: "Whey protein shake + 3 walnuts", cals: 200 },
      { type: "Lunch", desc: "Grilled fish/chicken (150g) + brown rice (1 cup) + veggies", cals: 500 },
      { type: "Snack", desc: "Boiled chickpeas (1 cup) or sprouts salad", cals: 200 },
      { type: "Dinner", desc: "Paneer 100g + mixed veggies + chapati (1)", cals: 450 },
      { type: "Water", desc: "3–4 litres", cals: null },
    ],
  },
  {
    key: "muscle-gain",
    label: (
      <>
        <FaDumbbell style={{ marginRight: 7, marginBottom: 2 }} color="#f7c948" />
        Muscle Gain (Bulking)
      </>
    ),
    summary:
      "Goal: Build muscle mass | Daily Calories: ~2500–3000 kcal | Macro: High protein, high carb, moderate fat",
    color: "#f7c948",
    meals: [
      { type: "Breakfast", desc: "4 egg whites + 2 whole eggs + oats + peanut butter + banana", cals: 600 },
      { type: "Snack", desc: "Protein smoothie (banana + milk + whey + peanut butter)", cals: 400 },
      { type: "Lunch", desc: "Grilled chicken (200g) + white rice (1.5 cups) + salad + curd", cals: 600 },
      { type: "Snack", desc: "Boiled eggs (2) + paneer sandwich + dry fruits", cals: 400 },
      { type: "Dinner", desc: "Salmon/Paneer (150g) + sweet potato (1 cup) + green veggies", cals: 500 },
      { type: "Post-Workout", desc: "Whey protein shake", cals: 200 },
      { type: "Water", desc: "4+ litres", cals: null },
    ],
  },
  {
    key: "endurance",
    label: (
      <>
        <FaHeartbeat style={{ marginRight: 7, marginBottom: 2 }} color="#f7c948" />
        Endurance & Stamina
      </>
    ),
    summary:
      "Goal: Improve stamina | Daily Calories: ~2200–2500 kcal | Macro: High carbs, moderate protein, moderate fat",
    color: "#f7c948",
    meals: [
      { type: "Breakfast", desc: "Whole wheat bread (2) + peanut butter + banana + coffee", cals: 400 },
      { type: "Snack", desc: "Energy bar/fruit + coconut water", cals: 200 },
      { type: "Lunch", desc: "Lean meat/legumes + whole grain pasta/rice + veggies", cals: 600 },
      { type: "Pre-Workout", desc: "Banana + oats + black coffee", cals: 200 },
      { type: "Post-Workout", desc: "Protein shake + 1 boiled egg", cals: 200 },
      { type: "Dinner", desc: "Lentil soup + chapati (2) + salad + curd", cals: 400 },
      { type: "Water", desc: "3–4 litres", cals: null },
    ],
  },
];

const getFormattedDateTime = () =>
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

const WorkoutDietPage = () => {
  const [goalIdx, setGoalIdx] = useState(0);
  const [currentTime, setCurrentTime] = useState(getFormattedDateTime());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(getFormattedDateTime()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "98vh",
        width: "100vw",
        background: "#181a1b",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1400,
          margin: "36px auto",
          borderRadius: 32,
          background: "#23272b",
          boxShadow: "0 12px 48px 0 #f7c94833",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          minHeight: 560,
        }}
      >
        {/* Left Panel */}
        <div
          style={{
            minWidth: 320,
            maxWidth: 400,
            background: "linear-gradient(120deg,#181a1b 55%,#23272b 100%)",
            borderRadius: "32px 0 0 32px",
            padding: "44px 18px 18px 30px",
            borderRight: "2px solid #222",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 30,
          }}
        >
          <div
            style={{
              color: "#f7c948",
              fontSize: 21,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 18,
              letterSpacing: 0.5,
            }}
          >
            {currentTime}
          </div>

          <div>
            {goalPlans.map((g, idx) => (
              <button
                key={g.key}
                className="btn w-100 text-start d-flex align-items-center"
                style={{
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 12,
                  background: goalIdx === idx ? g.color : "#222",
                  color: goalIdx === idx ? "#181a1b" : "#f7c948",
                  border: `2px solid ${g.color}`,
                  borderRadius: 12,
                  padding: "13px 18px",
                  boxShadow: goalIdx === idx ? `0 3px 14px 0 ${g.color}66` : "none",
                  transition: "all .18s",
                }}
                onClick={() => setGoalIdx(idx)}
              >
                {g.label}
              </button>
            ))}
          </div>
          <div
            style={{
              background: "#23272b",
              color: "#ffecb3",
              borderRadius: 16,
              padding: "20px 16px",
              fontWeight: 500,
              textAlign: "center",
              fontSize: 17,
              letterSpacing: 0.1,
              border: "1.7px solid #f7c948",
              marginTop: 20,
            }}
          >
            <span style={{ color: "#f7c948", fontWeight: 700 }}>
              About this Goal
            </span>
            <br />
            <span style={{ color: goalPlans[goalIdx].color }}>
              {goalPlans[goalIdx].summary}
            </span>
          </div>
        </div>

        {/* Right Panel */}
        <div
          style={{
            flex: "3 1 530px",
            borderRadius: "0 32px 32px 0",
            padding: "46px 48px",
            background: "#222329",
            minWidth: 340,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2 className="fw-bold mb-3" style={{
            background: "linear-gradient(90deg,#f7c948,#fff700 50%,#fff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: 36,
            letterSpacing: 1
          }}>
            Diet &amp; Meal Plan
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {goalPlans[goalIdx].meals.map((meal, i) => (
              <li
                key={`${meal.type}-${i}`}
                style={{
                  marginBottom: 15,
                  padding: "14px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom:
                    i !== goalPlans[goalIdx].meals.length - 1
                      ? "1.5px solid #363638"
                      : "none",
                  fontSize: 18,
                  color: "#fff",
                }}
              >
                <span>
                  <strong style={{ color: "#f7c948" }}>{meal.type}:</strong> {meal.desc}
                </span>
                {meal.cals ? (
                  <span
                    style={{
                      background: "#f7c948",
                      color: "#181a1b",
                      borderRadius: 8,
                      padding: "2px 13px",
                      fontSize: 16,
                      marginLeft: 12,
                      fontWeight: 700,
                      letterSpacing: 0.23,
                    }}
                  >
                    {meal.cals} kcal
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Gradient accent for h2 used above */}
      <style>
        {`
        .fw-bold {
          font-weight: bold;
        }
        `}
      </style>
    </div>
  );
};

export default WorkoutDietPage;
