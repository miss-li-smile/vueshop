<template>
  <el-dialog
    :title="info.isAdd?'添加菜单':'修改菜单'"
    :visible.sync="info.isShow"
    width="40%"
    @close="cancel"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="150px">
      <el-form-item label="菜单类型">
        <el-radio-group v-model="forminfo.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
        <!-- <el-input v-model="forminfo.type"></el-input> -->
      </el-form-item>
      <el-form-item v-if="forminfo.type==2" label="上级目录">
        <el-select v-model="forminfo.pid" placeholder="请选择">
          <el-option label="顶级目录" :value="0"></el-option>
          <el-option
            v-for="item in menulist"
            v-if="item.type==1"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="forminfo.type==1?'目录名称':'菜单名称'" prop="title">
        <el-input v-model="forminfo.title" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="图标 " prop="icon">
        <el-input v-model="forminfo.icon" placeholder="请输入图标class"></el-input>
      </el-form-item>
      <el-form-item v-if="forminfo.type==2" label="菜单地址" prop="url">
        <el-input v-model="forminfo.url" placeholder="请输入菜单地址"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="forminfo.status" :active-value="1" :inactiv-value="2"></el-switch>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addMenu, editMenu } from "@/request/menu";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
  pid: 0,
  title: "",
  icon: "",
  type: 1,
  url: "",
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
        title: [{ required: true, message: "必填", trigger: "blur" }],
        // icon: [{ required: true, message: "必填", trigger: "blur" }],
        url: [{ required: true, message: "必填", trigger: "blur" }],
      },
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
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
    }),
    setinfo(val) {
      // 将数据赋给默认defaultItem
      defaultItem = { ...val };
      // 将数据赋给表单
      this.forminfo = { ...val };
    },
    async submit() {
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
            res = await addMenu(this.forminfo);
          } else {
            res = await editMenu(this.forminfo);
          }
          if (res.code == 200) {
            // this为当前组件对象
            this.$message.success(res.msg);
            // 关闭弹窗
            this.info.isShow = false;
            // 更新仓库,再次获取列表
            this.get_menu_list();
            // 重置
            // 无论修改成功还是添加成功，都应该让表单为空
            // this.reset();
            // this.forminfo={...resetItem}
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
      return;

      // this.info.isShow = false;
    },
    reset() {
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