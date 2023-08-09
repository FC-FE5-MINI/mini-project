import { FieldErrors } from "react-hook-form";
import { SIGNUP_MESSAGE } from "./constants";

// 두 날짜의 기간을 계산하는 함수
const calcPeriods = (start: Date, end: Date) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays =
    Math.round(Math.abs((new Date(end).setHours(0, 0, 0, 0) - new Date(start).setHours(0, 0, 0, 0)) / oneDay)) + 1;
  return diffDays;
};

const renderNameError = (errors: FieldErrors) => {
  return errors.name && errors.name.type === "required" && SIGNUP_MESSAGE.REQUIRED;
};

const renderEmailError = (errors: FieldErrors) => {
  if (errors.email) {
    switch (errors.email.type) {
      case "required":
        return SIGNUP_MESSAGE.REQUIRED;
      case "pattern":
        return SIGNUP_MESSAGE.PATTERN;
    }
  }
};

const renderPasswordError = (errors: FieldErrors) => {
  if (errors.password) {
    switch (errors.password.type) {
      case "required":
        return SIGNUP_MESSAGE.REQUIRED;
      case "minLength":
        return SIGNUP_MESSAGE.MIN_LENGHT;
      case "maxLength":
        return SIGNUP_MESSAGE.MAX_LENGHT;
      case "pattern":
        return SIGNUP_MESSAGE.PATTERN;
    }
  }
};

const renderPasswordConfirm = (errors: FieldErrors) => {
  if (errors.passwordConfirm) {
    switch (errors.passwordConfirm.type) {
      case "required":
        return SIGNUP_MESSAGE.REQUIRED;
      case "validate":
        return SIGNUP_MESSAGE.VALIDATE;
    }
  }
};

export { calcPeriods, renderNameError, renderEmailError, renderPasswordError, renderPasswordConfirm };
