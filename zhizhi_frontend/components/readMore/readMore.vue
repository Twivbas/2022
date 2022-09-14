<template>
  <view class="container">
    <view class="answer " v-html="answer" v-if="!flag">{{answer}}</view>
    <view class="" v-else>
      <view class="answer lineLimit" v-html="answer">{{answer}}</view>
      <view class="readMore" @click="handleClick">
        阅读全文
        <uni-icons type="bottom" size="16" color="blue"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "readMore",
    data() {
      return {
        flag: false
      };
    },
    computed: {
      isAnswerTooMuch: function() {
        return this.flag
      }
    },
    props: ['answer'],
    mounted() {
      const query = uni.createSelectorQuery().in(this);
      query.select('.answer').boundingClientRect(data => {
        // console.log(data)
        this.flag = +data.height > 182
      }).exec();
    },
    methods: {
      handleClick() {
        this.flag = false
      }
    }
  }
</script>

<style lang="scss">
  .readMore {
    color: blue;
    text-align: center;
    height: 200rpx;
    background-color: white;
  }
  
  .readMore::before {
    display: block;
    content: '';
    width: 100%;
    height: 100rpx;
    background-color: white;
    opacity: 0.35;
    margin-top: -98rpx;
  }

  .lineLimit {
    height: 350rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
  }

  .answer {
    line-height: 50rpx;
  }
</style>
