import NavBar from "../../components/NavBar";
import Calendar from "../../components/calendar";
import styled from "styled-components";
import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { getUserAuth } from "../../lib/api/userApi";

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  background-color: ${(props) => props.theme.colors.green.light};
  padding: 2rem;
`;
const Inner = styled.div`
  min-width: 1100px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
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
      <Inner>
        <NavBar />
        <Calendar />
      </Inner>
    </MainContainer>
  );
};

export default Main;
