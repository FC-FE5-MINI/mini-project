import NavBar from "../../components/NavBar";
import Calendar from "../../components/Calendar";
import styled from "styled-components";

const MainContainer = styled.div`
  margin: 3rem;
`;

const Main = () => {
  return (
    <MainContainer>
      <NavBar />
      <Calendar />
    </MainContainer>
  );
};

export default Main;
