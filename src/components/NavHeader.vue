<template>
  <el-menu
      default-active="3"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4" class="login"  @click="goToLogin" >
      <img src="../assets/logo.png" class="avatar">
      <span>登录</span>
    </el-menu-item>
    <!--<div class="login">-->
    <!--<img src="../assets/logo.png" class="avatar">-->
    <!--<span @click="goToLogin">登录</span>-->
    <!--</div>-->
  </el-menu>
</template>

<script>
  export default {
    name: 'navHeader',
    methods: {
      handleSelect() {

      },
      goToLogin() {
        this.$router.push('/login');
      },
    },
  };
</script>

<style lang="less" scoped>
  .el-menu {
    padding: 0 10vw;
  }

  .login {
    align-items: center;
    color: white;
    display: flex;
    float: right;
    height: 60px;
    position: absolute;
    right: 10vw;
    .avatar {
      width: 5vh;
      margin-right: 2vw;
    }
  }
</style>