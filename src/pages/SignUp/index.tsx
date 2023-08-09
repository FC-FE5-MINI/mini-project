import styled from "styled-components";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import logoImage from "../../assets/logo_2.png";
import { checkEmail, signUp } from "../../lib/api/userApi";
import { Link, useNavigate } from "react-router-dom";
import {
  renderEmailError,
  renderNameError,
  renderPasswordConfirm,
  renderPasswordError,
} from "../../lib/util/functions";
import { REG_EXP_EMAIL_PATTERN, REG_EXP_PW_PATTERN, SIGNUP_MESSAGE } from "../../lib/util/constants";

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const password = useRef("");
  password.current = watch("password");

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    // e.preventDefault();
    try {
      const checkEmailResponse = await checkEmail(data.email);
      // 이메일 중복 체크를 성공적으로 수행했고 중복된 이메일이 없다면 회원 가입 요청
      if (checkEmailResponse.data.responseType === true) {
        try {
          const signUpResponse = await signUp(data.email, data.password, data.name);

          if (signUpResponse.status === "success") {
            alert(SIGNUP_MESSAGE.SIGN_UP_SUCCESS);
            //로그인 페이지로 이동
            navigate("/login");
          } else {
            alert(SIGNUP_MESSAGE.SIGN_UP_FAILED);
          }
        } catch (err) {
          alert(SIGNUP_MESSAGE.SIGN_UP_ERROR);
        }
      } else {
        alert(SIGNUP_MESSAGE.EMAIL_FAILED);
      }
    } catch (err) {
      alert(SIGNUP_MESSAGE.EMAIL_ERROR);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LogoImage src={logoImage} alt="로고" />
        <Label>오늘은 내 차례!</Label>
        <Label>회원가입하세요</Label>
        <Input {...register("name", { required: true })} placeholder="이름" />
        <ErrorMessage>{renderNameError(errors)}</ErrorMessage>
        <Input {...register("email", { required: true, pattern: REG_EXP_EMAIL_PATTERN })} placeholder="이메일" />
        <ErrorMessage>{renderEmailError(errors)}</ErrorMessage>
        <Input
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 15,
            pattern: REG_EXP_PW_PATTERN,
          })}
          type="password"
          placeholder="비밀번호"
        />
        <ErrorMessage>{renderPasswordError(errors)}</ErrorMessage>
        <Input
          {...register("passwordConfirm", { required: true, validate: (value) => value === password.current })}
          type="password"
          placeholder="비밀번호 확인"
        />
        <ErrorMessage>{renderPasswordConfirm(errors)}</ErrorMessage>
        <Button />
        <LoginText>
          <span>이미 회원가입을 하셨나요?</span>
          <Link to="/login">
            <LoginLink>로그인</LoginLink>
          </Link>
        </LoginText>
      </Form>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 5px;
`;

const LogoImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;
const Input = styled.input`
  box-sizing: border-box;
  height: 40px;
  padding: 0px 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray[1]};
  border-radius: 5px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.orange.dark};
  }
`;

const Label = styled.label`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.orange.main};
  text-align: center;
  margin-bottom: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  height: 15px;
  margin-bottom: 3px;
`;

const Button = styled.input.attrs({
  type: "submit",
  value: "가입",
})`
  background-color: ${({ theme }) => theme.colors.green.dark};
  border: none;
  color: white;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 0px;
  cursor: pointer;
  border-radius: 5px;
`;

const LoginText = styled.p`
  display: flex;
  justify-content: center;
  font-size: 12px;
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.orange.main};
`;

const LoginLink = styled.span`
  margin-left: 5px;
  /* text-decoration: underline; */
  font-weight: bold;
`;
