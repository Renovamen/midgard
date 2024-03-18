import type { MapEvent, DungeonOptions } from "~/types";
import { GameMap } from ".";
import { BLOCK_TYPES, DIALOG_DATA, getDataById } from "./data";

export class Dungeon {
  public name;
  public id;
  public options;
  public chests;
  public dialogs;
  public map;
  public hero;

  constructor(options: DungeonOptions) {
    this.options = options;
    this.options.chestNum = options.chestNum || 10;
    this.options.dialogNum = options.dialogNum || 5;

    this.name = options.name;
    this.id = options.id;

    this.map = new GameMap(options.mapOptions);
    this.chests = this.generateChests();
    this.dialogs = this.generateDialogs();

    this.hero = this.placeHero();
    this.placeEvents();
  }

  // 将玩家随机放置在地图上
  placeHero = () => {
    const hero = this.randomBlankBlocks(1)[0];
    hero.type = BLOCK_TYPES.HERO;
    return hero;
  };

  // 将事件随机放置在地图上
  placeEvents = () => {
    const events = this.chests
      .concat(this.dialogs)
      .map((e) => getDataById(e) as MapEvent);
    const num = events.length;
    const blocks = this.randomBlankBlocks(num);

    for (let i = 0; i < blocks.length; i++) blocks[i].event = events[i];
  };

  // 随机生成包裹
  generateChests = () => {
    const chests = [];

    for (let i = 1; i <= this.options.chestNum!; i++) {
      // 包裹中物品种类
      const itemId = Math.ceil(Math.random() * 14);
      // 包裹中物品等级 R: 50%, SR: 30%, SSR:15%, UR: 5%
      const levelId = Math.ceil(Math.random() * 100);

      let level = 0;

      if (levelId <= 50) level = 0;
      else if (levelId > 50 && levelId <= 80) level = 1;
      else if (levelId > 80 && levelId <= 95) level = 2;
      else level = 3;

      const chestID = 5000000 + level * 14 + itemId;
      chests.push(chestID);
    }

    return chests;
  };

  // 随机生成事件
  generateDialogs = () => {
    const events = [];
    for (let i = 1; i <= this.options.dialogNum!; i++) {
      events.push(7000000 + Math.ceil(Math.random() * DIALOG_DATA.length));
    }
    return events;
  };

  randomBlankBlocks = (size: number) => {
    const blocks = this.map.data
      .flat()
      .filter((b) => b.type === BLOCK_TYPES.ROAD && !b.event)
      .sort(() => 0.5 - Math.random());
    return blocks.slice(0, Math.min(size, blocks.length));
  };
}

export default Dungeon;
