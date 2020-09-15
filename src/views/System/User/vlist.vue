<template>
  <div class="table_bg">
    <el-table :data="userlist">
      <el-table-column prop="uid" label="UID" align="center" width="360"></el-table-column>
      <el-table-column prop="username" label="管理员名称" align="center"></el-table-column>
      <el-table-column label="管理员角色" align="center">
        <template slot-scope="scope">
          <el-tag type="success">{{scope.row.rolename}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
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
            @click="del(scope.row.uid)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="set_size"
      @current-change="set_page"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions,mapMutations } from "vuex";
import { delUser } from "@/request/user";

export default {
  data() {
    return {};
  },
  // 仓库中的userlist
  computed: {
    ...mapGetters({
      // 组件模块化，得到user模块下的userlist
      // 渲染这个userlist
      userlist: "user/userlist",
      page:"user/page",
      size:"user/size",
      total:"user/total"
    }),
  },
  // 仓库中如果没有就请求数据
  mounted() {
    // 判断userlist.length是否存在，如果不存在就请求
    console.log(this.userlist);
    if (!this.userlist.length) {
      // 调用数据
      this.get_user_list();
    }
  },
  created() {},
  methods: {
    ...mapMutations({
      SET_PAGE:'user/SET_PAGE',
      // SET_SIZE:'user/SET_SIZE',
    }),
    // 组件模块化，得到user模块下的get_user_list
    ...mapActions({
      get_user_list: "user/get_user_list",
      set_page: "user/set_page",
      set_size: "user/set_size",
    }),
    edit(val) {
      // 触发当前自定义事件，传入val，并且拷贝一份，防止关联
      console.log("333");
      this.$emit("edit", { ...val });
      console.log(val);
    },
    async del(uid) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          console.log("1111");
          let res = await delUser(uid);
          if (res.code == 200) {
            this.$message.success(res.msg);
            // 如果本页只有一条数据，且不是第一页
            if(this.userlist.length==1&&this.page!=1){
              this.SET_PAGE(this.page-1)
            }
            // 重新获取列表  更新数据
            this.get_user_list();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    },
  },
  components: {},
};
</script>
<style scoped>
</style>