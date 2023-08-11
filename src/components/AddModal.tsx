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
import useOpenModal from "../store/closeState";
import { AiOutlineClose } from "react-icons/ai";
import { notification } from "antd";
import { useEventQuery } from "../hooks/useEventQuery";

const AddModal = () => {
  const [selected, setSelected] = useState(TAB_ADD[0]);
  const { startDate, endDate } = useDateStore();
  const { setOpenAddModal } = useOpenModal();
  const { refetch } = useEventQuery("myevents");

  const showNotification = (startDate: Date, endDate: Date | null) => {
    notification.info({
      message: `${selected === TAB_ADD[0] ? selected + "가" : selected + "이"} 신청되었습니다.`,
      description: `${
        endDate
          ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
          : `${startDate.toLocaleDateString()}`
      }`,
      placement: "top",
      duration: 1.5,
    });
  };

  const onSubmit = async (event: MouseEvent) => {
    event.preventDefault();
    const reqBody: AddEvent = new Object();

    reqBody.startDate = startDate;
    reqBody.eventType = EVENT_TYPE[selected];

    if (selected === TAB_ADD[0]) {
      if (!endDate) {
        alert(MODAL_MESSAGE.PLEASE_ENDDATE);
        return;
      } else {
        reqBody.endDate = endDate;
        reqBody.count = calcPeriods(startDate, endDate);
      }
    } else {
      reqBody.endDate = startDate;
    }
    try {
      const res = await addEvent(reqBody);
      if (res) {
        setOpenAddModal(false);
        refetch();
        showNotification(startDate, endDate);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <Modal $smallModal>
      <ModalTitle>신청하기</ModalTitle>
      <CloseButton onClick={() => setOpenAddModal(false)}>
        <AiOutlineClose size="1.5rem" />
      </CloseButton>
      <SelectWrapper>
        <ToggleBar $selected={selected} />
        {TAB_ADD.map((name, idx) => (
          <Select
            key={idx}
            $isClicked={selected === TAB_ADD[idx]}
            $selected={selected}
            onClick={() => setSelected(name)}
          >
            {name}
          </Select>
        ))}
      </SelectWrapper>
      <CalendarWrapper>
        <DatePickerComponent isRange={selected === TAB_ADD[0]} />
      </CalendarWrapper>
      <ButtonWrapper>
        <Button
          $greenLight={selected === TAB_ADD[0]}
          $orangeLight={selected === TAB_ADD[1]}
          onClick={() => setOpenAddModal(false)}
        >
          취소
        </Button>
        <Button $greenDark={selected === TAB_ADD[0]} $orangeDark={selected === TAB_ADD[1]} onClick={onSubmit}>
          신청
        </Button>
      </ButtonWrapper>
    </Modal>
  );
};

const CloseButton = styled.button`
  top: 2rem;
  right: 2rem;
  cursor: pointer;
  position: absolute;
  background-color: transparent;
`;

const SelectWrapper = styled.div`
  width: 50%;
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 0.5rem;
  justify-content: space-around;
  transition: all 1s ease-in-out;
  background-color: ${theme.colors.gray[2]};
  border: 1px solid ${theme.colors.gray[1]};
`;

const ToggleBar = styled.div<{
  $selected: string;
}>`
  width: 45%;
  height: 85%;
  border: none;
  display: flex;
  position: absolute;
  border-radius: 0.5rem;
  color: ${theme.colors.orange.dark};
  left: calc((219px / 2 - 97.65px) / 2);
  transition: transform 0.4s ease-in-out;
  background-color: ${theme.colors.white};

  ${({ $selected }) =>
    $selected === TAB_ADD[0]
      ? css`
          transform: none;
        `
      : css`
          transform: translateX(calc(219px / 2 - 2px));
        `};
`;

const Select = styled.div<{ $isClicked: boolean; $selected: string }>`
  z-index: 1;
  display: flex;
  cursor: pointer;
  padding: 10px 0;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  ${({ $isClicked, $selected, theme }) =>
    $isClicked
      ? $selected === TAB_ADD[0]
        ? css`
            font-weight: 700;
            color: ${theme.colors.green.main};
          `
        : css`
            font-weight: 700;
            color: ${theme.colors.orange.main};
          `
      : css`
          font-weight: 400;
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
