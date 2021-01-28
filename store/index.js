import Vue from 'vue'
import Vuex from 'vuex'
import anime from './modules/anime';
import file from './modules/file';
import episode from './modules/episode';
import Axios from 'axios';

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    axiosAuth: null,
    isLoading: false,
    errors: {},
  },
  actions: {
    async nuxtServerInit({ commit }, { app, store }) {
      // let token = app.$cookies.get('token')
      // if (token) {
      //   token = await store.dispatch("user/signInByToken", token);
      //   if (token) {
      //     app.$cookies.set('token', token);
      //     return;
      //   } else {
      //     app.$cookies.remove('token')
      //   }
      // }
      // await store.dispatch("user/singOut", {});
    },
  },
  getters: {
    getErrors: state => error => {
      if (state.errors[error]) {
        return state.errors[error][0];
      }
      return "";
    },
    hasEdit: state => user_id => {
      if (state.user.user.user_id === user_id) {
        return 1;
      }
      return 0;
    },
    axios: state => () => {
      // if (state.user.user.token) {
      //   return Axios.create({ headers: { 'Authorization': 'Bearer ' + state.user.user.token, } });
     // } else {
        return Axios.create({baseURL: proccess.env.APP_URL + '/api/'});
      //}
    },
    getAuth: state => () => {
      return state.user.user.auth;
    }
  },
  mutations: {
    singIn(state, token) {
      // mutate state
      state.axiosAuth = Axios.create({ headers: { 'Authorization': 'Bearer ' + token, } });
    },
    isLoading(state, loading) {
      // mutate state
      state.isLoading = loading;
    },
    getErrors(state, errors) {
      state.errors = errors;
    }
  },
  modules: {
    anime,
    file,
    episode
  }
  //
})

export default store
