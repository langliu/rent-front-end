<template>
<div>
  <el-table :data="users" border>
    <el-table-column label="头像" width="70">
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
    <el-table-column label="拉黑用户" fixed="right">
      <template slot-scope="scope">
      <el-button size="mini" type="danger" v-if="scope.row.status===0" @click="userDisable(scope.row.id)">拉黑
      </el-button>
      <el-button size="mini" v-else @click="userEnable(scope.row.id)">解除拉黑
      </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[20, 50, 100]"
        :page-size="20"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalElements">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  name: 'User-Management',
  data () {
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
        'newPass': null
      }],
      params: {
        pageSize: 20,
        pageNumber: 1
      },
      totalElements: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getUserInfo()
    })
  },
  methods: {
    getUserInfo () {
      this.axios
        .get('/user/getByPage', {
          params: this.params
        })
        .then(response => {
          if (response.data.success) {
            this.users = response.data.result['content']
            this.totalElements = response.data.result['totalElements']
          }
        })
    },
    /**
     * 拉黑用户
     * @param {string} userId 用户id
     */
    userDisable (userId) {
      this.axios
        .post('/user/admin/disable', {
          userId: userId,
          token: sessionStorage.getItem('token')
        })
        .then(response => {
          if (response.data.success) {
            this.getUserInfo()
          } else {
            this.$message.error(response.data.message)
          }
        })
        .catch(error => this.$message.error(error))
    },
    /**
     * 拉黑用户
     * @param {string} userId 用户id
     */
    userEnable (userId) {
      this.axios
        .post('/user/admin/enable', {
          userId: userId,
          token: sessionStorage.getItem('token')
        })
        .then(response => {
          if (response.data.success) {
            this.getUserInfo()
          } else {
            this.$message.error(response.data.message)
          }
        })
        .catch(error => this.$message.error(error))
    },
    /**
     * 修改分页大小
     * @param {number} val 分页大小
     */
    handleSizeChange (val) {
      this.params.pageSize = val
      this.getUserInfo()
    },
    /**
     * 分页跳转
     * @param {number} val 要跳转的页面
     */
    handleCurrentChange (val) {
      this.params.pageNumber = val
      this.getUserInfo()
    }
  },
  filters: {
    sex (value) {
      if (!value) {
        return '保密'
      } else if (value === 1) {
        return '男性'
      } else {
        return '女性'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  height: 50px;
  width: 50px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-bottom: 5vh;
  margin-top: 5vh;
}
</style>
