import { ITEM_TABLE, MATERIAL_TABLE } from "./data";

const MATERIAL_LENGTH = MATERIAL_TABLE.length;
const ITEM_LENGTH = ITEM_TABLE.length;
const INIT_HP = 600;

export const createGame = () => {
  const { setHero } = useHeroStore();

  // 初始生命值
  setHero("initHp", INIT_HP);
  // 是否可以移动（人物在地图上遇到事件时，在关闭对话框前不能移动）
  setHero("canMove", true);
  // 装备的简历碎片
  setHero("resumes", new Array(14).fill(undefined));
  // 初始背包装有龙的信和氪金信
  const pack = MATERIAL_TABLE.concat(new Array(90 - MATERIAL_LENGTH));
  setHero("package", pack);
};

export const cheatGame = () => {
  const { setHero } = useHeroStore();

  // 输入作弊码获得所有简历碎片
  const pack = ITEM_TABLE.concat(new Array(90 - ITEM_LENGTH));
  setHero("package", pack);
};
