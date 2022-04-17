<template>
  <view>
    <view class="login-container">
      <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
      <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
      <!-- open-type="getUserInfo" @getuserinfo="getUserInfo" -->
      <view class="tips-text">登录后尽享更多权益</view>
    </view>
  </view>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'

  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
      // getUserInfo(e) {
      //   console.log('e',e)
      //   if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
      //     return uni.$showMsg('您取消了登录授权！')
      //   }
      //   this.updateUserInfo(e.detail.userInfo)
      //   this.getToken(e.detail)
      // },
      async getToken(info) {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        console.log([err, res])
        if (err || res.errMsg !== 'login:ok') {
          return uni.$showMsg('登录失败1！')
        }
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // 换取token
        const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        if (loginResult.meta.status !== 200) {
          return uni.$showMsg('登录失败！')
        }
        this.updateToken(loginResult.message.token)
      },
      getUserProfile() {
        const result = uni.getUserProfile({
          desc: 'test',
          success: res => {
            console.log(res)
            this.updateUserInfo(res.userInfo)
            this.getToken(res)
          },
          fail: err => {
            return uni.$showMsg('您取消了登录授权！')
          }
        })

      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
