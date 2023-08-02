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
import { MODAL_MESSAGE, EVENT_TYPE, TAB_ADD } from "../lib/util/constants";
import { calcPeriods } from "../lib/util/functions";

const AddModal = () => {
  const [selected, setSelected] = useState(TAB_ADD[0]);
  const { startDate, endDate } = useDateStore();

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    const reqBody: AddEvent = new Object();

    reqBody.startDate = startDate;
    reqBody.eventType = EVENT_TYPE[selected];

    if (selected === TAB_ADD[0]) {
      if (!endDate) {
        alert(MODAL_MESSAGE.PLEASE_ENDDATE);
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
