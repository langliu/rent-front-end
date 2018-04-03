<template>
  <el-table :data="users" border height="88vh">
    <el-table-column label="头像">
      <template slot-scope="scope">
        <img :src="scope.row.avatar" class="avatar">
      </template>
    </el-table-column>
    <el-table-column prop="id" label="ID" width="100">
    </el-table-column>
    <el-table-column prop="username" label="用户名" width="120">
    </el-table-column>
    <el-table-column prop="email" label="Email">
    </el-table-column>
    <el-table-column prop="telPhone" label="电话">
    </el-table-column>
    <el-table-column label="性别">
      <template slot-scope="scope">{{scope.row.sex | sex}}</template>
    </el-table-column>
    <el-table-column label="注册时间">
      <template slot-scope="scope">{{scope.row.createTime }}</template>
    </el-table-column>
    <el-table-column label="升级时间">
      <template slot-scope="scope">{{scope.row.updateTime}}</template>
    </el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'User-Management',
    data() {
      return {
        users: [{
          'id': 3,
          'createBy': null,
          'createTime': '2018-03-21 23:22:47',
          'updateBy': null,
          'updateTime': '2018-03-21 23:22:47',
          'username': 'admin',
          'password': '0192023a7bbd73250516f069df18b500',
          'nickName': null,
          'telPhone': null,
          'email': '809721414@qq.com',
          'address': null,
          'sex': null,
          'avatar': 'http://ow2h3ee9w.bkt.clouddn.com/%E4%B8%8B%E8%BD%BD.png',
          'type': 1,
          'status': 0,
          'description': null,
          'token': null,
          'newPass': null,
        }],
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.getUserInfo();
      });
    },
    methods: {
      getUserInfo() {
        this.axios
          .get('/user/getByPage')
          .then(response => {
            if (response.data.success) {
              this.users = response.data.result['content'];
            }
          });
      },
    },
    filters: {
      sex(value) {
        if (!value) {
          return '保密';
        } else if (value === 1) {
          return '男性';
        } else {
          return '女性';
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .avatar {
    height: 50px;
    width: 50px;
  }
</style>