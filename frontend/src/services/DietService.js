// src/services/DietService.js
import axios from "axios";

// Adjust as needed for deployment
const API_BASE = "http://localhost:8080/user/diet/1";

export const DietService = {
  getUserDiet: (userId) => axios.get(`${API_BASE}/user/${userId}`)
};
