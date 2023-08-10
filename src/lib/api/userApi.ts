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
  try {
    const response = await api.post("/user/email", { email });
    return response.data;
  } catch (error) {
    console.error("Error in checkEmail:", error);
  }
};

export const signUp = async (email: string, password: string, username: string) => {
  try {
    const response = await api.post("/user/join", { email, password, username });
    return response.data;
  } catch (error) {
    console.error("Error in signUp:", error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/user/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error in login:", error);
  }
};

export const getUserInfo = async () => {
  try {
    const headers: { Authorization?: string } = {};
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await api.get("/user/myinfo/", { headers });
    return response.data;
  } catch (error) {
    console.error("Error in getUserInfo:", error);
  }
};


export const editUserInfo = async (
  imageUrl: string,
  username: string,
  currentPassword: string,
  newPassword: string,
  newPasswordCheck: string
) => {
  const headers: { Authorization?: string } = {};
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await api.put("/user/myinfo", { imageUrl, username, currentPassword, newPassword, newPasswordCheck }, { headers });
  return response.data;
};
