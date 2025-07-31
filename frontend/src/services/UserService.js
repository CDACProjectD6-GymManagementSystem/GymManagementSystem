// src/services/UserService.js

import axios from "axios";

// Change API_BASE as needed if you want to use a proxy in development
const API_BASE = "http://localhost:8080/user/available-subscriptions";

const UserService = {
  getMembershipPackages: () =>
    axios.get(API_BASE)
      .then(res => {
        let data = res.data;
        // Accepts direct array or {packages: [...]}
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.packages)) return data.packages;
        if (data && Array.isArray(data.data)) return data.data;
        return [];
      })
      .catch(() => {
        // On network/error return []
        return [];
      })
};

export default UserService;
