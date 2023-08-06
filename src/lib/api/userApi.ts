import axios from "axios";

const api = axios.create({
  baseURL: "https://fast-api-heroku-test-fb58c33ccfb2.herokuapp.com",
});

export const checkEmail = async (email: string) => {
  const response = await api.post("/user/email", { email });
  return response.data;
};

export const signUp = async (email: string, password: string, username: string) => {
  const response = await api.post("/user/join", { email, password, username });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post("/user/login", { email, password });
  return response.data;
};

export const getUserInfo = async () => {
  const response = await api.get("/user/myinfo");
  return response.data;
};
