import axios from "axios";

const API_BASE_URL = "http://localhost:8080/receptionist";

// Reusable axios config with timeout for all requests
const AXIOS_CONFIG = { timeout: 10000 };

// Helper to extract a user-friendly error message
function getErrorMessage(error, fallbackMsg = "Unexpected error. Please try again.") {
  if (error.response && error.response.data && typeof error.response.data === "string")
    return error.response.data;
  if (error.response && error.response.data && error.response.data.message)
    return error.response.data.message;
  return fallbackMsg;
}

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-users`, AXIOS_CONFIG);
    // Validate and return array
    if (!Array.isArray(response.data)) throw new Error("Malformed response from server.");
    return response.data;
  } catch (error) {
    // Don't leak internal error objects
    throw new Error(getErrorMessage(error, "Failed to fetch users."));
  }
};

export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add-user`, userData, AXIOS_CONFIG);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Could not add user. Check details and try again."));
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete-user/${userId}`, AXIOS_CONFIG);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to delete user."));
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update-user/${userId}`, userData, AXIOS_CONFIG);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Could not update user."));
  }
};
