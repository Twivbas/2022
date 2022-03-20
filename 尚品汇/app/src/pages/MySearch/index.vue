<template>
  <div>
    <TypeNav />

    <!-- 窗口侧边栏 -->
    <div class="toolbar toolbar-wrap">
      <div class="content"></div>
      <div class="but list"></div>
      <div class="toolist">
        <div class="pull">
          <i class="tab-ico vip"></i>
          <em class="tab-text">商品会员</em>
        </div>
        <div class="pull">
          <i class="tab-ico cart"></i>
          <em class="tab-text">购物车</em>
        </div>
        <div class="pull">
          <i class="tab-ico follow"></i>
          <em class="tab-text">我的关注</em>
        </div>
        <div class="pull">
          <i class="tab-ico history"></i>
          <em class="tab-text">我的足迹</em>
        </div>
        <div class="pull">
          <i class="tab-ico message"></i>
          <em class="tab-text">我的消息</em>
        </div>
        <div class="pull">
          <i class="tab-ico jimi"></i>
          <em class="tab-text">咨询</em>
        </div>
      </div>
      <div class="back pull">
        <i class="tab-ico top"></i>
        <em class="tab-text">顶部</em>
      </div>
    </div>

    <!--bread-->
    <div class="bread">
      <ul class="fl sui-breadcrumb">
        <li>
          <a href="#">全部结果</a>
        </li>
      </ul>
      <ul class="fl sui-tag">
        <!-- 分类的面包屑 -->
        <li class="with-x" v-if="searchParams.categoryname">{{searchParams.categoryname}}<i @click="removeCategoryName">x</i></li>
        <!-- 搜索关键字的面包屑 -->
        <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">x</i></li>
        <!-- 品牌的面包屑 -->
        <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.slice(2)}}<i @click="removeTrademark">x</i></li>
        <!-- 平台的售卖的属性值展示 -->
        <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">{{prop.split(':')[1]}}<i @click="removeProp(index)">x</i></li>
      </ul>
    </div>

    <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo"/>

    <!--details-->
    <div class="details clearfix">
      <div class="sui-navbar">
        <div class="navbar-inner filter">
          <ul class="sui-nav">
            <li :class="{active: isOne}" @click="changeOrder('1')">
              <a>综合<i v-show="isOne" :class="isDesc ? 'iconfont icon-arrowBottom-fill': 'iconfont icon-arrowTop'"></i></a>
            </li>
            <li :class="{active: isTwo}" @click="changeOrder('2')">
              <a>价格<i v-show="isTwo" :class="isDesc ? 'iconfont icon-arrowBottom-fill': 'iconfont icon-arrowTop'"></i></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="goods-list">
        <ul class="yui3-g">
          <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
            <div class="list-wrap">
              <div class="p-img">
                <router-link :to="`/detail/${goods.id}`">
                  <img :src="goods.defaultImg"/>
                </router-link>
              </div>
              <div class="price">
                <strong>
                  <em>¥</em>
                  <i>{{goods.price}}</i>
                </strong>
              </div>
              <div class="attr">
                <a
                  target="_blank"
                  href="item.html"
                  title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                  >{{goods.title}}</a
                >
              </div>
              <div class="commit">
                <i class="command">已有<span>2000</span>人评价</i>
              </div>
              <div class="operate">
                <a
                  href="success-cart.html"
                  target="_blank"
                  class="sui-btn btn-bordered btn-danger"
                  >加入购物车</a
                >
                <a href="javascript:void(0);" class="sui-btn btn-bordered"
                  >收藏</a
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- <div class="fr page">
        <div class="sui-pagination clearfix">
          <ul>
            <li class="prev disabled">
              <a href="#">«上一页</a>
            </li>
            <li class="active">
              <a href="#">1</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li>
              <a href="#">4</a>
            </li>
            <li>
              <a href="#">5</a>
            </li>
            <li class="dotted"><span>...</span></li>
            <li class="next">
              <a href="#">下一页»</a>
            </li>
          </ul>
          <div><span>共10页&nbsp;</span></div>
        </div>
      </div> -->
    </div>
    <!--hotsale-->
    <!-- <div class="clearfix hot-sale">
      <h4 class="title">热卖商品</h4>
      <div class="hot-list">
        <ul class="yui3-g">
          <li class="yui3-u-1-4">
            <div class="list-wrap">
              <div class="p-img">
                <img src="./images/like_01.png" />
              </div>
              <div class="attr">
                <em>Apple苹果iPhone 6s (A1699)</em>
              </div>
              <div class="price">
                <strong>
                  <em>¥</em>
                  <i>4088.00</i>
                </strong>
              </div>
              <div class="commit">
                <i class="command">已有700人评价</i>
              </div>
            </div>
          </li>
          <li class="yui3-u-1-4">
            <div class="list-wrap">
              <div class="p-img">
                <img src="./images/like_03.png" />
              </div>
              <div class="attr">
                <em>金属A面，360°翻转，APP下单省300！</em>
              </div>
              <div class="price">
                <strong>
                  <em>¥</em>
                  <i>4088.00</i>
                </strong>
              </div>
              <div class="commit">
                <i class="command">已有700人评价</i>
              </div>
            </div>
          </li>
          <li class="yui3-u-1-4">
            <div class="list-wrap">
              <div class="p-img">
                <img src="./images/like_04.png" />
              </div>
              <div class="attr">
                <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
              </div>
              <div class="price">
                <strong>
                  <em>¥</em>
                  <i>4068.00</i>
                </strong>
              </div>
              <div class="commit">
                <i class="command">已有20人评价</i>
              </div>
            </div>
          </li>
          <li class="yui3-u-1-4">
            <div class="list-wrap">
              <div class="p-img">
                <img src="./images/like_02.png" />
              </div>
              <div class="attr">
                <em>Apple苹果iPhone 6s (A1699)</em>
              </div>
              <div class="price">
                <strong>
                  <em>¥</em>
                  <i>4088.00</i>
                </strong>
              </div>
              <div class="commit">
                <i class="command">已有700人评价</i>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div> -->

    <MyPagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
  </div>
</template>

<script>
import SearchSelector from "@/pages/MySearch/SearchSelector"
import { mapGetters, mapState } from 'vuex'

export default {
  name: "MySearch",
  components: {
    SearchSelector,

  },
  data() {
    return {
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryname: '',
        keyword: '',
        order: '1:desc',
        pageNo: 5,
        pageSize: 3,
        props: [],
        trademark: '',
      }
    }
  },
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
    this.getData(this.searchParams)

    window.addEventListener("DOMContentLoaded", function () {
      //保存当前缩略图的下标
      // let magnifierImgID = 0;
      //当前的商品数量
      // let goodsChangeNum = 1;

      //12.侧边栏效果
      asideShow();
      function asideShow() {
        var pull = document.getElementsByClassName("pull");
        var tabtext = document.getElementsByClassName("tab-text");
        var tabico = document.getElementsByClassName("tab-ico");
        for (var i = 0; i < pull.length; i++) {
          (function (n) {
            pull[n].onmouseover = function () {
              tabtext[n].style.left = "-59px";
              tabico[n].style.backgroundColor = "#c81623";
              tabtext[n].style.backgroundColor = "#c81623";
              //				alert(text[n].backgroundColor);
            };
            pull[n].onmouseleave = function () {
              tabtext[n].style.left = "35px";
              tabico[n].style.backgroundColor = "#7a6e6e";
              tabtext[n].style.backgroundColor = "#7a6e6e";
            };
          })(i);
        }
        /*
                  侧边栏按钮
                */
        var bnt = document.getElementsByClassName("but")[0];
        var toolbar = document.getElementsByClassName("toolbar")[0];
        bnt.onmousedown = function () {
          if (bnt.className == "but list") {
            //		alert("hehehe");
            toolbar.className = "toolbar toolbar-out";
            bnt.className = "but pull-wrap";
          } else {
            toolbar.className = "toolbar toolbar-wrap";
            bnt.className = "but list";
          }
        };
      }
    });
  },
  computed: {
    // mapGetters里面写数组，因为getters计算是没有划分模块的
    ...mapGetters(['goodsList']),
    isOne() {
      return this.searchParams.order.indexOf(1) !== -1
    },
    isTwo() {
      return this.searchParams.order.indexOf(2) !== -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') !== -1
    },
    ...mapState({
      total:state => state.search.searchList.total
    })
  },
  watch: {
    // 监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route() {
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.getData(this.searchParams)
      // 每一次请求完毕，应该把相应的3级分类的id置空好接收下一次相应的3级id
      // 分类名字与关键字不用清理，因为每一次路由发生变化的时候，都会赋予新数据
      this.searchParams.category1Id = ''
      this.searchParams.category2Id = ''
      this.searchParams.category3Id = ''
    }
  },
  methods: {
    getData(params) {
      this.$store.dispatch('getSearchInfo', params)
    },
    removeCategoryName() {
      this.searchParams.categoryname = ''
      // 还需向服务器发送请求
      // 若属性值为''还是会把相应的字段带给服务器，若值为undefined则该属性不会带给服务器
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getData(this.searchParams)
      // 地址栏也要改，通过路由跳转
      // 只删除query，若路径当中有params应该保留
      if (this.$route.params) {
        this.$router.push({name:'search', params:this.$route.params})
      }
    },
    removeKeyword() {
      this.searchParams.keyword = undefined
      this.getData(this.searchParams)
      // if (this.$route.query) {
      //   this.$router.push({name:'search', query:this.$route.query})
      // }
      // 通知兄弟组件Header清除关键字
      this.$bus.$emit('clear')
    },
    // 自定义事件
    tradeMarkInfo(val) {
      // console.log('tradeMarkInfo', val)
      this.searchParams.trademark = `${val.tmId}:${val.tmName}`
      this.getData(this.searchParams)
    },
    removeTrademark() {
      this.searchParams.trademark = undefined
      this.getData(this.searchParams)
    },
    attrInfo(...args) {
      const props = `${args[0].attrId}:${args[1]}:${args[0].attrName}`
      // 数组去重
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props)
      }
      this.getData(this.searchParams)
    },
    removeProp(index) {
      this.searchParams.props.splice(index, 1)
      this.getData(this.searchParams)
    },
    // 排序，flag表示用户点击的是综合1还是价格2
    changeOrder(flag) {
      // let originOrder = this.searchParams.order
      let originFlag = this.searchParams.order.split(':')[0]
      let originSort = this.searchParams.order.split(':')[1]
      let newOrder = ''
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort=='desc'?'asc':'desc'}`
      } else {
        newOrder = `${flag}:${'desc'}`
      }

      this.searchParams.order = newOrder
      this.getData(this.searchParams)
    },
    // 自定义事件——获取当前第几页
    getPageNo(val) {
      this.searchParams.pageNo = val
      this.getData(this.searchParams)
    }
  }
};
</script>

<style lang="less" scoped>
.toolbar {
  position: fixed;
  z-index: 999;
  width: 300px;
  height: 100%;
  background-color: #7a6e6e;
  transition: right 0.3s ease-in-out 0s;
  &.toolbar-out {
    top: 0px;
    right: 0px;
  }
  &.toolbar-wrap {
    top: 0px;
    right: -294px;
  }
  .content {
    position: relative;
    left: 6px;
    width: 294px;
    background-color: bisque;
    height: 100%;
    z-index: 99;
  }
  .but {
    position: relative;
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin-bottom: 1px;
    cursor: pointer;
    background-color: #7a6e6e;
    border-radius: 3px 0 0 3px;
    position: absolute;
    top: 0;
    /*right: -6px;*/
    left: -29px;
    &.list {
      background-image: url(./images/list.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
    &.pull-wrap {
      background-image: url(./images/cross.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .toolist {
    position: absolute;
    top: 50%;
    left: -29px;
    width: 35px;
    margin-top: -80px;
    /*background-color: cadetblue;*/
    .pull {
      position: relative;
      width: 35px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      margin-bottom: 1px;
      cursor: pointer;
      background-color: #7a6e6e;
      border-radius: 3px 0 0 3px;
      z-index: 66;
      .vip {
        background-image: url(./images/toolbars.png);
        background-position: -88px -175px;
      }
      .cart {
        background-image: url(./images/toolbars.png);
        background-position: -50px 0;
      }
      .follow {
        background-image: url(./images/toolbars.png);
        background-position: -50px -50px;
      }
      .history {
        background-image: url(./images/toolbars.png);
        background-position: -50px -100px;
      }
      .message {
        background-image: url(./images/toolbars.png);
        background-position: -190px -150px;
      }
      .jimi {
        background-image: url(./images/toolbars.png);
        background-position: -50px -150px;
      }
      .top {
        background-image: url(./images/toolbars.png);
        background-position: -50px -250px;
      }

      .tab-text {
        width: 62px;
        height: 35px;
        line-height: 35px;
        color: #fff;
        text-align: center;
        font-family: 微软雅黑;
        position: absolute;
        /*position: relative;*/
        z-index: 1;
        left: 35px;
        top: 0;
        background-color: #7a6e6e;
        border-radius: 3px 0 0 3px;
        font-style: normal;
        -webkit-transition: left 0.3s ease-in-out 0.1s;
        transition: left 0.3s ease-in-out 0.1s;
      }
      .tab-ico {
        display: inline-block;
        position: relative;
        /*background-image: url(img/toolbars.png);*/
        background-color: #7a6e6e;
        border-radius: 3px 0 0 3px;
        z-index: 2;
        width: 35px;
        height: 35px;
      }
    }
  }

  & > .pull {
    position: relative;
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin-bottom: 1px;
    cursor: pointer;
    background-color: #7a6e6e;
    border-radius: 3px 0 0 3px;
    z-index: 66;
    .tab-ico {
      display: inline-block;
      position: relative;
      /*background-image: url(img/toolbars.png);*/
      background-color: #7a6e6e;
      border-radius: 3px 0 0 3px;
      z-index: 2;
      width: 35px;
      height: 35px;
    }
    .top {
      background-image: url(./images/toolbars.png);
      background-position: -50px -250px;
    }

    .tab-text {
      width: 62px;
      height: 35px;
      line-height: 35px;
      color: #fff;
      text-align: center;
      font-family: 微软雅黑;
      position: absolute;
      /*position: relative;*/
      z-index: 1;
      left: 35px;
      top: 0;
      background-color: #7a6e6e;
      border-radius: 3px 0 0 3px;
      font-style: normal;
      -webkit-transition: left 0.3s ease-in-out 0.1s;
      transition: left 0.3s ease-in-out 0.1s;
    }
  }
  & > .back {
    position: absolute;
    bottom: 0;
    /*right: -6px;*/
    left: -29px;
    display: inline-block;
    background-image: url(./images/toolbars.png);
  }
}
.bread {
  margin-bottom: 5px;
  overflow: hidden;
  .sui-breadcrumb {
    padding: 3px 15px;
    margin: 0;
    font-weight: 400;
    border-radius: 3px;
    float: left;
    li {
      display: inline-block;
      line-height: 18px;
      a {
        color: #666;
        text-decoration: none;
        &:hover {
          color: #4cb9fc;
        }
      }
    }
  }
  .sui-tag {
    margin-top: -5px;
    list-style: none;
    font-size: 0;
    line-height: 0;
    padding: 5px 0 0;
    margin-bottom: 18px;
    float: left;
    .with-x {
      font-size: 12px;
      margin: 0 5px 5px 0;
      display: inline-block;
      overflow: hidden;
      color: #000;
      background: #f7f7f7;
      padding: 0 7px;
      height: 20px;
      line-height: 20px;
      border: 1px solid #dedede;
      white-space: nowrap;
      transition: color 400ms;
      cursor: pointer;
      i {
        margin-left: 10px;
        cursor: pointer;
        font: 400 14px tahoma;
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
      &:hover {
        color: #28a3ef;
      }
    }
  }
}
.details {
  margin-bottom: 5px;
  .sui-navbar {
    overflow: visible;
    margin-bottom: 0;
    .filter {
      min-height: 40px;
      padding-right: 20px;
      background: #fbfbfb;
      border: 1px solid #e2e2e2;
      padding-left: 0;
      border-radius: 0;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
      .sui-nav {
        position: relative;
        left: 0;
        display: block;
        float: left;
        margin: 0 10px 0 0;
        li {
          float: left;
          line-height: 18px;
          a {
            display: block;
            cursor: pointer;
            padding: 11px 15px;
            color: #777;
            text-decoration: none;
          }
          &.active {
            a {
              background: #e1251b;
              color: #fff;
            }
          }
        }
      }
    }
  }
  .goods-list {
    margin: 20px 0;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        height: 100%;
        width: 20%;
        margin-top: 10px;
        line-height: 28px;
        .list-wrap {
          .p-img {
            padding-left: 15px;
            width: 215px;
            height: 255px;
            a {
              color: #666;
              img {
                max-width: 100%;
                height: auto;
                vertical-align: middle;
              }
            }
          }
          .price {
            padding-left: 15px;
            font-size: 18px;
            color: #c81623;
            strong {
              font-weight: 700;
              i {
                margin-left: -5px;
              }
            }
          }
          .attr {
            padding-left: 15px;
            width: 85%;
            overflow: hidden;
            margin-bottom: 8px;
            min-height: 38px;
            cursor: pointer;
            line-height: 1.8;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            a {
              color: #333;
              text-decoration: none;
            }
          }
          .commit {
            padding-left: 15px;
            height: 22px;
            font-size: 13px;
            color: #a7a7a7;
            span {
              font-weight: 700;
              color: #646fb0;
            }
          }
          .operate {
            padding: 12px 15px;
            .sui-btn {
              display: inline-block;
              padding: 2px 14px;
              box-sizing: border-box;
              margin-bottom: 0;
              font-size: 12px;
              line-height: 18px;
              text-align: center;
              vertical-align: middle;
              cursor: pointer;
              border-radius: 0;
              background-color: transparent;
              margin-right: 15px;
            }
            .btn-bordered {
              min-width: 85px;
              background-color: transparent;
              border: 1px solid #8c8c8c;
              color: #8c8c8c;
              &:hover {
                border: 1px solid #666;
                color: #fff !important;
                background-color: #666;
                text-decoration: none;
              }
            }
            .btn-danger {
              border: 1px solid #e1251b;
              color: #e1251b;
              &:hover {
                border: 1px solid #e1251b;
                background-color: #e1251b;
                color: white !important;
                text-decoration: none;
              }
            }
          }
        }
      }
    }
  }
  .page {
    width: 733px;
    height: 66px;
    overflow: hidden;
    float: right;
    .sui-pagination {
      margin: 18px 0;
      ul {
        margin-left: 0;
        margin-bottom: 0;
        vertical-align: middle;
        width: 490px;
        float: left;
        li {
          line-height: 18px;
          display: inline-block;
          a {
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            border: 1px solid #e0e9ee;
            margin-left: -1px;
            font-size: 14px;
            padding: 9px 18px;
            color: #333;
          }
          &.active {
            a {
              background-color: #fff;
              color: #e1251b;
              border-color: #fff;
              cursor: default;
            }
          }
          &.prev {
            a {
              background-color: #fafafa;
            }
          }
          &.disabled {
            a {
              color: #999;
              cursor: default;
            }
          }
          &.dotted {
            span {
              margin-left: -1px;
              position: relative;
              float: left;
              line-height: 18px;
              text-decoration: none;
              background-color: #fff;
              font-size: 14px;
              border: 0;
              padding: 9px 18px;
              color: #333;
            }
          }
          &.next {
            a {
              background-color: #fafafa;
            }
          }
        }
      }
      div {
        color: #333;
        font-size: 14px;
        float: right;
        width: 241px;
      }
    }
  }
}
.hot-sale {
  margin-bottom: 5px;
  border: 1px solid #ddd;
  .title {
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
    border-bottom: 1px solid #ddd;
    background: #f1f1f1;
    color: #333;
    margin: 0;
    padding: 5px 0 5px 15px;
  }
  .hot-list {
    padding: 15px;
    ul {
      display: flex;
      li {
        width: 25%;
        height: 100%;
        .list-wrap {
          .p-img,
          .price,
          .attr,
          .commit {
            padding-left: 15px;
          }
          .p-img {
            img {
              max-width: 100%;
              vertical-align: middle;
              border: 0;
            }
          }
          .attr {
            width: 85%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin-bottom: 8px;
            min-height: 38px;
            cursor: pointer;
            line-height: 1.8;
          }
          .price {
            font-size: 18px;
            color: #c81623;
            strong {
              font-weight: 700;
              i {
                margin-left: -5px;
              }
            }
          }
          .commit {
            height: 22px;
            font-size: 13px;
            color: #a7a7a7;
          }
        }
      }
    }
  }
}
</style>