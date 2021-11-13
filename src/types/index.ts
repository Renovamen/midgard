import CreateDungeon from "@/js/create-dungeon";

export type EquipType = {
  $changeHp: number;
};

export type ItemType = {
  id: number;
  name: string;
  label: Array<string>;
  dsc: Array<string>;
  num?: number;
  pile?: boolean;
  equipType?: number;
  equip?: EquipType;
  img?: Array<string>;
  link?: {
    text: string;
    url: string;
  };
};

export type OperationType = [number, number];

export type EventType = {
  id: number;
  type: string;
  data: Array<EventDataType | string>;
};

export type EventDataType = {
  msg: string;
  buttons?: Array<string>;
  get?: Array<OperationType>;
  need?: Array<OperationType>;
};

export type ChestType = {
  id: number;
  $type: string;
  data: Array<ChestDataType | string>;
};

export type ChestDataType = {
  msg: string;
  buttons?: Array<string>;
  get?: Array<OperationType>;
};

export type MapPositionType = {
  x: number;
  y: number;
};

export type BlockType = MapPositionType & {
  blockType: string;
};

export type MapType = {
  name: string;
  id: number;
  mapInitOption: {
    row: number;
    col: number;
    lines: number;
    inflex: number;
  };
  chestList: Array<number>;
  eventList: Array<number>;
  rule: any;
  mapData?: CreateDungeon;
};
