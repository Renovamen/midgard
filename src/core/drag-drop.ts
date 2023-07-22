import { ItemOperation } from ".";
import type { ItemKey } from "~/types";

export class DragDrop {
  private from;
  private to;

  constructor(from: ItemOperation, to: ItemOperation) {
    this.from = from;
    this.to = to;
  }

  trigger = () => {
    for (const event of [
      this.nothing,
      this.destory,
      this.equip,
      this.merge,
      this.change
    ]) {
      if (event()) return true;
    }
  };

  nothing = () => this.from.type === this.to.type && this.from.index === this.to.index;

  destory = () => {
    if ((this.to.type as ItemKey) === "destory") {
      this.from.set();
      return true;
    }
  };

  equip = () => {
    const { equip } = useHeroStore();
    const fromItem = this.from.get();

    if (this.from.type === "package" && fromItem && this.to.type === "resumes") {
      equip(this.from.index);
      return true;
    }
  };

  merge = () => {
    const fromItem = this.from.get();
    const toItem = this.to.get();

    if (fromItem && toItem && fromItem.id === toItem.id && fromItem.pile && toItem.pile) {
      toItem.num! += fromItem.num as number;
      this.from.set();
      return true;
    }
  };

  change = () => {
    const fromItem = this.from.get();
    const toItem = this.to.get();

    // 装备栏的物品不能交换位置
    if (this.from.type === "resumes" && this.to.type === "resumes") return false;

    // 类型不一样的装备栏和背包中的物品不能交换位置
    if (
      this.from.type !== this.to.type &&
      fromItem &&
      toItem &&
      fromItem.equipType !== toItem.equipType
    )
      return false;

    this.from.set(toItem);
    this.to.set(fromItem);

    return true;
  };
}

export default DragDrop;
