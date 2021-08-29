import * as _ from "lodash";
import { createApp } from "vue";
import CONSTANT from "@/data/constant";
import getStatic from "@/js/get-static";
import op from "@/js/hero-operations";
import store from "@/store";
import { setStoreState } from "@/store/utils";

const DialogElementClassName = ".map-dialog-modal";
const ShadowViewClassName = ".shadow-view";

const createPopup = () => {
  const modal = document.createElement("div");
  const shadowView = document.createElement("div");
  const view = document.querySelector("#router-view") as HTMLElement;
  const opt = {
    height: 300,
    width: 200,
    animated: "animate__animated animate__faster animate__zoomIn",
    backForce: 0.2
  };

  shadowView.className = ShadowViewClassName.slice(1);

  // 背景层 创建
  Object.assign(shadowView.style, {
    position: "absolute",
    background: `rgba(0,0,0,${opt.backForce})`,
    width: `100%`,
    height: `100%`,
    left: `0px`,
    top: `0px`,
    zIndex: "10"
  });

  // 模态框 创建
  Object.assign(modal.style, {
    position: "absolute",
    width: `${opt.height}px`,
    height: `${opt.width}px`,
    left: `${(view.offsetWidth - opt.width) / 2}px`,
    top: `${(view.offsetHeight - opt.height) / 2}px`,
    zIndex: "20"
  });

  const info = {
    modal: modal,
    shadowView: shadowView,
    opt: opt,
    view: view
  };
  return info;
};

const closeModal = (callback: any): void => {
  setStoreState("hero", "$canMove", true); // 对话窗口关闭后，恢复移动

  const modal = document.querySelector(DialogElementClassName);
  const shadow = document.querySelector(ShadowViewClassName);

  modal && (modal.parentNode as HTMLElement).removeChild(modal);
  shadow && (shadow.parentNode as HTMLElement).removeChild(shadow);
  callback && callback();
};

const itemLevel = CONSTANT.ITEM_LEVEL;

const MapDialog = function (event: any, callback: any) {
  const info = createPopup();
  const modal = info.modal,
    shadowView = info.shadowView;
  const opt = info.opt,
    view = info.view;

  Object.assign(modal, {
    className: [opt.animated, DialogElementClassName.slice(1)].join(" "),
    innerHTML: `
      <div class="close" @click="this.close">+</div>
      <div class="msg m-b-4 radius-2">
        {{this.record.msg}}
      </div>
      <div class="change m-b-4 radius-2" v-if="this.record.need && this.record.get">
        <span>要支付</span>
        <template v-for="item in this.record.need">
          <span class="name" :style="getColor(item[0])">{{ itemKey(item[0], 'name') }}</span>*<span class="num">{{item[1]}}</span>
        </template>
        <span>为代价，来交换</span>
        <template v-for="item in this.record.get">
          <span class="name" :style="getColor(item[0])">{{ itemKey(item[0], 'name') }}</span>*<span class="num">{{item[1]}}</span>
        </template>
        <span>吗?</span>
      </div>
      <div class="event">
        <button class="action radius-2" v-for="e in this.record.buttons" @click="action(e.action)">
          {{e.title}}
        </button>
        <button v-if="this.isEnd" class="action radius-2" @click="close">结束对话</button>
      </div>
    `
  });

  view.appendChild(modal);
  view.appendChild(shadowView);

  createApp({
    store,
    created() {
      this.event = event;
      this.$i = 0;
      this.isEnd = false;
      this.next();
    },
    methods: {
      next() {
        if (this.$isEnd) {
          this.close();
          return;
        }
        this.record = transformEventObj(this.event.data[this.$i]);
        this.isEnd = this.$i++ === this.event.data.length - 1;
        this.$forceUpdate();
      },
      action(e: any) {
        e.call(this);
      },
      close() {
        closeModal(callback);
      },
      getColor(itemID: number) {
        const itemColor = {
          color: itemLevel[getStatic(itemID).grade || 0]
        };
        return itemColor;
      },
      itemKey(id: any, key: any) {
        const data = getStatic(id);
        return data[key] || data;
      }
    }
  }).mount(DialogElementClassName);

  function transformEventObj(opt: any) {
    let record = _.cloneDeep(opt);
    if (typeof record === "string") {
      record = {
        msg: record
      };
    }

    const buttons = _.map(record.buttons, function (str) {
      if (typeof str === "object") return str;

      const strc = str;
      str = str.match(/\[([^]+)\]\{([^]+)\}/);

      const btn: any = {};
      btn.title = str[1];

      if (!str[2]) return btn;

      if (strc[0] !== "#") {
        btn.action = function () {
          const [i, isEnd] = str[2].split(",");
          this.$i = Number(i);
          this.next();
          if (Number(isEnd)) this.isEnd = true;
        };
      } else {
        const i = str[2].split(",");
        const isEnd = i.unshift();
        btn.action = function () {
          const need = opt.need || [];
          const get = opt.get || [];
          const enough = op.isEnoughItem(need);

          if (!enough) this.$i = i[0];
          else {
            const left = op.getItem(get);
            if (left.length) this.$i = i[1];
            else {
              op.getItem(get, true);
              op.costItem(need);
              this.$i = i[2];
            }
          }

          this.next();
          if (Number(isEnd)) this.isEnd = true;
        };
      }
      return btn;
    });

    record.buttons = buttons;
    return record;
  }
};

const MapGetItem = function (event: any, callback: any) {
  const info = createPopup();
  const modal = info.modal,
    shadowView = info.shadowView;
  const opt = info.opt,
    view = info.view;

  Object.assign(modal, {
    className: [opt.animated, DialogElementClassName.slice(1)].join(" "),
    innerHTML: `
      <div class="close" @click="this.close">+</div>
      <div class="msg m-b-4 radius-2">
        {{this.record.msg}}
      </div>
      <div class="change m-b-4 radius-2" v-if="this.record.get">
        <span>包裹中有</span>
        <template v-for="item in this.record.get">
          <span class="name" :style="getColor(item[0])">{{ itemKey(item[0], 'name') }}</span>*<span class="num">{{ item[1] }}</span>
        </template>
        <span>，要拾取吗?</span>
      </div>
      <div class="event">
        <button class="action radius-2" v-for="e in this.record.buttons" @click="action(e.action)">
          {{ e.title }}
        </button>
        <button v-if="this.isEnd" class="action radius-2" @click="close">结束</button>
      </div>
    `
  });

  view.appendChild(modal);
  view.appendChild(shadowView);

  createApp({
    store,
    created() {
      this.chest = event;
      this.$i = 0;
      this.isEnd = false;
      this.next();
    },
    methods: {
      next() {
        if (this.$isEnd) {
          this.close();
          return;
        }
        this.record = getItemObj(this.chest.data[this.$i]);
        this.isEnd = this.$i++ === this.chest.data.length - 1;
        this.$forceUpdate();
      },
      action(e: any) {
        e.call(this);
      },
      close() {
        closeModal(callback);
      },
      getColor(itemID: number) {
        const itemColor = {
          color: itemLevel[getStatic(itemID).grade || 0]
        };
        return itemColor;
      },
      itemKey(id: any, key: any) {
        const data = getStatic(id);
        return data[key] || data;
      }
    }
  }).mount(DialogElementClassName);

  function getItemObj(opt: any) {
    let record = _.cloneDeep(opt);
    if (typeof record === "string") {
      record = {
        msg: record
      };
    }

    const buttons = _.map(record.buttons, function (str) {
      if (typeof str === "object") return str;

      const strc = str;
      str = str.match(/\[([^]+)\]\{([^]+)\}/);

      const btn: any = {};
      btn.title = str[1];

      if (!str[2]) return btn;

      if (strc[0] !== "#") {
        btn.action = function () {
          const [i, isEnd] = str[2].split(",");
          this.$i = Number(i);
          // console.log("this.i: ", Number(i))
          this.next();
          if (Number(isEnd)) this.isEnd = true;
        };
      } else {
        const i = str[2].split(",");
        const isEnd = i.unshift();

        btn.action = function () {
          const get = opt.get || [];
          const left = op.getItem(get);

          if (left.length) this.$i = Number(i[0]);
          else {
            op.getItem(get, true);
            this.$i = Number(i[1]);
          }

          this.next();
          if (Number(isEnd)) this.isEnd = true;
        };
      }
      return btn;
    });

    record.buttons = buttons;
    return record;
  }
};

export { MapDialog, MapGetItem };
