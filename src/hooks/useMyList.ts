import { useEffect, useState } from "react";
import { EventType, OrderStateType, getMyEvents } from "../lib/api/eventApi";

export interface MyListData {
  eventId: number;
  username: string;
  annualCount: number;
  eventType: EventType;
  startDate: Date;
  endDate?: Date;
  orderState: OrderStateType;
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
