const state = {
  animes: {},
  relativeAnimes: {},
  anime: {},
};

const getters = {
  getRelativeAnimes: state => {
    return state.relativeAnimes;
  },
  getAnimes: state => {
    return state.animes;
  },
  getAnime: state => {
    return state.anime;
  }
}

const actions = {
  add: async (context, data) => {
    return context.rootGetters.axios()
      .post("anime", data)
      .then(response => {
        return response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  update: async (context, data) => {
    return context.rootGetters.axios()
      .put("anime/" + data.anime_id, data.form)
      .then(response => {
        return response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  load: async (context, data) => {
    //console.log();
    await context.rootGetters.axios()
      .get("anime", { params: data })
      .then(response => {
        console.log(response);
        context.commit('isLoading', false, { root: true });
        context.commit('load', response.data.data)
      })
      .catch(error => {
        console.log(error);
      });
  },

  loadRelative: async (context, data) => {
    await context.rootGetters.axios()
      .get("anime/relative")
      .then(response => {
        context.commit('isLoading', false, { root: true });
        context.commit('loadRelative', response.data.data)
      })
      .catch(error => {
        console.log(error);
      });
  },

  loadAnime: async (context, animeId) => {
    console.log(animeId);
    await context.rootGetters.axios()
      .get("anime/" + animeId)
      .then(response => {
        console.log(response);
        context.commit('isLoading', false, { root: true });
        context.commit('loadAnime', response.data.data)
      })
      .catch(error => {
        console.log(error);
      });
  },
}

const mutations = {
  load(state, animes) {
    state.animes = animes
  },
  loadRelative(state, relativeAnimes) {
    state.relativeAnimes = relativeAnimes
  },
  loadAnime(state, anime) {
    state.anime = anime
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
