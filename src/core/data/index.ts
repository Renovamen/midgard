export * from "./constants";
export * from "./items";
export * from "./chests";
export * from "./dialogs";
export * from "./configs";

import { ITEM_TABLE, DIALOG_DATA, CHEST_DATA } from ".";
import { GameItem, MapEvent } from "~/types";

const DATA = {
  "3": ITEM_TABLE,
  "5": CHEST_DATA,
  "7": DIALOG_DATA
};

export const getDataById = (id: number): GameItem | MapEvent => {
  const key = id.toString()[0] as "3" | "5" | "7";
  const data = DATA[key] as any;

  return data.find((i: GameItem | MapEvent) => i.id === id);
};
