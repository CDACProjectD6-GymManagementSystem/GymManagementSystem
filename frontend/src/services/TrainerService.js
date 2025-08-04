// src/services/userService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/trainer';











export const getAssignedUsers = async (trainerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${trainerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching assigned users:', error);
    throw error;
  }
};









export const getCardioEquipments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/equipments/cardio`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cardio equipments:', error);
    throw error;
  }
};








/**
 * Fetch user's diet plan
 * @param {number|string} userId
 * @returns {Promise<Object>} user + diet
 */
export const fetchUserDietPlan = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}/diet`);
    return response.data;
  } catch (error) {
    console.error('Error fetching diet plan:', error);
    throw error;
  }
};



/**
 * Save or update user's diet plan
 * @param {number|string} userId
 * @param {Object} payload
 * @returns {Promise<void>}
 */
export const updateUserDietPlan = async (userId, payload) => {
  try {
    await axios.post(`${BASE_URL}/user/${userId}/diet`, payload);
  } catch (error) {
    console.error('Error updating diet plan:', error);
    throw error;
  }
};












/**
 * Fetch summary of all equipment categories
 * @returns {Promise<Array>}
 */
export const fetchEquipmentCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/equipments`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch equipment categories:', error);
    throw error;
  }
};






/**
 * Fetch flexibility equipment list
 * @returns {Promise<Array>}
 */
export const fetchFlexibilityEquipments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/equipments/flexibility`);
    return response.data;
  } catch (error) {
    console.error('Error fetching flexibility equipments:', error);
    throw error;
  }
};






/**
 * Fetch free weights equipments
 * @returns {Promise<Array>}
 */
export const fetchFreeWeightsEquipments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/equipments/freeweights`);
    return response.data;
  } catch (error) {
    console.error('Error fetching free weights equipments:', error);
    throw error;
  }
};





/**
 * Fetch resistance machines equipment
 * @returns {Promise<Array>}
 */
export const fetchResistanceMachines = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/equipments/resistancemachines`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resistance machines:', error);
    throw error;
  }
};




//Strength Equipments

/**
 * Get all strength equipments
 * @returns {Promise<Array>} list of equipment
 */
export const fetchStrengthEquipments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/equipments/strength`);
    return response.data;
  } catch (error) {
    console.error('Error fetching strength equipments:', error);
    throw error;
  }
};


/**
 * Toggle maintenance status of an equipment
 * @param {number} id - Equipment ID
 * @param {boolean} currentStatus - Current maintenance status
 * @returns {Promise<void>}
 */
export const toggleEquipmentMaintenance = async (id, currentStatus) => {
  try {
    await axios.put(`${BASE_URL}/equipments/${id}/maintenance`, {
      forMaintenance: !currentStatus
    });
  } catch (error) {
    console.error('Failed to update maintenance status:', error);
    throw error;
  }
};














// TrainerDashboard

export const getTrainerAssignedUsers = async (trainerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${trainerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching assigned users:', error);
    throw error;
  }
};


// Fetch user's profile details
export const fetchUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Fetch user workout schedule
export const fetchUserSchedule = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}/schedule`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user schedule:', error);
    throw error;
  }
};

// Update user workout schedule
export const updateUserSchedule = async (userId, payload) => {
  try {
    await axios.post(`${BASE_URL}/user/${userId}/schedule`, payload);
  } catch (error) {
    console.error('Error updating user schedule:', error);
    throw error;
  }
};




export const fetchTrainerProfile = async (trainerId) => {
  const res = await axios.get(`${BASE_URL}/profile/${trainerId}`);
  return res.data;
};

export const updateTrainerProfile = async (trainerId, profile) => {
  return axios.put(`${BASE_URL}/${trainerId}`, profile);
};

export const uploadTrainerPhoto = async (trainerId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${BASE_URL}/upload/${trainerId}`, formData);
  return res.data;
};

export const deleteTrainerPhoto = async (trainerId) => {
  return axios.delete(`${BASE_URL}/delete/${trainerId}`);
};
