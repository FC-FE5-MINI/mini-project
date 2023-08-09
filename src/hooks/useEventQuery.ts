import { useState } from "react";
import { useQuery } from "react-query";
import { allList, myList } from "../lib/api/eventApi";
import { filterEvents } from "../hooks/useEventFilter";

export interface EventData {
  username: string;
  startDate: Date;
  endDate: Date;
  eventType: string;
  annualCount: number;
  orderState: string;
  eventId: number;
}

export interface MapData {
  title: string;
  start: Date;
  end: Date;
}

export function useEventQuery(key: string, showMyList?: boolean, selectedTab?: string) {
  const [mappedEvents, setMappedEvents] = useState<MapData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
  // const [example, setExample] = useState<EventData[]>();
  const { isLoading, refetch } = useQuery(
    key === "events" ? "events" : "myevents",
    key === "events" ? allList : myList,
    {
      onSuccess: (datas) => {
        const newFiltered = filterEvents(showMyList ? datas || [] : datas || [], selectedTab as string);
        const newMapped = newFiltered.map((data: EventData) => ({
          title: data.username,
          start: new Date(data.startDate),
          end: new Date(data.endDate),
          type: data.eventType,
          annualCount: data.annualCount,
          orderState: data.orderState,
          id: data.eventId,
        }));
        setMappedEvents(newMapped);
        setFilteredEvents(newFiltered);
      },
    }
  );
  return { filteredEvents, mappedEvents, isLoading, refetch };
}
