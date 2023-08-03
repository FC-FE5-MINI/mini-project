import { create } from "zustand";

interface OpenStore {
  openAddModal: boolean;
  setOpenAddModal: (state: boolean) => void;
  openMyListModal: boolean;
  setOpenMyListModal: (state: boolean) => void;
}

const useOpenModal = create<OpenStore>((set) => ({
  openAddModal: false,
  setOpenAddModal: (state) => set(() => ({ openAddModal: state })),
  openMyListModal: false,
  setOpenMyListModal: (state) => set(() => ({ openMyListModal: state })),
}));

export default useOpenModal;
