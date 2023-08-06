import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;

const EventsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const EventItem = styled.li`
  margin-bottom: 10px;
`;

const EventTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const EventDate = styled.span`
  font-size: 14px;
  color: #666;
`;

const MoreModal = ({ onClose, events }: Props) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>
          <h2>더보기</h2>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ModalHeader>
        <EventsList>
          {events.map((event, index) => (
            <EventItem key={index}>
              <EventTitle>{event.title}</EventTitle>
              <EventDate>
                {event.start.toISOString().slice(5, 10)} ~ {event.end.toISOString().slice(5, 10)}
              </EventDate>
            </EventItem>
          ))}
        </EventsList>
      </ModalContainer>
    </ModalBackground>
  );
};

interface EventInput {
  title: string;
  start: Date;
  end: Date;
}

interface Props {
  onClose: () => void;
  events: EventInput[];
}

export default MoreModal;
