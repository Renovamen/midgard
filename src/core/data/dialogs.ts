import { RESUME_ITEMS_TABLE } from "./items";
import type { MapEvent } from "~/types";

const FIRST_ID = RESUME_ITEMS_TABLE[0].id;
const NUM_ITEMS = RESUME_ITEMS_TABLE.length;
const NUM_DIALOGS = 100;

export const DIALOG_TYPE = "dialog";

export const DIALOG_DATA: MapEvent[] = Array.from({ length: NUM_DIALOGS }, (_, i) => ({
  type: DIALOG_TYPE,
  id: 7000001 + i,
  need: [{ itemId: FIRST_ID + Math.floor(Math.random() * NUM_ITEMS), num: 1 }],
  get: [{ itemId: FIRST_ID + Math.floor(Math.random() * NUM_ITEMS), num: 1 }],
  text: {
    init: "我只跟有钱人做生意。",
    data: "要支付 {need} 为代价，来交换 {get} 吗？",
    reject: "穷鬼滚开。",
    success: "我有你想要的任何简历碎片，只要你有钱。",
    noEnoughRoom: "你的背包放不下了，下次再来吧。",
    noEnoughForExchange: "你的背包里没有我要的东西，没诚意的家伙。"
  }
}));
