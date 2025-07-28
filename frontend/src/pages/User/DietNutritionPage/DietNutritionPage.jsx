import React, { useEffect, useState } from "react";
import {
  FaAppleAlt, FaCarrot, FaLeaf, FaBreadSlice, FaSeedling,
  FaEgg, FaCheese, FaGlassWhiskey, FaFish,
  FaDrumstickBite, FaBacon, FaHamburger, FaHotdog,
} from "react-icons/fa";
 import "./DietNutritionPage.css";
import { DietService } from './../../../services/DietService';

// ... (dietData as before) ...

const dietData = [/* ... unchanged ... */];

const categoryColor = (cat) =>
  cat === "Vegan"
    ? "#222"
    : cat === "Vegetarian"
    ? "#555"
    : "#999";

const DietNutritionPage = ({ membershipType = "standard", userId }) => {
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

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
