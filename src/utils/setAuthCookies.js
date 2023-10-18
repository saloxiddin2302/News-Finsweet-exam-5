import Cookies from "js-cookie";
import { EXPIRE_DATE, ROLE, TOKEN } from "../const";

export function setAuthCookies({ token, role, expire }) {
  Cookies.set(TOKEN, token);
  Cookies.set(ROLE, role);
  Cookies.set(EXPIRE_DATE, expire);
}
