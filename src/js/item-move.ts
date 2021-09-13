import store from "@/store";
import { setHeroItem } from "@/store/utils";
import { ItemType } from "@/types";

class ItemMoveEvent {
  type: string;
  index: number;

  constructor(item: string) {
    const tmp = item.split("|");
    this.type = tmp[0];
    this.index = Number(tmp[1]);
  }

  get = (): ItemType => {
    const hero = (store.state as any).hero;
    return hero && hero[this.type] && hero[this.type][this.index];
  };

  set = (value?: ItemType): void => {
    setHeroItem(this.type, this.index, value);
  };
}

export default ItemMoveEvent;
