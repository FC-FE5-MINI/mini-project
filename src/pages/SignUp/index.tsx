import styled from "styled-components";
import { useRef } from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const password = useRef();
  password.current = watch("password");

  const onSubmit = (data) => {
    console.log("data : ", data);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>(로고)</Label>
        <Label>(오늘은 내 차례!) 이용을 위해 가입하세요</Label>
        <Input {...register("name", { required: true })} placeholder="이름" />
        {errors.name && errors.name.type === "required" && <ErrorMessage>필수 입력 항목입니다.</ErrorMessage>}
        <Input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="이메일" />
        {errors.email && errors.email.type === "required" && <ErrorMessage>필수 입력 항목입니다.</ErrorMessage>}
        {errors.email && errors.email.type === "pattern" && <ErrorMessage>이메일 형식을 확인해주세요.</ErrorMessage>}
        <Input
          {...register("password", { required: true, minLength: 8, maxLength: 15, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/ })}
          type="password"
          placeholder="비밀번호"
        />
        {errors.password && errors.password.type === "required" && <ErrorMessage>필수 입력 항목입니다.</ErrorMessage>}
        {errors.password && errors.password.type === "pattern" && <ErrorMessage>영문, 숫자 포함 8-15자리를 입력해주세요.</ErrorMessage>}
        {errors.password && errors.password.type === "minLength" && <ErrorMessage>비밀번호는 최소 8자 이상입니다.</ErrorMessage>}
        {errors.password && errors.password.type === "maxLength" && <ErrorMessage>비밀번호는 최대 15자 이하입니다.</ErrorMessage>}
        <Input {...register("passwordConfirm", { required: true, validate: (value) => value === password.current })} type="password" placeholder="비밀번호 확인" />
        {errors.passwordConfirm && errors.passwordConfirm.type === "required" && <ErrorMessage>필수 입력 항목입니다.</ErrorMessage>}
        {errors.passwordConfirm && errors.passwordConfirm.type === "validate" && <ErrorMessage>비밀번호가 다릅니다.</ErrorMessage>}
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
  gap: 15px;
`;

const Input = styled.input`
  height: 40px;
  padding: 0px 10px;
  border : 0.5px solid ${({ theme }) => theme.colors.gray[1]};
  border-radius : 5px;
  &:focus {
    border : 0.5px solid ${({ theme }) => theme.colors.orange.dark};
  }
`;

const Label = styled.label`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.orange.main};
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const Button = styled.input.attrs({
  type: 'submit',
  value: '가입'
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
