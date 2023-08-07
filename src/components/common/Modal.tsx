import { ReactNode } from "react";
import { css, styled } from "styled-components";
import { theme } from "../../styles/theme";
import { motion } from "framer-motion";

export interface ChildrenProp {
  children: ReactNode;
}

interface ModalProp extends ChildrenProp {
  $smallModal?: boolean;
}

const Modal = ({ children, ...rest }: ModalProp) => {
  return (
    <ModalWrapper>
      <ModalLayout
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        {...rest}
      >
        {children}
      </ModalLayout>
    </ModalWrapper>
  );
};

const ModalWrapper = styled(motion.div)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalLayout = styled(motion.div)<{
  $smallModal?: boolean;
}>`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 30px;
  display: flex;
  max-width: 500px;
  max-height: 600px;
  position: absolute;
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${theme.colors.white};
  box-shadow: 4px 4px 1.25rem ${theme.colors.black};

  ${({ $smallModal }) =>
    $smallModal &&
    css`
      max-height: 250px;
    `}
`;

export default Modal;
