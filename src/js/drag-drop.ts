import ItemMoveEvent from "@/js/item-move";
import op from "@/js/hero-operations";

const noting = function (from: ItemMoveEvent, to: ItemMoveEvent) {
  if (from.type === to.type && from.index === to.index) {
    return true;
  }
};

const destory = function (from: ItemMoveEvent, to: ItemMoveEvent) {
  if (to.type === "$destory") {
    from.set();
    return true;
  }
};

const equip = function (from: ItemMoveEvent, to: ItemMoveEvent) {
  if (to.type === "$resumes") {
    op.equip(from.get(), from.index, from.type);
    return true;
  }
};

const demount = function (from: ItemMoveEvent, to: ItemMoveEvent) {
  if (from.type === "$resumes") {
    if (to.get() && to.get().equipType === from.index) {
      op.equip(to.get(), to.index, to.type);
      return true;
    }
  }
};

const merge = function (from: ItemMoveEvent, to: ItemMoveEvent) {
  if (
    from.get() &&
    to.get() &&
    from.get().id === to.get().id &&
    from.get().pile &&
    to.get().pile
  ) {
    (to.get().num as number) += from.get().num as number;
    from.set();
    return true;
  }
};

const change = function (from: ItemMoveEvent, to: ItemMoveEvent) {
  // 类型不一样的装备栏和背包中的简历不能交换位置
  if (
    from.type != to.type &&
    from.get() &&
    to.get() &&
    from.get().equipType != to.get().equipType
  )
    return false;

  const T = from.get();
  from.set(to.get());
  to.set(T);
  return true;
};

const initDragDrop = function (fromPos: string, toPos: string) {
  const from = new ItemMoveEvent(fromPos);
  const to = new ItemMoveEvent(toPos);

  for (const event of [noting, destory, equip, demount, merge, change]) {
    const dropResult = event(from, to);
    if (dropResult) {
      // console.info('[Move Event] From', from, 'To', to)
      return dropResult;
    }
  }
};

export default initDragDrop;
