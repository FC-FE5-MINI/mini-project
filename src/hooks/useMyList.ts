import { useEffect, useState } from "react";
import { EventType, getMyEvents } from "../lib/api/eventApi";

export interface MyListData {
  eventId: number;
  eventType: "LEAVE" | "DUTY";
  startDate: string;
  endDate?: string;
  orderState: "WAITING";
  createdAt: string;
  updatedAt: string | null;
}

const useMyList = (eventType: EventType, userId: number) => {
  const [listData, setListData] = useState<MyListData[]>([]);

  useEffect(() => {
    (async () => {
      const { data: datas } = await getMyEvents(userId);
      const filteredData = datas.filter((data: MyListData) => data.eventType === eventType);
      setListData(filteredData);
    })();
  }, [eventType, userId]);

  return listData;
};

export default useMyList;
