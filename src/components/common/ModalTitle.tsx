import { ReactNode } from "react";
import { styled } from "styled-components";

interface IChildren {
  children: ReactNode;
}

const ModalTitle = ({ children }: IChildren) => {
  return <Title>{children}</Title>;
};

const Title = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 20px;
`;

export default ModalTitle;
