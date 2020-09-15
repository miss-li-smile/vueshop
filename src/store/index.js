import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 导入模块
import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'

let store = new Vuex.Store({
    state: {
        iscollapse: false
    },
    getters: {},
    mutations: {
        TOGGLE(state) {
            state.iscollapse = !state.iscollapse
        }
    },
    modules: {
        menu,
        role,
        user,
    }
})

export default store;