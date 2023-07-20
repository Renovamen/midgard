import { defineStore } from "pinia";
import type { HeroState, HeroItemKey, GameItem, GameItemOperation } from "~/types";
import { getDataById } from "~/core/data";

export const useHeroStore = defineStore("hero", () => {
  const hero = reactive<HeroState>({
    resumes: [],
    package: [],
    initHp: 600,
    canMove: true
  });

  const setHero = <T extends keyof HeroState>(key: T, value: HeroState[T]) => {
    hero[key] = value;
  };

  const setHeroItem = (key: HeroItemKey, index: number, value?: GameItem) => {
    hero[key][index] = value;
  };

  const sortItemsInPackage = () => {
    hero.package.sort((a, b) => (a?.id || Infinity) - (b?.id || Infinity));
  };

  const findItemInPackage = (id: number) => ({
    item: hero.package.find((i) => i?.id === id),
    index: hero.package.findIndex((i) => i?.id === id)
  });

  // 根据装备计算生命值
  const hp = computed(() => {
    let hp = hero.initHp;
    hero.resumes.forEach((item) => (hp += item?.equip?.changeHp || 0));
    return hp;
  });

  const equip = (packageIndex: number) => {
    const item = hero.package[packageIndex];
    if (!item || item.equipType === undefined || !item.equip) return false;

    // 将要装备的物品从包裹中删除
    setHeroItem("package", packageIndex, undefined);
    // 如果当前位置已装备物品，卸载
    if (hero.resumes[item.equipType]) demount(item.equipType, packageIndex);

    setHeroItem("resumes", item.equipType, item);
    return true;
  };

  const demount = (equipType: number, packageIndex?: number): void => {
    const equipItem = hero.resumes[equipType];
    if (!equipItem) return;

    setHeroItem("resumes", equipType, undefined);

    packageIndex = packageIndex || hero.package.findIndex((i: any) => !i);
    if (~packageIndex) setHeroItem("package", packageIndex, equipItem);
  };

  const getItems = (get: Array<GameItemOperation>) => {
    const failed: Array<GameItemOperation> = [];

    get.forEach((g) => {
      const { item } = findItemInPackage(g.itemId);

      if (item?.pile) item.num = (item.num || 0) + g.num; // 可堆叠且包里存在该物品
      else {
        // 不可堆叠或包里不存在该物品
        const blankIndex = hero.package.findIndex((j) => !j);
        const newItem = getDataById(g.itemId) as GameItem;

        if (~blankIndex) hero.package[blankIndex] = newItem; // 有空位
        else failed.push(g); // 没空位
      }
    });

    return failed;
  };

  const costItems = (need: Array<GameItemOperation>) => {
    need.forEach((n) => {
      const { item, index } = findItemInPackage(n.itemId);

      if (!item?.num) setHeroItem("package", index, undefined);
      else item.num = Math.max(item.num - n.num, 0);
    });
  };

  const hasEnoughItems = (need: Array<GameItemOperation>) => {
    for (const n of need) {
      const { item } = findItemInPackage(n.itemId);
      if (!item || (item.num || 1) < n.num) return false;
    }
    return true;
  };

  return {
    hero,
    setHero,
    setHeroItem,
    sortItemsInPackage,
    hp,
    equip,
    getItems,
    costItems,
    hasEnoughItems
  };
});
