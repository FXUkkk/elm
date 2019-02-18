<template>
 <transition>
    <div v-show="showFlag" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div @click.stop="hide" class="back">
            <i class="iconfont">&#xe601;</i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">
              月售{{food.sellCount}}份
            </span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cart-control @animate="_drop" v-if="food.count" :food="food"></cart-control>
          </div>
          <transition name="fade">
            <div @click.stop="addFirst" class="buy" v-show="!food.count || food.count === 0">
              加入购物车
            </div>
          </transition>
        </div>
        <split v-if="food.info"></split>
        <div class="info" v-if="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating-select @onlyContentSelect="onlyContentSelect" @ratingtypeSelect="ratingtypeSelect" :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc"></rating-select>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li
                v-for="(rating, index) of food.ratings"
                :key="index"
                class="rating-item border-bottom"
                v-show="needShow(rating.rateType, rating.text)"
              >
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
                </div>
                <div class="time">{{rating.rateTime | date-format}}</div>
                <p class="text">
                  <i class="iconfont" :class="rating.rateType ===0 ? 'high' : 'dark'">{{rating.rateType ===0 ? '&#xe60f;' : '&#xe6e3;'}}</i>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import CartControl from 'components/cartControl/CartControl'
import Split from 'components/split/Split'
import RatingSelect from 'components/ratingselect/RatingSelect'

const ALL = 2

export default {
  name: 'GoodsFood',
  props: {
    food: Object
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  components: {
    CartControl,
    Split,
    RatingSelect
  },
  methods: {
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return this.selectType === type
      }
    },
    ratingtypeSelect (type) {
      this.selectType = type
    },
    onlyContentSelect () {
      this.onlyContent = !this.onlyContent
    },
    _drop (target) {
      this.$emit('animate', target)
    },
    addFirst (e) {
      this.$set(this.food, 'count', 1)
      this.$emit('animate', e.target)
    },
    show () {
      this.selectType = ALL
      this.onlyContent = true
      this.showFlag = true
      this.$nextTick(() => {
        if (this.scroll) {
          this.scroll.refresh()
        }
        this.scroll = new BScroll('.food', {click: true})
      })
    },
    hide () {
      this.showFlag = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @keyframes fade-in {
    0% {
      opacity: 0
      transfrom: translate3d(0, 0, 0)
    }
    100% {
      opacity: 1
      transfrom: translate3d(100% , 0 ,0)
    }
  }
  .fade-enter, .fade-leave-to
    opacity: 0
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .food
    position: fixed
    top: 0
    left: 0
    bottom: .96rem
    z-index: 30
    width: 100%
    background: #fff
    transfrom: translate3d(100% , 0 ,0)
    &.v-enter-active
      animation: fade-in  .5s
    &.v-leave-active
      animation: fade-in .5s reverse
    .food-content
      .image-header
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position: absolute
          top: .2rem
          left: 0
          .iconfont
            display: block
            padding: .2rem
            font-size: .4rem
            color: #fff
      .content
        padding: .36rem
        position: relative
        .title
          font-size: .28rem
          font-weight: 700
          line-height: .28rem
          margin-bottom: .16rem
          color: rgb(7, 17, 27)
        .detail
          margin-bottom: .36rem
          line-height: .2rem
          font-size: 0
          height: .2rem
          .sell-count, .rating
            font-size: .2rem
            color: rgb(147, 153, 159)
          .sell-count
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
        .cartcontrol-wrapper
          position: absolute
          right: .24rem
          bottom: .24rem
        .buy
          position: absolute
          right: .36rem
          bottom: .36rem
          z-index: 10
          height: .48rem
          line-height: .48rem
          padding: 0 .24rem
          box-sizing: border-box
          font-size: .2rem
          border-radius: .24rem
          color: #ffffff
          background: rgb(0, 160, 220)
      .info
        padding: .36rem
        .title
          line-height: .28rem
          margin-bottom: .12rem
          font-size: .28rem
          color: rgb(7, 17, 27)
        .text
          line-height: .48rem
          padding: 0 .16rem
          font-size: .24rem
          color: rgb(77, 85, 93)
      .rating
        padding-top: .36rem
        .title
          line-height: .28rem
          margin-left: .36rem
          font-size: .28rem
          color: rgb(7, 17, 27)
        .rating-wrapper
          padding: 0 .36rem
          .rating-item
            position: relative
            padding: .32rem 0
            &.border-bottom
              &:before
                border-color: rgba(7, 17, 27, 0.1)
            .user
              position: absolute
              right: 0
              top: .32rem
              font-size: 0
              line-height: .24rem
              .name
                display: inline-block
                vertical-align: top
                font-size: .2REM
                color: rgb(147, 153, 159)
                margin-right: .12rem
              .avatar
                border-radius: 50%
            .time
              margin-bottom: .12rem
              line-height: .32rem
              font-size: .2rem
              color: rgb(147, 153, 159)
            .text
              font-size: .24rem
              color: rgb(7, 17, 27)
              line-height: .32rem
              .iconfont
                margin-right: .08rem
                font-size: .24rem
                color: rgb(7, 17, 27)
                line-height: .32rem
                &.high
                  color: rgb(0, 160, 220)
          .no-rating
            padding: .38rem 0
            font-size: .24rem
            color: rgb(147, 153, 159)
</style>
