<template>
  <div class="login">
    <div class="form">
      <span class="logo">

      </span>
      <p class="login-text">
        The Login
      </p>

      <input type="text" class="input" placeholder="账号" v-model="form.userName">

      <input type="password" class="input" placeholder="密码"  @keyup.enter="login"  v-model="form.password">

      <!-- <div class="wrap">
        <input type="text" class="input" placeholder="验证码" v-model="form.captcha">
        <div class="code">
          <img
                :src="'data:text/javascript;base64,'+ imageBase64"
                @click="get_captcha"
                style="height:24px"
              >
        </div>
      </div> -->
    
      <div class="btn" >
        <Button type="primary" long  @click="login" :loading="loading">登陆</Button>
      </div>

      <p class="copy-right">
        Copyright 2018-2020 LGD. All Rights Reserved.
      </p>


    </div>
  </div>
</template>


<script>
import {login,get_captcha} from '@/service/index'
export default {
  data() {
    return {
      form:{
        userName: '',
        password: '',
        // uid:'',
        // captcha:''
      },
      loading:false,
      // imageBase64:'',
    };
  },
  methods: {
    async login() {
      this.loading = true;
      const res = await login(this.form);
      this.loading = false;
      if(res.status < 400 ){
        this.$Message.success('登录成功！');
        localStorage.setItem('token',res.data.accessToken);
        localStorage.setItem('userName',this.form.userName);
        this.$router.push('/');
      }
    },
    // async get_captcha(){
    //   const res = await get_captcha();
    //   if(res.status < 400){
    //     this.form.uid = res.data.uid
    //     this.imageBase64 = res.data.imageBase64
    //   }
    // }
  },
  mounted(){
    // this.get_captcha()
  }
};
</script>


<style lang="less" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(/img/loginBg.png);
  overflow: auto;
  .form {
    margin: 0 auto;
    margin-top: 10%;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .copy-right {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #dddddd;
      text-align: center;
      margin-top: 90px;
    }
    .btn {
      width: 100%;
      height: 34px;
    //   background-image: linear-gradient(-269deg, #4b83f3 0%, #2e67d9 100%);
    //   box-shadow: 0 2px 4px 0 rgba(75, 131, 243, 0.6);
    //   border-radius: 4px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 1px;
      line-height: 34px;
      text-align: center;
      cursor: pointer;
      margin-top: 84px;
      &:hover{
        opacity: .9;
      }
    }
    .logo {
      width: 140px;
      height: 42px;
      background: url(/img/loginLogo.png);
    }
    .login-text {
      margin-top: 31px;
      font-family: Arial-Black;
      font-size: 20px;
      color: #2e67d9;
    }
    .input {
      width: 100%;
      height: 34px;
      margin-top: 30px;
      padding-left: 10px;
      font-size: 16px;
      border-radius: 4px;
    }
    .wrap {
      width: 100%;
      height: 34px;
      position: relative;
      .code {
        cursor:pointer;
        width: 54px;
        height: 24px;
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(75%);
 
        // background: red;
      }
    }
  }
}
</style>
