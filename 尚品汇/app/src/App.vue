<template>
  <div id="app">
    <MyHeader></MyHeader>
    <router-view></router-view>
    <!-- <MyFooter v-show="$route.path === '/home' || $route.path === '/search'"></MyFooter> -->
    <MyFooter v-show="$route.meta.isShow"></MyFooter>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter,
  },
  mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库中
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
