<template>
  <div class="header">
    <div class="header_lt">
      <el-button v-if="iscollapse" size="small" class="toggle_btn" type="primary" icon="el-icon-s-unfold" @click="TOGGLE"></el-button>
      <el-button v-else size="small" class="toggle_btn" type="primary" icon="el-icon-s-fold" @click="TOGGLE"></el-button>
      <el-breadcrumb separator=">" class="header_mbx">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button icon="el-icon-back" circle size="small" v-if="$route.path!='/index'" @click="$router.back()"></el-button>
    </div>
    <div>
      <el-dropdown>
        <span class="el-dropdown-link">
          大可爱
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><i class="el-icon-full-screen"></i>全屏</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-switch-button"></i>退出登录</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default {
  data() {
    return {};
  },
  computed:{
      ...mapState(['iscollapse'])
  },
  created() {},
  methods: {
      ...mapMutations(['TOGGLE'])
  },
  components: {},
};
</script>
<style scoped>
.header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.header_lt {
  display: flex;
  align-items: center;
}
.header_mbx {
  margin: 0 20px;
}
</style>