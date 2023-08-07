import axios from "axios";

const api = axios.create({
  baseURL: "https://fd220552-0bf1-4bff-ab2c-50941e7a0832.mock.pstmn.io",
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
