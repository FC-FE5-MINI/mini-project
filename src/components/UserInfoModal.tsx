import { FC, useEffect, useState } from "react";
import Modal from "./common/Modal";
import ModalTitle from "./common/ModalTitle";
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { RiUser5Line } from "react-icons/ri";
import { getUserInfo } from "../lib/api/userApi";
import Button from "./common/Button";
import EditUserInfoModal from "./EditUserInfoModal"; // 이 부분 추가

interface UserInfoModalProps {
  closeModal: () => void;
}

interface UserData {
  userId: number;
  username: string;
  email: string;
  imageUrl: string;
  annualCount: number;
}

const UserInfoModal: FC<UserInfoModalProps> = ({ closeModal }) => {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [editModal, setEditModal] = useState(false); // 수정모달 창 상태 관리를 위한 상태

  useEffect(() => {
    const fetchData = async () => {
    try {
      const data = await getUserInfo();
      if (data.status === 200) {
        setUserInfo(data.data);
      } else {
        console.error("Error fetching user info:", data.msg);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }
    fetchData();
  }, []);

  const onClick = () => {
    setEditModal(true); // 수정하기 버튼 클릭시 수정모달 창 상태를 true로 변경
  };

  if (editModal && userInfo) {
    return <EditUserInfoModal user={userInfo} onCancel={() => setEditModal(false)} closeModal={closeModal} />;
  }

  return (
    <Modal>
      <ModalTitleArea>
        <ModalTitle>회원정보</ModalTitle>
        <CloseButton onClick={closeModal}>
          <CloseIcon />
        </CloseButton>
      </ModalTitleArea>
      {userInfo && (
        <UserInfoWrapper>
          <UserInfoArea>
            <img src={userInfo.imageUrl} alt="User profile" />
            <InfoGrid>
              <IconArea>
                <MailIcon />
              </IconArea>
              <p>{userInfo.email}</p>
              <IconArea>
                <UserIcon />
              </IconArea>
              <p>{userInfo.username}</p>
            </InfoGrid>
          </UserInfoArea>
          <ButtonWrapper>
            <Button $greenDark onClick={onClick}>
              수정하기
            </Button>
          </ButtonWrapper>
        </UserInfoWrapper>
      )}
    </Modal>
  );
};
const ModalTitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  font-size: 1.6rem;
  margin-bottom: 20px;
  cursor: pointer;
`;

const CloseIcon = styled(MdOutlineClose)`
  color: #333;
  font-size: 24px;
`;

const MailIcon = styled(AiOutlineMail)`
  color: #333;
  font-size: 24px;
`;

const UserIcon = styled(RiUser5Line)`
  color: #333;
  font-size: 24px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  margin: 10px 0;
`;

const UserInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin-bottom: 15px;
    background-color: #f1f1ef;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  width: 100%;
  margin: 10px 0;
  p {
    font-size: 1.5rem;
    margin: 15px 15px;
  }
`;

const IconArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 36px;
`;

const ButtonWrapper = styled.div`
  gap: 10px;
  display: flex;
  align-self: end;
`;

export default UserInfoModal;
