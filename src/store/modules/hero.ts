const state = {
  $resumes: [],
  $package: [],
  $hp: 600,
  $maxHp: 600,
  $canMove: true // 人物在地图上遇到事件时，在关闭对话框前不能移动
};

const mutations = {
  __set(state: any, msg: { key: string; val: any }) {
    state[msg.key] = msg.val;
  },
  setItem(state: any, msg: { type: string; index: number; value: any }) {
    state[msg.type][msg.index] = msg.value;
  },
  sortPackage(state: any, type: string) {
    const list = state[type];

    if (!list || !list.length) return false;

    list.sort((a: any, b: any) => (a.id || Infinity) - (b.id || Infinity));

    return true;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
