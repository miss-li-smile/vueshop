<template>
  <div class="table_bg">
    <el-table :data="rolelist">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" align="center"></el-table-column>

      <el-table-column label="状态">
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
            @click="del(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { delRole } from "@/request/role";

export default {
  data() {
    return {};
  },
  // 仓库中的rolelist
  computed: {
    ...mapGetters({
      // rolelist
      // rolelist
      rolelist: "role/rolelist",
    }),
  },
  // 仓库中如果没有就请求数据
  mounted() {
    // rolelist.length是否存在，如果不存在就请求
    console.log(this.rolelist);
    if (!this.rolelist.length) {
      // 调用数据
      this.get_role_list();
    }
  },
  created() {},
  methods: {
    // 组件模块化，得到role模块下的get_role_list
    ...mapActions({
      get_role_list: "role/get_role_list",
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
          let res = await delRole(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            // 重新获取列表  更新数据
            this.get_role_list();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
      // let res = await delRole(id)
      // console.log(res);
    },
  },
  components: {},
};
</script>
<style scoped>
</style>