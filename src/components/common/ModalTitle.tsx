import { styled } from "styled-components";
import { ChildrenProp } from "./Modal";

const ModalTitle = ({ children }: ChildrenProp) => {
  return <Title>{children}</Title>;
};

const Title = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 30px;
`;

export default ModalTitle;
