import { create } from "zustand";

type TabState = "전체" | "연차" | "당직";

interface TabStore {
  selectedTab: TabState;
  setSelectedTab: (tab: TabState) => void;
}

const useTabStore = create<TabStore>((set) => ({
  selectedTab: "전체",
  setSelectedTab: (tab) => {
    set(() => ({ selectedTab: tab }));
  },
}));

export default useTabStore;
