import axios from "axios";

export const fetchUserAndTrainerNames = async () => {
  const res = await axios.get("http://localhost:8080/receptionist/get-trainers-users");
  return res.data; // The object with userNameList and trainerNameList
};

export const assignTrainerToUser = async ({ userId, trainerId }) => {
  // You now send ids, not names
  const res = await axios.post("http://localhost:8080/receptionist/assign-trainer", {
    userId,
    trainerId,
  });
  return res.data;
};
