import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "text/plain" },
});
