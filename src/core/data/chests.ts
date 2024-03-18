import { RESUME_ITEMS_TABLE } from "./items";
import type { MapEvent } from "~/types";

const FIRST_ID = RESUME_ITEMS_TABLE[0].id;

export const CHEST_TYPE = "chest";

export const CHEST_DATA: MapEvent[] = RESUME_ITEMS_TABLE.map((item) => ({
  type: CHEST_TYPE,
  id: 5000000 + (item.id - FIRST_ID + 1),
  get: [{ itemId: item.id, num: 1 }],
  text: {
    init: "你捡到了一个包裹。",
    data: "包裹中有 {get}，要拾取吗？",
    reject: "你失去它了。",
    success: "可喜可贺。",
    noEnoughRoom: "你的背包放不下了，下次再来吧。"
  }
}));
