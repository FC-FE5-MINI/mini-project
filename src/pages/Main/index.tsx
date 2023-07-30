import Calendar from "../../components/calendar";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const MainContainer = styled.div`
  margin: 3rem;
`;

const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainContainer>
        <Calendar />
      </MainContainer>
    </QueryClientProvider>
  );
};

export default Main;
