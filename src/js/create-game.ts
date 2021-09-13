import { ITEM_TABLE, MATERIAL_TABLE } from "@/data/item-data";
import { setStoreState } from "@/store/utils";

const MATERIAL_LENGTH = MATERIAL_TABLE.length;
const ITEM_LENGTH = ITEM_TABLE.length;

const INIT_HP = 600;
const MAX_HP = 600;

const createGame = function (isCheat = false): void {
  if (isCheat == false) {
    // 生命值
    setStoreState("hero", "$hp", INIT_HP);
    // 最大生命值
    setStoreState("hero", "$maxHp", MAX_HP);
    // 是否可以移动（人物在地图上遇到事件时，在关闭对话框前不能移动）
    setStoreState("hero", "$canMove", true);

    const $resumes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    setStoreState("hero", "$resumes", $resumes);

    // 初始背包装有龙的信和氪金信
    const $package = MATERIAL_TABLE.concat(new Array(90 - MATERIAL_LENGTH));
    setStoreState("hero", "$package", $package);
  } else {
    // 输入作弊码获得所有简历碎片
    const $package = ITEM_TABLE.concat(new Array(90 - ITEM_LENGTH));
    setStoreState("hero", "$package", $package);
  }
};

export default createGame;
