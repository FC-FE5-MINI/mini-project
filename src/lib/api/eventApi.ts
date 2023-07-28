import axios from "axios";

// 연차/당직 신청(POST)
interface postApplication {
  eventType: string;
  startDate: string;
  endDate: string;
  count: number;
}
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
