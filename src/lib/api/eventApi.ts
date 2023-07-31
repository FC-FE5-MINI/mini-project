import axios from "axios";

type EventType = "DUTY" | "LEAVE";
// type OrderStateType = "WAITING" | "APPROVED" | "REJECTED" | "CANCEL";

export interface CancelEvent {
  eventId: number;
  eventType: EventType;
  orderState: "CANCEL";
}

export interface AddEvent {
  eventType?: EventType;
  startDate?: Date;
  endDate?: Date;
  count?: number;
}

// 연차/당직 신청(POST)
interface postApplication {
  eventType: string;
  startDate: string;
  endDate: string;
  count: number;
}

const api = axios.create({
  baseURL: "https://b79e656d-ef86-45fe-a5cb-a112eafd50a8.mock.pstmn.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export const postApplication = async ({ eventType, startDate, endDate, count }: postApplication) => {
  try {
    const response = await axios.post("https://b79e656d-ef86-45fe-a5cb-a112eafd50a8.mock.pstmn.io/user/event/add", {
      eventType,
      startDate,
      endDate,
      count,
    });
    return response.data;
  } catch (error) {
    console.error("오류 발생:", error);
    throw error;
  }
};

// 모든 유저 연차/당직 리스트(GET)
interface listApplication {
  eventType: string;
  startDate: string;
  endDate: string;
  count: number;
}
export const listApplication = async () => {
  try {
    const response = await axios.get("https://b79e656d-ef86-45fe-a5cb-a112eafd50a8.mock.pstmn.io/user/event/list", {});
    return response.data;
  } catch (error) {
    console.error("오류 발생:", error);
    throw error;
  }
};

// 연차/당직 신청
const addEvent = async (reqBody: AddEvent) => {
  const { data } = await api.post("/user/event/add", reqBody);
  console.log(data);
  return data;
};

// 연차/당직 취소
const cancelEvent = async (reqBody: CancelEvent) => {
  const { data } = await api.post("/user/event/cancel", reqBody);
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
