<template>
  <el-row>
    <el-col :span="20" :offset="2" class="search-condition">
      <el-row class="choose">
        <el-col :span="2" class="title">区域：</el-col>
        <el-col :span="22" class="items">
          <span>不限</span>
          <span>高新区</span>
          <span>武侯区</span>
        </el-col>
      </el-row>
      <el-row class="choose">
        <el-col :span="2" class="title">租金：</el-col>
        <el-col :span="22" class="items">
          <span @click="setPrice(null,null)">不限</span>
          <span @click="setPrice(null,500)">500元以下</span>
          <span @click="setPrice(500,1000)">500-1000元</span>
          <span @click="setPrice(1000,2000)">1000-2000元</span>
          <span @click="setPrice(2000,3000)">2000-3000元</span>
          <span @click="setPrice(3000,5000)">3000-5000元</span>
          <span @click="setPrice(5000,8000)">5000-8000元</span>
          <span @click="setPrice(8000,null)">8000元以上</span>
        </el-col>
      </el-row>
      <!--<el-row class="choose">-->
      <!--<el-col :span="2" class="title">面积：</el-col>-->
      <!--<el-col :span="22" class="items">-->
      <!--<span>不限</span>-->
      <!--<span>50平以下</span>-->
      <!--<span>50-70平</span>-->
      <!--<span>70-90平</span>-->
      <!--<span>90-110平</span>-->
      <!--<span>110-130平</span>-->
      <!--<span>130-150平</span>-->
      <!--<span>150-200平</span>-->
      <!--<span>200平以上</span>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <el-row class="choose">
        <el-col :span="2" class="title">房型：</el-col>
        <el-col :span="22" class="items">
          <span @click="setRoomNumber(null)">不限</span>
          <span @click="setRoomNumber(1)">一室</span>
          <span @click="setRoomNumber(2)">两室</span>
          <span @click="setRoomNumber(3)">三室</span>
          <span @click="setRoomNumber(4)">四室</span>
        </el-col>
      </el-row>
      <el-row class="choose">
        <el-col :span="2" class="title">方式：</el-col>
        <el-col :span="22" class="items">
          <span @click="setType()">不限</span>
          <span @click="setType(0)">整租</span>
          <span @click="setType(1)">合租</span>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8" v-for="item in house" :key="item.id" :offset="2">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="item.image1" class="image">
        <div style="padding: 14px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix">
            <time class="time">{{ item.title }}</time>
            <el-button type="text" class="button" @click="goToDetail(item.id)">操作按钮</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        house: [{
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
          'description': null,
        }],
        params: {
          pageNumber: 1, // 页号
          pageSize: 20,
          type: null, // 出租类型
          roomNum: null, // 室数量
          province: null, // 省
          city: null, // 市
          area: null, // 区县
          priceGt: null, // 搜索起始价格
          priceLe: null, // 搜索终止价格
        },
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.getData();
      });
    },
    watch: {
      params() {
        this.getData();
      },
    },
    methods: {
      /**
       * 获取页面数据
       */
      getData() {
        this.axios
          .get('/rent/search', {params: this.params})
          .then(response => {
            if (response.data['success']) {
              this.house = response.data['result']['content'];
            } else {
              this.$message.error(response.data['message']);
            }
          })
          .catch(error => this.$message.error(error));
      },
      /**
       * 设置搜索价格
       * @param {*} startPrice 搜索起始价格
       * @param {*} endPrice 搜索终止价格
       */
      setPrice(startPrice = null, endPrice = null) {
        this.params.priceGt = startPrice;
        this.params.priceLe = endPrice;
        this.getData();
      },
      /**
       * 设置搜索房屋室数量
       * @param {*} number 室数量
       */
      setRoomNumber(number = null) {
        this.params.roomNum = number;
        this.getData();
      },
      /**
       * 设置搜索出租类型
       * @param {*} type 出租类型
       */
      setType(type = null) {
        this.params.type = type;
        this.getData();
      },
      goToDetail(id) {
        this.$router.push(`/index/detail/${id}`);
      },
    },
  };
</script>

<style lang="less" scoped>
  .search-condition {
    background-color: white;
    box-shadow: 0 0 8px 2px #e3e1e1;
    margin-bottom: 2vh;
    margin-top: 2vh;
  }

  .time {
    font-size: 13px;
    color: #999999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .choose {
    height: 30px;
  }

  .title {
    font-size: 1vw;
    font-weight: 700;
    line-height: 30px;
    padding-left: 2vw;
  }

  .items {
    span {
      &:hover {
        color: #39ac6a;
        text-decoration: underline;
      }
      display: inline-block;
      font-size: 1vw;
      line-height: 30px;
      margin-right: 1vw;
    }
  }
</style>