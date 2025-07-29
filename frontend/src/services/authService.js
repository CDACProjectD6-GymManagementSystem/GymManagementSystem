import axios from "axios";

export const loginUser = async (email, password) => {
  // Replace with your backend login endpoint!
  const res = await axios.post("http://localhost:8080/user/login", {
    email,
    password,
  });
  return res.data;
};
