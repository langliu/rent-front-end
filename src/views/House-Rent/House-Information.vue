<template>

</template>

<script>
  export default {
    name: 'House-Information',
    data() {
      return {};
    },
    mounted() {
      this.$nextTick(() => {
        this.getDetail(this.$route.params.id);
      });
    },
    methods: {
      /**
       * 获取租赁详情
       * @param {string} id 租赁信息id
       */
      getDetail(id) {
        this.axios
          .get(`/rent/get/${id}`)
          .then(response => {
            console.log(response);
          });
      },
    },
  };
</script>

<style lang="less" scoped>

</style>