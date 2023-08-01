import axios from "axios";

const api = axios.create({
  baseURL: "https://b79e656d-ef86-45fe-a5cb-a112eafd50a8.mock.pstmn.io",
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