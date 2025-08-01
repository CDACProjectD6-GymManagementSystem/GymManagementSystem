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
    const response = await axios.get(`${API_BASE_URL}/subscription/getnames`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subscription names:", error);
    throw error;
  }
};

export const addSubscription = (data) => {
  // Change URL as per your backend endpoint
  return axios.post(`${API_BASE_URL}/subscription/add-subscription`, data);
};


export const getSubscriptions = () => {
  return axios.get(`${API_BASE_URL}/subscription`);
};

export const deleteSubscription = (subId) => {
  return axios.delete(`${API_BASE_URL}/subscription/${subId}`);
};

export const updateSubscription = (subId, updateData) => {
  return axios.put(`${API_BASE_URL}/subscription/${subId}`, updateData);
};

export const addEquipment = async (equipmentData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/equipment/add`,
      equipmentData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding equipment:", error);
    throw error;
  }
};

export const getAllEquipments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/equipment/getall`);
    return response.data;
  } catch (error) {
    console.error("Error fetching equipment list:", error);
    throw error;
  }
};

export const deleteEquipment = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/equipment/${id}`);
    return response.data; 
  } catch (error) {
    console.error("Error deleting equipment:", error);
    throw error;
  }
};

export const updateEquipment = async (id, updateDto) => {
  try {
    return await axios.put(`${API_BASE_URL}/equipment/${id}`, updateDto);
  } catch (error) {
    console.error("Error updating equipment:", error);
    throw error;
  }
};

export const getAllReceptionists = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/receptionist`);
    return response.data;
  } catch (error) {
    console.error("Error fetching receptionists:", error);
    throw error;
  }
};

export const addReceptionist = async (receptionistData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/receptionist`, receptionistData);
    return response.data;
  } catch (error) {
    console.error("Error adding receptionist:", error);
    throw error;
  }
};

export const deleteReceptionist = (id) => {
  return axios.delete(`${API_BASE_URL}/receptionist/delete/${id}`);
};

export const updateReceptionist = (id, receptionistData) => {
  const { id: _, ...dataWithoutId } = receptionistData;
  return axios.put(`${API_BASE_URL}/receptionist/update/${id}`, dataWithoutId);
};

export const addTrainer = (trainerData) => {
  return axios.post(`${API_BASE_URL}/trainer`, trainerData).then((res) => res.data);
};

export const getAllTrainers=async()=>{
  try{
  const response=await axios.get(`${API_BASE_URL}/trainer`);
  return response.data;
  }
  catch(error)
  {
    console.error("Error fetching Trainers");
    throw error;
  }
};

export const deleteTrainer = (id) => {
  return axios.delete(`${API_BASE_URL}/trainer/delete/${id}`);
};

export const updateTrainer = (id, trainerData) => {
  const { id: _, ...data } = trainerData;
  return axios.put(`${API_BASE_URL}/trainer/update/${id}`, data).then(res => res.data);
};

export const getAllFeedbacks = () => axios.get(`${API_BASE_URL}/feedback`);