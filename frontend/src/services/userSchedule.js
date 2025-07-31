// src/services/userSchedule.js
import axios from "axios";

const API_BASE = "http://localhost:8080/user";

export const UserScheduleService = {
  getUserSchedule: (userId) => {
    const id = userId || localStorage.getItem("gymmateUserId");
    if (!id) throw new Error("Not logged in, no user id!");
    return axios.get(`${API_BASE}/get-schedule/${id}`);
  }
};
