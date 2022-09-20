<template>
  <view>
    <view class="header">
      <view class="title" @click="run2">热榜</view>
      <view class="title" @click="run">推荐</view>
      <uni-transition ref="ani"
        :styles="{'width':'40px','height':'3px','backgroundColor':'blue','margin-left': 'calc(25vw - 20px)', 'z-index': '999'}"
        :show="show" class="mark" />
    </view>

    <view class="container">
      <view class="recommendation" v-show="!isHotList">
        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
          <view class="list" v-for="item in questions" :key="item._id"
            @click="seeAnswer(item.question_id, item.answers[0].answer_id)" v-if="item.answers[0].answer_id">
            <view class="question">{{item.title}}</view>
            <!-- <view class="answer" v-html="item.answers[0].answer">{{item.answers[0].answer}}</view> -->
            <listAnswers :answer="item.answers[0].answer"></listAnswers>
          </view>
        </scroll-view>
      </view>
      <view class="hotList actived" v-show="isHotList">
        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
          <view class="list" v-for="(item, index) in hotlist" :key="index" @click="seeQuestion(item._id)">
            <view class="number">{{index < 9 ? `0${index+1}`: `${index+1}`}}</view>
            <view class="question">{{item.question[0].title}}</view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getQuestions,
    getHotList
  } from '../../apis/api.js'

  export default {
    data() {
      return {
        questions: [],
        hotlist: [],
        isHotList: true,
        scrollTop: 0,
        show: true,
        wh: 0
      };
    },
    onLoad() {
      this.setData()
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowWidth

    },
    onShow() {
      this.setData()
    },
    methods: {
      setData() {
        getQuestions().then(res => {
          this.questions = res.data
        }, err => console.log(err))
        getHotList().then(res => {
          this.hotlist = res.data
          // 如果token过期了
          if (res.message.indexOf('expired') !== -1) {
            uni.removeStorageSync('access_token')
            uni.removeStorageSync('userInfo')
          }
        }, err => console.log(err))
      },
      seeQuestion(question_id) {
        console.log(question_id)
        uni.navigateTo({
          url: `/pages/question/question?question_id=${question_id}`
        })
      },
      seeAnswer(question_id, answer_id) {
        uni.navigateTo({
          url: `/pages/answer/answer?question_id=${question_id}&answer_id=${answer_id}`
        })
      },
      run() {
        this.isHotList = false
        this.$refs.ani.step({
          translateX: `${this.wh/2}px`,
        }, {
          timingFunction: 'ease-in',
          duration: 200
        })
        this.$refs.ani.run(() => {
          // console.log('点击推荐动画支持完毕')
        })
      },
      run2() {
        this.isHotList = true
        this.$refs.ani.step({
          translateX: '0px',
        }, {
          timingFunction: 'ease-in',
          duration: 200
        })
        this.$refs.ani.run(() => {
          // console.log('点击热榜动画支持完毕')
        })
      }
    }
  }
</script>

<style lang="scss">
  .header {
    display: flex;
    position: sticky;
    top: 0;
    z-index: 999;
    flex-wrap: wrap;

    .title {
      width: 50%;
      height: 50rpx;
      text-align: center;
      background-color: #FFF;
      padding: 20rpx 0;
      flex-shrink: 0;
    }
  }

  .container {
    display: flex;
    height: calc(100vh - 96rpx);

    .recommendation {
      width: 100%;
      // margin-top: 6rpx;

      .scroll-Y {}

      .list {
        margin: 8rpx;
        padding: 18rpx 20rpx;
        box-shadow: 0px 5px 5px #eee;
        background-color: #FFF;

        .question {
          padding-bottom: 10rpx;

        }
      }
    }

    .hotList {
      width: 100%;
      background-color: #FFF;
      margin-top: 8rpx;

      .scroll-Y {
        height: 100%;
      }

      .list {
        padding: 18rpx;

        .number {}

        .question {}
      }
    }

    .actived {}
  }
</style>
