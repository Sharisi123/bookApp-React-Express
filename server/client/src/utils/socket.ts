import { io } from "socket.io-client";

const token = localStorage.getItem("jwt");

const socket = io("http://localhost:5001", {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    },
  },
});

export default socket;
