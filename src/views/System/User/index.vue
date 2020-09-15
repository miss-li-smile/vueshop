<template>
  <div>
    <el-button type="primary" @click="add">添加管理员</el-button>
    <!-- 列表组件 -->
    <v-list @edit="edit"></v-list>
    <!--  添加|修改组件 -->
    <v-info :info="info" ref="dialog"></v-info>
  </div>
</template>
<script>
import VInfo from "./vinfo";
import VList from "./vlist";
export default {
  data() {
    return {
      info: {
        isAdd: false,
        isShow: false,
      },
    };
  },
  created() {},
  methods: {
    add() {
      this.info.isAdd = this.info.isShow = true;
    },
    edit(val) {
      console.log(val);
      this.info.isAdd = false;
      this.info.isShow = true;
      console.log(val);
      // 调用弹框组件的setinfo方法
      this.$refs.dialog.setinfo(val);
    },
  },
  components: {
    VList,
    VInfo,
  },
};
</script>
<style scoped>
</style>