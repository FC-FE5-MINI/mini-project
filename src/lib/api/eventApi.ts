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

const endPoint = "/user/event";

const fetchData = async (url: string, method: string, reqData?: unknown) => {
  try {
    const { data } = await api({ url, method, data: reqData });
    if (method === "get") return data.data;
    return data;
  } catch (error) {
    if (url === endPoint && method === "post") {
      const custonError = error as CustomError;
      alert(custonError.response?.data.errCode.message);
    } else {
      console.error("오류 발생:", error);
      throw error;
    }
  }
};

// 모든 유저 연차/당직 리스트(GET)
const allList = async () => {
  return await fetchData(`${endPoint}s`, "get");
};

// 내 연차/당직 신청 현솽(GET)
const myList = async () => {
  return await fetchData(endPoint, "get");
};

// 연차/당직 신청(POST)
const addEvent = async (reqBody: AddEvent) => {
  return await fetchData(endPoint, "post", reqBody);
};

// 연차/당직 취소
const cancelEvent = async (userId: number) => {
  return await fetchData(`${endPoint}/${userId}`, "delete");
};

export { allList, myList, addEvent, cancelEvent };
