import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import { listApplication } from "../lib/api/eventApi";
import { useState, useEffect } from "react";

const StyledEvent = styled.div`
  background-color: ${(props) =>
    props.id === "연차"
      ? props.theme.colors.green.main
      : props.id === "당직"
      ? props.theme.colors.orange.main
      : "initial"};
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
}
const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventData = await listApplication();
        console.log("eventData:", typeof eventData); //왜..string이지?

        const formattedEvents = eventData.map((data: EventData) => ({
          title: data.username,
          start: data.startDate,
          end: data.endDate,
          id: data.eventType,
          userid: data.userId,
        }));
        console.log("formattedEvents:", formattedEvents);
        setEvents(formattedEvents);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventBorderColor="white"
        eventContent={(arg) => <StyledEvent id={arg.event.id}>{arg.event.title}</StyledEvent>}
      />
    </>
  );
};

export default Calendar;
