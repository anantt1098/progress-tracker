import axios from "axios";

const api = axios.create({
  baseURL: "https://progress-tracker-36ku.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;