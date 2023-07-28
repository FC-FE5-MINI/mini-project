import { css, styled } from "styled-components";
import { theme } from "../../styles/theme";

const Button = ({ ...props }) => {
  return <StyledButton {...props} />;
};

const StyledButton = styled.button<{
  $light?: boolean;
  $dark?: boolean;
}>`
  width: auto;
  height: auto;
  font-size: 1.1rem;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.black};

  // 흰배경에 검은색 버튼
  ${({ $light }) =>
    $light &&
    css`
      color: ${theme.colors.black};
      background-color: ${theme.colors.white};
    `}

  // 검은배경에 흰색 버튼
  ${({ $dark }) =>
    $dark &&
    css`
      color: ${theme.colors.white};
      background-color: ${theme.colors.black};
    `}
`;
export default Button;
