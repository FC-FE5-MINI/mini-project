import { useQuery } from "react-query";
import { allList, myList } from "../lib/api/eventApi";

export function useEventQuery(key: string) {
  return useQuery(key === "events" ? "events" : "myevents", key === "events" ? allList : myList);
}
