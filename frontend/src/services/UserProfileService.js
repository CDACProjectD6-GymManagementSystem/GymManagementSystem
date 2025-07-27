import axios from "axios";
const API_BASE = "http://localhost:8080/user/profile/1";
 // Change as per your actual backend

export const profileService = {
  // GET profile
  fetch: async () => axios.get(API_BASE),

  // PUT/PATCH profile (adjust as per your backend)
  update: async (profile) => axios.post(API_BASE, profile)
};
