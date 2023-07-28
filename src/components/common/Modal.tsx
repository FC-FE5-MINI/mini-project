import { ReactNode } from "react";
import { styled } from "styled-components";

interface IChildren {
  children: ReactNode;
}

const Modal = ({ children }: IChildren) => {
  return <ModalLayout>{children}</ModalLayout>;
};

const ModalLayout = styled.div`
  width: 500px;
  height: 500px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border: 1px solid;
  flex-direction: column;
  background-color: aliceblue;
`;

export default Modal;
