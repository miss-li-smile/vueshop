<template>
  <el-container class="page">
    <el-aside :width="!iscollapse?'220px':'64px'" class="page_nav">
      <!-- Aside content -->
      <Left />
    </el-aside>
    <el-container class="page_content">
      <el-header class="page_header">
        <!-- Header content -->
        <Top />
      </el-header>
      <el-main height class="page_main">
        <!-- Main content -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapState } from "vuex";
import Left from "./Left";
import Top from "./Top";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["iscollapse"]),
  },
  created() {},
  methods: {},
  components: {
    Left,
    Top,
  },
};
</script>
<style scoped>
.page {
  width: 100vw;
  height: 100vh;
}
.page_nav {
  height: 100%;
  background: #444;
}
.page_content {
  height: 100%;
  background: #f7f7f7;
}
.page_header {
  /* height: 100%; */
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 100;
}
</style>