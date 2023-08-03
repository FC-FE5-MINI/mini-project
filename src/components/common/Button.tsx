import { css, styled } from "styled-components";
import { theme } from "../../styles/theme";

const Button = ({ ...props }) => {
  return <StyledButton {...props} />;
};

const StyledButton = styled.button<{
  $greenLight?: boolean;
  $greenDark?: boolean;
  $orangeLight?: boolean;
  $orangeDark?: boolean;
}>`
  width: auto;
  height: auto;
  font-size: 1.1rem;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.black};

  // 흰배경에 녹색 버튼
  ${({ $greenLight }) =>
    $greenLight &&
    css`
      color: ${theme.colors.green.dark};
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.green.dark};
    `}

  // 녹색배경에 흰색 버튼
      ${({ $greenDark }) =>
    $greenDark &&
    css`
      color: ${theme.colors.white};
      background-color: ${theme.colors.green.dark};
      border: 1px solid ${theme.colors.green.dark};
    `}
      
      // 흰배경에 오렌지색 버튼
      ${({ $orangeLight }) =>
    $orangeLight &&
    css`
      color: ${theme.colors.orange.dark};
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.orange.dark};
    `}
      
      // 오렌지배경에 흰색 버튼
      ${({ $orangeDark }) =>
    $orangeDark &&
    css`
      color: ${theme.colors.white};
      background-color: ${theme.colors.orange.dark};
      border: 1px solid ${theme.colors.orange.dark};
    `}
`;
export default Button;
