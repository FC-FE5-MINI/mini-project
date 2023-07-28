import Calendar from "../../components/calendar";
import styled from "styled-components";

const MainContainer = styled.div`
  margin: 3rem;
`;
const Main = () => {
  return (
    <MainContainer>
      <Calendar />
    </MainContainer>
  );
};

export default Main;
