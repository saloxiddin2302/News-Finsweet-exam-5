import axios from "axios";
import Cookies from "js-cookie";

import { TOKEN } from "../const";

const token = Cookies.get(TOKEN);

export const request = axios.create({
  baseURL: "https://ap-blog-backend.up.railway.app/api/v1",
  timeout: 10000,
  headers: {
  Authorization: token ? `Bearer ${token}` : "",
  },
});
