import Modal from "./common/Modal";
import ModalTitle from "./common/ModalTitle";
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";

interface ImageSelectionModalProps {
  onSelect: (imageSrc: string) => void;
  onClose: () => void;
}

const ImageSelectionModal: React.FC<ImageSelectionModalProps> = ({ onSelect, onClose }) => {
  const handleImageClick = (imageNumber: number) => {
    const imageSrc = `src/assets/${imageNumber}.png`;
    onSelect(imageSrc);
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
        {Array.from({ length: 10 }).map((_, index) => (
          <ImageThumbnail
            key={index}
            src={`src/assets/${index + 1}.png`}
            alt={`Profile ${index + 1}`}
            onClick={() => handleImageClick(index + 1)}
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
