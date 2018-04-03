<template>
  <el-table :data="houses" border height="88vh">
    <el-table-column prop="id" label="ID" width="100"></el-table-column>
    <el-table-column label="头像" width="100">
      <template slot-scope="scope">
        <img :src="scope.row.image1" class="avatar">
      </template>
    </el-table-column>
    <el-table-column prop="houseName" label="房屋名称" width="120"></el-table-column>
    <el-table-column prop="title" label="标题"></el-table-column>
    <el-table-column prop="price" label="价格"></el-table-column>
    <el-table-column prop="type" label="出租类型">
      <template slot-scope="scope">{{scope.row.type | type}}</template>
    </el-table-column>
    <el-table-column label="注册时间" width="160">
      <template slot-scope="scope">{{scope.row.createTime }}</template>
    </el-table-column>
    <el-table-column label="升级时间" width="160">
      <template slot-scope="scope">{{scope.row.updateTime}}</template>
    </el-table-column>
    <el-table-column prop="contact" label="联系人"></el-table-column>
    <el-table-column prop="mobile" label="电话"></el-table-column>
    <el-table-column prop="qq" label="QQ"></el-table-column>
    <el-table-column label="发布审核" fixed="right" width="150">
      <template slot-scope="scope">
        <el-button type="primary"
                   @click.native.prevent="rentPass(scope.row.id)"
                   size="mini">
          通过
        </el-button>
        <el-button type="danger" size="mini"
                   @click.native.prevent="deleteRow(scope.$index, tableData4)">
          驳回
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'Lease-Management',
    data() {
      return {
        houses: [{
          'id': 8,
          'createBy': null,
          'createTime': null,
          'updateBy': null,
          'updateTime': '2018-03-29 17:38:25',
          'type': 0,
          'houseName': '西南石油',
          'houseArea': null,
          'roomNum': 1,
          'hallNum': null,
          'toiletNum': null,
          'floor': null,
          'floorTotal': null,
          'province': null,
          'city': null,
          'area': null,
          'address': null,
          'price': 100,
          'title': '单间850家具家电全',
          'mobile': null,
          'qq': null,
          'contact': null,
          'image1': null,
          'image2': null,
          'image3': null,
          'userId': null,
          'status': 1,
          'description': null,
          'backReason': null,
          'dealStatus': null,
          'dealPrice': null,
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
          .get('/rent/getByPage')
          .then(response => {
            if (response.data.success) {
              this.houses = response.data.result['content'];
            }
          });
      },
      rentPass(id) {
        this.axios
          .post('/rent/post', {
            rentId: id,
            token: sessionStorage.getItem('token'),
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            this.$message.error(error);
          });
      },
    },
    filters: {
      type(value) {
        if (!value) {
          return '保密';
        } else if (value === 1) {
          return '合租';
        } else {
          return '整租';
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .avatar {
    height: 50px;
    width: 80px;
  }
</style>