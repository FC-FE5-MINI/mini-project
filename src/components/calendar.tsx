import { useQuery } from "react-query";
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import { listApplication } from "../lib/api/eventApi";

const StyledEvent = styled.div`
  background-color: ${(props) => {
    console.log(props);
    return props.id === "ANNUAL" ? props.theme.colors.green.main : props.theme.colors.orange.main;
  }};
  color: ${(props) => props.theme.colors.white};
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`;

interface EventData {
  username: string;
  startDate: string;
  endDate: string;
  eventType: number;
  userId: number;
  orderState: string;
  eventId: number;
}

const Calendar = () => {
  const { data: events, isLoading } = useQuery<EventData[]>("events", listApplication);

  const eventContent = (arg: { event: EventInput }) => {
    const { event } = arg;
    const eventType = event._def.extendedProps.type;
    return <StyledEvent id={eventType}>{event.title}</StyledEvent>;
  };

  if (isLoading) return <div>Loading...</div>;

  const formattedEvents: EventInput[] =
    events?.map((data: EventData) => ({
      title: data.username,
      start: data.startDate,
      end: data.endDate,
      type: data.eventType,
      id: data.eventId.toString(),
      userid: data.userId,
      orderState: data.orderState,
    })) || [];

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={formattedEvents}
        eventBorderColor="white"
        eventContent={eventContent}
      />
    </>
  );
};

export default Calendar;
