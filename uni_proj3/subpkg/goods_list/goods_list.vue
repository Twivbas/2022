<template>
  <view>
    <view class="goods-list">
      <block v-for="(goods, i) in goodsList" :key="i"  @click="gotoDetail(item)">
        <my-goods :goods="goods"></my-goods>
      </block>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          query: '', // 查询关键词
          cid: '', // 商品分类id
          pagenum: 1,
          pagesize: 10,
        },
        goodsList: [],
        total: 0,
        isloading: false  // 节流阀，是否正在请求数据
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods: {
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      async getGoodsList(cb) {
        this.isloading = true
        const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isloading = false
        cb && cb()
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      }
    },
    // 下滑加载
    onReachBottom() {
      // 判断是否还有下一页数据
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
        return uni.$showMsg('数据加载完毕')
      }
      // 若正在请求数据，退出不发起请求
      if (this.isloading) return
      this.queryObj.pagenum += 1
      this.getGoodsList()
    },
    // 下拉刷新事件
    onPullDownRefresh() {
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">

</style>
