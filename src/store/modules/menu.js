// 获取菜单列表
import { getMenu } from '@/request/menu' 

export default {
    namespaced:true,
    state: {
        // 菜单列表
        menulist:[]
    },
    getters: {
        menulist:state=>state.menulist
    },
    mutations: {
        SET_LIST(state,data){
            state.menulist = data;
        }
    },
    actions: {
        async get_menu_list({commit}){
            let res = await getMenu();
            commit('SET_LIST',res)
            console.log(res );
        }
    }
};