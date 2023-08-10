import axios from "axios";
import { useUserStore } from "../../store/userStore";

export type EventType = "DUTY" | "LEAVE";
export type OrderStateType = "WAITING" | "APPROVED" | "REJECTED";

export interface AddEvent {
  eventType?: EventType;
  startDate?: Date;
  endDate?: Date;
  count?: number;
}

interface CustomError extends Error {
  response?: {
    data: {
      errCode: {
        message: string;
      };
    };
  };
}

const api = axios.create({
  baseURL: "https://myturn.store",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().user.accessToken; // Zustand store에서 토큰 가져옴
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 모든 유저 연차/당직 리스트(GET)
const allList = async () => {
  try {
    const { data } = await api.get(`/user/event/list`);
    return data.data;
  } catch (error) {
    console.error("오류 발생:", error);
    throw error;
  }
};

// 내 연차/당직 신청 현솽(GET)
const myList = async () => {
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
  try {
    const { data } = await api.post("/user/event/add", reqBody);
    return data;
  } catch (error: unknown) {
    const custonError = error as CustomError;
    alert(custonError.response?.data.errCode.message);
  }
};

// 연차/당직 취소
const cancelEvent = async (userId: number) => {
  try {
    const { data } = await api.post(`/user/event/cancel/${userId}`);
    return data;
  } catch (error) {
    console.error("오류 발생:", error);
    throw error;
  }
};

export { allList, myList, addEvent, cancelEvent };
