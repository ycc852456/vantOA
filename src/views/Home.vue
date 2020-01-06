<template>
  <div class="home">
    <button @click="logout">退出</button>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import * as types from '../store/types';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods:{
    async logout(){
      console.log("logout");
      this.$store.commit(types.LOGOUT);
      this.$router.push({
        path:'login',
      })
    }
  }
}
</script>
