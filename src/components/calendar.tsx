import FullCalendar from "@fullcalendar/react";
import { EventInput, DayHeaderContentArg, DayCellContentArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import { listApplication } from "../lib/api/eventApi";
import useTabStore from "../store/calendarState";
import { SHA256 } from "crypto-js";

const StyledEvent = styled.div`
  background-color: ${(props) => {
    return props.id === "LEAVE" ? props.theme.colors.green.main : props.theme.colors.orange.main;
  }};
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
  padding: 0.3rem;
  cursor: pointer;
`;
const CalendarTabMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;
const BorderArea = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.green.main};
`;
const TabBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const TabBtn = styled.button<{ isActive: boolean }>`
  width: 5rem;
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  color: ${(props) => (props.children === "전체" ? props.theme.colors.black : props.theme.colors.white)};
  border: 1px solid ${(props) => props.theme.colors.green.main};
  border-radius: 0.5rem 0.5rem 0 0;
  color: ${(props) => {
    if (props.isActive) {
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
    props.isActive
      ? props.theme.colors.white
      : props.children === "연차"
      ? props.theme.colors.green.main
      : props.children === "당직"
      ? props.theme.colors.orange.main
      : props.theme.colors.white};

  /* isActive (버튼 활성화 상태) */
  ${(props) =>
    props.isActive &&
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
const OrderState = styled.span`
  font-size: 0.7rem;
  margin-right: 1rem;
`;
interface EventData {
  username: string;
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

  const { data: events, isLoading } = useQuery<EventData[]>("events", listApplication);

  const eventContent = (arg: { event: EventInput }) => {
    const { event } = arg;
    const eventType = event._def.extendedProps.type;
    const orderState = event._def.extendedProps.orderState;

    if (orderState === "REJECTED") return null;

    return (
      <StyledEvent id={eventType}>
        {orderState === "WAITING" && <OrderState>승인대기</OrderState>}
        {event.title}
      </StyledEvent>
    );
  };

  if (isLoading) return <div>Loading...</div>;

  const filteredEvents: EventInput[] =
    events
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
    // 일요일(Sun)인 경우 빨간색, 토요일(Sat)인 경우 파란색 스타일 적용
    const textColor = text === "Sun" ? "red" : text === "Sat" ? "blue" : "inherit";
    return <div style={{ color: textColor }}>{text}</div>;
  };

  const dayCellContent = (arg: DayCellContentArg) => {
    const { date } = arg;
    // 일요일(Sun)인 경우 빨간색, 토요일(Sat)인 경우 파란색 스타일 적용
    const textColor = date.getDay() === 0 ? "red" : date.getDay() === 6 ? "blue" : "inherit";
    return <div style={{ color: textColor }}>{date.getDate()}</div>;
  };

  return (
    <>
      <CalendarTabMenu>
        <BorderArea></BorderArea>
        <TabBtnWrapper>
          <TabBtn isActive={selectedTab === "전체"} onClick={() => setSelectedTab("전체")}>
            전체
          </TabBtn>
          <TabBtn isActive={selectedTab === "연차"} onClick={() => setSelectedTab("연차")}>
            연차
          </TabBtn>
          <TabBtn isActive={selectedTab === "당직"} onClick={() => setSelectedTab("당직")}>
            당직
          </TabBtn>
        </TabBtnWrapper>
      </CalendarTabMenu>

      <FullCalendar
        key={eventsHash}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={filteredEvents}
        eventBorderColor="white"
        eventContent={eventContent}
        dayHeaderContent={dayHeaderContent} // 헤더(요일 이름)의 스타일 적용
        dayCellContent={dayCellContent} // 캘린더 셀(날짜)의 스타일 적용
      />
    </>
  );
};

export default Calendar;
