import styled from "styled-components";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import logoImage from "../../assets/logo.png";
import { checkEmail, signUp } from "../../lib/api/userApi";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const password = useRef();
  password.current = watch("password");

  const navigate = useNavigate();

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();
    try {
      const checkEmailResponse = await checkEmail(data.email);

      // 이메일 중복 체크를 성공적으로 수행했고 중복된 이메일이 없다면 회원 가입 요청
      if (checkEmailResponse.data.responseType === true) {
        try {
          const signUpResponse = await signUp(data.email, data.password, data.name);

          if (signUpResponse.status === 201) {
            alert("회원가입에 성공하였습니다.");
            //로그인 페이지로 이동
            navigate("/login");
          } else {
            alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
          }
        } catch (err) {
          alert("회원가입 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        alert("이메일이 중복되었습니다. 다른 이메일을 사용해주세요.");
      }
    } catch (err) {
      alert("이메일 중복 체크 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LogoImage src={logoImage} alt="로고" />
        <Label>오늘은 내 차례!</Label>
        <Label>회원가입하세요</Label>
        <Input {...register("name", { required: true })} placeholder="이름" />
        <ErrorMessage>{errors.name && errors.name.type === "required" && "필수 입력 항목입니다."}</ErrorMessage>
        <Input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="이메일" />
        <ErrorMessage>
          {errors.email && errors.email.type === "required" && "필수 입력 항목입니다."}
          {errors.email && errors.email.type === "pattern" && "이메일 형식을 확인해주세요."}
        </ErrorMessage>
        <Input
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 15,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?!.*\s).{8,15}$/,
          })}
          type="password"
          placeholder="비밀번호"
        />
        <ErrorMessage>
          {errors.password && errors.password.type === "required" && "필수 입력 항목입니다."}
          {errors.password && errors.password.type === "minLength" && "비밀번호는 최소 8자 이상입니다."}
          {errors.password && errors.password.type === "maxLength" && "비밀번호는 최대 15자 이하입니다."}
          {errors.password && errors.password.type === "pattern" && "영문, 숫자를 포함(공백 제외)하여 입력해주세요."}
        </ErrorMessage>
        <Input
          {...register("passwordConfirm", { required: true, validate: (value) => value === password.current })}
          type="password"
          placeholder="비밀번호 확인"
        />
        <ErrorMessage>
          {errors.passwordConfirm && errors.passwordConfirm.type === "required" && "필수 입력 항목입니다."}
          {errors.passwordConfirm && errors.passwordConfirm.type === "validate" && "비밀번호가 다릅니다."}
        </ErrorMessage>
        <Button />
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
  background-color: ${({ theme }) => theme.colors.green.main};
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
