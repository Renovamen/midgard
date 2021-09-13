import * as _ from "lodash";
import DIALOG_DATA from "@/data/event-data";
import CHEST_DATA from "@/data/chest-data";
import { ITEM_TABLE } from "@/data/item-data";

const Data = {
  "3": ITEM_TABLE,
  "5": CHEST_DATA,
  "7": DIALOG_DATA
};

const getStatic = function (key: number) {
  const head: string = key.toString()[0];
  const record = (Data as any)[head];
  const result =
    _.cloneDeep(
      _.find(record, {
        id: key
      })
    ) || key;

  return result;
};

export default getStatic;
