<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menusx">
      <ul>
        <li
          v-for="(item, index) of goods"
          :key="index"
          class="menu-item"
          :class="{'current': currentIndex===index}"
          @click="selectMenu(index)"
        >
          <span class="text  border-bottom">
            <span
              v-show="item.type>0"
              class="icon"
              :class="classmap[item.type]"
            >
            </span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodssx">
      <ul>
        <li
          v-for="(item, index) of goods"
          :key="index"
          class="food-list food-list-hook"
        >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li
              v-for="(food, index) of item.foods"
              :key="index"
              @click.stop="selectFood(food)"
              class="food-item border-bottom"
            >
              <div class="icon">
                <img class="icon-img" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name"> {{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="carcontrol-wrapper">
                  <cart-control :food="food" @animate="_drop"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart
      ref="shopcart"
      :selectFoods="selectFoods"
      :deliveryPrice="seller.deliveryPrice"
      :minPrice="seller.minPrice"
    ></shop-cart>
    <goods-food @animate="_drop" :food="selectedFood" :goods="goods" ref="showFood"></goods-food>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import ShopCart from 'components/ShopCart/ShopCart'
import CartControl from 'components/cartControl/CartControl'
import GoodsFood from 'components/food/GoodsFood'
export default {
  name: 'Goods',
  props: {
    seller: Object
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  components: {
    ShopCart,
    CartControl,
    GoodsFood
  },
  computed: {
    currentIndex () {
      const {listHeight, scrollY} = this
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (!height2 || (scrollY >= height1 && scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    selectFood (food) {
      this.selectedFood = food
      this.$refs.showFood.show()
    },
    getGoodsInfo () {
      axios.get('/api/goods.json')
        .then(this.getGoodsInfoSucc)
    },
    getGoodsInfoSucc (res) {
      res = res.data
      if (res.ret && res.goods) {
        const goods = res.goods
        this.goods = goods
        this.$nextTick(() => {
          this.initScroll()
          this.caculateHight()
        })
      }
    },
    initScroll () {
      this.menuScroll = new BScroll(this.$refs.menusx, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodssx, {
        probeType: 3,
        click: true
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    caculateHight () {
      const listHeight = []
      let height = 0
      listHeight.push(height)
      const lis = this.$refs.foodssx.getElementsByClassName('food-list-hook')
      Array.prototype.slice.call(lis).forEach(item => {
        height += item.clientHeight
        listHeight.push(height)
      })
      this.listHeight = listHeight
    },
    selectMenu (index) {
      const el = this.$refs.foodssx.getElementsByClassName('food-list-hook')[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    _drop (target) {
      this.$refs.shopcart.drop(target)
    }
  },
  created () {
    this.classmap = ['decrease', 'discount', 'guarantee',
      'invoice', 'special']
  },
  mounted () {
    this.getGoodsInfo()
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    overflow: hidden
    position: absolute
    top: 3.48rem
    bottom: .98rem
    width: 100%
    .menu-wrapper
      flex: 0 0 1.6rem
      width: 1.6rem
      background: #f3f5f7
      .menu-item
        display: table
        height: 1.08rem
        width: 1.12
        line-height: .28rem
        padding: 0 .24rem
        &.current
          position: relative
          z-index: 10
          font-weight: 700
          margin-top: -.02rem
          background: #fff
        .icon
          display: inline-block
          vertical-align: top
          width: .24rem
          height: .24rem
          margin-right: .04rem
          background-size: .24rem .24rem
          background-repeat: no-repeat
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('discount_3')
          &.guarantee
            bg-img('guarantee_3')
          &.invoice
            bg-img('invoice_3')
          &.special
            bg-img('special_3')
        .text
          display: table-cell
          width: 1.12rem
          font-size: .24rem
          vertical-align: middle
          &.border-bottom
            &:before
              border-color: #e5e5e5
    .foods-wrapper
      flex: 1
      .title
        padding-left: .28rem
        height: .52rem
        line-height: .52rem
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: .36rem .36rem 0 .36rem
        padding-bottom: .36rem
        &:last-child
           &.border-bottom
            &:before
              display: none
        &.border-bottom
          &:before
            border-color: #e5e5e5
        .icon
          flex: 0 0 1.14rem
          margin-right: .2rem
          .icon-img
            width: 1.14rem
            height: 1.14rem
        .content
          flex: 1
          .name
            line-height: .28rem
            height: .28rem
            font-size: .28rem
            margin: .04rem 0 .16rem 0
            color: rgb(7, 17, 27)
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
          .desc, .extra
            line-height: .2rem
            font-size: .2rem
            color: rgb(147, 153, 159)
          .desc
            line-height: .24rem
            margin-bottom: .16rem
          .extra
            .count
              margin-right: .24rem
          .price
            font-weight: 700
            line-height: .48rem
            .now
              margin-right: .16rem
              font-size: .28rem
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              color: rgb(147, 153, 159)
              font-size: .2rem
          .carcontrol-wrapper
            position: absolute
            right: 0
            bottom: .18rem
</style>
