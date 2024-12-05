import axios from "axios";

const https = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default https;
