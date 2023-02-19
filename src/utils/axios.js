import axios from "axios";

export const openAI = axios.create({
  baseURL: "https://api.openai.com/v1"
});
