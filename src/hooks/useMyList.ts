import { useCallback, useEffect, useState } from "react";
import { EventType, OrderStateType } from "../lib/api/eventApi";
import { EVENT_TYPE } from "../lib/util/constants";
import { useQueryClient } from "react-query";

export interface MyListData {
  eventId: number;
  username: string;
  annualCount: number;
  eventType: EventType;
  startDate: Date;
  endDate: Date;
  orderState: OrderStateType;
}

const useMyList = (eventType: EventType) => {
  const [listData, setListData] = useState<MyListData[]>([]);
  const queryClient = useQueryClient();
  const datas = queryClient.getQueryData<MyListData[]>("myevents");

  const fetchData = useCallback(() => {
    try {
      if (datas) {
        const filteredData = datas.filter((data: MyListData) => {
          switch (eventType) {
            case EVENT_TYPE.DT:
              return data.eventType === eventType && new Date() <= new Date(data.startDate);
            case EVENT_TYPE.LV:
              return data.eventType === eventType && new Date() <= new Date(data.endDate);
          }
        });

        setListData(filteredData);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, [eventType, datas]);

  useEffect(() => {
    fetchData();
  }, [fetchData, datas]);

  return listData;
};

export default useMyList;
