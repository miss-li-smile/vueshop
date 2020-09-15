<template>
  <el-dialog
    :title="info.isAdd?'添加角色':'修改角色'"
    :visible.sync="info.isShow"
    width="40%"
    @close="cancel"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="150px">
      <el-form-item label="角色名称 " prop="rolename">
        <el-input v-model="forminfo.rolename" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" prop="url">
        <el-tree
          node-key="id"
          ref="tree"
          :data="menulist"
          show-checkbox
          :props="{children:'children',label:'title'}"
          :check-strictly="checkStrictly"
        ></el-tree>
      </el-form-item>
      <el-form-item label="角色状态">
        <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addRole, editRole } from "@/request/role";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
  rolename: "",
  menus: "",
  status: 1,
};
let resetItem = { ...defaultItem };
// let resetItem = {...defaultItem}
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: false,
        };
      },
    },
  },
  data() {
    return {
      forminfo: { ...defaultItem },
      // 验证规则对象
      rules: {
        rolename: [{ required: true, message: "必填", trigger: "blur" }],
      },
      // false表示父子关联，true表示父子不关联
      checkStrictly: false,
    };
  },
  computed: {
    ...mapGetters({
      // 组件模块化，得到menu模块下的menulist
      menulist: "menu/menulist",
    }),
  },
  created() {
    console.log(this);
  },
  // 挂载成功时
  mounted() {
    // 判断menulist.length是否存在，如果不存在就请求
    console.log(this.menulist);
    if (!this.menulist.length) {
      // 调用数据
      this.get_menu_list();
    }
  },
  methods: {
    // 组件模块化，得到menu模块下的get_menu_list
    // get_role_list
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
      get_role_list: "role/get_role_list",
    }),
    setinfo(val) {
      // 将权限节点回显到树中去
      // 拿出节点
      let idarr = val.menus.split(",");
      // 如果第一个值存在就回显
      if (idarr[0]) {
        // 父子互不关联
        this.checkStrictly = true;
        console.log(this.$refs.tree);
        // 等到节点渲染完成再做某个事情
        // this.$nextTick(() => {
        // 等到节点渲染完成再做的事情
        // }
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(idarr);
          // 父子互相关联
          this.checkStrictly = false;
        });
      }
      // 将数据赋给默认defaultItem
      defaultItem = { ...val };
      // 将数据赋给表单
      this.forminfo = { ...val };
    },
    async submit() {
      // 获取树形控件选中的节点
      console.log(this.$refs.tree.getCheckedKeys());
      let idarr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      console.log(idarr);
      if (idarr.length) {
        this.forminfo.menus = idarr;
      } else {
        this.$message.warnimg("请选择权限");
        return;
      }
      // 表单验证
      // 表单中有一个validate(传一个函数，有形参valid)方法
      // valid是一个布尔值
      // 判断验证是否通过
      this.$refs.form.validate(async (valid) => {
        // promise
        if (valid) {
          // 验证成功发送请求
          let res;
          if (this.info.isAdd) {
            res = await addRole(this.forminfo);
          } else {
            res = await editRole(this.forminfo);
          }
          if (res.code == 200) {
            // this为当前组件对象
            this.$message.success(res.msg);
            // 关闭弹窗
            this.info.isShow = false;
            // 重新获取角色列表
            this.get_role_list();
            // 更新仓库,再次获取列表
            // this.get_role_list();
            // 重置
            // 无论修改成功还是添加成功，都应该让表单为空
            // this.reset();
            // this.forminfo = { ...resetItem };
            // 让树没被选中
            // this.$refs.tree.setCheckedKeys([]);
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
      // return;

      // this.info.isShow = false;
    },
    reset() {
      // this.$refs.form.resetFields();
      // this.forminfo = { ...defaultItem };
      // 添加时的重置
      if (this.info.isAdd) {
        this.forminfo = { ...resetItem };
        // 让树没被选中;
        this.$refs.tree.setCheckedKeys([]);
      } else {
        // 修改时的重置
        this.setinfo({...defaultItem});
      }
    },
    cancel() {
      this.$refs.tree.setCheckedKeys([]);
      this.forminfo = { ...resetItem };
    },
  },
  components: {},
};
</script>
<style scoped>
</style>