import { EventType, OrderStateType } from "../api/eventApi";

const TAB_ADD = ["전체", "연차", "당직"];

const EVENT_TYPE: { [key: string]: EventType } = {
  연차: "LEAVE",
  당직: "DUTY",
  LV: "LEAVE",
  DT: "DUTY",
};

const ORDER_STATE: { [key: string]: OrderStateType } = {
  WT: "WAITING",
  AP: "APPROVED",
  RJ: "REJECTED",
};

const MODAL_MESSAGE = {
  PLEASE_ENDDATE: "연차 종료 날짜를 설정해 주세요.",
  CANCELED: "신청이 취소되었습니다.",
  ADD_SUCCESS: "신청이 완료되었습니다.",
};

export { TAB_ADD, EVENT_TYPE, MODAL_MESSAGE, ORDER_STATE };
