<template>
<div class="house-detail">
  <header class="header">
    <div>
      <h3>{{house.title}}</h3>
      <p>{{house.description}}</p>
    </div>
  </header>
  <main class="main">
    <el-carousel :interval="3000" height="65vh">
      <el-carousel-item class="video-play" v-if="house.video">
        <video :src="house.video" controls="controls"></video>
      </el-carousel-item>
      <el-carousel-item v-for="img in images" :key="img">
        <img :src="img">
      </el-carousel-item>
    </el-carousel>
    <div class="info">
      <h3 class="price">
        <span class="num">{{house.price}}</span> 月/元
      </h3>
      <div class="detail">
        <p><span>面积：</span>{{house.houseArea}}平米</p>
        <p><span>户型：</span>{{house.roomNum}}室{{house.hallNum}}厅</p>
        <p><span>楼层：</span>{{house.floor}} / {{house.floorTotal}}层</p>
        <p><span>区域：</span>{{house.address}}</p>
        <p><span>位置：</span>{{house.address}}</p>
        <p><span>时间：</span>{{house.updateTime | date}}</p>
      </div>
    </div>
  </main>
</div>
</template>

<script>
export default {
  name: 'House-Information',
  data () {
    return {
      house: {
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
        'video': null,
        'image1': null,
        'image2': null,
        'image3': null,
        'image4': null,
        'image5': null,
        'userId': 0,
        'status': 0,
        'description': null
      },
      images: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getDetail(this.$route.params.id)
    })
  },
  methods: {
    /**
     * 获取租赁详情
     * @param {string} id 租赁信息id
     */
    getDetail (id) {
      this.axios
        .get(`/rent/get/${id}`)
        .then(response => {
          if (response.data.success) {
            this.house = response.data.result
            for (let index = 1; index <= 5; ++index) {
              if (this.house[`image${index}`]) {
                this.images.push(this.house[`image${index}`] + '?imageslim')
              }
            }
          } else {
            this.$message.error(response.data.message)
          }
        })
        .catch(error => this.$message.error(error))
    }
  },
  filters: {
    date (value) {
      return value.substr(0, 10)
    }
  }
}
</script>

<style lang="less" scoped>
.house-detail {
  box-shadow: 0 0 8px 2px #e3e1e1;
  display: flex;
  flex-direction: column;
  margin: 5vh auto 0;
  width: 80vw;
  .header {
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    display: flex;
    height: 15vh;
    padding-left: 5vw;
    h3, p {
      margin: 0;
    }
    h3 {
      font-size: 2.5vw;
      font-weight: 700;
    }
    p {
      margin-top: 10px;
      font-size: 14px;
      color: #aaaaaa;
    }
  }
  .main {
    display: flex;
    height: 65vh;
    justify-content: space-around;
  }
}

.el-carousel {
  height: 100%;
  width: 40%;
  img {
    height: 100%;
    width: 100%;
  }
}

.video-play {
  align-items: center;
  display: flex;
  video {
    width: 100%;
  }
}

.info {
  height: 100%;
  width: 40%;
  .price {
    color: #e4393c;
    .num {
      font-size: 3vw;
      font-weight: 900;
      margin-right: 3px;
      letter-spacing: -1px;
    }
  }
  .detail {
    span {
      color: #888888;
    }
  }
}
</style>
