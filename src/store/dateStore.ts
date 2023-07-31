import { create } from "zustand";

interface DateStore {
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date | null;
  setEndDate: (date: Date) => void;
}

const useDateStore = create<DateStore>((set) => ({
  startDate: new Date(),
  setStartDate: (date) => set(() => ({ startDate: date })),
  endDate: null,
  setEndDate: (date) => set(() => ({ endDate: date })),
}));

export default useDateStore;
