import { EventType, OrderStateType } from "../api/eventApi";

const TAB_ADD = ["연차", "당직"];

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

const SIGNUP_MESSAGE = {
  REQUIRED_ONLY: "필수 입력값입니다.",
  REQUIRED_PASSWORD: "영문, 숫자, 특수문자를 포함(공백 제외)한 8~15자",
  PATTERN_EMAIL: "공백없이 @가 포함되어야 합니다.",
  PATTERN_PASSWORD: "영문, 숫자, 특수문자를 포함(공백 제외)한 8~15자.",
  MIN_LENGTH: "비밀번호는 최소 8자 이상입니다.",
  MAX_LENGTH: "비밀번호는 최대 15자 이하입니다.",
  VALIDATE: "비밀번호가 다릅니다.",
  SIGN_UP_SUCCESS: "회원가입에 성공하였습니다.",
  SIGN_UP_FAILED: "회원가입에 실패하였습니다. 다시 시도해주세요.",
  SIGN_UP_ERROR: "회원가입 요청 중 오류가 발생했습니다. 다시 시도해주세요.",
  EMAIL_FAILED: "이메일이 중복되었습니다. 다른 이메일을 사용해주세요.",
  EMAIL_ERROR: "이메일 중복 체크 중 오류가 발생했습니다. 다시 시도해주세요.",
};

const LOGIN_MESSAGE = {
  LOG_IN_SUCCESS: "로그인에 성공하였습니다.",
  LOG_IN_FAILED: "로그인에 실패하였습니다. 다시 시도해주세요.",
  LOG_IN_ERROR: "로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요.",
};

const REG_EXP_PW_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,.<>?~])(?!.*\s).{8,15}$/;


const REG_EXP_EMAIL_PATTERN = /^\S+@\S+$/i;

export {
  TAB_ADD,
  EVENT_TYPE,
  MODAL_MESSAGE,
  ORDER_STATE,
  SIGNUP_MESSAGE,
  REG_EXP_PW_PATTERN,
  REG_EXP_EMAIL_PATTERN,
  LOGIN_MESSAGE,
};
