<template>
  <div>
    <el-table :data="houses" border @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column label="照片" width="100">
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
      <el-table-column prop="roomNum" label="室数量"></el-table-column>
      <el-table-column prop="hallNum" label="厅数量"></el-table-column>
      <el-table-column prop="toiletNum" label="卫数量"></el-table-column>
      <el-table-column prop="floor" label="所处楼层"></el-table-column>
      <el-table-column prop="floorTotal" label="总楼层"></el-table-column>
      <el-table-column prop="houseArea" label="房屋面积"></el-table-column>
      <el-table-column prop="province" label="省"></el-table-column>
      <el-table-column prop="city" label="市"></el-table-column>
      <el-table-column prop="area" label="区/县"></el-table-column>
      <el-table-column prop="address" label="地区"></el-table-column>
      <el-table-column label="注册时间" width="160">
        <template slot-scope="scope">{{scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="升级时间" width="160">
        <template slot-scope="scope">{{scope.row.updateTime}}</template>
      </el-table-column>
      <el-table-column prop="contact" label="联系人"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="120"></el-table-column>
      <el-table-column prop="qq" label="QQ" width="120"></el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          {{scope.row.status | status}}
        </template>
      </el-table-column>
      <el-table-column label="下架" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" :disabled="scope.row.status!==1" @click="dropOff(scope.row.id)">下架
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="发布审核" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="primary"
                     v-if="scope.row.status===0"
                     @click.native.prevent="rentPass(scope.row.id)"
                     size="mini">
            通过
          </el-button>
          <el-button type="primary" size="mini" :disabled="true" v-else>
            通过
          </el-button>
          <el-button type="danger" size="mini"
                     v-if="scope.row.status===0"
                     @click.native.prevent="dialogVisible = true">
            驳回
          </el-button>
          <el-button type="danger" size="mini" :disabled="true" v-else>
            驳回
          </el-button>
          <el-dialog
              title="驳回理由"
              :visible.sync="dialogVisible"
              center
              :modal="false"
              width="40%">
            <el-input type="textarea" v-model="reason" :rows="4"></el-input>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="rejectPass(scope.row.id, reason)">确 定</el-button>
          </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button :disabled="multipleSelection.length===0" @click="deleteSelect()">删除所选</el-button>
    </div>
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
        dialogVisible: false,
        reason: '',
        multipleSelection: [],
        totalElements: 0,
        params: {
          pageSize: 20,
          pageNumber: 1,
        },
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
          .get('/rent/getByPage', {
            params: this.params,
          })
          .then(response => {
            if (response.data.success) {
              this.houses = response.data.result['content'];
              this.totalElements = response.data.result['totalElements'];
            }
          });
      },
      /**
       * 通过某租赁信息的发布
       * @param {string} id 该租赁信息的id
       */
      rentPass(id) {
        this.axios
          .post('/rent/post', {
            rentId: id,
            token: sessionStorage.getItem('token'),
          })
          .then(response => {
            if (response.data.success) {
              this.getUserInfo();
            } else {
              this.$message.error(response.data.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
      },
      /**
       * 驳回租赁信息的发布
       * @param {string} id 租赁信息的id
       * @param {string} reason 驳回理由
       */
      rejectPass(id, reason) {
        this.axios
          .post('/rent/admin/back', {
            rentId: id,
            token: sessionStorage.getItem('token'),
            reason: reason,
          })
          .then(response => {
            if (response.data.success) {
              this.getUserInfo();
              this.dialogVisible = false;
            } else {
              this.$message.error(response.data.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
      },
      /**
       * 租赁信息下架
       * @param {string} rentId 租赁信息id
       */
      dropOff(rentId) {
        this.axios
          .post('/rent/admin/cancel', {
            rentId: rentId,
            token: sessionStorage.getItem('token'),
          })
          .then(response => {
            if (response.data.success) {
              this.getUserInfo();
            } else {
              this.$message.error(response.data.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteSelect() {
        let ids = [];
        this.multipleSelection.forEach((item) => {
          ids.push(item.id);
        });
        console.log(ids.join(','));
        this.axios
          .delete(`/rent/delByIds?ids=${ids.join(',')}`)
          .then(response => {
            if (response.data.success) {
              this.getUserInfo();
            } else {
              this.$message.error(response.data.message);
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
      },
      /**
       * 修改分页大小
       * @param {number} val 分页大小
       */
      handleSizeChange(val) {
        this.params.pageSize = val;
        this.getUserInfo();
      },
      /**
       * 分页跳转
       * @param {number} val 要跳转的页面
       */
      handleCurrentChange(val) {
        this.params.pageNumber = val;
        this.getUserInfo();
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
      status(value) {
        switch (value) {
          case 0:
            return '待审核';
          case 1:
            return '审核通过';
          case 2:
            return '审核未通过';
          case 3:
            return '已下架';
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

  .pagination {
    display: flex;
    justify-content: center;
    margin-bottom: 5vh;
    margin-top: 5vh;
  }
</style>