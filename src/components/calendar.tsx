import { useQuery } from "react-query";
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
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
      <div>
        <button onClick={() => setSelectedTab("전체")}>전체</button>
        <button onClick={() => setSelectedTab("연차")}>연차</button>
        <button onClick={() => setSelectedTab("당직")}>당직</button>
      </div>

      <FullCalendar
        key={eventsHash} // 새로 추가한 부분
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
