import NavBar from "../../components/NavBar";
import Calendar from "../../components/calendar";
import styled from "styled-components";
import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { getUserAuth } from "../../lib/api/userApi";

const MainContainer = styled.div`
  margin: 0 0 1rem 0;
  max-width: 100%; // 최대 넓이를 1100px로 설정
  display: flex;
  flex-direction: column;
  align-items: center; // 내부 컴포넌트들을 가운데 정렬
`;

const Main = () => {
  const { user } = useUserStore(); // Zustand store에서 user 정보를 가져옵니다.
  const navigate = useNavigate();

  useEffect(() => {
    // accessToken이 없으면 바로 return
    if (!user.accessToken) {
      navigate("/login");
      return; // 중요: 여기서 return 하여 fetchData 실행을 멈춥니다.
    }

    const fetchData = async () => {
      try {
        const response = await getUserAuth();
        if (response && response.data) {
          if (response.data.status === "fail") {
            alert("유효하지 않은 인증으로, login 페이지로 이동합니다.");
            navigate("/login");
            console.error("Error fetching user auth:", response.data.errCode.message);
          }
        } else {
          // 응답에 데이터가 없을 때의 처리
          console.error("No data in response");
        }
      } catch (error) {
        console.error("Error fetching user auth:", error);
      }
    };

    fetchData();
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
