import axios from "axios";

export const apiFetch = axios.create({
  baseURL: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
  headers: {
    "Content-Type": "application/json",
  },
});