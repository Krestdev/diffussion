import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;