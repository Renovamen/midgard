const state = {
  list: [],
  map: null
};

const mutations = {
  __set(state: any, msg: { key: string; val: any }): void {
    state[msg.key] = msg.val;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
