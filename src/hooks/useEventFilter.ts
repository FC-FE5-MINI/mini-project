export interface EventData {
  username: string;
  startDate: Date;
  endDate: Date;
  eventType: string;
  annualCount: number;
  orderState: string;
  eventId: number;
}

export function filterEvents(events: EventData[], selectedTab: string) {
  return events.filter((data: EventData) => {
    if (selectedTab === "전체") return true;
    if (selectedTab === "연차") return data.eventType === "LEAVE";
    if (selectedTab === "당직") return data.eventType === "DUTY";
    return false;
  });
}
