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

  const findItemsInPackage = (id: number) => ({
    items: hero.package.filter((i) => i?.id === id),
    indices: hero.package.map((i, k) => (i?.id === id ? k : -1)).filter((i) => i !== -1)
  });

  // 根据装备计算生命值
  const hp = computed(() =>
    hero.resumes.reduce((acc, item) => acc + (item?.equip?.changeHp || 0), hero.initHp)
  );

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

  const demount = (equipType: number, packageIndex?: number) => {
    const equipItem = hero.resumes[equipType];
    if (!equipItem) return;

    setHeroItem("resumes", equipType, undefined);

    packageIndex = packageIndex || hero.package.findIndex((i) => !i);
    if (~packageIndex) setHeroItem("package", packageIndex, equipItem);
  };

  const getItems = (get: GameItemOperation[]) => {
    const failed: GameItemOperation[] = [];

    const addToBlankBlock = (item: GameItem) => {
      const index = hero.package.findIndex((slot) => slot === undefined);

      if (~index) {
        hero.package[index] = item;
        return true;
      } // 有空位

      return false; // 无空位
    };

    get.forEach((g) => {
      const { items } = findItemsInPackage(g.itemId);
      const item = getDataById(g.itemId) as GameItem;

      if (item.pile) {
        // 可堆叠
        if (items[0])
          items[0].num = items[0].num! + g.num; // 包里存在该物品
        else {
          item.num = g.num;
          if (!addToBlankBlock(item)) failed.push(g);
        }
      } else {
        // 不可堆叠
        for (let _ = 0; _ < g.num; _++) {
          if (!addToBlankBlock(item)) {
            failed.push(g);
            break;
          }
        }
      }
    });

    return failed;
  };

  const costItems = (need: GameItemOperation[]) => {
    need.forEach(({ itemId, num }) => {
      const { indices } = findItemsInPackage(itemId);

      indices.some((index) => {
        const item = hero.package[index] as GameItem;
        const decrement = Math.min(num, item.num || 1);
        num -= decrement;

        if (!item.num || item.num <= decrement) setHeroItem("package", index, undefined);
        else item.num -= decrement;

        return num === 0;
      });
    });
  };

  const hasEnoughItems = (need: GameItemOperation[]) =>
    need.every(
      ({ itemId, num }) =>
        findItemsInPackage(itemId).items.reduce((s, i) => s + (i?.num || 1), 0) >= num
    );

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
