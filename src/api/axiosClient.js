import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://peliculas-api-pmyv.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;