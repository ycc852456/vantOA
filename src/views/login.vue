<template>
  <div class="container">
    <form class="login-form" novalidate @submit.stop.prevent="login">
      <input type="text" v-model="user.loginName">
      <input type="password" v-model="user.pwd">
      <button type="submit">登陆</button>
    </form>
  </div>
</template>

<script>
  import {login} from "../api/user";
  import * as types from '../store/types';

  export default {
    name: "login",
    data() {
      return {
        user: {
          loginName: '',
          pwd: '',
        }
      }
    },
    mounted() {
      let token = this.$store.state.token;
      if(token){
        console.log('已有token，直接进入')
        this.$router.push({
          path:'home',
        })
      }
    },
    methods: {
      async login() {
        await login(this.user).then(
          (res)=>{
            if(res.code === 0){
              this.$store.commit(types.LOGIN, res.data);
              this.$router.push({
                path:'home',
              })
            }
          }
        )
      }
    }
  }
</script>

<style lang="scss">

</style>
