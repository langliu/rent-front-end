<template>
  <div class="home">
    <Header></Header>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';
import Header from '../components/NavHeader';

export default {
  name: 'home',
  components: {
    HelloWorld,
    Header,
  },
};
</script>
