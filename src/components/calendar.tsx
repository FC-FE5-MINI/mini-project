import FullCalendar from "@fullcalendar/react";
import { EventInput, DayHeaderContentArg, DayCellContentArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import { AllList, MyList } from "../lib/api/eventApi";
import useTabStore from "../store/calendarState";
import { SHA256 } from "crypto-js";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import { theme } from "../styles/theme";
import { motion } from "framer-motion";
import AddModal from "./AddModal";
import MyListModal from "./MyListModal";
import useOpenModal from "../store/closeState";

const StyledEvent = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => {
    return props.id === "LEAVE" ? props.theme.colors.green.main : props.theme.colors.orange.main;
  }};
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
`;
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;
const CalendarTabMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;
const BorderArea = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.green.main};
  display: flex;
`;
const ModalBtnArea = styled.div`
  width: 80%;
`;
const ModalBtn = styled(motion.button)`
  width: 7rem;
  height: 2rem;
  border: 1px solid ${(props) => props.theme.colors.green.main};
  border-radius: 2rem;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
  &:first-child {
    margin-right: 0.5rem;
  }
  &:hover {
    background-color: ${(props) => props.theme.colors.green.dark};
    color: ${(props) => props.theme.colors.white};
  }
`;
const Label = styled.label`
  width: 130px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 1rem;
`;

const MyListBtn = styled.input`
  width: 20px;
  height: 20px;
`;
const TabBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const TabBtn = styled.button<{ $isActive: boolean }>`
  width: 5rem;
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  color: ${(props) => (props.children === "전체" ? props.theme.colors.black : props.theme.colors.white)};
  border: 1px solid ${(props) => props.theme.colors.green.main};
  border-radius: 0.5rem 0.5rem 0 0;
  color: ${(props) => {
    if (props.$isActive) {
      if (props.children === "연차") {
        return props.theme.colors.green.main;
      } else if (props.children === "당직") {
        return props.theme.colors.orange.main;
      } else if (props.children === "전체") {
        return props.theme.colors.black;
      }
    }
  }};
  background-color: ${(props) =>
    props.$isActive
      ? props.theme.colors.white
      : props.children === "연차"
      ? props.theme.colors.green.main
      : props.children === "당직"
      ? props.theme.colors.orange.main
      : props.theme.colors.white};

  /* $isActive (버튼 활성화 상태) */
  ${(props) =>
    props.$isActive &&
    css`
      border-bottom: 1px solid ${props.theme.colors.white};
      transform-origin: center bottom;
      transform: scale(1.2);
      &::before {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${props.theme.colors.white};
      }
    `}
`;
const OrderState = styled.p`
  font-size: 0.7rem;
  width: 3rem;
  height: 100%;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.colors.gray[0]};
  background-position: right;
  background-size: 100%;
`;
const CalendarDay = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`;
const CustomFullCalendar = styled(FullCalendar)`
  z-index: 0;
  .fc-theme-standard .fc-scrollgrid {
    border: 10px solid red;
    border-radius: 10px;
  }
`;

interface EventData {
  username?: string;
  startDate: string;
  endDate: string;
  eventType: string;
  userId: number;
  orderState: string;
  eventId: number;
}

const Calendar = () => {
  const selectedTab = useTabStore((state) => state.selectedTab);
  const setSelectedTab = useTabStore((state) => state.setSelectedTab);
  const [showMyList, setShowMyList] = useState(false);

  const { openAddModal, setOpenAddModal, openMyListModal, setOpenMyListModal } = useOpenModal();

  const { data: allEvents, isLoading } = useQuery<EventData[]>("events", AllList);
  const { data: myEvents } = useQuery<EventData[]>("myevents", MyList);

  const eventContent = (arg: { event: EventInput }) => {
    const { event } = arg;
    const eventType = event._def.extendedProps.type;
    const orderState = event._def.extendedProps.orderState;

    if (orderState === "REJECTED") return null;

    return (
      <StyledEvent id={eventType}>
        {orderState === "WAITING" && <OrderState>&nbsp;승인대기</OrderState>}&nbsp;{event.title}
      </StyledEvent>
    );
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <SyncLoader size={10} color={theme.colors.green.main} loading={isLoading} />
      </LoadingContainer>
    );
  }

  const filteredEvents: EventInput[] =
    (showMyList ? myEvents : allEvents)
      ?.filter((data: EventData) => {
        if (selectedTab === "전체") return true;
        if (selectedTab === "연차") return data.eventType === "LEAVE";
        if (selectedTab === "당직") return data.eventType === "DUTY";
        return false;
      })
      .map((data: EventData) => ({
        title: data.username,
        start: data.startDate,
        end: data.endDate,
        type: data.eventType,
        id: data.eventId.toString(),
        userid: data.userId,
        orderState: data.orderState,
      })) || [];

  const eventsString = JSON.stringify(filteredEvents);
  const eventsHash = SHA256(eventsString).toString();

  const dayHeaderContent = (arg: DayHeaderContentArg) => {
    const { text } = arg;
    const textColor = text === "Sun" ? "red" : text === "Sat" ? "blue" : "inherit";
    return <CalendarDay style={{ color: textColor }}>{text}</CalendarDay>;
  };

  const dayCellContent = (arg: DayCellContentArg) => {
    const { date } = arg;
    const textColor = date.getDay() === 0 ? "red" : date.getDay() === 6 ? "blue" : "inherit";
    return <div style={{ color: textColor }}>{date.getDate()}</div>;
  };

  return (
    <>
      <CalendarTabMenu>
        <BorderArea>
          <ModalBtnArea>
            <ModalBtn layoutId="addModal" onClick={() => setOpenAddModal(true)}>
              연차/당직 신청
            </ModalBtn>
            <ModalBtn layoutId="myListModal" onClick={() => setOpenMyListModal(true)}>
              내 신청현황
            </ModalBtn>
          </ModalBtnArea>
          <Label htmlFor="myListCheckbox">
            <MyListBtn
              type="checkbox"
              id="myListCheckbox"
              checked={showMyList}
              onChange={() => setShowMyList((prev) => !prev)}
            />
            내 일정만 보기
          </Label>
        </BorderArea>
        <TabBtnWrapper>
          <TabBtn $isActive={selectedTab === "전체"} onClick={() => setSelectedTab("전체")}>
            전체
          </TabBtn>
          <TabBtn $isActive={selectedTab === "연차"} onClick={() => setSelectedTab("연차")}>
            연차
          </TabBtn>
          <TabBtn $isActive={selectedTab === "당직"} onClick={() => setSelectedTab("당직")}>
            당직
          </TabBtn>
        </TabBtnWrapper>
      </CalendarTabMenu>

      {openAddModal && <AddModal />}
      {openMyListModal && <MyListModal />}

      <motion.div
        key={eventsHash}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
      >
        <CustomFullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={filteredEvents}
          eventBorderColor="white"
          eventContent={eventContent}
          dayHeaderContent={dayHeaderContent}
          dayCellContent={dayCellContent}
        />
      </motion.div>
    </>
  );
};

export default Calendar;
