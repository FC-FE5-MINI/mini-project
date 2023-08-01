import { styled } from "styled-components";
import Button from "./common/Button";
import Modal from "./common/Modal";
import ModalTitle from "./common/ModalTitle";
import { useState } from "react";
import { css } from "styled-components";
import { theme } from "../styles/theme";
import DatePickerComponent from "./DatePicker";
import useDateStore from "../store/dateStore";
import { AddEvent, addEvent } from "../lib/api/eventApi";
import { ADD_MESSAGE, EVENT_TYPE, TAB_ADD } from "../lib/util/constants";

const AddModal = () => {
  const [selected, setSelected] = useState("연차");
  const { startDate, endDate } = useDateStore();

  const calcPeriods = (start: Date, end: Date) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays =
      Math.round(Math.abs((new Date(end).setHours(0, 0, 0, 0) - new Date(start).setHours(0, 0, 0, 0)) / oneDay)) + 1;
    return diffDays;
  };

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    const reqBody: AddEvent = new Object();

    reqBody.startDate = startDate;
    reqBody.eventType = EVENT_TYPE[selected];

    if (selected === TAB_ADD[0]) {
      if (!endDate) {
        alert(ADD_MESSAGE.PLEASE_ENDDATE);
      } else {
        reqBody.endDate = endDate;
        reqBody.count = calcPeriods(startDate, endDate);
      }
    }
    addEvent(reqBody);
  };

  return (
    <Modal>
      <ModalTitle>신청하기</ModalTitle>
      <SelectWrapper>
        {TAB_ADD.map((name, idx) => (
          <Select key={idx} onClick={() => setSelected(name)} $isSelected={selected === name}>
            {name}
          </Select>
        ))}
      </SelectWrapper>
      <CalendarWrapper>
        <DatePickerComponent isRange={selected === TAB_ADD[0]} />
      </CalendarWrapper>
      <ButtonWrapper>
        <Button $ligth>취소</Button>
        <Button $dark onClick={onClick}>
          신청
        </Button>
      </ButtonWrapper>
    </Modal>
  );
};

const SelectWrapper = styled.div`
  display: flex;
`;

const Select = styled.div<{
  $isSelected?: boolean;
}>`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border: 1px solid ${theme.colors.black};
  padding: 10px 1.5rem;
  cursor: pointer;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      color: ${theme.colors.white};
      background-color: ${theme.colors.black};
      border: none;
    `}
`;

const CalendarWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin: 20px 0;
`;

const ButtonWrapper = styled.div`
  gap: 10px;
  display: flex;
  align-self: end;
`;

export default AddModal;
