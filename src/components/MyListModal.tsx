import { styled } from "styled-components";
import Modal from "./common/Modal";
import ModalTitle from "./common/ModalTitle";
import List from "./common/List";
import useMyList, { MyListData } from "../hooks/useMyList";
import { EVENT_TYPE } from "../lib/util/constants";
import { calcPeriods } from "../lib/util/functions";

const MyListModal = () => {
  const userId = 4; //임시
  const leaveList = useMyList(EVENT_TYPE.LEAVE, userId);
  const dutyList = useMyList(EVENT_TYPE.DUTY, userId);

  const renderList = (listData: MyListData[]) => {
    if (listData.length) {
      return listData.map((item, idx) => (
        <List key={idx}>
          <span>
            {item.endDate
              ? `${item.startDate} ~ ${item.endDate} ${calcPeriods(item.startDate, item.endDate)}일`
              : `${item.startDate}`}
          </span>
        </List>
      ));
    }
  };

  return (
    <Modal>
      <ModalTitle>신청현황</ModalTitle>
      <LeaveLists>
        <ListTitle>연차 신청 현황</ListTitle>
        {renderList(leaveList)}
      </LeaveLists>
      <DutyLists>
        <ListTitle>당직 신청 현황</ListTitle>
        {renderList(dutyList)}
      </DutyLists>
    </Modal>
  );
};

const LeaveLists = styled.ul`
  background-color: orange;
  height: 100%;
`;
const DutyLists = styled.ul`
  background-color: greenyellow;
  height: 100%;
`;
const ListTitle = styled.span``;

export default MyListModal;
