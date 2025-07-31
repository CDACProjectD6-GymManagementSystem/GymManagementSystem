// src/services/DietService.js
import axios from "axios";

// Adjust as needed; typically points to your backend root
const apiBase = "http://localhost:8080/user";

export const DietService = {
  /**
   * Fetch the diet of the currently logged-in user, or a given userId.
   * @param {string|number} [overrideUserId] Optional. If omitted, uses localStorage userId.
   * @returns {Promise<AxiosResponse>}
   */
  getUserDiet: (overrideUserId) => {
    const userId = overrideUserId || localStorage.getItem("gymmateUserId");
    if (!userId) throw new Error("Not logged in, no user id!");
    return axios.get(`${apiBase}/getdiet/${userId}`);
  },
  /**
   * Update the diet of the currently logged-in user (or override userId if needed).
   * @param {object} dietData The diet object to send.
   * @param {string|number} [overrideUserId] Optional user id (for admin use)
   * @returns {Promise<AxiosResponse>}
   */
  updateUserDiet: (dietData, overrideUserId) => {
    const userId = overrideUserId || localStorage.getItem("gymmateUserId");
    if (!userId) throw new Error("Not logged in, no user id!");
    return axios.post(`${apiBase}/getdiet/${userId}`, dietData);
  }
};
