import { styled } from "styled-components";
import Modal from "./common/Modal";
import ModalTitle from "./common/ModalTitle";
import List from "./common/List";
import useMyList, { MyListData } from "../hooks/useMyList";
import { EVENT_TYPE } from "../lib/util/constants";
import { calcPeriods } from "../lib/util/functions";
import { theme } from "../styles/theme";

const MyListModal = () => {
  const userId = 4; //임시
  const leaveList = useMyList(EVENT_TYPE.LEAVE, userId);
  const dutyList = useMyList(EVENT_TYPE.DUTY, userId);

  const renderList = (listData: MyListData[]) => {
    if (listData.length) {
      return listData.map((item, idx) => (
        <List key={idx} orderState={item.orderState} eventId={item.eventId}>
          {item.endDate ? (
            <>
              <span>{`${item.startDate} ~ ${item.endDate}`}</span>{" "}
              <LeaveDays>{`(${calcPeriods(item.startDate, item.endDate)}일)`}</LeaveDays>
            </>
          ) : (
            <span>{`${item.startDate}`}</span>
          )}
        </List>
      ));
    }
  };

  return (
    <Modal>
      <ModalTitle>신청현황</ModalTitle>
      <ListsWrapper>
        <ListWrapper>
          <ListTitle>연차 신청 현황</ListTitle>
          <ListArea>{renderList(leaveList)}</ListArea>
        </ListWrapper>
        <ListWrapper>
          <ListTitle>당직 신청 현황</ListTitle>
          <ListArea>{renderList(dutyList)}</ListArea>
        </ListWrapper>
      </ListsWrapper>
    </Modal>
  );
};

const LeaveDays = styled.span`
  color: ${theme.colors.orange.dark};
`;

const ListsWrapper = styled.div`
  gap: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ListWrapper = styled.div`
  gap: 10px;
  height: 50%;
  display: flex;
  flex-direction: column;
`;

const ListArea = styled.ul`
  gap: 5px;
  height: 100%;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
`;

const ListTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

export default MyListModal;
