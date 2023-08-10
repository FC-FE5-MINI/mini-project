import NavBar from "../../components/NavBar";
import Calendar from "../../components/calendar";
import styled from "styled-components";
import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  margin: 1rem 0 1.5rem 0;
  max-width: 100%; // 최대 넓이를 1100px로 설정
  display: flex;
  flex-direction: column;
  align-items: center; // 내부 컴포넌트들을 가운데 정렬
`;

const Main = () => {
  const { user } = useUserStore(); // Zustand store에서 user 정보를 가져옵니다.
  const navigate = useNavigate();

  useEffect(() => {
    // Access token이 없는 경우 로그인 페이지로 리다이렉트
    if (!user.accessToken) {
      navigate("/login");
    }
    // 페이지 로드시에 한 번만 확인하면 되므로, 의존성 배열에 빈 배열을 전달
  }, [navigate, user.accessToken]);

  return (
    <MainContainer>
      <NavBar />
      <Calendar />
    </MainContainer>
  );
};

export default Main;
