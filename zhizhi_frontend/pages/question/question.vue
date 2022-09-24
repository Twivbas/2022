<template>
  <view>
    <view class="header">
      <view class="title">{{question.title}}</view>
      <!-- <view class="desc" v-html="question.desc">{{question.desc}}</view> -->
      <readMore :answer="question.desc ? question.desc : ''"></readMore>
      <button type="default" size="mini" plain class="reply" @click="writeAnswer(question.question_id)">写回答</button>
    </view>
    <view class="middle">
      <view class="numbers">回答{{question.answers.length}}</view>
      <view class="switch" @click="isSortByNew = !isSortByNew">
        <image src="../../static/icons/qiehuan.png" class="icon"></image>
        <view class="new">{{isSortByNew ? '最新': '热门'}}</view>
      </view>
    </view>
    <view class="answers">
      <view class="list" v-for="item in answers" :key="item._id" @click="seeAnswer(question_id, item.answer_id)">
        <view class="author">
          <image :src="item.avatarUrl" class="avatar"></image>
          <view class="nickName">{{item.nickName}}</view>
        </view>
        <!-- <view class="answer" v-html="item.answer">{{item.answer}}</view> -->
        <quesAnswers :answer="item.answer"></quesAnswers>
        <view class="bottom">
          <text class="like">{{item.likes}}赞同 · </text>
          <text class="answerTime">{{item.answerTime | formatTime}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { getAnswers } from '../../apis/api.js'
  
  export default {
    data() {
      return {
        question_id: '',
        question: {},
        answers: [],
        isSortByNew: true
      };
    },
    onLoad(options) {
      this.question_id = options.question_id
      this.getData()
    },
    onUnload() {
      uni.navigateBack({
        delta:2
      })
    },
    methods:{
      getData() {
        getAnswers(this.question_id).then(res => {
          this.question = res.data[0]
          const arr = this.question.answers.map(o => ({...o}))
          this.answers = arr.sort(this.sortBy('answerTime'))
        }, err => console.log(err))
      },
      sortBy(property) {
        return function (a, b) {
          return b[property] - a[property]
        }
      },
      seeAnswer(question_id, answer_id) {
        uni.navigateTo({
          url: `/pages/answer/answer?question_id=${question_id}&answer_id=${answer_id}`
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
      }
    },
    watch:{
      isSortByNew: {
        handler: function (val, oldVal) {
          const arr = this.question.answers.map(o => ({...o}))
          if (val === false) {
            // 最热
            this.answers = arr.sort(this.sortBy('likes'))
            // sort返回排序后的数组。请注意，数组已原地排序，并且不进行复制。
          } else {
            // 最新
            this.answers = arr.sort(this.sortBy('answerTime'))
            // reverse返回颠倒后的数组。
          }
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

.middle {
  margin: 10rpx;
  display: flex;
  justify-content: space-between;
  
  .switch {
    color: #909090;
    display: flex;
    
    .icon {
      width: 40rpx;
      height: 40rpx;
      margin-right: 8rpx;
    }
  }
}
.answers {
  
  .list {
    background-color: #fff;
    margin-top: 20rpx;
    box-shadow: 0rpx 8rpx 5rpx #eee;
    padding: 16rpx;
    
    .author {
      display: flex;
      align-items: center;
      
      .avatar {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        margin-right: 12rpx;
      }
      .nickName {
        color: #909090;
        font-size: 26rpx;
      }
    }
    
    .creator {
      color: #909090;
      font-size: 24rpx;
    }
    
    .bottom {
      color: #909090;
      font-size: 24rpx;
      
      .answerTime {
        margin-left: 10rpx;
      }
    }
  }
}
</style>
