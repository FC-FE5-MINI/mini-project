import FullCalendar from "@fullcalendar/react";
import { EventInput, DayHeaderContentArg, DayCellContentArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEventQuery } from "../hooks/useEventQuery";
import { usefilterEvents, EventData } from "../hooks/useEventFilter";
import styled, { css } from "styled-components";
import useTabStore from "../store/calendarState";
import { SHA256 } from "crypto-js";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import { theme } from "../styles/theme";
import { motion } from "framer-motion";
import AddModal from "./AddModal";
import MyListModal from "./MyListModal";
import useOpenModal from "../store/closeState";
import { ORDER_STATE, TAB_ADD } from "../lib/util/constants";
import { notification } from "antd";

const StyledEvent = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => {
    return props.id === "LEAVE" ? props.theme.colors.green.main : props.theme.colors.orange.main;
  }};
  border-radius: 40px;
  font-size: 1rem;
  height: 1.5rem;
  width: 100%;
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
  width: 1100px;
`;
const BorderArea = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.green.main};
  display: flex;
`;
const ModalBtnArea = styled.div`
  width: 80%;
  height: 2rem;
  display: flex;
  align-items: center;
`;
const ModalBtn = styled(motion.button)`
  padding: 0.5rem 1rem;
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
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 1rem;
`;

const MyListBtn = styled.input`
  width: 30px;
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
  padding: 0 0.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.colors.gray[0]};
  border-radius: 40px;
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
const EventTitle = styled.p`
  font-size: 1rem;
  padding-left: 0.2rem;
  display: flex;
  align-items: center;
`;

const Calendar = () => {
  const selectedTab = useTabStore((state) => state.selectedTab);
  const setSelectedTab = useTabStore((state) => state.setSelectedTab);
  const [showMyList, setShowMyList] = useState(false);

  const { openAddModal, setOpenAddModal, openMyListModal, setOpenMyListModal } = useOpenModal();

  const { data: allEvents, isLoading: allEventsLoading } = useEventQuery("events");
  const { data: myEvents, isLoading: myEventsLoading } = useEventQuery("myevents");

  // allEvents와 myEvents가 존재하지 않을 경우 빈 배열로 초기화
  const allEventsExist = allEvents && allEvents.length > 0;
  const myEventsExist = myEvents && myEvents.length > 0;
  const eventsExist = !allEventsLoading && !myEventsLoading && (allEventsExist || myEventsExist);

  if (allEventsLoading || myEventsLoading || !eventsExist) {
    return (
      <LoadingContainer>
        <SyncLoader size={10} color={theme.colors.green.main} loading={true} />
      </LoadingContainer>
    );
  }

  const events = showMyList ? myEvents || [] : allEvents || [];

  const filteredEvents = usefilterEvents(events, selectedTab);

  const mappedEvents = filteredEvents.map((data: EventData) => ({
    title: data.username,
    start: new Date(data.startDate),
    end: new Date(data.endDate),
    type: data.eventType,
    id: data.eventId.toString(),
    userId: data.userId,
    orderState: data.orderState,
  }));

  const eventContent = (arg: { event: EventInput }) => {
    const { event } = arg;
    const eventType = event._def.extendedProps.type;
    const orderState = event._def.extendedProps.orderState;

    if (orderState === ORDER_STATE.RJ) return null;

    return (
      <>
        <StyledEvent id={eventType}>
          {orderState === ORDER_STATE.WT && <OrderState>&nbsp;{ORDER_STATE[orderState]}승인대기</OrderState>}&nbsp;
          <EventTitle>{event.title}</EventTitle>
        </StyledEvent>
      </>
    );
  };

  const eventsString = JSON.stringify(mappedEvents);
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
  const eventClick = (arg: EventClickArg) => {
    const { event } = arg;
    const clickedStartDate = event._instance?.range.start.toISOString().slice(0, 10);
    const clickedEndDate = event._instance?.range.end.toISOString().slice(0, 10);
    const clickedDateRange = `${clickedStartDate} - ${clickedEndDate}`;
    const clickedEventType = event._def.extendedProps.type;
    showNotification(clickedDateRange, clickedEventType);
  };

  const showNotification = (dateRange: string, clickedEventType: string) => {
    const eventTypeText = clickedEventType === "DUTY" ? "당직" : "연차";
    notification.info({
      message: eventTypeText,
      description: dateRange,
      placement: "bottom",
      duration: 1.5,
    });
  };

  const TAB_ADD_ALL = ["전체", ...TAB_ADD];
  return (
    <>
      <CalendarTabMenu>
        <BorderArea>
          <ModalBtnArea>
            <ModalBtn onClick={() => setOpenAddModal(true)}>연차/당직 신청</ModalBtn>
            <ModalBtn onClick={() => setOpenMyListModal(true)}>내 신청현황</ModalBtn>
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
          {TAB_ADD_ALL.map((tab, index) => (
            <TabBtn key={index} $isActive={selectedTab === tab} onClick={() => setSelectedTab(tab)}>
              {tab}
            </TabBtn>
          ))}
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
          events={mappedEvents}
          eventBorderColor="white"
          eventContent={eventContent}
          dayHeaderContent={dayHeaderContent}
          dayCellContent={dayCellContent}
          dayMaxEvents={3}
          eventClick={eventClick}
        />
      </motion.div>
    </>
  );
};

export default Calendar;
