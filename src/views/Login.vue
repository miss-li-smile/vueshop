<template>
  <el-row class="login_bg">
    <el-col :span="8" class="login_box">
      <h3>小U商城管理系统</h3>
      <el-form :model="forminfo" ref="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="forminfo.username" placeholder="请输入账号">
            <template slot="prepend">
              <i style="font-size: 23px" class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="forminfo.password" placeholder="请输入密码" show-password>
            <template slot="prepend">
              <i class="el-icon-lock" style="font-size: 23px"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submit">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
// import {login} from '../request/user'
import { mapActions } from "vuex";
export default {
  data() {
    return {
      forminfo: {
        username: "shenshen",
        password: "qian",
      },
      rules: {
        username: [{ required: true, message: "必填", trigger: "blur" }],
        password: [{ required: true, message: "必填", trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    ...mapActions({
      login: "user/login",
    }),
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.login(this.forminfo);
        }
      });
    },
  },
  components: {},
};
</script>
<style scoped>
.login_bg {
  width: 100vw;
  height: 100vh;
  background: #fdf;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_box {
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);
  padding: 30px 40px;
  border-radius: 5px;
  border: 1px solid #eee;
}
.login_box h3 {
  line-height: 40px;
  text-align: center;
  margin-bottom: 30px;
}
.login-btn {
  display: block;
  width: 100%;
}
</style>