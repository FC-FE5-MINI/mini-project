import { create } from "zustand";

type TabState = "전체" | "연차" | "당직";

interface TabStore {
  selectedTab: TabState;
  setSelectedTab: (tab: TabState) => void;
  calendarKey: number; // 이 값을 변경하여 FullCalendar를 리랜더링하게 합니다.
}

const useTabStore = create<TabStore>((set) => ({
  selectedTab: "전체",
  setSelectedTab: (tab) => {
    set(() => ({ selectedTab: tab }));
  },
  calendarKey: 0,
}));

export default useTabStore;
