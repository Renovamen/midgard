import { DirectiveBinding } from "vue";
import initDragDrop from "@/js/drag-drop";
import op from "@/js/hero-operations";
import store from "@/store";

export default function (el: HTMLElement, binding: DirectiveBinding): void {
  const { hero, posType, posIndex } = binding.value;

  const event = {
    dragend(event: DragEvent) {
      if (!event.dataTransfer) return false;
      event.dataTransfer.clearData("text");
      return false;
    },
    dragover(event: DragEvent) {
      event.preventDefault();
      return true;
    },
    dragstart(event: DragEvent) {
      if (!event.dataTransfer) return;
      event.dataTransfer.setData("text", posType + "|" + String(posIndex));
      try {
        const eTarget = event.target as HTMLElement;
        event.dataTransfer.setDragImage(
          !~eTarget.className.indexOf("package-item")
            ? (eTarget.parentNode as HTMLElement)
            : eTarget,
          20,
          20
        );
      } catch (error) {
        // pass
      }
      const itemPover = document.querySelector(".item-tip-pover");
      itemPover && (itemPover.parentNode as HTMLElement).removeChild(itemPover);
    },
    drop(event: DragEvent) {
      event.preventDefault();

      if (!event.dataTransfer) return;
      initDragDrop(
        event.dataTransfer.getData("text"),
        posType + "|" + String(posIndex)
      );

      op.updateHp();
      store.commit("hero/UPDATE");
    }
  };

  // 如果是格子是空的则禁用拖动
  if (hero[posType] && hero[posType][posIndex])
    el.setAttribute("draggable", "true");
  else el.removeAttribute("draggable");

  // 创建事件，并销毁已销毁的事件
  for (const key in event) {
    const value = (event as any)[key];
    const keyNameInElement = `${key}_EVENT_FUNCTION_ITEM_BLOCK`;

    el.removeEventListener(key, el[keyNameInElement]);
    el.addEventListener(key, value);
    el[keyNameInElement] = value;
  }
}
