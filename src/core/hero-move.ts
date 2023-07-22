import type { MapPosition, MapBlock } from "~/types";
import { Dungeon } from ".";
import { BLOCK_TYPES } from "./data";

const KEY_UP = "ArrowUp";
const KEY_DOWN = "ArrowDown";
const KEY_LEFT = "ArrowLeft";
const KEY_RIGHT = "ArrowRight";
const MOVE_DELAY = 280;

export class HeroMove {
  dungeon: Dungeon;
  canMove: boolean;
  onKeyUp: ((event: KeyboardEvent) => void) | null;
  autoMoveTimer: ReturnType<typeof setInterval> | null;

  constructor(dungeon: Dungeon) {
    this.dungeon = dungeon;
    this.canMove = true;
    this.onKeyUp = null;
    this.autoMoveTimer = null;

    this.start();
  }

  start = () => {
    this.onKeyUp = (event: KeyboardEvent) => {
      if (!event.key) return;
      this.autoMoveTimer && clearInterval(this.autoMoveTimer);
      this.move(event.key);
    };
    document.addEventListener("keyup", this.onKeyUp);
  };

  stop = () => {
    document.removeEventListener("keyup", this.onKeyUp!);
    this.autoMoveTimer && clearInterval(this.autoMoveTimer);
  };

  move = (direction: string) => {
    if (!this.canMove) return;

    this.canMove = false;
    setTimeout(() => (this.canMove = true), MOVE_DELAY);

    const { hero, setHero } = useHeroStore();
    const { setEvent, emitUpdate } = useEventStore();

    let x = this.dungeon.hero.x;
    let y = this.dungeon.hero.y;

    if (hero.canMove) {
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

    const toBlock: MapBlock = this.dungeon.map.data[x][y];

    if (!toBlock || toBlock.type != BLOCK_TYPES.ROAD) return;

    // 将当前格子设置为 Road
    this.dungeon.hero.type = BLOCK_TYPES.ROAD;
    // 将目标格子设置为 Hero
    toBlock.type = BLOCK_TYPES.HERO;
    this.dungeon.hero = toBlock;

    // 更新视图
    emitUpdate("mapUpdate");

    // 是否触发事件
    if (!toBlock.event) return;

    // 执行事件
    setHero("canMove", false); // 遇到事件时，在关闭对话框前不能移动
    setEvent(toBlock.event.type, {
      event: toBlock.event,
      callback: () => setHero("canMove", true) // 关闭对话窗口，玩家恢复移动
    });

    // 事件不会保留
    delete toBlock.event;
  };

  autoMove = (path: Array<MapPosition>) => {
    this.autoMoveTimer && clearInterval(this.autoMoveTimer);
    this.autoMoveTimer = setInterval(() => {
      const next = path.splice(0, 1)[0];

      if (!next) {
        this.autoMoveTimer && clearInterval(this.autoMoveTimer);
        return;
      }

      const x = this.dungeon.hero.x;
      const y = this.dungeon.hero.y;

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

      if (path.length < 1 && this.autoMoveTimer !== null)
        clearInterval(this.autoMoveTimer);
    }, MOVE_DELAY + 100);
  };
}

export default HeroMove;
