import { createStore } from 'vuex'


const store = createStore({
  // 全局变量
  state: {
     formState :{
      username: '',
      password: '',
      value: '',

    }
  },
  // 修改全局变量必须通过mutations中的方法
  // mutations只能采用同步方法
  mutations: {
    login (state, payload) {
      state.formState = payload
      console.log('当前store:'+state.formState)
    },
    logout (state) {
      state.formState = {
        username: '',
        password: '',
        value: '',
      };
      localStorage.removeItem('user')
    }
  },
  // 异步方法用actions
  // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
  actions: {
    login (context, payload) {
      context.commit('login', payload)
    },
    logout (context) {
      context.commit('logout')
    }
  }
})

export default store