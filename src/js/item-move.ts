import store from "@/store";
import { setHeroItem } from "@/store/utils";

class ItemMoveEvent {
  type: string;
  index: number;

  constructor(item: any) {
    const tmp = item.split("|");

    this.type = tmp[0];
    this.index = Number(tmp[1]);
  }

  get = () => {
    const hero = (store.state as any).hero;
    return hero && hero[this.type] && hero[this.type][this.index];
  };

  set = (obj: any): void => {
    setHeroItem(this.type, this.index, obj);
  };
}

export default ItemMoveEvent;
