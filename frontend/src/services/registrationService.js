// src/services/registrationService.js
import axios from "axios";

// Replace with your actual backend registration endpoint!
const REGISTER_URL = "http://localhost:8080/user/register";

export const registerUser = async (payload) => {
  try {
    const res = await axios.post(REGISTER_URL, payload);
    return res.data; // { timeStamp, message }
  } catch (err) {
    // If the error response includes .data.message, return it!
    if (err.response && err.response.data && err.response.data.message) {
      return err.response.data;
    }
    throw err; // fallback for true network/internal errors
  }
};

