<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="change">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount>0}">
              <i class="iconfont logo-icon" :class="{'highlight': totalCount>0}">&#xe600;</i>
            </div>
            <div class="num" v-show="totalCount">{{totalCount}}</div>
          </div>
          <div class="price border-right" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
          <transition-group
            tag="div"
            name="drop"
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
          >
            <div
              v-for="ball of balls"
              :key="ball.id"
              v-show="ball.show"
              class="ball"
            >
              <div class="innder inner-hook"></div>
            </div>
          </transition-group>
      </div>
      <transition name="fade">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header border-bottom">
            <h1 class="title">购物车</h1>
            <span class="empty">清空</span>
          </div>
          <div class="list-content" ref="listcontent">
            <ul>
              <li class="food border-bottom" v-for="(food, index) of selectFoods" :key="index">
                <div class="name">{{food.name}}</div>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="mask">
      <div class="list-mask" v-show="listShow" @click="change"></div>
    </transition>
  </div>
</template>

<script>
import CartControl from 'components/cartControl/CartControl'
import BScroll from 'better-scroll'
export default {
  name: 'ShopCart',
  props: {
    selectFoods: Array,
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      balls: [{
        show: false,
        id: 1,
        el: null
      }, {
        show: false,
        id: 2,
        el: null
      }, {
        show: false,
        id: 3,
        el: null
      }, {
        show: false,
        id: 4,
        el: null
      }, {
        show: false,
        id: 5,
        el: null
      }],
      dropBalls: [],
      isShow: false
    }
  },
  methods: {
    drop (el) {
      const {balls, dropBalls} = this
      for (let i = 0; i < balls.length; i++) {
        let ball = balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter (el, done) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          // el.style.display = ''
          el.style.transform = `translate3d(0,${y}px,0`
          el.style.webkitTransform = `translate3d(0,${y}px,0`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    enter (el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = 'translate3d(0, 0, 0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterEnter (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
        ball.el = null
      }
    },
    change () {
      if (this.totalCount > 0) {
        this.isShow = !this.isShow
      }
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach(food => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach(food => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow: {
      get () {
        return this.isShow
      },
      set () {
        if (this.totalCount === 0) {
          this.isShow = false
          return false
        }
        return this.isShow
      }
    }
  },
  watch: {
    isShow () {
      if (this.listShow) {
        this.$nextTick(() => {
          if (this.scroll) {
            this.scroll.refresh()
          }
          this.scroll = new BScroll(this.$refs.listcontent, {click: true})
        })
      }
    }
  },
  components: {
    CartControl
  }
}
</script>

<style lang="stylus" scoped>
  @keyframes fade-in {
    0% {
      transform: translate3d(0, 0, 0)
    }
    100% {
      transform: translate3d(0, -100%, 0)
    }
  }
  &.fade-enter-active
    animation: fade-in  .5s
  &.fade-leave-active
    animation: fade-in .5s reverse
  .shopcart
    position fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: .96rem
    font-size: 0
    .content
      display: flex
      background: #141d27
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -.2rem
          margin: 0 .24rem
          padding: .12rem
          width: 1.12rem
          height: 1.12rem
          box-sizing: border-box
          border-radius: 50%
          vertical-align: top
          background: #141d27
          .num
            position: absolute
            top: 0
            right: 0
            width: .5rem
            height: .32rem
            line-height: .32rem
            text-align: center
            border-radius: .32rem
            font-size: .18rem
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 .08rem .16rem 0 rgba(0, 0, 0, .4)
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align center
            &.highlight
              background: rgb(0, 160, 220)
            .logo-icon
              font-size: .48rem
              line-height: .88rem
              color: #80858a
              &.highlight
                color: #fff
        .price
          display: inline-block
          vertical-align: top
          line-height: .48rem
          margin-top: .24rem
          padding-right: .24rem
          box-sizing: border-box
          font-size: .38rem
          font-weight: 700
          color: #80858a
          &.highlight
            color: #fff
          &.border-right
            &:before
              border-color: #80858a
        .desc
          display: inline-block
          vertical-align: top
          line-height: .48rem
          margin: .24rem 0 0 .24rem
          font-size: .2rem
          color: #80858a
      .content-right
        flex: 0 0 2.1rem
        width: 2.1rem
        .pay
          font-size: .24rem
          line-height: .96rem
          height: .96rem
          text-align: center
          color: #80858a
          font-weight: 700
          background #2b333b
          &.not-enough
            background #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: .64rem
        bottom: .44rem
        z-index: 200
        &.drop-enter-active
          transition: all .3s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .innder
          width: .32rem
          height: .32rem
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition all .3s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      .list-header
        line-height: .82rem
        height: .82rem
        padding: 0 .36rem
        background: #f3f5f7
        .title
          float: left
          font-size: .28rem
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: .24rem
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 .36rem
        max-height: 4.34rem
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: .24rem 0
          box-sizing: border-box
          .name
            font-size: .28rem
            line-height: .48rem
            font-weight: 700
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 1.8rem
            bottom: .24rem
            line-height: .48rem
            font-weight: 700
            color: rgb(240, 20 ,20)
          .cartcontrol-wrapper
            position: absolute
            right: 0rem
            bottom: .12rem
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter blur(10px)
    background rgba(7, 17, 27, 0.6)
    &.mask-enter, .mask-leave-to
      opacity: 0
      background rgba(7, 17, 27, 0)
    &.mask-enter-active, .mask-leave-active
      transition: all .5s
</style>
