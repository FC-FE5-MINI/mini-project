export interface EventData {
  username?: string;
  startDate: string;
  endDate: string;
  eventType: string;
  userId: number;
  orderState: string;
  eventId: number;
}

export function usefilterEvents(events: EventData[], selectedTab: string) {
  return events.filter((data: EventData) => {
    if (selectedTab === "전체") return true;
    if (selectedTab === "연차") return data.eventType === "LEAVE";
    if (selectedTab === "당직") return data.eventType === "DUTY";
    return false;
  });
}
