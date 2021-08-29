import * as _ from "lodash";
import store from "@/store";
import getStatic from "@/js/get-static";
import { setStoreState, setHeroItem } from "@/store/utils";

const createPopup = function () {
  const modal = document.createElement("div");
  const shadowView = document.createElement("div");
  const view = document.querySelector("#router-view") as HTMLElement;
  const opt = {
    height: 300,
    width: 120,
    animated: "animate__animated animate__faster animate__zoomIn",
    backForce: 0.2
  };

  shadowView.className = ".shadow-view".slice(1);

  // 背景层 创建
  Object.assign(shadowView.style, {
    position: "absolute",
    background: `rgba(0,0,0,${opt.backForce})`,
    width: `100%`,
    height: `100%`,
    left: `0px`,
    top: `0px`,
    zIndex: "5"
  });

  // 模态框 创建
  Object.assign(modal.style, {
    position: "absolute",
    width: `${opt.height}px`,
    height: `${opt.width}px`,
    left: `${(view.offsetWidth - opt.width) / 2}px`,
    top: `${(view.offsetHeight - opt.height) / 2}px`,
    zIndex: "6"
  });

  const info = {
    modal: modal,
    shadowView: shadowView,
    opt: opt,
    view: view
  };
  return info;
};

const updateHp = (): void => {
  const hero = (store.state as any).hero;

  const itemList = hero.$resumes || [];

  // 根据装备计算生命值
  let curHp = hero.$maxHp;
  for (const item of itemList) {
    if (!item) continue;
    if (item.equip) curHp += item.equip["$changeHp"];
  }
  setStoreState("hero", "$hp", curHp);

  if (hero.$hp < 0) {
    const info = createPopup();
    const modal = info.modal,
      shadowView = info.shadowView,
      opt = info.opt,
      view = info.view;

    Object.assign(modal, {
      className: [opt.animated, ".gameover-dialog".slice(1)].join(" "),
      innerHTML: `
        <div class="radius-2">
          <span>你失去了梦想，已经是一条咸鱼了。</span>
          <div class="event">
            <button class="action radius-2" onclick="location.reload()">重新开始</button>
          </div>
        </div>
      `
    });
    view.appendChild(modal);
    view.appendChild(shadowView);
  }
};

const equip = (item: any, index: number, type = "$package"): boolean => {
  /*
    0: 基本
    1: 教育
    2: 课程
    3: 技能
    4: 兴趣
    5: 项目-1
    6: 项目-2
    7: 项目-3
    8: 项目-4
    9: 项目-5
    10: 研究-1
    11: 研究-2
    12: 论文
    13: 经历
  */
  const hero = (store.state as any).hero;

  if (!item.equip || !hero[type] || !hero.$resumes) return false;

  // 删除包裹中的装备，如果已有装备，卸载装备
  setHeroItem(type, index, undefined);

  if (hero.$resumes[item.equipType]) demount(item.equipType, index, type);
  setHeroItem("$resumes", item.equipType, item);

  updateHp();
  return true;
};

const demount = (equipType: number, index: number, type = "$package"): void => {
  const hero = (store.state as any).hero;
  const equipItem = hero.$resumes[equipType];

  setHeroItem("$resumes", equipType, 0);

  if (!equipItem) return;

  const container = hero[type];
  index = index || container.findIndex((i: any) => !i);

  if (~index) setHeroItem(type, index, equipItem);
  else setHeroItem("$resumes", equipType, equipItem);

  updateHp();
};

function getList(key: any, opt: any, isIndex = false) {
  const hero = (store.state as any).hero;
  const list = hero[key];

  if (!list) return false;

  let condition = null;

  if (typeof opt === "number") condition = (i: any) => i && i.id === opt;
  if (typeof opt === "object") condition = (i: any) => i && i.id === opt.id;
  if (typeof opt === "function") condition = opt;
  if (!condition) return false;

  return isIndex ? list.findIndex(condition) : list.find(condition);
}

const getItem = (data: any, force = false, type = "$package") => {
  const hero = (store.state as any).hero;
  const container = force ? hero[type] : _.cloneDeep(hero[type]);
  const surplus: any = [];

  if (!container || !data || !data.length) return surplus;

  data.forEach((i: any) => {
    let item;
    if (typeof i[0] === "object") item = i[0];
    else item = getStatic(i[0]);

    const itemInPackage = getList(type, { id: item.id });
    const nextBlankPlace = container.findIndex((item: any) => !item);

    const num = i[1];
    item.pile && (item.num = num);

    // 可堆叠且包里存在该物品
    if (itemInPackage && item.pile)
      itemInPackage.num = (itemInPackage.num || 0) + num;
    else {
      // 不可堆叠或包里不存在该物品
      if (~nextBlankPlace) container[nextBlankPlace] = item;
      // 有空位
      else surplus.push(i); // 没空位
    }
  });

  return surplus;
};

function costItem(list: any, type = "$package"): void {
  const hero = (store.state as any).hero;
  const container = hero[type];

  for (const opt of list) {
    const index = getList(type, opt[0], true);
    const num = (() => {
      if (typeof opt[1] === "function") return opt[1].call();
      return opt[1];
    })();

    const curItem = container[index];
    curItem.num -= num;
    setHeroItem(type, index, curItem);

    if (!container[index].num) setHeroItem(type, index, undefined);
  }
}

function isEnoughItem(list: any, type = "$package"): boolean {
  const hero = (store.state as any).hero;
  const container = hero[type];

  if (!container || !list || !list.length) return false;

  for (const opt of list) {
    const item = getList(type, opt[0]);
    const num = (() => {
      if (typeof opt[1] === "function") return opt[1].call();
      return opt[1];
    })();

    if (!item || (item.num || 1) < num) return false;
  }
  return true;
}

export default {
  updateHp,
  equip,
  demount,
  getItem,
  costItem,
  isEnoughItem
};
