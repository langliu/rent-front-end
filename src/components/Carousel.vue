<template>
  <el-carousel :interval="4000" type="card" height="40vh">
    <el-carousel-item v-for="item in advert">
      <img :src="item.picUrl"
           :alt="item.title"
           class="carousel-img"
           @click="goToPage(item.type,item.relateId,item.redirectUrl)">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: 'Carousel',
    data() {
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
            status: 0,
          },
        ],
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.getCarousel();
      });
    },
    methods: {
      getCarousel() {
        this.axios
          .get('/advert/getAll')
          .then(response => {
            if (response.data.success) {
              this.advert = response.data.result;
            } else {
              this.$message.error(response.data.message);
            }
          })
          .catch(error => this.$message.error(error));
      },
      /**
       * 轮播图页面跳转
       * @param {number} type 链接类型
       * @param {number} id 关联id
       * @param {string} url 关联Url
       */
      goToPage(type, id, url) {
        console.log(type);
        if (Object.is(type, 0)) {
          this.$router.push(`/index/detail/${id}`);
        } else {
          location.href = url;
        }
      },
    },
  };
</script>

<style scoped>
  .carousel-img {
    height: 100%;
    width: 100%;
  }
</style>