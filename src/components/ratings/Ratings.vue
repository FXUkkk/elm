<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overflow">
        <div class="overview-left border-right">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="scroe-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore" class="satr"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="scroe-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore" class="satr"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select @onlyContentSelect="onlyContentSelect" @ratingtypeSelect="ratingtypeSelect" :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc"></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType, rating.text)" v-for="(rating, index) of ratings" :key="index" class="rating-item border-bottom">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :store="rating.store" class="star"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="iconfont" :class="rating.rateType ===0 ? 'high' : 'dark'">{{rating.rateType ===0 ? '&#xe60f;' : '&#xe6e3;'}}</span>
                <span :key="index" class="item border" v-for="(item, index) of rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime  | date-format}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Star from 'components/star/Star'
import axios from 'axios'
import Split from 'components/split/Split'
import RatingSelect from 'components/ratingselect/RatingSelect'
import BScroll from 'better-scroll'

const ALL = 2

export default {
  name: 'Ratings',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      ratings: [],
      desc: {
        all: '全部',
        positive: '满意',
        negative: '不满意'
      }
    }
  },
  components: {
    Star,
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
    getGoodsInfo () {
      axios.get('/api/data.json')
        .then(this.getGoodsInfoSucc)
    },
    getGoodsInfoSucc (res) {
      res = res.data
      if (res.ret && res.ratings) {
        const data = res.ratings
        this.ratings = data
        this.$nextTick(() => {
          this.scroll = new BScroll('.ratings', {
            click: true
          })
        })
      }
    }
  },
  mounted () {
    this.getGoodsInfo()
  }
}
</script>

<style lang="stylus" scoped>
  .ratings
    position: absolute
    top: 3.48rem
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overflow
      display: flex
      padding: .36rem 0
      .overview-left
        flex: 0 0 2.74rem
        width: 2.74rem
        padding: .12rem 0
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          line-height: .56rem
          height: .48rem
          color: rgb(255, 153, 0)
          margin-bottom: .12rem
          font-size: 24px
        .title
          line-height: .14rem
          font-size: .24rem
          color: rgb(7, 17, 27)
          margin-bottom: .16rem
        .rank
          line-height: .20rem
          font-size: .2rem
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: .12rem 0 .12rem .48rem
        @media only screen and (max-width: 320px)
          padding-left: .12rem
        .scroe-wrapper
          line-height: .36rem
          margin-bottom: .16rem
          font-size: 0
          .title
            font-size: .24rem
            line-height: .36rem
            color: rgb(7, 17, 27)
            display: inline-block
            vertical-align: top
            margin-right: .24rem
          .satr
            display: inline-block
            vertical-align: top
            margin-right: .24rem
          .score
            display: inline-block
            vertical-align: top
            font-size: .24rem
            color: rgb(255, 153, 0)
            line-height: .36rem
        .delivery-wrapper
          font-size: 0
          .title
            font-size: .24rem
            line-height: .36rem
            color: rgb(7, 17, 27)
            display: inline-block
            margin-right: .24rem
          .delivery
            font-size: .24rem
            line-height: .36rem
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding:  0 .36rem
      .rating-item
        display: flex
        padding: .36rem 0
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: .24rem
          img
            border-radius: 50%
        .content
          flex: 1
          position: relative
          .name
            line-height: .24rem
            color: rgb(7, 17, 27)
            font-size: .2rem
            margin-bottom: .08rem
          .star-wrapper
            margin-bottom: .12rem
            font-size: 0
            .star
              margin-right: .12rem
              display: inline-block
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              font-size: .2rem
              line-height: .24rem
              color: rgb(147, 153, 159)
          .text
            margin-bottom: .16rem
            line-height: .36rem
            font-size: .24rem
            color: rgb(7, 17, 27)
          .recommend
            font-size: 0
            line-height: .32rem
            .iconfont, .item
              font-size: .18rem
              margin: 0 .16rem .08rem 0
              display: inline-block
              &.high
                color: rgb(0, 160, 220)
              &.dark
                color: rgb(183, 187, 191)
            .item
              color: rgb(147, 153, 159)
              padding: .05rem .12rem
              border-radius: .02rem
          .time
            position: absolute
            right: 0
            top: 0
            font-size: .2rem
            line-height: .24rem
            color: rgb(147, 153, 159)
</style>
