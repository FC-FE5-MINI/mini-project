import axios from "axios";
import { useUserStore } from "../../store/userStore";

const userStore = useUserStore;

const api = axios.create({
  baseURL: "https://myturn.store",
});

const getToken = () => {
  // 직접 store 인스턴스에서 상태를 가져옵니다.
  return userStore.getState().user.accessToken;
};

export const checkEmail = async (email: string) => {
  const response = await api.post("/user/email", { email });
  console.log("EMAIL!!", email);
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
  const headers: { Authorization?: string } = {};
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await api.get("/user/myinfo/", { headers });
  return response.data;
};
