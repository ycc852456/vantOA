import Vuex from 'vuex';
import Vue from 'vue';
import * as types from './types';

Vue.use(Vuex);

/**
 * 全局同一状态管理；
 * 在state中定义了一个数据之后，你可以在所在的项目中任何一个组件中获取，修改，并且
 * 你的修改可以得到全局的响应变更，从而对登陆得到的token进行存储和销毁
 */

export default new Vuex.Store({
  state:{
    user:{},
    token:null,
    title:''
  },
  mutations:{
    [types.LOGIN]: (state, data) => {
      localStorage.token = data;
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    }
  }
})
