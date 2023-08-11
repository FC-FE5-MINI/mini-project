import Modal from "./common/Modal";
import ModalTitle from "./common/ModalTitle";
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";
import { useUserStore } from "../store/userStore";

// 이미지를 import로 참조
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

const imageObjects = [
  { src: image1, path: "/src/assets/profile/1.png" },
  { src: image2, path: "/src/assets/profile/2.png" },
  { src: image3, path: "/src/assets/profile/3.png" },
  { src: image4, path: "/src/assets/profile/4.png" },
  { src: image5, path: "/src/assets/profile/5.png" },
  { src: image6, path: "/src/assets/profile/6.png" },
  { src: image7, path: "/src/assets/profile/7.png" },
  { src: image8, path: "/src/assets/profile/8.png" },
  { src: image9, path: "/src/assets/profile/9.png" },
  { src: image10, path: "/src/assets/profile/10.png" },
];

interface ImageSelectionModalProps {
  onSelect: (imageSrc: string) => void;
  onClose: () => void;
}

const ImageSelectionModal: React.FC<ImageSelectionModalProps> = ({ onSelect, onClose }) => {
  const handleImageClick = (index: number) => {
    const selectedImagePath = imageObjects[index].path;
    onSelect(selectedImagePath);

    const currentUser = useUserStore.getState().user;
    useUserStore.getState().setUser({
      ...currentUser,
      imageUrl: selectedImagePath,
    });
  };

  return (
    <Modal $smallModal>
      <ModalTitleArea>
        <ModalTitle>이미지 선택</ModalTitle>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </ModalTitleArea>
      <ImageGrid>
        {imageObjects.map((imageObj, index) => (
          <ImageThumbnail
            key={index}
            src={imageObj.src}
            alt={`Profile ${index + 1}`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </ImageGrid>
    </Modal>
  );
};

export default ImageSelectionModal;

const ModalTitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

const ImageThumbnail = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  background-color: #f1f1ef;

  &:hover {
    // 호버 상태에서의 효과 설정
    color: #000; // 색깔이 진해짐
    transform: scale(1.1); // 크기가 10% 증가
  }
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
