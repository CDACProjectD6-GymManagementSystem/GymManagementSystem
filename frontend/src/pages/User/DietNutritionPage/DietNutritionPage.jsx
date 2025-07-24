import React from "react";
import {
  FaAppleAlt, FaCarrot, FaLeaf, FaBreadSlice, FaSeedling,
  FaEgg, FaCheese, FaGlassWhiskey, FaFish,
  FaDrumstickBite, FaBacon, FaHamburger, FaHotdog,
} from "react-icons/fa";
import "./DietNutritionPage.css";

// Data
const dietData = [
  // Vegan
  {
    icon: <FaAppleAlt color="#000" />,
    item: "Apple (1 medium)",
    category: "Vegan",
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    fiber: 4.4,
  },
  {
    icon: <FaCarrot color="#000" />,
    item: "Carrot (1 medium)",
    category: "Vegan",
    calories: 25,
    protein: 0.6,
    carbs: 6,
    fat: 0.1,
    fiber: 1.7,
  },
  {
    icon: <FaLeaf color="#000" />,
    item: "Spinach (1 cup cooked)",
    category: "Vegan",
    calories: 41,
    protein: 5.4,
    carbs: 6.7,
    fat: 0.5,
    fiber: 4.3,
  },
  {
    icon: <FaSeedling color="#000" />,
    item: "Chickpeas (100g boiled)",
    category: "Vegan",
    calories: 164,
    protein: 8.9,
    carbs: 27,
    fat: 2.6,
    fiber: 7.6,
  },
  {
    icon: <FaBreadSlice color="#000" />,
    item: "Whole Wheat Bread (1 slice)",
    category: "Vegan",
    calories: 69,
    protein: 3.6,
    carbs: 12,
    fat: 1.1,
    fiber: 1.8,
  },
  // Vegetarian
  {
    icon: <FaEgg color="#000" />,
    item: "Egg (1 large)",
    category: "Vegetarian",
    calories: 72,
    protein: 6.3,
    carbs: 0.4,
    fat: 4.8,
    fiber: 0,
  },
  {
    icon: <FaCheese color="#000" />,
    item: "Paneer (100g)",
    category: "Vegetarian",
    calories: 260,
    protein: 18,
    carbs: 2,
    fat: 20,
    fiber: 0,
  },
  {
    icon: <FaGlassWhiskey color="#000" />,
    item: "Milk (1 cup, low-fat)",
    category: "Vegetarian",
    calories: 102,
    protein: 8,
    carbs: 12,
    fat: 2.4,
    fiber: 0,
  },
  {
    icon: <FaSeedling color="#000" />,
    item: "Moong Dal (100g, boiled)",
    category: "Vegetarian",
    calories: 105,
    protein: 8.3,
    carbs: 18,
    fat: 0.6,
    fiber: 7.6,
  },
  {
    icon: <FaCarrot color="#000" />,
    item: "Curd/Yogurt (1 cup, low-fat)",
    category: "Vegetarian",
    calories: 98,
    protein: 9.5,
    carbs: 11,
    fat: 3,
    fiber: 0,
  },
  // Non-Veg
  {
    icon: <FaFish color="#000" />,
    item: "Salmon (100g)",
    category: "Non-Veg",
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    fiber: 0,
  },
  {
    icon: <FaDrumstickBite color="#000" />,
    item: "Chicken breast (100g)",
    category: "Non-Veg",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
  },
  {
    icon: <FaBacon color="#000" />,
    item: "Boiled Egg White (1 large)",
    category: "Non-Veg",
    calories: 17,
    protein: 3.6,
    carbs: 0.2,
    fat: 0,
    fiber: 0,
  },
  {
    icon: <FaHamburger color="#000" />,
    item: "Lean Mutton (100g)",
    category: "Non-Veg",
    calories: 239,
    protein: 25,
    carbs: 0,
    fat: 14,
    fiber: 0,
  },
  {
    icon: <FaHotdog color="#000" />,
    item: "Shrimp (100g, boiled)",
    category: "Non-Veg",
    calories: 99,
    protein: 24,
    carbs: 0.2,
    fat: 0.3,
    fiber: 0,
  },
];

// category color (monochrome variant)
const categoryColor = (cat) =>
  cat === "Vegan"
    ? "#222"
    : cat === "Vegetarian"
    ? "#555"
    : "#999";

const DietNutritionPage = () => (
  <div className="dietnut-bg">
    <div className="dietnut-max-container">
      <div className="dietnut-header">
        <h2 className="dietnut-title">
          Diet &amp; Nutrition Reference
        </h2>
        <div className="dietnut-desc">
          Reference of common foods and their nutrition values (Vegan, Veg, Non-Veg)
        </div>
      </div>
      <div className="dietnut-tablewrapper">
        <table className="dietnut-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Type</th>
              <th>Calories</th>
              <th>Protein (g)</th>
              <th>Carbs (g)</th>
              <th>Fat (g)</th>
              <th>Fiber (g)</th>
            </tr>
          </thead>
          <tbody>
            {dietData.map((row) => (
              <tr key={row.item}>
                <td className="dietnut-itemcell">
                  <span className="dietnut-icon">{row.icon}</span>
                  {row.item}
                </td>
                <td>
                  <span
                    style={{ color: categoryColor(row.category), fontWeight: 700 }}
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
  </div>
);

export default DietNutritionPage;
