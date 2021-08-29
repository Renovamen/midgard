const state = {
  list: [],
  map: null,
  UPDATE: 1
};

const mutations = {
  __set(state: any, msg: { key: string; val: any }): void {
    state[msg.key] = msg.val;
  },
  UPDATE(state: any) {
    state.UPDATE = Math.random() + Date.now();
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
