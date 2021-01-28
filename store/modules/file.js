const state = {
  file: {}
};

const getters = {
  getFile: state => {
    return state.file;
  }
}

const actions = {
  upload: async (context, file) => {

    let formData = new FormData();

    // files

    formData.append("file", file, file.name);

    console.log(file);
    return context.rootGetters.axios()
      .post("file", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        return response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  update: async (context, data) => {
    return await context.rootGetters.axios()
      .post(API_BASE_URL + "/v1/post/" + data.post_id + "/chapter/" + data.chapter_id, data.form)
      .then(response => {
        return response;
      })
      .catch(error => {
        throw error;
      });
  },

  load: async (context, data) => {
    await context.rootGetters.axios()
      .get("anime")
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
  load(state, file) {
    state.file = file
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
