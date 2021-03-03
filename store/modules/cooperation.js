const state = {
  cooperation: {}
};

const getters = {
  getCooperation: state => {
    return state.cooperation;
  },
}

const actions = {
  add: async (context, data) => {
    return context.rootGetters.axios()
      .post("cooperation", data)
      .then(response => {
        return response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
}

const mutations = {
  load(state, cooperation) {
    state.cooperation = cooperation
  },
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
