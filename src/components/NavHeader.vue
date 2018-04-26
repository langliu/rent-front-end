<template>
<el-menu
    default-active="1"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
  <el-menu-item index="1" @click="goToPage('/index/index')">首页</el-menu-item>
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
  <el-menu-item index="3" @click="goToPage('/index/postRentalInformation')">租赁发布</el-menu-item>
  <el-submenu index="4" class="login" v-if="username">
    <template slot="title">
    <img :src="avatar" class="avatar">
    <span>{{username}}</span>
    </template>
    <el-menu-item index="4-1" @click="goToPage('/index/user/info')">个人中心</el-menu-item>
    <!--<el-menu-item index="4-1" @click="goToPage('/user/changePassword')">修改密码</el-menu-item>-->
    <el-menu-item index="4-2" @click="logout">退出登录</el-menu-item>
  </el-submenu>
  <el-menu-item index="4" class="login" @click="goToPage('/login')" v-else>
    <span>登录</span>
  </el-menu-item>
</el-menu>
</template>

<script>
export default {
  name: 'navHeader',
  data () {
    return {
      username: sessionStorage.getItem('username'),
      avatar: sessionStorage.getItem('avatar')
    }
  },
  methods: {
    /**
     * 页面跳转
     * @param {string} path 页面路径
     */
    goToPage (path) {
      this.$router.push(path)
    },
    /**
     * 退出登录
     */
    logout () {
      this.axios
        .get(`/user/logout/${sessionStorage.getItem('token')}`)
        .then(response => {
          if (response.data['success']) {
            sessionStorage.clear()
            this.username = ''
          } else {
            this.$message.error('退出失败')
          }
        })
        .catch(error => this.$message.error(error))
    }
  }
}
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
