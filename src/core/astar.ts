import { GameMap } from ".";
import { BLOCK_TYPES } from "./data";
import type { MapBlock } from "~/types";

class Block {
  public x;
  public y;
  public parent: Block | null;
  public G;
  public H;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.parent = null;
    this.G = 0;
    this.H = 0;
  }

  getF = () => this.G + this.H;
}

export class Astar {
  private map;
  private start;
  private end;
  private list;

  constructor(map: GameMap, start: MapBlock, end: MapBlock) {
    this.map = map;
    this.start = new Block(start.x, start.y);
    this.end = new Block(end.x, end.y);

    this.list = {
      open: [] as Block[],
      close: [] as Block[],
      stick: map.data
        .flat()
        .filter((b) => b.type === BLOCK_TYPES.STICK)
        .map((b) => new Block(b.x, b.y))
    };
  }

  find = () => {
    this.list.open.push(this.start);

    let block = this.step();

    if (!block) {
      console.info("无法生存路径!");
      return [];
    }

    const path = [];

    while (block.parent?.parent) {
      block = block.parent;
      path.push(block);
    }

    path.reverse().push(this.end);
    return path;
  };

  step = (): Block | false => {
    this.list.open.sort((a, b) => a.getF() - b.getF());

    const currentBlock = this.list.open.shift();
    if (!currentBlock) return false;

    this.list.close.push(currentBlock);
    const around = this.around(currentBlock);

    for (let i = 0; i < around.length; i++) {
      const block = around[i];
      const index = this.isInList("open", block);

      block.parent = currentBlock;
      block.H = this.countH(block);
      block.G = this.countG(block) + currentBlock.G;

      if (!index) {
        if (block.x === this.end.x && block.y === this.end.y) return block;
        this.list.open.push(block);
        continue;
      }

      if (currentBlock.G + this.countG(block) < this.list.open[index].G) {
        this.list.open[index].parent = currentBlock;
      }
    }

    return this.step();
  };

  around = (block: Block) => {
    const list = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        if (i !== 0 && j !== 0) continue;

        const x = block.x + i;
        const y = block.y + j;
        if (x >= this.map.row || y >= this.map.col || x < 0 || y < 0) continue;

        const record = new Block(x, y);

        if (this.isInList("close", record)) continue;
        if (this.isInList("stick", record)) continue;

        list.push(record);
      }
    }

    return list;
  };

  isInList = (type: "open" | "close" | "stick", block: Block) => {
    const index = this.list[type].findIndex((b) => b.x === block.x && b.y === block.y);
    return index === -1 ? false : index;
  };

  countH = (block: Block) => {
    const x = Math.abs(block.x - this.end.x);
    const y = Math.abs(block.y - this.end.y);
    return (x + y) * 10;
  };

  countG = (block: Block) => {
    const parent = block.parent!;
    if (block.x !== parent.x && block.y !== parent.y) return 14;
    else return 10;
  };
}

export default Astar;
