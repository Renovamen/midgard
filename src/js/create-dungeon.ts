const getRandom = (start: number, end: number, per?: number, max?: number) => {
  let num = Number((Math.random() * (end - start) + start).toFixed(0));
  if (per) {
    num = Number((num * per).toFixed(0));
    if (max && num > max) num = max;
  }
  return num;
};

const getRandomPosition = (x: number, y: number) => {
  return {
    x: getRandom(0, x - 1),
    y: getRandom(0, y - 1)
  };
};

class CreateDungeon {
  row: number;
  col: number;
  lines: number;
  inflex: number;

  $BLOCK_STICK: string;
  $BLOCK_ROAD: string;
  $BLOCK_PATH: string;
  $BLOCK_HERO: string;
  $BLOCK_END: string;

  mapData: any;

  constructor(opt: any) {
    this.row = opt.row || 20;
    this.col = opt.col || 20;
    this.lines = opt.lines || 15;
    this.inflex = opt.inflex || 0.5;

    this.$BLOCK_STICK = "2"; // 障碍
    this.$BLOCK_ROAD = "0"; // 可行走
    this.$BLOCK_PATH = "4"; // 路径
    this.$BLOCK_HERO = "1"; // 英雄
    this.$BLOCK_END = "3"; // 寻路终点

    this.mapData = null;

    this.init();
  }

  init = () => {
    const result = [];
    for (let i = 0; i < this.row; i++) {
      const arr = [];
      for (let j = 0; j < this.col; j++) {
        arr.push({
          x: i,
          y: j,
          block_type: this.$BLOCK_STICK
        });
      }
      result.push(arr);
    }
    this.mapData = result;

    let times = 0;
    while (true) {
      const start = getRandomPosition(this.row, this.col);
      const end = getRandomPosition(this.row, this.col);
      if (
        start.x - end.x > this.row * 0.5 &&
        start.y - end.y > this.col * 0.5
      ) {
        this.createLine(start, end, true);
        break;
      }
    }
    for (let i = 0; i < this.lines - 1; ) {
      this.createLine(
        getRandomPosition(this.row, this.col),
        getRandomPosition(this.row, this.col)
      ) && i++;
      if (times++ > 100) break;
    }
    return this.mapData;
  };

  createLine = (start: any, end: any, first = false) => {
    // 计算两点之间的距离
    const disX = Math.abs(start.x - end.x);
    const disY = Math.abs(start.y - end.y);

    // 生成线路：采用从 A - B 的走法，中间随机曲折
    // _x, _y 用于记录当前走到得节点位置，默认为起点
    let _x = start.x;
    let _y = start.y;

    // 剩余的移动量，用于确保能够到达目标地点
    const moveLeft = {
      x: disX,
      y: disY
    };

    // 用于存放需要被点亮的点的位置（最终的路径）
    const lines = [];
    // 循环生成曲折线路，直到走到目标地点
    while (_x !== end.x && _y !== end.y) {
      // ------- 进行 X 轴移动 -------
      const moveX = getRandom(0, disX, this.inflex, moveLeft.x);
      moveLeft.x -= moveX;
      for (let i = 0; i < moveX; i++) {
        if (start.x > end.x) lines.push([_x - i, _y]);
        else lines.push([_x + i, _y]);
      }
      if (start.x > end.x) _x -= moveX;
      else _x += moveX;

      // ------- 进行 Y 轴移动 -------
      // 如果 X 轴已经走到同一线，则这一步 Y 轴需要直接走到终点
      let moveY = 0;
      if (moveLeft.x === 0) moveY = moveLeft.y;
      else moveY = getRandom(0, disY, this.inflex, moveLeft.y);

      moveLeft.y -= moveY;
      for (let j = 0; j < moveY; j++) {
        if (start.y > end.y) lines.push([_x, _y - j]);
        else lines.push([_x, _y + j]);
      }
      if (start.y > end.y) _y -= moveY;
      else _y += moveY;
    }

    // 判断是否是第一条路径
    // 如果非第一条路径，则需要确认此条路径经过了已有的路径，否则此条路径生成无效，将返回 false
    if (!first) {
      let isIn = false;

      lines.forEach((pos) => {
        this.mapData[pos[0]][pos[1]].block_type === this.$BLOCK_ROAD &&
          (isIn = true);
      });

      if (!isIn) return false;
    }

    // 生成路径成功，将其更新至地图数据
    lines.forEach((pos) => {
      this.mapData[pos[0]][pos[1]].block_type = this.$BLOCK_ROAD;
    });

    return true;
  };
}

export default CreateDungeon;
