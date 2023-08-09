import { styled } from "styled-components";
import { ChildrenProp } from "./Modal";
import { theme } from "../../styles/theme";
import { OrderStateType, cancelEvent } from "../../lib/api/eventApi";
import { MODAL_MESSAGE, ORDER_STATE } from "../../lib/util/constants";
import { useEventQuery } from "../../hooks/useEventQuery";
import { notification } from "antd";

interface ListProp extends ChildrenProp {
  orderState: OrderStateType;
  eventId: number;
}

const List = ({ children, orderState, eventId }: ListProp) => {
  const { refetch } = useEventQuery("myevents");

  const showNotification = () => {
    notification.info({
      message: MODAL_MESSAGE.CANCELED,
      placement: "top",
      duration: 1.5,
    });
  };

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
                showNotification();
                refetch();
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
  height: 2.5rem;
  display: flex;
  padding: 0 10px;
  align-items: center;
  border: 1px solid ${theme.colors.gray[2]};
  justify-content: space-between;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: ${theme.colors.gray[2]};
  }
`;

const StateWrapper = styled.div`
  gap: 5px;
  width: 8.5rem;
  display: flex;
  justify-content: center;
`;

const Waiting = styled.button`
  width: 4rem;
  cursor: default;
  padding: 2px 5px;
  border-radius: 5px;
  background-color: transparent;
  color: ${theme.colors.orange.dark};
`;

const Cancel = styled.button`
  width: 4rem;
  padding: 2px 5px;
  border-radius: 5px;
  color: ${theme.colors.white};
  transition: all 0.2s ease-in-out;
  background-color: ${theme.colors.gray[0]};

  &:hover {
    background-color: ${theme.colors.black};
  }
`;

const StateMessage = styled.span`
  color: ${theme.colors.orange.dark};
`;

export default List;
