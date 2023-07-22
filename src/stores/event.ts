import { defineStore } from "pinia";
import type { EventState } from "~/types";

export const useEventStore = defineStore("event", () => {
  const event = reactive<EventState>({
    dialog: false,
    chest: false,
    gameOver: false,
    mapUpdate: -1,
    heroUpdate: -1
  });

  const setEvent = <T extends keyof EventState>(key: T, value: EventState[T]) => {
    event[key] = value;
  };

  const emitUpdate = (key: "mapUpdate" | "heroUpdate") => {
    setEvent(key, Math.random() + Date.now());
  };

  return {
    event,
    setEvent,
    emitUpdate
  };
});
