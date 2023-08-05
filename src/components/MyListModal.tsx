import { styled } from "styled-components";
import Modal from "./common/Modal";
import ModalTitle from "./common/ModalTitle";
import List from "./common/List";
import useMyList, { MyListData } from "../hooks/useMyList";
import { EVENT_TYPE, ORDER_STATE } from "../lib/util/constants";
import { calcPeriods } from "../lib/util/functions";
import { theme } from "../styles/theme";
import useOpenModal from "../store/closeState";
import { AiOutlineClose } from "react-icons/ai";

const MyListModal = () => {
  const userId = 4; //임시
  const leaveList = useMyList(EVENT_TYPE.LV, userId);
  const dutyList = useMyList(EVENT_TYPE.DT, userId);
  const { setOpenMyListModal } = useOpenModal();

  const renderCount = () => {
    if (leaveList.length) {
      const myAnuualCount = leaveList[0].annualCount;
      const anuualSpend = leaveList
        .map((item) => item.endDate && item.orderState === ORDER_STATE.WT && calcPeriods(item.startDate, item.endDate))
        .reduce((a, b) => (a as number) + (b as number));
      return <Leaves>{myAnuualCount - (anuualSpend as number)}</Leaves>;
    }
  };

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
      <CloseButton onClick={() => setOpenMyListModal(false)}>
        <AiOutlineClose size="1.5rem" />
      </CloseButton>
      <ListsWrapper>
        <ListWrapper>
          <LeaveTitleWrapper>
            <ListTitle>연차 신청 현황</ListTitle>
            <AnnualCount>남은 연차 : {renderCount()}개</AnnualCount>
          </LeaveTitleWrapper>
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

const CloseButton = styled.button`
  top: 2rem;
  right: 2rem;
  cursor: pointer;
  position: absolute;
  background-color: transparent;
`;

const Leaves = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${theme.colors.green.dark};
`;

const LeaveDays = styled.span`
  color: ${theme.colors.green.dark};
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

const LeaveTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AnnualCount = styled.span`
  font-weight: 500;
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
