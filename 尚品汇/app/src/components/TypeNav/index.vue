<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="isShow">
          <div class="all-sort-list2" @click.prevent="goSearch($event)">
            <div class="item" v-for="(category, index) in categoryList" :key="category.categoryId" :class="{cur: currentIndex === index}">
              <h3 @mouseenter="changeIndex(index)">
                <a :data-categoryname="category.categoryName" :data-category1id="category.categoryId">{{category.categoryName}}</a>
              </h3>
              <div class="item-list clearfix" :style="{display: currentIndex===index?'block':'none'}">
                <div class="subitem" v-for="c2 in category.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryname="c2.categoryName" :data-category2id="c2.categoryId">{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryname="c3.categoryName" :data-category3id="c3.categoryId">{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// 按需加载throttle函数，throttle回调函数别用箭头函数，可能出现this问题
import throttle from 'lodash/throttle'

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      isShow: true,
    }
  },
  mounted() {
    // this.$store.dispatch('home/categoryList') 模块store写了namespaced

    // 当路由不是Home时，isShow变为false
    if (this.$route.path !== '/home') {
      this.isShow = false
    }
  },
  computed:{
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      // 注入一个参数state，其实即为大仓库中的数据
      categoryList: state => state.home.categoryList
    })
  },
  methods: {
    changeIndex: throttle(function(index) {
      this.currentIndex = index
    }, 100),
    leaveIndex() {
      this.currentIndex = -1
      if (this.$route.path !== '/home') {
        this.isShow = false
      }
    },
    goSearch(event) {
      // 最好的解决方案：编程式导航+事件委派
      // 使用事件委派的问题：1.点击一定是a标签 2.如何获取参数（三级分类的产品名字、id）
      // 把子节点当中a标签加上自定义属性data-categoryName，其余h3,dt子节点没有
      // 节点有一个dataset属性，可以获取节点的自定义属性，属性名全部变为小写。有categoryname属性的一定是a标签
      const element = event.target
      const { categoryname, category1id, category2id, category3id } = element.dataset
      if (categoryname) {
        // 整理路由跳转的参数
        const location = { path:'/search'}
        const query = { categoryname }
        // 区分一二三级的a标签
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        location.query = query

        if (this.$route.params) {
          location.params = this.$route.params
        }
        console.log(location)
        this.$router.push(location)
      }
    },
    // 当鼠标移入入，显示一级菜单
    enterShow() {
      this.isShow = true
    }
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        
        .item {
          h3 {
            line-height: 27.5px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        // .item:hover {
        //   background: skyblue;
        // }

        .cur {
          background: skyblue;
        }
      }
    }

    // 过渡动画样式
    .sort-enter {
      height: 0px;
      // transform: rotate(0deg);
    }
    .sort-enter-to {
      height: 461px;
      // transform: rotate(360deg);
    }
    .sort-enter-active {
      transition: all 0.3s linear;
    }
  }
}
</style>