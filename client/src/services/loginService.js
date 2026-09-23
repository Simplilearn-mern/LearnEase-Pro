import axios from "./api";

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};