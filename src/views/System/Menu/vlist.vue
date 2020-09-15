<template>
  <div class="table_bg">
    <el-table :data="menulist" row-key="id" border stripe :tree-props="{children:'children'}">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="title" label="菜单名称" align="center"></el-table-column>
      <el-table-column prop="url" label="菜单地址" align="center"></el-table-column>
      <el-table-column prop="icon" label="图标" width>
        <!-- 展示图标 -->
        <!-- 插槽 -->
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.type==1">目录</el-tag>
          <el-tag type="warning" v-if="scope.row.type==2">菜单</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            circle
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            circle
            @click="del(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { delMenu } from "@/request/menu";

export default {
  data() {
    return {};
  },
  // 仓库中的menulist
  computed: {
    ...mapGetters({
      // 组件模块化，得到menu模块下的menulist
      // 渲染这个menulist
      menulist: "menu/menulist",
    }),
  },
  // 仓库中如果没有就请求数据
  mounted() {
    // 判断menulist.length是否存在，如果不存在就请求
    console.log(this.menulist);
    if (!this.menulist.length) {
      // 调用数据
      this.get_menu_list();
    }
  },
  created() {},
  methods: {
    // 组件模块化，得到menu模块下的get_menu_list
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
    }),
    edit(val) {
      // 触发当前自定义事件，传入val，并且拷贝一份，防止关联
      console.log("333");
      this.$emit('edit',{...val})
      console.log(val);
    },
    async del(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          console.log("1111");
          let res = await delMenu(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            // 重新获取列表  更新数据
            this.get_menu_list();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
      // let res = await delMenu(id)
      // console.log(res);
    },
  },
  components: {},
};
</script>
<style scoped>
</style>