import axios from "axios";
import Cookies from "js-cookie";


const BASE_URL = "http://localhost:5000/api/";

const TOKEN =
  Cookies.get("userData") &&
  JSON.parse(Cookies.get("userData")).currentUser.accessToken;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

console.log(TOKEN);
export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
