import * as _ from "lodash";

class Block {
  x: number;
  y: number;
  parent: any;
  G: any;
  H: any;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.parent = null;
    this.G = 0;
    this.H = null;
  }

  getF = () => {
    return this.G + this.H;
  };
}

class Astar {
  map: any;
  start: any;
  end: any;

  constructor(map: any, start: any, end: any) {
    this.map = _.cloneDeep(map);
    this.start = start;
    this.end = end;

    this.init();
  }

  init = () => {
    const opt = {
      startBlock: this.start,
      endBlock: this.end,
      stickList: _.filter(_.flattenDeep(this.map.mapData), { block_type: "2" }),
      openList: [],
      closeList: [],
      isInList: function (block: any, type: any): any {
        const index = _.findIndex((this as any)[type], {
          x: block.x,
          y: block.y
        });
        return ~index && { index };
      }
    };

    Object.assign(this.map, opt);

    this.map.openList.push(this.map.startBlock);

    let line = this.step();
    if (!line.find) {
      console.info("无法生存路径!");
      return [];
    }
    line = line.endBlock;

    const path = [];
    while (line.parent.parent) {
      line = line.parent;
      path.push(line);
    }

    path.reverse().push(this.end);
    return path;
  };

  step = (): any => {
    this.map.openList = this.map.openList.sort(function (a: any, b: any) {
      return a.getF() - b.getF();
    });

    const currentBlock = this.map.openList.shift();
    if (!currentBlock) {
      return {
        find: false
      };
    }

    this.map.closeList.push(currentBlock);
    const around = this.around(currentBlock);
    for (let i = 0; i < around.length; i++) {
      const _block = around[i];
      const index = this.map.isInList(_block, "openList");

      _block.parent = currentBlock;
      _block.H = this.countH(_block);
      _block.G = this.countG(_block) + (currentBlock.G || 0);

      if (!index) {
        if (
          _block.x === this.map.endBlock.x &&
          _block.y === this.map.endBlock.y
        ) {
          return {
            find: true,
            endBlock: _block
          };
        }
        this.map.openList.push(_block);
        continue;
      }
      if (
        currentBlock.G + this.countG(_block) <
        this.map.openList[index.index].G
      ) {
        this.map.openList[index.index].parent = currentBlock;
      }
    }
    return this.step();
  };

  around = (currentBlock: any) => {
    const list = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        if (i !== 0 && j !== 0) continue;

        const x = currentBlock.x + i;
        const y = currentBlock.y + j;
        if (x >= this.map.row || y >= this.map.col || x < 0 || y < 0) continue;

        const record = new Block(x, y);
        if (this.map.isInList(record, "closeList")) continue;
        if (this.map.isInList(record, "stickList")) continue;
        list.push(record);
      }
    }
    return list;
  };

  countH = (block: any) => {
    const x = Math.abs(block.x - this.map.endBlock.x);
    const y = Math.abs(block.y - this.map.endBlock.y);
    return (x + y) * 10;
  };

  countG = (block: any) => {
    if (block.x !== block.parent.x && block.y !== block.parent.y) return 14;
    else return 10;
  };
}

export default Astar;
