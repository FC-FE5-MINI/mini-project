import { FC, useEffect, useState } from "react";
import Modal from "./common/Modal";
import ModalTitle from "./common/ModalTitle";
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/Md";
import { AiOutlineMail } from "react-icons/Ai";
import { RiUser5Line } from "react-icons/Ri";
import { getUserInfo } from "../lib/api/userApi";
import Button from './common/Button';

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo();
      if (data.status === 200) {
        setUserInfo(data.data);
      }
    };

    fetchData();
  }, []);

  const onClick = () => {
    console.log("버튼클릭")
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
              <IconArea><AiOutlineMail /></IconArea>
              <p>{userInfo.email}</p>
              <IconArea><RiUser5Line /></IconArea>
              <p>{userInfo.username}</p>
            </InfoGrid>
          </UserInfoArea>
          <ButtonWrapper>
            <Button $dark onClick={onClick}>
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

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  margin: 20px 0;
`;

const UserInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 75px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 35% 65%;
  width: 100%;
  margin: 10px 0;
  p {
    margin: 15px 15px;
  }
`;

const IconArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items : center;
  font-size : 24px;

`;

const ButtonWrapper = styled.div`
  gap: 10px;
  display: flex;
  align-self: end;
`;

export default UserInfoModal;
