import { useEffect, useState } from "react";
import { EventType, OrderStateType, getMyEvents } from "../lib/api/eventApi";
import { EVENT_TYPE } from "../lib/util/constants";

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
      const filteredData = datas.filter((data: MyListData) => {
        switch (eventType) {
          case EVENT_TYPE.DT:
            return data.eventType === eventType && new Date() <= new Date(data.startDate);
          case EVENT_TYPE.LV:
            return data.eventType === eventType && new Date() <= new Date(data.endDate as Date);
        }
      });
      setListData(filteredData);
    })();
  }, [eventType, userId]);

  return listData;
};

export default useMyList;
