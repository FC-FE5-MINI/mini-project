import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Modal from "./common/Modal";
import ModalTitle from "./common/ModalTitle";
import { MdOutlineClose } from "react-icons/md";
import { BiSolidPlusCircle } from "react-icons/bi";
import Button from "./common/Button";
import ImageSelectionModal from "./ImageSelectionModal";
import { editUserInfo } from "../lib/api/userApi";
import { useUserStore } from "../store/userStore";

interface User {
  imageUrl: string;
  username: string;
}

interface EditUserInfoModalProps {
  user: User;
  onCancel: () => void;
  closeModal: () => void;
}

interface FormValues {
  imageUrl: string;
  username: string;
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}

const EditUserInfoModal: React.FC<EditUserInfoModalProps> = ({ user, onCancel, closeModal}) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });
  const newPassword = useRef<string>("");
  newPassword.current = watch("newPassword");

  const [imagePreview, setImagePreview] = useState(user.imageUrl); // Image URL을 저장하는 상태
  const [showImageModal, setShowImageModal] = useState(false);

  const handleImageSelection = (imageSrc: string) => {
    setImagePreview(imageSrc);
    setValue("imageUrl", imageSrc); // imageUrl 값을 업데이트
    setShowImageModal(false);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await editUserInfo(
        data.imageUrl,
        data.username,
        data.currentPassword,
        data.newPassword,
        data.newPasswordCheck
      );

      // 성공적으로 변경되었을 때의 로직
      if (response.status === 200 && response.msg === "success") {
        alert("회원정보가 수정되었습니다"); // Alert message

        // 전역 상태 업데이트
        useUserStore.getState().setUser({
          username: response.data.username,
          email: response.data.email,
          imageUrl: response.data.imageUrl,
          // accessToken은 API 응답에 포함되어 있지 않으므로 현재 값을 유지하거나 적절한 값으로 업데이트 필요
          accessToken: useUserStore.getState().user.accessToken,
        });

        onCancel(); // 모달 닫기
      }
    } catch (error) {
      // 에러 발생 시 처리할 로직
      console.error("Error editing user info:", error);
    }
  };

  return (
    <>
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
              <UploadLabel onClick={() => setShowImageModal(true)}>
                <UploadIcon />
              </UploadLabel>
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
                {...register("currentPassword", {
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
              {errors.currentPassword &&
                errors.currentPassword.type === "required" &&
                "현재 비밀번호는 필수 입력 항목입니다."}
              {errors.currentPassword &&
                errors.currentPassword.type === "minLength" &&
                "비밀번호는 최소 8자 이상입니다."}
              {errors.currentPassword &&
                errors.currentPassword.type === "maxLength" &&
                "비밀번호는 최대 15자 이하입니다."}
              {errors.currentPassword &&
                errors.currentPassword.type === "pattern" &&
                "영문, 숫자를 포함(공백 제외)하여 입력해주세요."}
            </ErrorMessage>
            <InputWrapper>
              <Label>새 비밀번호</Label>
              <Input
                type="password"
                {...register("newPassword", {
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
              {errors.newPassword && errors.newPassword.type === "required" && "새 비밀번호는 필수 입력 항목입니다."}
              {errors.newPassword && errors.newPassword.type === "minLength" && "비밀번호는 최소 8자 이상입니다."}
              {errors.newPassword && errors.newPassword.type === "maxLength" && "비밀번호는 최대 15자 이하입니다."}
              {errors.newPassword &&
                errors.newPassword.type === "pattern" &&
                "영문, 숫자를 포함(공백 제외)하여 입력해주세요."}
            </ErrorMessage>
            <InputWrapper>
              <Label>새 비밀번호 확인</Label>
              <Input
                type="password"
                {...register("newPasswordCheck", {
                  required: true,
                  validate: (value) => value === newPassword.current,
                })}
                placeholder="새 비밀번호 확인"
              />
              <EmptySpace />
            </InputWrapper>
            <ErrorMessage>
              {errors.newPasswordCheck &&
                errors.newPasswordCheck.type === "required" &&
                "새 비밀번호 확인은 필수 입력 항목입니다."}
              {errors.newPasswordCheck &&
                errors.newPasswordCheck.type === "validate" &&
                "비밀번호가 일치하지 않습니다."}
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
      {showImageModal && (
        <ImageSelectionModal onSelect={handleImageSelection} onClose={() => setShowImageModal(false)} />
      )}
    </>
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

const UploadIcon = styled(BiSolidPlusCircle)`
  color: #333;
  font-size: 28px;
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
  width: 64px;
  height: 64px;
  margin-bottom: 30px;
  border-radius: 50%;
  align-self: center;
  background-color: #f1f1ef;
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
  left: calc(50% + 20px);
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
  margin-top: 7px;
  display: flex;
  align-self: end;
`;
