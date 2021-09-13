import { ItemType } from "@/types";

const state = {
  $resumes: [],
  $package: [],
  $hp: 600,
  $maxHp: 600,
  $canMove: true, // 人物在地图上遇到事件时，在关闭对话框前不能移动
  UPDATE: 1
};

const mutations = {
  __set(state: any, msg: { key: string; val: any }): void {
    state[msg.key] = msg.val;
  },
  setItem(state: any, msg: { type: string; index: number; value: any }): void {
    state[msg.type][msg.index] = msg.value;
  },
  sortPackage(state: any, type: string): boolean {
    const list = state[type];
    if (!list || !list.length) return false;
    list.sort(
      (a: ItemType, b: ItemType) => (a.id || Infinity) - (b.id || Infinity)
    );
    return true;
  },
  UPDATE(state: any): void {
    state.UPDATE = Math.random() + Date.now();
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
