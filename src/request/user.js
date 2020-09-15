// 导入封装好的axios
import $axios from '@/common/http';

// 获取管理员列表
export async function getUser(page,size) {
    let res = await $axios.get('/userlist',{
        params:{
            size,
            page,
        }
    });
    if (res.code == 200 && res.list) {
        console.log(res);
        return res.list;
    } else {
        return [];
    }
}
// 添加管理员
// @param {*} data 添加的数据
export function addUser(data) {
    return $axios.post('/useradd', data)
}
// 修改管理员
// @param {*} data 修改的数据

export function editUser(data) {
    return $axios.post('/useredit', data)
}
// 删除管理员
// @param {*} uid 删除的用户uid

// 没有加async相当于把promise放到在页面中等待
export function delUser(uid) {
    console.log(uid);
    // uid 为传入的数据{uid:uid}
    return $axios.post('/userdelete', {uid});
}
// 获取管理员个数
// 加了async相当于在这里做完了请求的等待
export async function getTotal(){
    let res = await $axios.get('/usercount');
    console.log(res);
    return res.list[0].total;
}

// 管理员登录
export async function Login(data){
    let res = await $axios.post('/userlogin',data);
    console.log(res);
    // return res.list[0].total;
}