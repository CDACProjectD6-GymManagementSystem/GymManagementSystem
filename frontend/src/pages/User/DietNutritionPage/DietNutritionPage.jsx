import React from "react";
import {
  FaAppleAlt,
  FaCarrot,
  FaLeaf,
  FaBreadSlice,
  FaSeedling,
  FaEgg,
  FaCheese,
  FaGlassWhiskey,
  FaFish,
  FaDrumstickBite,
  FaBacon,
  FaHamburger,
  FaHotdog,
} from "react-icons/fa";

const dietData = [
  // VEGAN
  {
    icon: <FaAppleAlt color="#f7c948" />,
    item: "Apple (1 medium)",
    category: "Vegan",
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    fiber: 4.4,
  },
  {
    icon: <FaCarrot color="#f7c948" />,
    item: "Carrot (1 medium)",
    category: "Vegan",
    calories: 25,
    protein: 0.6,
    carbs: 6,
    fat: 0.1,
    fiber: 1.7,
  },
  {
    icon: <FaLeaf color="#f7c948" />,
    item: "Spinach (1 cup cooked)",
    category: "Vegan",
    calories: 41,
    protein: 5.4,
    carbs: 6.7,
    fat: 0.5,
    fiber: 4.3,
  },
  {
    icon: <FaSeedling color="#f7c948" />,
    item: "Chickpeas (100g boiled)",
    category: "Vegan",
    calories: 164,
    protein: 8.9,
    carbs: 27,
    fat: 2.6,
    fiber: 7.6,
  },
  {
    icon: <FaBreadSlice color="#f7c948" />,
    item: "Whole Wheat Bread (1 slice)",
    category: "Vegan",
    calories: 69,
    protein: 3.6,
    carbs: 12,
    fat: 1.1,
    fiber: 1.8,
  },
  // VEGETARIAN
  {
    icon: <FaEgg color="#f7c948" />,
    item: "Egg (1 large)",
    category: "Vegetarian",
    calories: 72,
    protein: 6.3,
    carbs: 0.4,
    fat: 4.8,
    fiber: 0,
  },
  {
    icon: <FaCheese color="#f7c948" />,
    item: "Paneer (100g)",
    category: "Vegetarian",
    calories: 260,
    protein: 18,
    carbs: 2,
    fat: 20,
    fiber: 0,
  },
  {
    icon: <FaGlassWhiskey color="#f7c948" />, // used to visually represent milk
    item: "Milk (1 cup, low-fat)",
    category: "Vegetarian",
    calories: 102,
    protein: 8,
    carbs: 12,
    fat: 2.4,
    fiber: 0,
  },
  {
    icon: <FaSeedling color="#f7c948" />,
    item: "Moong Dal (100g, boiled)",
    category: "Vegetarian",
    calories: 105,
    protein: 8.3,
    carbs: 18,
    fat: 0.6,
    fiber: 7.6,
  },
  {
    icon: <FaCarrot color="#f7c948" />,
    item: "Curd/Yogurt (1 cup, low-fat)",
    category: "Vegetarian",
    calories: 98,
    protein: 9.5,
    carbs: 11,
    fat: 3,
    fiber: 0,
  },
  // NON-VEGETARIAN
  {
    icon: <FaFish color="#f7c948" />,
    item: "Salmon (100g)",
    category: "Non-Veg",
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    fiber: 0,
  },
  {
    icon: <FaDrumstickBite color="#f7c948" />,
    item: "Chicken breast (100g)",
    category: "Non-Veg",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
  },
  {
    icon: <FaBacon color="#f7c948" />,
    item: "Boiled Egg White (1 large)",
    category: "Non-Veg",
    calories: 17,
    protein: 3.6,
    carbs: 0.2,
    fat: 0,
    fiber: 0,
  },
  {
    icon: <FaHamburger color="#f7c948" />,
    item: "Lean Mutton (100g)",
    category: "Non-Veg",
    calories: 239,
    protein: 25,
    carbs: 0,
    fat: 14,
    fiber: 0,
  },
  {
    icon: <FaHotdog color="#f7c948" />,
    item: "Shrimp (100g, boiled)",
    category: "Non-Veg",
    calories: 99,
    protein: 24,
    carbs: 0.2,
    fat: 0.3,
    fiber: 0,
  },
];

const today = new Date().toLocaleString("en-IN", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZoneName: "short",
});

const DietNutritionPage = () => (
  <div
    style={{
      minHeight: "98vh",
      width: "100vw",
      background: "#181a1b",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 0,
    }}
  >
    <div style={{ width: "100%", maxWidth: 1140, margin: "36px auto" }}>
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div
          style={{
            color: "#f7c948",
            fontWeight: 600,
            fontSize: 19,
            letterSpacing: 0.8,
          }}
        >
          {today}
        </div>
        <h2
          className="fw-bold"
          style={{
            background: "linear-gradient(90deg,#f7c948,#fff700 50%,#fff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: 36,
            fontWeight: 800,
            margin: 3,
            letterSpacing: 1.1,
          }}
        >
          Diet &amp; Nutrition Table
        </h2>
        <div style={{ color: "#ffecb3", fontSize: 17 }}>
          Reference of common foods and their nutrition values (Vegan, Veg, Non-Veg)
        </div>
      </div>

      <div
        style={{
          background: "#23272b",
          borderRadius: 24,
          margin: "36px auto 0 auto",
          boxShadow: "0 4px 20px #f7c94822",
          padding: "36px 24px",
          maxWidth: 1000,
        }}
      >
        <table
          style={{
            width: "100%",
            color: "#fff",
            fontSize: 18,
            borderCollapse: "collapse",
            minWidth: 330,
          }}
        >
          <thead>
            <tr style={{ background: "#1a1c1e" }}>
              <th style={{ padding: "12px 8px", color: "#f7c948" }}>Item</th>
              <th style={{ padding: "12px 8px", color: "#f7c948" }}>Type</th>
              <th style={{ padding: "12px 8px", color: "#f7c948" }}>Calories</th>
              <th style={{ padding: "12px 8px", color: "#f7c948" }}>Protein (g)</th>
              <th style={{ padding: "12px 8px", color: "#f7c948" }}>Carbs (g)</th>
              <th style={{ padding: "12px 8px", color: "#f7c948" }}>Fat (g)</th>
              <th style={{ padding: "12px 8px", color: "#f7c948" }}>Fiber (g)</th>
            </tr>
          </thead>
          <tbody>
            {dietData.map((row) => (
              <tr
                key={row.item}
                style={{
                  background: "#26282c",
                  borderBottom: "1.5px solid #353A3E",
                  textAlign: "center",
                }}
              >
                <td style={{ padding: "11px 0", fontWeight: 700, color: "#f7c948" }}>
                  <span style={{ marginRight: 8, verticalAlign: "middle" }}>{row.icon}</span>
                  {row.item}
                </td>
                <td>
                  <span
                    style={{
                      color:
                        row.category === "Vegan"
                          ? "#2dd4bf"
                          : row.category === "Vegetarian"
                          ? "#7c3aed"
                          : "#ee4444",
                      fontWeight: 700,
                    }}
                  >
                    {row.category}
                  </span>
                </td>
                <td>{row.calories}</td>
                <td>{row.protein}</td>
                <td>{row.carbs}</td>
                <td>{row.fat}</td>
                <td>{row.fiber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <style>{`.fw-bold { font-weight: bold; }`}</style>
  </div>
);

export default DietNutritionPage;
