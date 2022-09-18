<template>
  <view>
    <!-- 图文上下分布 -->
    <view class="photos" v-if="photoSrc">
      <image :src="photoSrc" style="width: 100%;max-height: 200rpx;" mode="widthFix"></image>
    </view>
    <view class="answer" v-html="wordAnswer" >{{wordAnswer}}</view>
  </view>
</template>

<script>
  export default {
    name: "quesAnswers",
    data() {
      return {
        wordAnswer: this.answer,
        // imageSrc: []
      };
    },
    props: {
      answer: {
        type: String,
        default: ''
      }
    },
    computed: {
      photoSrc: function() {
        let str = this.answer
        let length = this.answer.indexOf('img')
        // 如果包含图片，且回答中只含一个图片
        // 把rich-text img换成image, 目前只能展示一张图片的回答
        if (length && length > 0) {
          let startPtag = this.answer.lastIndexOf('<p', length)
          let endPtag = this.answer.indexOf('/p>', length)
          let srcStart = this.answer.indexOf('https')
          let srcEnd = this.answer.indexOf('"', srcStart)
          // console.log('length', startPtag, endPtag)
          const answer = this.answer
          // str = answer.slice(startPtag, endPtag+3)
          // str = str.replace('img', 'img style="width:100%;max-height:200rpx;"')
          str = answer.slice(srcStart, srcEnd)
          this.wordAnswer = answer.slice(0, length) + answer.slice(endPtag+3) 
          // console.log(str)
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
  .answer {
    margin: 10rpx 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .photos {
    width: 100%;
    max-height: 200rpx;
    margin-top: 20rpx;
  }
</style>
