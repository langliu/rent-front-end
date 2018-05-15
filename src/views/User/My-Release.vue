<template>
<section>
  <article v-for="house in houses" v-bind:key="house.id">
    <HouseCard :house-info="house"/>
    <el-button type='text' @click="openMessageBox(house.id)">删除发布</el-button>
  </article>
</section>
</template>

<script>
import HouseCard from '../../components/House-Card'

export default {
  name: 'My-Release',
  components: {HouseCard},
  data () {
    return {
      houses: [{
        'id': 0,
        'createBy': null,
        'createTime': '2018-03-29 19:58:22',
        'updateBy': null,
        'updateTime': '2018-03-29 19:58:22',
        'type': null,
        'houseName': null,
        'houseArea': null,
        'roomNum': null,
        'hallNum': null,
        'toiletNum': null,
        'floor': null,
        'floorTotal': null,
        'province': null,
        'city': null,
        'area': null,
        'address': null,
        'price': 0,
        'title': '',
        'mobile': null,
        'qq': null,
        'contact': null,
        'image1': null,
        'image2': null,
        'image3': null,
        'userId': 0,
        'status': 0,
        'description': null
      }]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getAllPostedRent()
    })
  },
  methods: {
    getAllPostedRent () {
      this.axios
        .get(`/rent/user/getListByPage?token=${sessionStorage.getItem('token')}`)
        .then(response => {
          if (response.data.success) {
            this.houses = response.data.result.content
          }
        })
        .catch(error => this.$message.error(error))
    },
    /**
     * 删除发布内容
     * @param {string} id 内容id
     */
    delRent (id) {
      this.axios
        .delete(`/rent/del?id=${id}&token=${sessionStorage.getItem('token')}`)
        .then(data => {
          if (data.data['success']) {
            this.$message.success(data.data['message'])
            this.getAllPostedRent()
          } else {
            this.$message.error(data.data['message'])
          }
        })
        .catch(error => this.$message.error(error))
    },
    openMessageBox (id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delRent(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
article {
  align-items: center;
  margin-bottom: 20px;
  margin-top: 10px;
  display: flex;
  .el-button {
    background: #b6334a;
    margin-right: 20px;
    padding: 20px;
    height: 30px;
    line-height: 0;
    color: white;
  }
}
</style>
