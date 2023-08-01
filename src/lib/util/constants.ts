import { EventType } from "../api/eventApi";

const TAB_ADD = ["연차, 당직"];

const EVENT_TYPE: { [key: string]: EventType } = {
  연차: "LEAVE",
  당직: "DUTY",
};

export { TAB_ADD, EVENT_TYPE };
