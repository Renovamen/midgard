import type { DirectiveBinding } from "vue";
import { DragDrop, ItemOperation } from "~/core";
import type { ItemKey } from "~/types";

export default function (
  el: HTMLElement,
  binding: DirectiveBinding<{ type: ItemKey; index: number }>
) {
  const { hero } = useHeroStore();
  const { type, index } = binding.value;

  const events = {
    dragend: (e: DragEvent) => {
      e.dataTransfer?.clearData("type");
      e.dataTransfer?.clearData("index");
    },
    dragover: (e: DragEvent) => {
      e.preventDefault();
    },
    dragstart: (e: DragEvent) => {
      if (!e.dataTransfer) return;

      e.dataTransfer.setData("type", type);
      e.dataTransfer.setData("index", String(index));

      try {
        e.dataTransfer.setDragImage(e.target as HTMLElement, 20, 20);
      } catch (error) {}

      const itemTip = document.querySelector(".item-tip");
      itemTip && itemTip.parentNode?.removeChild(itemTip);
    },
    drop: (e: DragEvent) => {
      e.preventDefault();
      if (!e.dataTransfer) return;

      const from = new ItemOperation(
        e.dataTransfer.getData("type") as ItemKey,
        Number(e.dataTransfer.getData("index"))
      );
      const to = new ItemOperation(type, index);

      new DragDrop(from, to).trigger();
    }
  };

  // 如果是格子是空的则禁用拖动
  if (type !== "destory" && hero[type][index]) el.setAttribute("draggable", "true");
  else el.removeAttribute("draggable");

  // 创建事件，并销毁已销毁的事件
  for (const key in events) {
    const value = (events as any)[key];
    const eventName = `${key}_DRAG_DROP_EVENT`;

    el.removeEventListener(key, (el as any)[eventName]);
    el.addEventListener(key, value);
    (el as any)[eventName] = value;
  }
}
