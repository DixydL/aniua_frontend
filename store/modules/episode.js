const state = {
  episode: {},
  episodes: {}
};

const getters = {
  getEpisodes: state => {
    return state.episodes;
  },
  getEpisode: state => {
    return state.episode;
  }
}

const actions = {
  add: async (context, data) => {
    console.log(data);
    return context.rootGetters.axios()
      .post("anime/" + data.anime_id + "/episode", data.form)
      .then(response => {
        return response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  update: async (context, data) => {
    return await context.rootGetters.axios()
      .put("anime/" + data.anime_id + "/episode/" + data.episode_id, data.form)
      .then(response => {
        return response;
      })
      .catch(error => {
        throw error;
      });
  },

  loadByAnime: async (context, anime_id) => {
    await context.rootGetters.axios()
      .get("anime/" + anime_id + "/episode")
      .then(response => {
        console.log(response);
        context.commit('isLoading', false, { root: true });
        context.commit('load', response.data.data)
      })
      .catch(error => {
        console.log(error);
      });
  },

  loadEpisode: async (context, episodeId) => {
    await context.rootGetters.axios()
      .get("episode/" + episodeId)
      .then(response => {
        console.log(response);
        context.commit('loadEpisode', response.data.data)
      })
      .catch(error => {
        console.log(error);
      });
  },
}

const mutations = {
  load(state, episodes) {
    state.episodes = episodes
  },
  loadEpisode(state, episode) {
    state.episode = episode
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
