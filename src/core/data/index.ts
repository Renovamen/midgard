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

export const getDataById = (id: number): GameItem | MapEvent =>
  DATA[id.toString()[0] as keyof typeof DATA].find(
    (i: GameItem | MapEvent) => i.id === id
  )!;
