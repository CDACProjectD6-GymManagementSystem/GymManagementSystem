import axios from "axios";

// All profile API calls use the id from localStorage set at login!
const apiBase = "http://localhost:8080/user";

export const profileService = {
  /**
   * Fetch the profile of the currently logged-in user.
   * Returns a promise with Axios response object.
   */
  fetch: () => {
    const userId = localStorage.getItem("gymmateUserId");
    if (!userId) throw new Error("Not logged in, no user id!");
    return axios.get(`${apiBase}/profile/${userId}`);
  },
  /**
   * Update the profile of the currently logged-in user.
   * @param {object} profile - The profile data to update
   * Returns a promise with Axios response object.
   */
  update: (profile) => {
    const userId = localStorage.getItem("gymmateUserId");
    if (!userId) throw new Error("Not logged in, no user id!");
    return axios.post(`${apiBase}/profile/${userId}`, profile);
  },
};
