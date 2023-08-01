import { styled } from "styled-components";
import { ChildrenProp } from "./Modal";

const List = ({ children }: ChildrenProp) => {
  return (
    <StyledList>
      <div>{children}</div>
      <StateWrapper>
        <Waiting disabled>승인대기</Waiting>
        <Cancel>취소</Cancel>
      </StateWrapper>
    </StyledList>
  );
};

const StyledList = styled.li`
  display: flex;
  justify-content: space-between;
`;
const StateWrapper = styled.div``;
const Waiting = styled.button``;
const Cancel = styled(Waiting)``;
export default List;
