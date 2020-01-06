<template>
  <div class="container">
    <form class="login-form" novalidate @submit.stop.prevent="login">
      <input type="text" v-model="user.loginName">
      <input type="password" v-model="user.pwd">
      <van-button type="info">登录</van-button>
      <p class="aa">这是16px的字</p>
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
  .login-form{
    .aa{
        font-size: 16px;
      }
  }
</style>
