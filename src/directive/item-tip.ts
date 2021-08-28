import { createApp } from "vue";
import CONSTANT from "@/data/constant";
import "../styles/item-tip.styl";

export default function (el: any, binding: any) {
  const itemLevel = CONSTANT.ITEM_LEVEL,
    tipClassName = ".item-tip-pover",
    item = binding.value;

  const event = {
    click: function () {
      if (item.link) {
        window.open(item.link.url);
      }
    },
    mouseenter: function (e: any) {
      event.mouseleave();

      const tip = document.createElement("div");
      const { right, top } = e.target.getBoundingClientRect();

      const height = window.innerHeight - 10,
        height_original = 500;
      const scale = height / height_original;
      const margin = ((scale - 1) * height_original) / 2 + 5;

      Object.assign(tip.style, {
        left: `${right}px`,
        top: `${top - margin}px`
      });

      Object.assign(tip, {
        className: tipClassName.slice(1),
        innerHTML: `
          <div class="name m-b-10 font-min" :style="itemColor">
            {{ this.item.name }}
          </div>

          <div class="equip m-b-10">
            <span class="attr-name">{{ this.hpName }}</span>
            <span class="attr-data">{{ this.changeHp }}</span>
          </div>

          <div class="dsc" v-for="dsc in item.dsc" v-html="dsc"></div>
          <img v-for="img in item.img" :src='img' />

          <div class="btn" v-if="item.link">{{ item.link.text }}</div>
        `
      });

      const $container = document.querySelector(".container") as HTMLElement;
      $container.appendChild(tip);

      createApp({
        created() {
          this.item = item;
          this.itemColor = {
            color: itemLevel[this.item.grade || 0]
          };

          if (this.item.equip) {
            this.changeHp = this.item.equip.$changeHp;
            this.hpName = "梦想";
          } else {
            this.changeHp = null;
            this.hpName = null;
          }
          if (this.changeHp > 0) this.changeHp = "+" + this.changeHp;
        }
      }).mount(tipClassName);
    },
    mouseleave: function () {
      const old = document.querySelector(tipClassName);
      // 移除已经存在的 tip
      if (old) (old.parentNode as HTMLElement).removeChild(old);
    }
  };

  for (const key in event) {
    const value = (event as any)[key];
    const keyNameInElement = `${key}_EVENT_FUNCTION_ITEM_TOOL_TIP`;

    el.removeEventListener(key, el[keyNameInElement]);

    if (item) {
      el.addEventListener(key, value);
      el[keyNameInElement] = value;
    }
  }
}
