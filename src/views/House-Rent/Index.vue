<template>
  <el-row>
    <el-col :span="20" :offset="2">
      <el-row class="carousel">
        <Carousel></Carousel>
      </el-row>
    </el-col>
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
          <span @click="setPrice(null,null)"
                :class="{active: params.priceGt===null && params.priceLe===null}">不限</span>
          <span @click="setPrice(null,500)"
                :class="{active: params.priceGt===null && params.priceLe===500}">500元以下</span>
          <span @click="setPrice(500,1000)"
                :class="{active: params.priceGt===500 && params.priceLe===1000}">500-1000元</span>
          <span @click="setPrice(1000,2000)"
                :class="{active: params.priceGt===1000&& params.priceLe===2000}">1000-2000元</span>
          <span @click="setPrice(2000,3000)"
                :class="{active: params.priceGt===2000&& params.priceLe===3000}">2000-3000元</span>
          <span @click="setPrice(3000,5000)"
                :class="{active: params.priceGt===3000&& params.priceLe===5000}">3000-5000元</span>
          <span @click="setPrice(5000,8000)"
                :class="{active: params.priceGt===5000&& params.priceLe===8000}">5000-8000元</span>
          <span @click="setPrice(8000,null)"
                :class="{active: params.priceGt===8000&& params.priceLe===null}">8000元以上</span>
        </el-col>
      </el-row>
      <el-row class="choose">
        <el-col :span="2" class="title">房型：</el-col>
        <el-col :span="22" class="items">
          <span @click="setRoomNumber(null)" :class="{active:params.roomNum===null}">不限</span>
          <span @click="setRoomNumber(1)" :class="{active:params.roomNum===1}">一室</span>
          <span @click="setRoomNumber(2)" :class="{active:params.roomNum===2}">两室</span>
          <span @click="setRoomNumber(3)" :class="{active:params.roomNum===3}">三室</span>
          <span @click="setRoomNumber(4)" :class="{active:params.roomNum===4}">四室</span>
        </el-col>
      </el-row>
      <el-row class="choose">
        <el-col :span="2" class="title">方式：</el-col>
        <el-col :span="22" class="items">
          <span @click="setType()" :class="{active:params.type===null}">不限</span>
          <span @click="setType(0)" :class="{active:params.type===0}">整租</span>
          <span @click="setType(1)" :class="{active:params.type===1}">合租</span>
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
  import Carousel from '../../components/Carousel';

  export default {
    name: 'Index',
    components: {Carousel},
    component: Carousel,
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
        items: [
          '../../assets/images/optimizilla/alexandra-gorn-485551-unsplash-min.jpg',
          '../../assets/images/optimizilla/jonny-caspari-483355-unsplash-min.jpg',
          'src/assets/images/optimizilla/naomi-hebert-188443-unsplash-min.jpg',
        ],
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
      cursor: pointer;
      display: inline-block;
      font-size: 1vw;
      line-height: 30px;
      margin-right: 1vw;
    }
  }

  .active {
    color: #39ac6a;
    font-weight: bold;
  }

  .carousel {
    margin: 5vh 0;
  }
</style>