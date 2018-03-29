<template>
  <div class="home">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from '../components/NavHeader';

  export default {
    name: 'home',
    components: {
      Header,
    },
  };
</script>
