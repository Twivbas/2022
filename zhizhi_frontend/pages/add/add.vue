<template>
	<view>
		<view class="ask-container" @click="ask">
			<text class="ask-text">亿万网友等你发起问题</text>
			<view class="ask">提问</view>
		</view>
		<view class="questions-container">
			<view class="list" v-for="(item) in questions" :key="item._id">
				<view class="question">{{item.title}}</view>
				<view class="reply" @click="writeAnswer(item.question_id)">写回答</view>
			</view>
		</view>
	</view>
</template>

<script>
  import { getQuestions }  from '../../apis/api.js'
  
	export default {
		data() {
			return {
				questions: []
			};
		},
    onLoad() {
      this.getData()
    },
    methods: {
      ask() {
        const url = `/pages/askQuestion/askQuestion`
        this.jumpMy(url)
      },
      writeAnswer(question_id) {
        const url = `/pages/writeAnswer/writeAnswer?question_id=${question_id}`
        this.jumpMy(url)
      },
      jumpMy(url) {
        if (!uni.getStorageSync('access_token')) {
          uni.switchTab({
          	url: '/pages/my/my'
          });
        } else {
          uni.navigateTo({
            url
          })
        }
      },
      getData() {
        getQuestions().then(res => {
          this.questions = res.data
        },err => console.log(err))
      },
    }
	}
</script>

<style lang="scss">
.ask-container {
	// width: 90%;
	padding: 20rpx;
	margin: 10rpx 20rpx;
	border: 1px solid #55aaff;
	border-radius: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	background-color: #eee;
	
	
	.ask-text {
		color: #55aaff;
	}
	.ask {
		background-color: blue;
		color: #fff;
		font-size: 28rpx;
		width: 100rpx;
		padding: 10rpx;
		border-radius: 15rpx;
		text-align: center;
	}
}

.questions-container {
	.list {
		min-height: 100rpx;
		margin: 10rpx 8rpx;
		padding: 18rpx 20rpx;
		box-shadow: 0px 5px 5px #eee;
		background-color: #fff;
		// display: flex;
		
		.question {}
		.reply {
			background-color: blue;
			color: #fff;
			font-size: 28rpx;
			width: 100rpx;
			padding: 10rpx;
			border-radius: 45%;
			text-align: center;
			position: relative;
			left: 80%;
			margin-top: 10rpx;
		}
	}
}
</style>
