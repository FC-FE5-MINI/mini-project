import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
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
  font-size: 14px;
  cursor: pointer;
`;
const CalendarTabMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;
const BorderArea = styled.div`
  width: 75%;
  border-bottom: 1px solid ${(props) => props.theme.colors.green.main};
`;
const TabBtnWrapper = styled.div`
  width: 25%;
`;
const TabBtn = styled.button<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  color: ${(props) =>
    !props.isActive && props.children === "전체" ? props.theme.colors.black : props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.green.main};
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: ${(props) =>
    props.isActive
      ? props.theme.colors.white
      : props.children === "연차"
      ? props.theme.colors.orange.main
      : props.children === "당직"
      ? props.theme.colors.green.main
      : props.theme.colors.white};

  //isActive : 버튼 활성화 상태
  ${(props) =>
    props.isActive &&
    css`
      color: ${props.children === "연차" ? props.theme.colors.orange.main : props.theme.colors.green.main};
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
    return <StyledEvent id={eventType}>{event.title}</StyledEvent>;
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
      />
    </>
  );
};

export default Calendar;
