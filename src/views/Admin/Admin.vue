<template>
  <el-container>
    <el-header height="10vh">
      <div class="header">
        后台管理系统
      </div>
    </el-header>
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
            <template slot="title"><i class="el-icon-tickets"></i>租赁管理</template>
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
    methods: {
      goToPage(url) {
        this.$router.push(url);
      },
    },
  };
</script>

<style scoped>
  .el-main {
    padding-bottom: 0;
    padding-top: 0;
    margin-top: 12vh;
  }

  .el-header {
    background-color: #4c4c4c;
    left: 0;
    margin-bottom: 2vh;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 10;
  }
  .el-aside{
    margin-top: 12vh;
  }

  .header {
    align-items: center;
    color: white;
    display: flex;
    font-size: 2vw;
    font-weight: 700;
    height: 10vh;
  }
</style>