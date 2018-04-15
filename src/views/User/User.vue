<template>
  <el-row class="user-center">
    <el-col :span="20" :offset="2">
      <el-container>
        <el-aside width="150px">
          <el-menu background-color="#fff" default-active="1">
            <el-menu-item index="1">
              <i class="el-icon-setting"></i>
              <span slot="title" @click="$router.push('/index/user/info')">个人资料</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-printer"></i>
              <span slot="title">我的发布</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-col>
  </el-row>
</template>

<script>

  export default {
    name: 'User',
    data() {
      return {};
    },
  };
</script>

<style lang="less" scoped>
  .el-container {
    margin-top: 30px;
  }

  .el-aside {
    border: 1px solid #e6e5e5;
    background-color: #ffffff;
    height: 110%;
  }

  .el-main {
    border: 1px solid #e6e5e5;
    background-color: #ffffff;
    margin-left: 20px;
    padding: 0;
  }

  .user-center {
    background: #f5f5f5;
  }
</style>