import axios from "axios";

const token = localStorage.getItem("jwt");

export const api = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
