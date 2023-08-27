import { create } from "zustand";

export type TabState = "전체" | "연차" | "당직";

interface TabStore {
  selectedTab: TabState;
  setSelectedTab: (tab: TabState) => void;
  calendarKey: number;
}

export const useTabStore = create<TabStore>((set) => ({
  selectedTab: "전체",
  setSelectedTab: (tab) => {
    set(() => ({ selectedTab: tab }));
  },
  calendarKey: 0,
}));
