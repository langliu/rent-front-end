<template>
<section>
  <article v-for="house in houses" v-bind:key="house.id">
    <HouseCard :house-info="house"/>
  </article>
</section>
</template>

<script>
import HouseCard from '../../components/House-Card'

export default {
  name: 'My-Release',
  components: {HouseCard},
  data () {
    return {
      houses: [{
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
        'description': null
      }]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getAllPostedRent()
    })
  },
  methods: {
    getAllPostedRent () {
      this.axios
        .get(`/rent/user/getListByPage?token=${sessionStorage.getItem('token')}`)
        .then(response => {
          if (response.data.success) {
            this.houses = response.data.result.content
          }
        })
        .catch(error => this.$message.error(error))
    }
  }
}
</script>

<style lang="less" scoped>

</style>
