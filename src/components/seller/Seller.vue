<template>
  <div class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-bottom">
          <star class="star" :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block border-right">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block border-right">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
      </div>
    </div>
    <split></split>
  </div>
</template>

<script>
import Star from 'components/star/Star'
import Split from 'components/split/Split'
export default {
  name: 'Seller',
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    Star,
    Split
  }
}
</script>

<style lang="stylus" scoped>
  .seller
    position: absolute
    top: 0
    left: 0
    top: 3.48rem
    width: 100%
    .overview
      padding: .36rem
      .title
        line-height: .28rem
        font-size: .28rem
        color: rgb(7, 17, 27)
        margin-bottom: .16rem
        padding: .36rem
      .desc
        font-size: 0
        padding-bottom: .36rem
        .text
          display: inline-block
          vertical-align: top
          line-height: .36rem
          margin-right: .24rem
          color: rgb(77, 85, 93)
          font-size: .2rem
        .star
          display: inline-block
          vertical-align: top
          margin-right: .16rem
      .remark
        display: flex
        padding: .36rem
        .block
          flex: 1
          text-align: center
          h2
            margin-bottom: .12rem
            line-height: .2rem
            font-size: .2rem
            color: rgb(147, 153, 159)
          .content
            line-height: .28rem
            font-size: .2rem
            color: rgb(7, 17, 27)
            .stress
              font-size: .48rem

</style>
