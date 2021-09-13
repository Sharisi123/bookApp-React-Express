import axios from "axios";

const token = localStorage.getItem("jwt");

export const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
