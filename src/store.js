import {createStore} from "vuex"

const store = createStore({
  state() {
    return {
      userName: "adsad"
    }
  },
  getters : {
    getUserName : function (state) {
      return state.userName
    }
  },
  mutations: {
    setUserName(state, name) {
      return state.userName = name
    }
  }
})

export default store;