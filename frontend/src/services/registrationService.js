// src/services/registrationService.js
import axios from "axios";

// Replace with your actual backend registration endpoint!
const REGISTER_URL = "http://localhost:8080/user/register";

export const registerUser = async (payload) => {
  // payload: { firstName, lastName, email, address, mobile, gender, password }
  const res = await axios.post(REGISTER_URL, payload);
  return res.data;
};
