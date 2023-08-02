import axios from "axios";

export type EventType = "DUTY" | "LEAVE";
export type OrderStateType = "WAITING" | "APPROVED" | "REJECTED" | "CANCEL";

export interface AddEvent {
  eventType?: EventType;
  startDate?: Date;
  endDate?: Date;
  count?: number;
}

const api = axios.create({
  baseURL: "https://b79e656d-ef86-45fe-a5cb-a112eafd50a8.mock.pstmn.io",
  headers: {
    "Content-Type": "application/json",
  },
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
  console.log(data);
  return data;
};

// 연차/당직 취소
const cancelEvent = async (userId: number) => {
  const { data } = await api.post("/user/event/cancel", { userId });
  console.log(data);
  return data;
};

// 연차/당직 신청 현황
const getMyEvents = async (userId: number) => {
  const { data } = await api.get(`/user/event/list?id=${userId}`);
  console.log(data);
  return data;
};

export { addEvent, cancelEvent, getMyEvents };
