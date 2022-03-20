<template>
  <div>
    <!-- 使用全局组件 -->
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <ProductsRank />
    <GuessLike />
    <AppliancesFloor v-for="floor in floorList" :key="floor.id" :list = "floor"/>
    <BrandList />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ListContainer from "@/pages/MyHome/ListContainer";
import TodayRecommend from "@/pages/MyHome/TodayRecommend";
import ProductsRank from "@/pages/MyHome/ProductsRank";
import GuessLike from "@/pages/MyHome/GuessLike";
import AppliancesFloor from "@/pages/MyHome/AppliancesFloor";
import BrandList from "@/pages/MyHome/BrandList";

export default {
  name: "MyHome",
  components: {
    ListContainer,
    TodayRecommend,
    ProductsRank,
    GuessLike,
    AppliancesFloor,
    BrandList,
  },
  mounted() {
    this.$store.dispatch('getFloorList')
    // 跳转后获取用户信息，需要token
    if (this.$store.state.user.token) {
      this.$store.dispatch('getUserInfo')
    }
    
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>