<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
.toggle_btn i{
    font-size: 18px;
}
.table_bg{
  background: #fff;
  padding: 20px;
  margin: 15px 0;
}
.el-dialog{
  border-radius: 5px;
}
.el-dialog__header{
  border-bottom: 1px solid #ddd;
  padding: 15px 20px 10px!important;
}
</style>
