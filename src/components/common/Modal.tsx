import { ReactNode } from "react";
import { styled } from "styled-components";
import { theme } from "../../styles/theme";

export interface ChildrenProp {
  children: ReactNode;
}

const Modal = ({ children }: ChildrenProp) => {
  return (
    <ModalWrapper>
      <ModalLayout>{children}</ModalLayout>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalLayout = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 500px;
  height: 600px;
  padding: 30px;
  display: flex;
  border: 1px solid;
  position: absolute;
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${theme.colors.white};
  box-shadow: 4px 4px 1.25rem ${theme.colors.black};
`;

export default Modal;
