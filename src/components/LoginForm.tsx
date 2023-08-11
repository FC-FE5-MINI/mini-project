import styled from "styled-components";
import { useForm } from "react-hook-form";
import { login } from "../lib/api/userApi";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { renderEmailError, renderPasswordError } from "../lib/util/functions";
import { LOGIN_MESSAGE, REG_EXP_EMAIL_PATTERN, REG_EXP_PW_PATTERN } from "../lib/util/constants";
import image0 from "../../src/assets/0.png";
import image1 from "../../src/assets/1.png";
import image2 from "../../src/assets/2.png";
import image3 from "../../src/assets/3.png";
import image4 from "../../src/assets/4.png";
import image5 from "../../src/assets/5.png";
import image6 from "../../src/assets/6.png";
import image7 from "../../src/assets/7.png";
import image8 from "../../src/assets/8.png";
import image9 from "../../src/assets/9.png";
import image10 from "../../src/assets/10.png";

const imageMapping: { [key: string]: string } = {
  "/src/assets/profile/0.png": image0,
  "/src/assets/profile/1.png": image1,
  "/src/assets/profile/2.png": image2,
  "/src/assets/profile/3.png": image3,
  "/src/assets/profile/4.png": image4,
  "/src/assets/profile/5.png": image5,
  "/src/assets/profile/6.png": image6,
  "/src/assets/profile/7.png": image7,
  "/src/assets/profile/8.png": image8,
  "/src/assets/profile/9.png": image9,
  "/src/assets/profile/10.png": image10,
};

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const navigate = useNavigate();

  const setUser = useUserStore((state) => state.setUser);

  const onSubmit = async (data: FormData) => {
    try {
      const loginResponse = await login(data.email, data.password);

      if (loginResponse.status === 200) {
        alert(LOGIN_MESSAGE.LOG_IN_SUCCESS);

        // 맵핑된 이미지 객체에서 해당 이미지를 가져옵니다.
        const mappedImage = imageMapping[loginResponse.data.imageUrl];
        if (mappedImage) {
          loginResponse.data.imageUrl = mappedImage;
        }

        setUser({
          username: loginResponse.data.username,
          email: data.email,
          imageUrl: loginResponse.data.imageUrl,
          accessToken: loginResponse.data.accessToken,
        });
        //메인 페이지로 이동
        navigate("/");
      } else {
        alert(LOGIN_MESSAGE.LOG_IN_FAILED);
      }
    } catch (err) {
      alert(LOGIN_MESSAGE.LOG_IN_ERROR);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Button />
      </Form>
    </Container>
  );
};

export default LoginForm;

const Container = styled.div`
  display: relative;
  margin-top: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 5px;
`;

const Input = styled.input`
  box-sizing: border-box;
  /* width: 100%; */
  height: 40px;
  padding: 0px 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray[1]};
  border-radius: 5px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.orange.dark};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  height: 15px;
  margin-bottom: 3px;
`;

const Button = styled.input.attrs({
  type: "submit",
  value: "로그인",
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
