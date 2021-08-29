import store from "@/store";
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
  const hero = store.state.hero;

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
  const hero = store.state.hero;

  if (!item.equip || !hero[type] || !hero.$resumes) return false;

  // 删除包裹中的装备，如果已有装备，卸载装备
  setHeroItem(type, index, undefined);

  if (hero.$resumes[item.equipType]) demount(item.equipType, index, type);
  setHeroItem("$resumes", item.equipType, item);

  updateHp();
  return true;
};

const demount = (equipType: number, index: number, type = "$package"): void => {
  const hero = store.state.hero;
  const equipItem = hero.$resumes[equipType];

  setHeroItem("$resumes", equipType, 0);

  if (!equipItem) return;

  const container = hero[type];
  index = index || container.findIndex((i: any) => !i);

  if (~index) setHeroItem(type, index, equipItem);
  else setHeroItem("$resumes", equipType, equipItem);

  updateHp();
};

export default {
  updateHp,
  equip,
  demount
};
