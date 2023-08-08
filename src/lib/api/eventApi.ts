import axios from "axios";
import { useUserStore } from '../../store/userStore';

export type EventType = "DUTY" | "LEAVE";
export type OrderStateType = "WAITING" | "APPROVED" | "REJECTED";

export interface AddEvent {
  eventType?: EventType;
  startDate?: Date;
  endDate?: Date;
  count?: number;
}

const api = axios.create({
  baseURL: "https://fd220552-0bf1-4bff-ab2c-50941e7a0832.mock.pstmn.io",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useUserStore.getState().user.accessToken;  // Zustand store에서 토큰 가져옴
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 모든 유저 연차/당직 리스트(GET)
export const AllList = async () => {
  try {
    const { data } = await api.get(`/user/event/list`);
    return data;
  } catch (error) {
    console.error("오류 발생:", error);
    throw error;
  }
};

// 내 연차/당직 신청 현솽(GET)
export const MyList = async () => {
  try {
    const { data } = await api.get(`/user/event/myList`);
    return data.data;
  } catch (error) {
    console.error("오류 발생:", error);
    throw error;
  }
};

// 연차/당직 신청(POST)
const addEvent = async (reqBody: AddEvent) => {
  const { data } = await api.post("/user/event/add", reqBody);
  return data;
};

// 연차/당직 취소
const cancelEvent = async (userId: number) => {
  const { data } = await api.post("/user/event/cancel", { userId });
  return data;
};

// 연차/당직 신청 현황
const getMyEvents = async (userId: number) => {
  const { data } = await api.get(`/user/event/list?id=${userId}`);
  return data;
};

export { addEvent, cancelEvent, getMyEvents };
