import { create } from "zustand";

type TabState = "전체" | "연차" | "당직" | string;

interface TabStore {
  selectedTab: TabState;
  setSelectedTab: (tab: TabState) => void;
  calendarKey: number;
}

const useTabStore = create<TabStore>((set) => ({
  selectedTab: "전체",
  setSelectedTab: (tab) => {
    set(() => ({ selectedTab: tab }));
  },
  calendarKey: 0,
}));

export default useTabStore;
