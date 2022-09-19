<template>
  <view class="container">
      <view id="answer" class="answer" :class="isOverflow?'lineLimit': ''" v-html="answer">{{answer}}</view>
      <view class="readMore" @click="handleClick" v-if="isOverflow">
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
        isOverflow: false
      };
    },
    props: {
      answer: {
        type: String,
        default: ''
      }
    },
    watch: {
      answer: function () {
        const query = uni.createSelectorQuery().in(this);
        query.select('#answer').boundingClientRect(data => {
          this.isOverflow = +data.height > 85
          // console.log(data, this.answer)
        }).exec();
      }
    },
    methods: {
      handleClick() {
        this.isOverflow = false
        console.log(this.isOverflow)
      }
    }
  }
</script>

<style lang="scss">
  .readMore {
    color: blue;
    text-align: center;
    height: 160rpx;
    width: 100%;
    background-color: white;
    // margin-top: -200rpx;
    // z-index: 9;
    // position: absolute;
  }
  
  .readMore::before {
    display: block;
    content: '';
    width: 100%;
    height: 50rpx;
    background-color: white;
    opacity: 0.35;
    margin-top: -48rpx;
  }

  .lineLimit {
    height: 150rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .answer {
    line-height: 50rpx;
    // height: 200rpx;
  }
</style>
