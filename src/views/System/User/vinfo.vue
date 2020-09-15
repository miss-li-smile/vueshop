<template>
  <el-dialog
    :title="info.isAdd?'添加管理员':'修改管理员'"
    :visible.sync="info.isShow"
    width="40%"
    @close="cancel"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="150px">
      <el-form-item label="管理员角色" prop="roleid">
        <el-select v-model="forminfo.roleid" placeholder="请选择角色">
          <el-option
            v-for="item in rolelist"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="管理员名称" prop="username">
        <el-input v-model="forminfo.username" placeholder="请输入管理员名称"></el-input>
      </el-form-item>

      <el-form-item label="管理员密码 " prop="password">
        <el-input v-model="forminfo.password" :placeholder="info.isAdd?'请输入管理员密码':'密码留空表示不修改'"></el-input>
      </el-form-item>

      <el-form-item label="管理员状态">
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
import { addUser, editUser } from "@/request/user";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
  roleid: "",
  username: "",
  password: "",
  status: 1,
};
let resetItem = { ...defaultItem };
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
        roleid: [{ required: true, message: "必填", trigger: "blur" }],
        username: [{ required: true, message: "必填", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      // 组件模块化，得到role模块下的rolelist
      rolelist: "role/rolelist",
    }),
  },
  created() {
    console.log(this);
  },
  // 挂载成功时
  mounted() {
    // 判断rolelist.length是否存在，如果不存在就请求
    console.log(this.rolelist);
    if (!this.rolelist.length) {
      // 调用数据
      this.get_role_list();
    }
  },
  methods: {
    // 组件模块化，得到role模块下的get_role_list,得到user模块下的get_user_list
    ...mapActions({
      get_role_list: "role/get_role_list",
      get_user_list: "user/get_user_list",
    }),
    setinfo(val) {
      // 密码为空表示不修改
      val.password = "";
      // 将数据赋给默认defaultItem
      defaultItem = { ...val };
      // 将数据赋给表单
      this.forminfo = { ...val };
    },
    async submit() {
      if (this.isAdd && !this.forminfo.password) {
        this.$message.warning("请输入密码");
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
            res = await addUser(this.forminfo);
          } else {
            res = await editUser(this.forminfo);
          }
          if (res.code == 200) {
            // this为当前组件对象
            this.$message.success(res.msg);
            // 关闭弹窗
            this.info.isShow = false;
            // 更新仓库,再次获取列表
            this.get_user_list();
            // 重置
            // 无论修改成功还是添加成功，都应该让表单为空
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
      return;
    },
    reset() {
      this.forminfo = { ...defaultItem };
      // 添加时的重置
      if (this.info.isAdd) {
        this.forminfo = { ...resetItem };
      } else {
        // 修改时的重置
        this.setinfo(...defaultItem);
      }
    },
    cancel() {
      // 无论修改成功还是添加成功,或弹窗关闭时，都应该让表单为空
      this.forminfo = { ...resetItem };
    },
  },
  components: {},
};
</script>
<style scoped>
</style>