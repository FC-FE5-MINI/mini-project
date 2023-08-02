import { styled } from "styled-components";
import { ChildrenProp } from "./Modal";
import { theme } from "../../styles/theme";
import { OrderStateType, cancelEvent } from "../../lib/api/eventApi";

interface ListProp extends ChildrenProp {
  orderState: OrderStateType;
  eventId: number;
}

const List = ({ children, orderState, eventId }: ListProp) => {
  const renderState = (orderState: OrderStateType) => {
    switch (orderState) {
      case "APPROVED":
        return <StateMessage>승인 완료</StateMessage>;
      case "REJECTED":
        return <StateMessage>승인 반려</StateMessage>;
      case "WAITING":
        return (
          <>
            <Waiting disabled>승인대기</Waiting>
            <Cancel
              onClick={() => {
                cancelEvent(eventId);
              }}
            >
              취소
            </Cancel>
          </>
        );
      case "CANCEL":
        return <StateMessage>신청 취소</StateMessage>;
    }
  };

  return (
    <StyledList>
      <div>{children}</div>
      <StateWrapper>{renderState(orderState)}</StateWrapper>
    </StyledList>
  );
};

const StyledList = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StateWrapper = styled.div`
  gap: 5px;
  width: 8.5rem;
  display: flex;
  justify-content: center;
`;

const Cancel = styled.button`
  width: 4rem;
  padding: 2px 5px;
  border-radius: 5px;
  color: ${theme.colors.white};
  background-color: ${theme.colors.gray[0]};
`;

const Waiting = styled(Cancel)`
  cursor: default;
  color: ${theme.colors.white};
  background-color: ${theme.colors.gray[1]};
`;

const StateMessage = styled.span`
  color: ${theme.colors.orange.dark};
`;

export default List;
