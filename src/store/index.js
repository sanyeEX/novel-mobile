import { createStore } from 'vuex'

export default createStore({
  state: {
    picUrl: "https://images.sanyeex.top/novelPic/",
    plateUrl: "https://images.sanyeex.top/novelPicture/",
    tabBarShow: true,
    searchScroll: 0
  },
  getters: {
  },
  mutations: {
    // 修改搜索滚动条位置
    setSearchScroll(state,value) {
      state.searchScroll = value
    }
  },
  actions: {
  },
  modules: {
  }
})
