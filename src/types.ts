// game item

export type GameItem = {
  id: number;
  name: string;
  dsc: Array<string>;
  num?: number;
  pile?: boolean;
  equipType?: number;
  equip?: Equip;
  img?: Array<string>;
  link?: {
    text: string;
    url: string;
  };
  grade?: number;
};

export type Equip = {
  changeHp: number;
};

export type GameItemOperation = {
  itemId: number;
  num: number;
};

// map

export type MapEvent = {
  id: number;
  type: "chest" | "dialog";
  get?: Array<GameItemOperation>;
  need?: Array<GameItemOperation>;
  text: {
    init: string;
    data: string;
    reject: string;
    success: string;
    noEnoughForExchange?: string;
    noEnoughRoom?: string;
  };
};

export type MapPosition = {
  x: number;
  y: number;
};

export type MapBlock = MapPosition & {
  type: string;
  event?: MapEvent;
};

export type MapOptions = {
  row?: number;
  col?: number;
  lines?: number; // 分支量
  inflex?: number; // 曲折度
};

export type DungeonOptions = {
  name: string;
  id: number;
  mapOptions?: MapOptions;
  dialogNum?: number;
  chestNum?: number;
};

// stores

export type HeroItemKey = "resumes" | "package";

export type ItemKey = HeroItemKey | "destory";

export type HeroState = {
  resumes: (GameItem | undefined)[];
  package: (GameItem | undefined)[];
  initHp: number;
  canMove: boolean; // 人物在地图上遇到事件时，在关闭对话框前不能移动
};

export type MapEventStateItem = {
  event: MapEvent;
  callback?: () => void;
};

export type EventState = {
  dialog: MapEventStateItem | false;
  chest: MapEventStateItem | false;
  gameOver: boolean;
  mapUpdate: number;
  heroUpdate: number;
};
