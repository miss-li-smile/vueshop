// 导入封装好的axios
import $axios from '@/common/http';

// 获取角色列表
export async function getRole() {
    let res = await $axios.get('/rolelist?istree=1');
    if (res.code == 200 && res.list) {
        return res.list;
    } else {
        return [];
    }
}
// 添加角色
// @param {*} data 添加的数据
export function addRole(data) {
    return $axios.post('/roleadd', data)
}
// 修改角色
// @param {*} data 修改的数据

export function editRole(data) {
    return $axios.post('/roleedit', data)
}
// 删除角色
// @param {*} id 删除的id

export function delRole(id) {
    // id 为传入的数据{id：id}
    return $axios.post('/roledelete', {id});
}