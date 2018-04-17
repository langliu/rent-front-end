<template>
  <el-row class="index">
    <el-col :span="20" :offset="2">
      <el-row class="carousel">
        <Carousel/>
      </el-row>
    </el-col>
    <el-col :span="20" :offset="2" class="search-condition">
      <el-row class="search-header">
        <h3>全部租房</h3>
      </el-row>
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
          <span>
            <input title="priceGt" v-model="params.priceGt"/> -
            <input title="priceGt" v-model="params.priceLe"/> 元
          </span>
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
          <span>
            <input title="roomNum" v-model="params.roomNum"/> 室
          </span>
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
      <el-row class="sort">
        <el-col :span="2" class="title">排序：</el-col>
        <el-col :span="22">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{sortTitle}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="sequence('price','desc','价格从高到低')">价格从高到低</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="sequence('price','asc','价格从低到高')">价格从低到高</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="20" :offset="2" class="key-search">
      <el-row>
        <el-col :span="12">
          <el-input
              v-model="params.key"
              clearable
              prefix-icon="el-icon-search"
              placeholder="请输入关键字开始找房"
              @clear="getData"
              @keyup.enter.native="getData"/>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" @click="getData">搜索</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="20" :offset="2" class="house-list">
      <div class="house" v-for="item in house" :key="item.id">
        <HouseCard :house-info="item"/>
      </div>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.pageNumber"
            :page-sizes="[20, 50, 100]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
        </el-pagination>
      </div>
    </el-col>
  </el-row>

</template>

<script>
  import Carousel from '../../components/Carousel'
  import HouseCard from '../../components/House-Card'

  export default {
    name: 'Index',
    components: {
      Carousel,
      HouseCard,
    },
    data () {
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
          key: null, // 搜索关键字
          sort: 'price', // 排序字段
          order: 'asc', // 排序方式 asc/desc
        },
        pagination: {
          total: 0,
        },
        sortTitle: '价格从低到高',
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getData()
      })
    },
    methods: {
      /**
       * 获取页面数据
       */
      getData () {
        this.axios
          .get('/rent/search', {params: this.params})
          .then(response => {
            if (response.data['success']) {
              this.house = response.data['result']['content']
              this.pagination.total = response.data['result']['totalElements']
            } else {
              this.$message.error(response.data['message'])
            }
          })
          .catch(error => this.$message.error(error))
      },
      /**
       * 设置搜索价格
       * @param {*} startPrice 搜索起始价格
       * @param {*} endPrice 搜索终止价格
       */
      setPrice (startPrice = null, endPrice = null) {
        this.params.priceGt = startPrice
        this.params.priceLe = endPrice
        this.getData()
      },
      /**
       * 设置搜索房屋室数量
       * @param {*} number 室数量
       */
      setRoomNumber (number = null) {
        this.params.roomNum = number
        this.getData()
      },
      /**
       * 设置搜索出租类型
       * @param {*} type 出租类型
       */
      setType (type = null) {
        this.params.type = type
        this.getData()
      },
      goToDetail (id) {
        this.$router.push(`/index/detail/${id}`)
      },
      handleSizeChange (value) {
        this.params.pageSize = value
        this.getData()
      },
      handleCurrentChange (value) {
        this.params.pageNumber = value
        this.getData()
      },
      /**
       * 搜索排序
       * @param {string} key 排序字段
       * @param {string} method 排序方式（‘asc’, 'desc'）
       * @param {string} title 标题
       */
      sequence (key, method, title) {
        this.params.sort = key
        this.params.order = method
        this.getData()
        this.sortTitle = title
      },
    },
  }
</script>

<style lang="less" scoped>
  .index {
    background-color: #f1f1f1;
  }

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

  .search-header {
    border-bottom: 2px solid #39ac6a;
    color: white;
    h3 {
      display: inline-block;
      background: #39ac6a;
      margin: 0;
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
    }
  }

  .choose {
    height: 40px;
    &:first-child {
      margin-top: 15px;
    }
    &:last-child {
      margin-bottom: 15px;
    }
  }

  .title {
    font-size: 1vw;
    font-weight: 700;
    line-height: 40px;
    padding-left: 2vw;
  }

  .items {
    span {
      &:hover {
        color: #39ac6a;
        text-decoration: underline;
      }
      input {
        width: 40px;
      }
      cursor: pointer;
      display: inline-block;
      font-size: 1vw;
      line-height: 40px;
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

  .house-list {
    background-color: #ffffff;
    box-shadow: 0 0 8px 2px #e3e1e1;
    margin-bottom: 30vh;
  }

  .house {
    height: 30vh;
    border-bottom: 1px dotted #e1e1e1;
    &:last-child {
      border: none;
    }
  }

  .key-search {
    margin-bottom: 2vh;
  }

  .pagination {
    align-items: center;
    display: flex;
    height: 20vh;
    justify-content: center;
  }

  .sort {
    background-color: #f1f1f1;
    border-top: 1px solid #e0e0e0;
    .el-dropdown {
      background-color: white;
      border-left: 1px solid #e0e0e0;
      border-right: 1px solid #e0e0e0;
      padding: 0 10px;
    }
    .el-dropdown-link {
      font-size: 1vw;
      line-height: 40px;
    }
  }
</style>