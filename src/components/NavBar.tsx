import styled from "styled-components";
import { LuLogOut } from "react-icons/lu";
import LogoImage from "../assets/logo_2.png";
import { useState } from "react";
import UserInfoModal from "./UserInfoModal";
import CharAnimation from "./CharAnimation";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const userData = useUserStore((state) => state.user);
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
    clearUser(); // 유저 정보를 초기화합니다.
    navigate("/login"); // 로그인 페이지로 리다이렉트합니다.
  };

  return (
    <Container>
      <Wrapper>
        <LogoBox src={LogoImage} alt="logo image" />
        <ProfileContainer>
          <UserProfile
            src={userData.imageUrl || undefined}
            alt="profile image"
            title="회원정보 수정"
            onClick={handleOpenModal}
          />
          <UserName>{userData.username}</UserName>
        </ProfileContainer>
      </Wrapper>
      <CharAnimation />

      {isModalOpen && <UserInfoModal closeModal={handleCloseModal} />}
      <LogoutButton title="로그아웃" onClick={handleLogout}>
        로그아웃 <LogoutIcon />
      </LogoutButton>
    </Container>
  );
};

export default NavBar;

const Container = styled.div`
  width: 150px;
  height: 100%;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.green.dark};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem;
`;
const LogoBox = styled.img`
  width: 150px;
`;
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const UserProfile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  transition: transform 0.2s; // smooth transition

  &:hover {
    transform: scale(1.1); // scale up on hover
  }
`;

const UserName = styled.p`
  margin: 0 10px;
  padding: 5px 0;
  font-weight: 600;
  color: ${(props) => props.theme.colors.white};
  white-space: nowrap; // 줄바꿈을 방지
  overflow: hidden; // 넘치는 텍스트 숨기기
  text-overflow: ellipsis; // '...'으로 텍스트 잘라내기
  max-width: 10ch; // 최대 7자까지만 보이게 설정
`;

const LogoutButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;

  transition: transform 0.2s; // smooth transition

  &:hover {
    transform: scale(1.1); // scale up on hover
  }
`;

const LogoutIcon = styled(LuLogOut)`
  margin-left: 1rem;
`;
