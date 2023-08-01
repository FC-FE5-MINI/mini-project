import { EventType } from "../api/eventApi";

const TAB_ADD = ["연차", "당직"];

const EVENT_TYPE: { [key: string]: EventType } = {
  연차: "LEAVE",
  당직: "DUTY",
};

const ADD_MESSAGE = {
  PLEASE_ENDDATE: "연차 종료 날짜를 설정해 주세요.",
};

export { TAB_ADD, EVENT_TYPE, ADD_MESSAGE };
