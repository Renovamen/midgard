import * as _ from "lodash";
import CONSTANT from "@/data/constant";
import { MapDialog, MapGetItem } from "@/js/event-class";
import InitMap from "./init-map";
import store from "@/store";
import { setStoreState } from "@/store/utils";
import { MapPositionType, BlockType } from "@/types";

const KEY_UP = "ArrowUp";
const KEY_DOWN = "ArrowDown";
const KEY_LEFT = "ArrowLeft";
const KEY_RIGHT = "ArrowRight";
const MOVE_DELAY = 280;
const BLOCK_TYPE = CONSTANT.MAP_BLOCK_TYPE;

type keyUpFuncType = (event: KeyboardEvent) => any;

class HeroMoveEvent {
  map: InitMap;
  canMoveDelay: boolean;
  keyUpFunc: keyUpFuncType | null;
  autoMoveTimer: number | null;

  constructor(map: InitMap) {
    this.map = map;
    this.canMoveDelay = true;
    this.keyUpFunc = null;
    this.autoMoveTimer = null;

    this.start();
  }

  start = (): void => {
    this.keyUpFunc = (event: KeyboardEvent) => {
      if (!event.key) return;
      this.autoMoveTimer && clearInterval(this.autoMoveTimer);
      this.move(event.key);
    };
    document.addEventListener("keyup", this.keyUpFunc);
  };

  stop = (): void => {
    document.removeEventListener("keyup", this.keyUpFunc as keyUpFuncType);
    if (this.autoMoveTimer !== null) clearInterval(this.autoMoveTimer);
  };

  move = (direction: string): void => {
    if (!this.canMoveDelay) return;

    this.canMoveDelay = false;

    setTimeout(() => {
      this.canMoveDelay = true;
    }, MOVE_DELAY);

    let x = this.map.hero.x;
    let y = this.map.hero.y;

    if ((store.state as any).hero.$canMove) {
      switch (direction) {
        case KEY_UP:
          x--;
          break;
        case KEY_DOWN:
          x++;
          break;
        case KEY_LEFT:
          y--;
          break;
        case KEY_RIGHT:
          y++;
          break;
      }
    }

    let nextBlock = null;
    try {
      nextBlock = this.map.$data.mapData[x][y];
    } catch (e) {
      // pass
    }

    if (!nextBlock || nextBlock.block_type != BLOCK_TYPE["ROAD"]) return;

    // 将当前格子设置为 Road
    this.map.hero.block_type = BLOCK_TYPE["ROAD"];
    // 将目标格子标识为 Hero
    nextBlock.block_type = BLOCK_TYPE["HERO"];

    const { event_type, event } = nextBlock.event || {};

    // 更新视图
    store.commit("map/UPDATE");

    // 事件不会保留
    if (event_type === "map-chest" || event_type === "map-dialog") {
      delete nextBlock.event;
    }

    // 设置新的英雄位置
    this.map.hero = nextBlock;

    // 执行事件
    switch (event_type) {
      case "map-chest":
        // 遇到事件时，在关闭对话框前不能移动
        this.autoMove([]);
        setStoreState("hero", "$canMove", false);
        MapGetItem(event, () => this.start());
        break;
      case "map-dialog":
        // 遇到事件时，在关闭对话框前不能移动
        this.autoMove([]);
        setStoreState("hero", "$canMove", false);
        MapDialog(event, () => this.start());
        break;
    }
  };

  autoMove = (path: Array<MapPositionType | BlockType>): void => {
    const _path = _.cloneDeep(path);

    this.autoMoveTimer && clearInterval(this.autoMoveTimer);
    this.autoMoveTimer = setInterval(() => {
      const next = _path.splice(0, 1)[0];

      if (!next) {
        this.autoMoveTimer && clearInterval(this.autoMoveTimer);
        return;
      }

      const x = this.map.hero.x;
      const y = this.map.hero.y;

      let direction = "";
      switch (true) {
        case next.x < x:
          direction = KEY_UP;
          break;
        case next.x > x:
          direction = KEY_DOWN;
          break;
        case next.y < y:
          direction = KEY_LEFT;
          break;
        case next.y > y:
          direction = KEY_RIGHT;
          break;
      }

      this.move(direction);

      if (_path.length < 1 && this.autoMoveTimer !== null)
        clearInterval(this.autoMoveTimer);
    }, MOVE_DELAY + 100);
  };
}

export default HeroMoveEvent;
