import { createApp, type DirectiveBinding } from "vue";
import { ITEM_LEVELS, UI } from "~/core/data";
import type { GameItem } from "~/types";

export default function (
  el: HTMLElement,
  binding: DirectiveBinding<GameItem | undefined>
) {
  const className = ".item-tip";
  const item = binding.value;

  const events = {
    click: () => {
      if (item?.link) window.open(item.link.url);
    },
    mouseenter: (e: MouseEvent) => {
      events.mouseleave();

      const tip = document.createElement("div");
      const { right, top } = (e.target as HTMLElement).getBoundingClientRect();

      const height = window.innerHeight - 10;
      const scale = height / UI.HEIGHT;
      const margin = ((scale - 1) * UI.HEIGHT) / 2 + 5;

      Object.assign(tip.style, {
        left: `${right}px`,
        top: `${top - margin}px`
      });

      Object.assign(tip, {
        className: className.slice(1),
        innerHTML: `
          <div class="name" :style="{ color: this.itemColor }">
            {{ this.item.name }}
          </div>

          <div v-if="this.changeHp" class="equip">梦想 {{ this.changeHp }}</div>

          <div v-for="dsc in item.dsc" v-html="dsc"></div>
          <img v-for="img in item.img" :src='img' />

          <button class="btn" v-if="item.link">{{ item.link.text }}</button>
        `
      });

      const appElement = document.querySelector("#app") as HTMLElement;
      appElement.appendChild(tip);

      createApp({
        created() {
          this.item = item;
          this.itemColor = ITEM_LEVELS[this.item.grade || 0];
          this.changeHp = this.item.equip?.changeHp;
          if (this.changeHp && this.changeHp > 0) this.changeHp = "+" + this.changeHp;
        }
      }).mount(className);
    },
    mouseleave: () => {
      const old = document.querySelector(className);
      if (old) (old.parentNode as HTMLElement).removeChild(old); // 移除已经存在的 tip
    }
  };

  for (const key in events) {
    const value = (events as any)[key];
    const eventName = `${key}_TOOL_TIP_EVENT`;

    el.removeEventListener(key, (el as any)[eventName]);

    if (item) {
      el.addEventListener(key, value);
      (el as any)[eventName] = value;
    }
  }
}
