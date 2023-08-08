import { useQuery } from "react-query";
import { AllList, MyList } from "../lib/api/eventApi";

export function useEventQuery(key: string) {
  return useQuery(key === "events" ? "events" : "myevents", key === "events" ? AllList : MyList);
}
