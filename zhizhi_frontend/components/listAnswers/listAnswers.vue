<template>
  <view class="container">
    <!-- 图文左右分布 -->
    <!-- <view class="answer" v-html="answer">{{answer}}</view> -->
    <view class="answer" v-html="wordAnswer" >{{wordAnswer}}</view>
    <view class="photos" v-if="photoSrc">
      <image :src="photoSrc" style="width: 100%;height: 120rpx;" mode="scaleToFill"></image>
    </view>
    
  </view>
</template>

<script>
  export default {
    name: "listAnswers",
    data() {
      return {
        wordAnswer: ''
      };
    },
    props: ['answer'],
    computed: {
      photoSrc: function() {
        let str = this.answer
        const length = this.answer.indexOf('img')
        // 如果包含图片，且回答中只含一个图片
        // 把rich-text img换成image, 只取第一张图片展示。
        if (length > 0) {
          const startPtag = this.answer.lastIndexOf('<p', length)
          const endPtag = this.answer.indexOf('/p>', length)
          const srcStart = this.answer.indexOf('https')
          const srcEnd = this.answer.indexOf('"', srcStart)
          const answer = this.answer
          str = answer.slice(srcStart, srcEnd)
          this.wordAnswer = answer.slice(0, length) + answer.slice(endPtag+3) 
        } else {
          this.wordAnswer = this.answer
          str = ''
        }
        return str
      },
    }
  }
</script>

<style lang="scss">
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 140rpx;
    
    .answer {
      font-size: 28rpx;
      width: 100%;
      height: 114rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      padding-right: 8rpx;
    }
    .photos {
      width: 300rpx;
      height: 120rpx;
    }
  }
  
</style>
