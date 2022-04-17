<template>
	<view class="cart-container" v-if="cart.length !== 0">
    <my-address></my-address>
		<view class="cart-title">
		  <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
		</view>
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :rightOptions="rightOptions" @click="swipeActionClickHandler(goods)">
          <my-goods :goods="goods" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <my-settle></my-settle>
	</view>
  <view class="empty-cart" v-else>
    <image src="../../static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也</text>
  </view>
</template>

<script>
  import badgeMix from '../../minins/tabbar-badge.js'
  import { mapState, mapMutations } from 'vuex'
	
  export default {
		data() {
			return {
				rightOptions: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }]
			};
		},
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      // 通过自定义事件,子传父数据，子触发父的事件并传值修改的goods_id
      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      swipeActionClickHandler(goods) {
        this.removeGoodsById(goods.goods_id)
      }
    }
	}
</script>

<style lang="scss">
.cart-container {
  padding-bottom: 50px;
}
.cart-container::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  background-color: #fff;
  
  .cart-title-text {
    margin-left: 10px;
  }
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
