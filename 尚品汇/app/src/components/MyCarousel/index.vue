<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "MyCarousel",
  // data() {
  //   return {
  //     mySwiper: null,
  //   };
  // },
  props: ["list"],
  // props值不要在子组件改变，没改
  // 值会后面变的情况下immediate:true不需要，
  // 都没加immediate，有时候第二个轮播图刷新后会失效
  watch: {
    list: {
      // immediate: true,
      handler() {
        // console.log(n, o);
        // 通过watch监听List属性值变化
        // 若执行handler方法，代表List变为了请求结果
        // nextTick 在下次DOM更新循环结束之后执行延迟回调，在修改数据之后立即使用这个方法，获取更新后的DOM
        // if (!this.mySwiper) {
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
          // console.log("mySwiper", this.mySwiper);
        });
        // }
      },
    },
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     new Swiper(".swiper-container", {
  //       loop: true, // 循环模式选项
  //       // 如果需要分页器
  //       pagination: {
  //         el: ".swiper-pagination",
  //         clickable: true,
  //       },
  //       // 如果需要前进后退按钮
  //       navigation: {
  //         nextEl: ".swiper-button-next",
  //         prevEl: ".swiper-button-prev",
  //       },
  //     });
  //   });
  // },
};
</script>

<style>
</style>