import React, { useEffect, useState } from "react";
 
import "./DietNutritionPage.css";
import { DietService } from "./../../../services/DietService";

// HARD-CODED reference food data for nutrition table
import {
  FaAppleAlt, FaEgg, FaLeaf, FaBreadSlice, FaDrumstickBite,
  FaFish, FaCarrot, FaCheese, FaHotdog, FaSeedling
} from "react-icons/fa";

const dietData = [
  {
    item: "Apple",
    icon: <FaAppleAlt />,
    category: "Vegan",
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    fiber: 2.4,
  },
  {
    item: "Egg",
    icon: <FaEgg />,
    category: "Vegetarian",
    calories: 78,
    protein: 6,
    carbs: 1,
    fat: 5,
    fiber: 0,
  },
  {
    item: "Spinach",
    icon: <FaLeaf />,
    category: "Vegan",
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
  },
  {
    item: "Brown Bread",
    icon: <FaBreadSlice />,
    category: "Vegetarian",
    calories: 74,
    protein: 2.6,
    carbs: 13.8,
    fat: 1.1,
    fiber: 2.2,
  },
  {
    item: "Chicken Breast",
    icon: <FaDrumstickBite />,
    category: "Non-Vegetarian",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
  },
  {
    item: "Salmon",
    icon: <FaFish />,
    category: "Non-Vegetarian",
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 13,
    fiber: 0,
  },
  {
    item: "Carrot",
    icon: <FaCarrot />,
    category: "Vegan",
    calories: 41,
    protein: 0.9,
    carbs: 10,
    fat: 0.2,
    fiber: 2.8,
  },
  {
    item: "Paneer",
    icon: <FaCheese />,
    category: "Vegetarian",
    calories: 265,
    protein: 18,
    carbs: 1.2,
    fat: 20.8,
    fiber: 0,
  },
  {
    item: "Tofu",
    icon: <FaSeedling />,
    category: "Vegan",
    calories: 76,
    protein: 8,
    carbs: 1.9,
    fat: 4.8,
    fiber: 0.3,
  },
  {
    item: "Chicken Sausage",
    icon: <FaHotdog />,
    category: "Non-Vegetarian",
    calories: 150,
    protein: 8,
    carbs: 1,
    fat: 13,
    fiber: 0,
  },
];


const categoryColor = (cat) =>
  cat === "Vegan"
    ? "#222"
    : cat === "Vegetarian"
    ? "#555"
    : "#999";

const DietNutritionPage = ({ membershipType = "premium", userId: propUserId }) => {
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  // Prefer prop or fallback to logged-in user from localStorage
  const userId = propUserId || localStorage.getItem("gymmateUserId");

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    DietService.getUserDiet(userId)
      .then(res => {
        setDietPlan(res.data);
        setLoading(false);
        setApiError("");
      })
      .catch(() => {
        setApiError("Could not load diet plan.");
        setLoading(false);
      });
  }, [userId]);

  if (!userId) {
    return <div className="dietnut-bg"><div className="text-danger">User ID required.</div></div>;
  }
  if (loading) {
    return <div className="dietnut-bg"><div>Loading diet...</div></div>;
  }
  if (apiError) {
    return <div className="dietnut-bg"><div className="text-danger">{apiError}</div></div>;
  }

  return (
    <div className="dietnut-bg">
      <div className="dietnut-max-container">
        {/* ----------- User's Diet Table ----------- */}
        <div className="dietnut-header">
          <h2 className="dietnut-title">Your Personalized Diet Plan</h2>
        </div>
        <div className="dietnut-tablewrapper" style={{ marginBottom: 36 }}>
          <table className="dietnut-table">
            <thead>
              <tr>
                <th>Meal</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Breakfast</td>
                <td>{dietPlan?.breakfast || "Not set"}</td>
              </tr>
              <tr>
                <td>Lunch</td>
                <td>{dietPlan?.lunch || "Not set"}</td>
              </tr>
              <tr>
                <td>Dinner</td>
                <td>{dietPlan?.dinner || "Not set"}</td>
              </tr>
              <tr>
                <td>Mid Snack</td>
                <td>{dietPlan?.midSnack || "Not set"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ----------- Nutrition Reference Table (PREMIUM) ----------- */}
        {membershipType === "premium" && (
          <>
            <div className="dietnut-header">
              <h2 className="dietnut-title">Diet &amp; Nutrition Reference</h2>
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
                        <span style={{ color: categoryColor(row.category), fontWeight: 700 }}>{row.category}</span>
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
          </>
        )}
      </div>
    </div>
  );
};

export default DietNutritionPage;
