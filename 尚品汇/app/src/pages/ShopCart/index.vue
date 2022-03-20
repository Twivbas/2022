<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="c in cartInfoList" :key="c.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="c.isChecked == 1"
              @change="updateCheckedByid(c, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="c.imgUrl" />
            <div class="item-msg">{{ c.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ c.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, c)"
              >-</a
            >
            <input
              autocomplete="off"
              :value="c.skuNum"
              class="itxt"
              @change="handler('change', $event.target.value.trim(), c)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('plus', 1, c)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ c.skuPrice * c.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(c)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="updateAllCartChecked($event.target.checked)"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart(cartInfoList)">删除选中的商品</a>
        <a >移到我的关注</a>
        <a >清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费）：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push({path:'/trade'})">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    // 获取个人购物车数据
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 这个函数最好加一个节流，有时候要再刷新一下出来
    handler: throttle(async function (type, val, cartInfo) {
      // 商品数量大于等于1才能发请求给服务器（数量最低为1）
      // 确保中间的输入框内是正数，不含非法内容：字母小数空格等
      switch (type) {
        case "plus":
          break;
        case "minus":
          val = cartInfo.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 此时返回的val应为变化量，输入值-之前的值
          if (val <= 1) {
            val = 0;
          } else {
            val = val - cartInfo.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cartInfo.skuId,
          skuNum: val,
        });
        this.getData();
      } catch (err) {
        console.log(err);
      }
    }, 500),
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch("deleteCartListBySkuId", cart.skuId);
        this.getData();
      } catch (err) {
        console.log(err);
      }
    },
    async updateCheckedByid(cart, event) {
      // 带给服务器的参数isChecked，不是布尔值应该是0|1
      try {
        let isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('updateCheckedByid', {
          skuId:cart.skuId,
          isChecked,
        })
        this.getData()
      } catch(err) {
        console.log(err)
      }
    },
    deleteAllCheckedCart(cartInfoList) {
      const promiseArr = cartInfoList.map(c => {
        if (c.isChecked === 1) {
          return this.$store.dispatch("deleteCartListBySkuId", c.skuId)
        }
      })
      Promise.all(promiseArr)
      .then(data => {
        console.log(data)
        this.getData()
      })
      .catch(err => console.log(err))
    },
    updateAllCartChecked(isChecked) {
      isChecked = isChecked ? 1: 0
      const promiseArr = this.cartInfoList.map(c => {
        if (c.isChecked !== isChecked) {
          return this.$store.dispatch("updateCheckedByid", {
            skuId:c.skuId,
            isChecked,
          })
        }
      })
      console.log(promiseArr);
      Promise.all(promiseArr)
      .then(data => {
        console.log(data)
        this.getData()
      })
      .catch(err => console.log(err))
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    isAllCheck() {
      if (!this.cartInfoList.length) {
        return false
      }
      // 遍历，只要全部元素isChecked属性都为1=》真
      return this.cartInfoList.every((item) => item.isChecked == 1) 
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>