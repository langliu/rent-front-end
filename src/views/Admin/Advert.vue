<template>
<el-table border :data="advert">
  <el-table-column label="照片" width="100">
    <template slot-scope="scope">
    <img :src="scope.row.picUrl" class="avatar">
    </template>
  </el-table-column>
  <el-table-column label="ID" prop="id"></el-table-column>
  <el-table-column label="标题" prop="title"></el-table-column>
  <el-table-column label="类型">
    <template slot-scope="scope">
    {{scope.row.type===0?'站内链接':'站外链接'}}
    </template>
  </el-table-column>
  <el-table-column label="关联id" prop="relateId"></el-table-column>
  <el-table-column label="跳转链接" prop="redirectUrl"></el-table-column>
  <el-table-column label="创建时间" prop="createTime" width="160px"></el-table-column>
  <el-table-column label="下架" width="100" fixed="right">
    <template slot-scope="scope">
    <el-button type="danger" size="mini" @click="dropOff(scope.row.id)">下架
    </el-button>
    </template>
  </el-table-column>
</el-table>
</template>

<script>
export default {
  name: 'Advert',
  data () {
    return {
      advert: [
        {
          id: 0,
          createBy: '',
          createTime: '',
          updateBy: '',
          updateTime: '',
          title: '',
          description: '',
          relateId: 1,
          redirectUrl: '',
          picUrl: '',
          type: 1,
          status: 0
        }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getAdverts()
    })
  },
  methods: {
    getAdverts () {
      this.axios
        .get('/advert/getAll')
        .then(response => {
          if (response.data.success) {
            this.advert = response.data.result
          } else {
            this.$message.error(response.data.message ? response.data.message : '未知错误')
          }
        })
        .catch(error => this.$message.error(error))
    },
    dropOff (id) {
      this.axios
        .delete(`/advert/del?id=${id}`)
        .then(response => {
          if (response.data.success) {
            this.$message.success(response.data.message)
            this.getAdverts()
          } else {
            this.$message.error(response.data.message ? response.data.message : '未知错误')
          }
        })
        .catch(error => this.$message.error(error))
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  height: 50px;
  width: 80px;
}
</style>
