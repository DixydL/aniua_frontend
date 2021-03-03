const state = {
  genres: {},
};

const getters = {
  getGenres: state => {
    return state.genres;
  },
}

const actions = {
  load: async (context, data) => {
    await context.rootGetters.axios()
      .get("genre", { params: data })
      .then(response => {
        console.log(response);
        context.commit('isLoading', false, { root: true });
        context.commit('load', response.data.data)
      })
      .catch(error => {
        console.log(error);
      });
  },
}

const mutations = {
  load(state, genres) {
    state.genres = genres
  },
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
