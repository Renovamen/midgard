import type { GameItem, ItemKey } from "~/types";

export class ItemOperation {
  public type;
  public index;

  constructor(type: ItemKey, index: number) {
    this.type = type;
    this.index = index;
  }

  public get = () => {
    const { hero } = useHeroStore();
    return this.type === "destory" ? undefined : hero[this.type][this.index];
  };

  public set = (value?: GameItem) => {
    if (this.type === "destory") return;

    const { setHeroItem } = useHeroStore();
    setHeroItem(this.type, this.index, value);
  };
}

export default ItemOperation;
