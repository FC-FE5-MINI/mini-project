import { styled } from "styled-components";
import { ChildrenProp } from "./Modal";
import { theme } from "../../styles/theme";
import { OrderStateType, cancelEvent } from "../../lib/api/eventApi";
import { MODAL_MESSAGE, ORDER_STATE } from "../../lib/util/constants";

interface ListProp extends ChildrenProp {
  orderState: OrderStateType;
  eventId: number;
}

const List = ({ children, orderState, eventId }: ListProp) => {
  const renderState = (orderState: OrderStateType) => {
    switch (orderState) {
      case ORDER_STATE.AP:
        return <StateMessage>승인 완료</StateMessage>;
      case ORDER_STATE.RJ:
        return <StateMessage>승인 반려</StateMessage>;
      case ORDER_STATE.WT:
        return (
          <>
            <Waiting disabled>승인대기</Waiting>
            <Cancel
              onClick={() => {
                cancelEvent(eventId);
                alert(MODAL_MESSAGE.CANCELED);
              }}
            >
              취소
            </Cancel>
          </>
        );
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
