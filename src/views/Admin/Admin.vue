<template>
  <el-container>
    <el-header height="10vh">后台管理系统</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>用户管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="goToPage('/admin/users')">用户管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>租赁管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="goToPage('/admin/lease')">
                租赁管理
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'Admin',
    mounted() {
      this.$nextTick(() => {
        this.$router.push('/admin/users');
      });
    },
    methods:{
      goToPage(url){
        this.$router.push(url)
      }
    }
  };
</script>

<style scoped>
  .el-main {
    padding-bottom: 0;
    padding-top: 0;
  }
</style>