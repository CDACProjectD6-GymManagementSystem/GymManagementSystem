// src/services/userService.js
import axios from "axios";

// Configure your base URL here
const API_BASE_URL = "http://localhost:8080/admin";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-users`);
    // Assuming response data is an array of users matching UserEntityResponseDto
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    // userData should match your backend DTO structure
    const response = await axios.post(`${API_BASE_URL}/add-user`, userData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete-user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update-user/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const getSubscriptionNames = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/subscription/getnames`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subscription names:", error);
    throw error;
  }
};

export const addSubscription = (data) => {
  // Change URL as per your backend endpoint
  return axios.post("http://localhost:8080/subscription", data);
};


export const getSubscriptions = () => {
  return axios.get(`http://localhost:8080/subscription`);
};

export const deleteSubscription = (subId) => {
  return axios.delete(`http://localhost:8080/subscription/${subId}`);
};

export const updateSubscription = (subId, updateData) => {
  return axios.put(`http://localhost:8080/subscription/${subId}`, updateData);
};