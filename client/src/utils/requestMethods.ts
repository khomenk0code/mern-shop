import axios from "axios";

const BASE_URL = "https://mern-shop-api.vercel.app/api";

const localStorageItem = localStorage.getItem("persist:root");
export const admin = localStorageItem
    ? JSON.parse(JSON.parse(localStorageItem)?.user)?.currentUser?.isAdmin ||
      false
    : false;

const TOKEN = localStorageItem
    ? JSON.parse(JSON.parse(localStorageItem)?.user)?.currentUser
          ?.accessToken || ""
    : "";
console.log(TOKEN)

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${TOKEN}` },
});
