import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Modal from "./common/Modal";
import ModalTitle from "./common/ModalTitle";
import { MdOutlineClose } from "react-icons/Md";
import { BsFillCloudUploadFill } from "react-icons/Bs";
import Button from "./common/Button";

interface User {
  imageUrl: string;
  username: string;
}

interface EditUserInfoModalProps {
  user: User;
  onCancel: () => void;
}

interface FormValues {
  profileImage: FileList;
  username: string;
  currentPwd: string;
  newPwd: string;
  newPwdConfirm: string;
}

const EditUserInfoModal: React.FC<EditUserInfoModalProps> = ({ user, onCancel }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });
  const newPwd = useRef<string>("");
  newPwd.current = watch("newPwd");

  const [imagePreview, setImagePreview] = useState(user.imageUrl); // Image URL을 저장하는 상태

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (file.size > 1048576) {
        alert("이미지 파일은 1MB 이하만 업로드 가능합니다.");
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          setImagePreview(e.target.result as string); // 이미지 URL을 상태에 저장
        }
      };

      reader.readAsDataURL(event.target.files[0]); // 파일을 읽어 데이터 URL로 변환
    }
  };

  const onSubmit = (data : FormValues) => {
    // API 호출하고 서버에 변경 정보 전달하는 로직이 들어갈 자리입니다.
    console.log(data);
  };

  const closeModal = () => {
    onCancel(); // onCancel 함수를 호출하여 모달을 닫도록 설정
  };

  return (
    <Modal>
      <ModalTitleArea>
        <ModalTitle>회원정보 수정</ModalTitle>
        <CloseButton onClick={closeModal}>
          <CloseIcon />
        </CloseButton>
      </ModalTitleArea>
      <UserInfoWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ProfileImageBox>
            <ProfileImage src={imagePreview} alt="Profile" />
            <UploadLabel htmlFor="upload-button">
              <UploadIcon />
            </UploadLabel>
            <Input
              id="upload-button"
              type="file"
              accept="image/*"
              {...register("profileImage")}
              style={{ display: "none" }}
              onChange={onFileChange}
            />
          </ProfileImageBox>
          <InputWrapper>
            <Label>이름</Label>
            <Input {...register("username", { required: true })} defaultValue={user.username} />
            <EmptySpace />
          </InputWrapper>
          <ErrorMessage>{errors.username && "이름은 필수 입력 항목입니다."}</ErrorMessage>
          <InputWrapper>
            <Label>현재 비밀번호</Label>
            <Input
              type="password"
              {...register("currentPwd", {
                required: true,
                minLength: 8,
                maxLength: 15,
                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?!.*\s).{8,15}$/,
              })}
              placeholder="현재 비밀번호"
            />
            <EmptySpace />
          </InputWrapper>
          <ErrorMessage>
            {errors.currentPwd && errors.currentPwd.type === "required" && "현재 비밀번호는 필수 입력 항목입니다."}
            {errors.currentPwd && errors.currentPwd.type === "minLength" && "비밀번호는 최소 8자 이상입니다."}
            {errors.currentPwd && errors.currentPwd.type === "maxLength" && "비밀번호는 최대 15자 이하입니다."}
            {errors.currentPwd &&
              errors.currentPwd.type === "pattern" &&
              "영문, 숫자를 포함(공백 제외)하여 입력해주세요."}
          </ErrorMessage>
          <InputWrapper>
            <Label>새 비밀번호</Label>
            <Input
              type="password"
              {...register("newPwd", {
                required: true,
                minLength: 8,
                maxLength: 15,
                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?!.*\s).{8,15}$/,
              })}
              placeholder="새 비밀번호"
            />
            <EmptySpace />
          </InputWrapper>
          <ErrorMessage>
            {errors.newPwd && errors.newPwd.type === "required" && "새 비밀번호는 필수 입력 항목입니다."}
            {errors.newPwd && errors.newPwd.type === "minLength" && "비밀번호는 최소 8자 이상입니다."}
            {errors.newPwd && errors.newPwd.type === "maxLength" && "비밀번호는 최대 15자 이하입니다."}
            {errors.newPwd && errors.newPwd.type === "pattern" && "영문, 숫자를 포함(공백 제외)하여 입력해주세요."}
          </ErrorMessage>
          <InputWrapper>
            <Label>새 비밀번호 확인</Label>
            <Input
              type="password"
              {...register("newPwdConfirm", { required: true, validate: (value) => value === newPwd.current })}
              placeholder="새 비밀번호 확인"
            />
            <EmptySpace />
          </InputWrapper>
          <ErrorMessage>
            {errors.newPwdConfirm &&
              errors.newPwdConfirm.type === "required" &&
              "새 비밀번호 확인은 필수 입력 항목입니다."}
            {errors.newPwdConfirm && errors.newPwdConfirm.type === "validate" && "비밀번호가 일치하지 않습니다."}
          </ErrorMessage>
        <ButtonWrapper>
            <Button $greenLight type="button" onClick={onCancel}>
              취소
            </Button>
            <Button $greenDark type="submit">
              확인
            </Button>
          </ButtonWrapper>
        </Form>
      </UserInfoWrapper>
    </Modal>
  );
};

export default EditUserInfoModal;

const ModalTitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  font-size: 1.6rem;
  margin-bottom: 20px;
  cursor: pointer;
`;

const CloseIcon = styled(MdOutlineClose)`
  color: #333;
  font-size: 24px;
`;

const UploadIcon = styled(BsFillCloudUploadFill)`
  color: #333;
  font-size: 45px;
  transition: all 0.2s ease-in-out;

  &:hover {
    // 호버 상태에서의 효과 설정
    color: #000; // 색깔이 진해짐
    transform: scale(1.1); // 크기가 10% 증가
  }
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  margin: 10px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const ProfileImageBox = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 30px;
  align-self: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 75px;
  object-fit: cover;
  opacity: 0.4;
`;

const UploadLabel = styled.label`
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  border: none;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Label = styled.label`
  text-align: right;
  flex: 2;
  margin-right: 10px;
  font-size: 16px;
  padding-bottom: 3px;
`;

const Input = styled.input`
  width: 40%;
  height: 35px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding-left: 10px;
  font-size: 16px;
  flex: 3;
`;

const EmptySpace = styled.div`
  flex: 1;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  height: 15px;
  margin-bottom: 4px;
  margin-left: 35%;
`;

const ButtonWrapper = styled.div`
  gap: 10px;
  margin-top : 7px;
  display: flex;
  align-self: end;
`;
