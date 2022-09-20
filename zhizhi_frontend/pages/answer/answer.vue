<template>
  <view>
    <view class="header">
      <view class="title">{{question.title}}</view>
      <!-- <view class="desc" v-html="question.desc">{{question.desc}}</view> -->
      <readMore :answer="question.desc"></readMore>
      <button type="default" size="mini" plain class="reply" @click="writeAnswer(question.question_id)">写回答</button>
    </view>
    <view class="main">
      <view class="author">
        <image :src="answer.avatarUrl" class="avatar"></image>
        <view class="nickName">{{answer.nickName}}</view>
      </view>
      <!-- <view class="answer" v-html="answer.answer">{{answer.answer}}</view> -->
      <readMore :answer="answer.answer"></readMore>
      <view class="bottom">
        <text>发布于{{answer.answerTime | formatTime }} ·</text>
        <text style="margin-left: 10rpx;">著作权归作者所有</text>
      </view>
      <view class="like" @click="like">
        <uni-icons :type="isLiked ? 'hand-up-filled':'hand-up'" size="26" color="isLiked ? #007AFF : #fff"></uni-icons>
        <text>赞同{{answer.likes}}</text>
      </view>
    </view>
    <view class="next" @click="nextAnswer">
      <uni-icons type="right"></uni-icons>
      <text>下一个</text>
    </view>
  </view>
</template>

<script>
  import { getAnswers, likeAnswer, getUserData } from '../../apis/api.js'
  
  export default {
    data() {
      return {
        question_id: '',
        answer_id: '',
        question: {
          answers: []
        },
        answer: {
          answer: ''
        },
        isLiked: false,
        pos: 0,
        nextClickCount: 0,
        likesAnswers: []
      };
    },
    onLoad(options) {
      this.question_id = options.question_id
      this.answer_id = options.answer_id
      this.getData()
    },
    methods:{
      getData() {
        getAnswers(this.question_id, this.answer_id).then(res => {
          this.question = res.data[0]
          this.answer = this.question.answers.filter(answer => answer.answer_id === this.answer_id)[0]
        }).catch(err => console.log(err))
        if (uni.getStorageSync('access_token')) {
          getUserData().then(res => {
            console.log(res)
            this.likesAnswers = res.data[0].likesAnswers || []
            this.isLiked = this.likesAnswers.indexOf(this.answer_id) === -1 ? false : true
          }).catch(err => console.log(err))
        }
        
      },
      like() {
        if (!uni.getStorageSync('access_token')) {
          uni.switchTab({
          	url: '/pages/my/my'
          })
          return;
        }
        const step = this.isLiked ? -1 : 1
        const payload = {
          answer_id: this.answer_id,
          step
        }
        likeAnswer(payload).then(res => {
          console.log(res)
          this.getData()
          this.isLiked = !this.isLiked
        }).catch(err => {
          console.log('err', err)
          uni.showToast({
          	title: `${err}`.slice(11),
            icon: 'none',
          	duration: 1500
          });
        })
        
      },
      writeAnswer(question_id) {
        if (!uni.getStorageSync('access_token')) {
          uni.switchTab({
          	url: '/pages/my/my'
          })
          return;
        }
        uni.navigateTo({
          url: `/pages/writeAnswer/writeAnswer?question_id=${question_id}`
        })
      },
      nextAnswer() {
        const len = this.question.answers.length;
        if (this.nextClickCount === 0) {
          for( let i = 0; i < len; i++) {
            if (this.answer.answer_id === this.question.answers[i].answer_id) {
              this.pos = i
              break
            }
          }
        }
        this.nextClickCount += 1
        this.pos += 1
        if (this.pos > len - 1) {
          this.pos = 0
        } 
        if (this.nextClickCount >= len) {
          console.log('这是最后一个答案啦')
          return;
        } else {
          this.answer = this.question.answers[this.pos]
        }
        
      }
    }
  }
</script>

<style lang="scss">
.header {
  background-color: #fff;
  padding: 20rpx;
  
  .title {
    font-size: 20px;
    margin-bottom: 16rpx;
  }
  
  .desc {
    font-size: 24rpx;
    margin: 20rpx 0;
  }
  .reply {
    position: relative;
    left: 78%;
  }
}

.main {
  background-color: #fff;
  margin-top: 20rpx;
  padding: 20rpx;
  
  .author {
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;
    
    .avatar {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      margin-right: 18rpx;
    }
    .nickName {
      font-size: 30rpx;
    }
  }
  
  .bottom {
    margin-top: 40rpx;
    color: #909090;
    font-size: 28rpx;
  }
  .like {
    width: 160rpx;
    margin: 50rpx auto 20rpx;
    border: 1px solid #007AFF;
    border-radius: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #007AFF;
    
  }
  .agreed {
    background-color: #007AFF;
    color: #fff;
  }
}

.next {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  font-size: 20rpx;
  padding: 10rpx;
  box-shadow: 5rpx 2rpx 5rpx #adadad;
  position: fixed;
  right: 20rpx;
  bottom: 30rpx;
}
</style>
