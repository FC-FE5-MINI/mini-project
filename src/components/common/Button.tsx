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
  transition: all 0.2s ease-in-out;
  border: 1px solid ${theme.colors.black};
  font-family: "Pretendard-Regular", sans-serif;

  // 흰배경에 녹색 버튼
  ${({ $greenLight }) =>
    $greenLight &&
    css`
      color: ${theme.colors.green.main};
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.green.main};

      &:hover {
        color: ${theme.colors.white};
        background-color: ${theme.colors.green.main};
      }
    `}
  // 녹색배경에 흰색 버튼
    ${({ $greenDark }) =>
    $greenDark &&
    css`
      color: ${theme.colors.white};
      background-color: ${theme.colors.green.main};
      border: 1px solid ${theme.colors.green.main};

      &:hover {
        background-color: ${theme.colors.green.dark};
      }
    `}
    // 흰배경에 오렌지색 버튼
    ${({ $orangeLight }) =>
    $orangeLight &&
    css`
      color: ${theme.colors.orange.dark};
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.orange.main};

      &:hover {
        color: ${theme.colors.white};
        background-color: ${theme.colors.orange.main};
      }
    `}

    // 오렌지배경에 흰색 버튼
    ${({ $orangeDark }) =>
    $orangeDark &&
    css`
      color: ${theme.colors.white};
      background-color: ${theme.colors.orange.main};
      border: 1px solid ${theme.colors.orange.main};

      &:hover {
        background-color: ${theme.colors.orange.dark};
      }
    `}
`;
export default Button;
