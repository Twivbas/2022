<template>
	<view>
		<view class="login" v-if="!token">
			<view class="logo">
				<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
			</view>
			<text >未登录</text>
			<button class="login" @click="getUserProfile">登录</button>
		</view>
		<view class="login" v-else>
			<view class="logo">
				<image :src="userInfo.avatarUrl" class="avatar"></image>
			</view>
			<text >{{userInfo.nickName}}</text>
			<view class="info">
				<view class="grid">
					<view class="creation-num">{{userData.createAnswers.length}}</view>
					<view class="">创作</view>
				</view>
				<view class="grid">
					<view class="creation-num">{{userData.likesAnswers.length}}</view>
					<view class="">赞同</view>
				</view>
			</view>
      <view class="viewed">
        <view class="title">最近浏览</view>
        <view class="question" v-for="(item, index) in seeQuestions" :key="index" @click="jump(item)">{{questionTitle(item.question_id)}}</view>
      </view>
		</view>
		
	</view>
</template>

<script>
  import { login, getUserData } from '../../apis/api.js'
  
	export default {
		data() {
			return {
				userInfo: {},
        token: '',
        userData: {},
        seeQuestions: []
			};
		},
    onLoad(options) {
      // 打开后要判断有无token, token过期了吗
      const token = uni.getStorageSync('access_token')
      if (token) {
        this.token = token
        this.userInfo = uni.getStorageSync('userInfo')
        this.getUserDataHandler()
      }
    },
    onShow() {
      const token = uni.getStorageSync('access_token')
      if (token) {
        this.token = token
        this.userInfo = uni.getStorageSync('userInfo')
        this.getUserDataHandler()
      }
    },
		methods: {
			getUserProfile(e) {
				uni.getUserProfile({
					desc: '用于完善用户信息',
					success: (res) => {
						console.log('res', res)
						this.userInfo = res.userInfo
            this.getToken(res)
            
					}
				})
			},
      async getToken(info) {
        const [err, res] = await uni.login().catch(err => console.log(err))
        console.log(err, res)
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature,
          userInfo: this.userInfo
        }
        // 获取token
        login(query).then(res => {
          console.log(res)
          this.token = res.token
          uni.setStorageSync('access_token', this.token)
          uni.setStorageSync('userInfo', this.userInfo)
          this.getUserDataHandler()
        }, err => console.log(err))
      },
      getUserDataHandler() {
        getUserData().then(res => {
          // console.log('getUserDataHandler', res)
          this.userData = res.data[0]
          this.seeQuestions = this.userData.seeQuestions.reverse()
        }).catch(err => console.log(err))
      },
      questionTitle(question_id) {
        const r = this.userData.questions.filter(q => q.question_id === question_id)
        return r.length > 0 ? r[0]['title'] : [] 
      },
      jump(item) {
        const { answer_id, question_id } = item
        if (answer_id === "undefined") {
          uni.navigateTo({
            url: `/pages/question/question?question_id=${question_id}`
          })
        } else {
          uni.navigateTo({
            url: `/pages/answer/answer?question_id=${question_id}&answer_id=${answer_id}`
          })
        }
      }
		}
	}
</script>

<style lang="scss">
.login {
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 50rpx;
	
	text {
		color: #c2c2c2;
		font-size: 40rpx;
	}
	
	.login {
		width: 340rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #fff;
		background-color: #3cb600;
		margin-top: 70rpx;
		border-radius: 5px;
	}
	
	.avatar {
		display: block;
		width: 90px;
		height: 90px;
		border-radius: 45px;
		border: 1px solid #fff;
		margin-bottom: 20rpx;
	}
	
	.info {
		width: 70%;
		display: flex;
		justify-content: space-evenly;
		margin-top: 60rpx;
		
		.grid {
			text-align: center;
		}
	}
  
  .viewed {
    width: 90%;
    margin-top: 50rpx;
    
    .title {
      margin-bottom: 20rpx;
      font-size: 36rpx;
    }
    .question {
      padding-left: 10rpx;
      padding-top: 20rpx;
    }
  }
}

</style>
