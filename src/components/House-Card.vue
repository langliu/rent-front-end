<template>
<div class="house-card" @click="goToPage()">
  <img :src="(`${houseInfo.image1}?imageslim`)" class="card-img">
  <div class="house-info">
    <h6>{{houseInfo.title}}</h6>
    <p>
      <span>{{houseInfo.houseName}}</span>
      <span>{{houseInfo.roomNum}}室{{houseInfo.hallNum}}厅</span>
      <span>{{houseInfo.houseArea}}平米</span>
    </p>
  </div>
  <div class="house-price">
    <p><span class="num">{{houseInfo.price}}</span>元/月</p>
    <p class="update">{{houseInfo.updateTime | date}}更新</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'House-Card',
  props: ['houseInfo'],
  methods: {
    goToPage () {
      this.$router.push(`/index/detail/${this.houseInfo.id}`)
    }
  },
  filters: {
    /**
     * 日期过滤器
     * @param {string} value 日期字符串
     * @returns {string} 格式化后的日期
     */
    date (value) {
      return value.substr(0, 10)
    }
  }
}
</script>

<style lang="less" scoped>
.house-card {
  align-items: center;
  display: flex;
  height: 100%;
  position: relative;
  width: 100%;
  .card-img {
    height: 80%;
    margin-left: 5%;
    width: 20%;
  }
  .house-info {
    margin-left: 3vw;
    h6 {
      color: #00a9fa;
      font-weight: 700;
      font-size: 2vw;
      margin: 0;
    }
    p {
      span {
        margin-right: 10px;
      }
    }
  }
  .house-price {
    color: #e4393c;
    margin-top: 7px;
    position: absolute;
    right: 10%;
    p {
      margin: 0;
    }
    .num {
      font-size: 30px;
      font-weight: 700;
      margin-right: 3px;
      letter-spacing: -1px;
    }
    .update {
      color: #8a8989;
      font-size: 12px;
    }
  }
}
</style>
