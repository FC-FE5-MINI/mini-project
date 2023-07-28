import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";

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

const Calendar = () => {
  const events = [
    {
      title: "user1",
      start: "2023-07-30",
      end: new Date("2023-08-02").toISOString(),
      id: "연차",
      userid: "user1",
    },
    {
      title: "user2",
      start: "2023-07-28",
      end: "2023-07-29",
      id: "당직",
      userid: "user2",
    },
  ];

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventBorderColor="white"
        slotMaxTime="2023-08-04"
        eventContent={(arg) => <StyledEvent id={arg.event.id}>{arg.event.title}</StyledEvent>}
      />
    </>
  );
};

export default Calendar;
