import styled from "styled-components";
import { LuLogOut } from "react-icons/lu";
import LogoImage from "../assets/logo_2.png";
import { useState } from "react";
import UserInfoModal from "./UserInfoModal";
import CharAnimation from './CharAnimation';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom'



const NavBar = () => {
  const userData = useUserStore((state) => state.user)
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    clearUser();        // 유저 정보를 초기화합니다.
    navigate('/login'); // 로그인 페이지로 리다이렉트합니다.
  };

  return (
    <Container>
      <LogoBox src={LogoImage} alt="logo image" />
      <CharAnimation />
      <ProfileContainer>
        <UserProfile
          src="/src/assets/profile/0.png" //{userData.imageUrl}
          alt="profile image"
          title="회원정보 수정"
          onClick={handleOpenModal}
        />
        <UserName>{userData.username}</UserName>
        <LogoutButton title="로그아웃" onClick={handleLogout}>
          <LogoutIcon />
        </LogoutButton>
      </ProfileContainer>
      {isModalOpen && <UserInfoModal closeModal={handleCloseModal} />}
    </Container>
  );
};

export default NavBar;

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
  margin-bottom: 15px;
  width : 1100px;
`;

const LogoBox = styled.img`
  width: 190px;
  height: auto;
  align-self: flex-end; 
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserProfile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color : #F1F1EF;
  cursor: pointer;
  transition: transform 0.2s; // smooth transition

  &:hover {
    transform: scale(1.1); // scale up on hover
  }

`;

const UserName = styled.p`
  margin: 0 10px;
  width: 100px;
  white-space: nowrap; // 줄바꿈을 방지
  overflow: hidden; // 넘치는 텍스트 숨기기
  text-overflow: ellipsis; // '...'으로 텍스트 잘라내기
  max-width: 7ch; // 최대 7자까지만 보이게 설정
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
`;

const LogoutIcon = styled(LuLogOut)`
  color: black; // temporary color
  font-size: 24px;
  transition: transform 0.2s; // smooth transition

  &:hover {
    transform: scale(1.1); // scale up on hover
  }

`;
