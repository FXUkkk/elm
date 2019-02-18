<template>
  <div class="ratingselect">
    <div class="rating-type border-bottom">
      <span @click="selected(2)" class="block positive" :class="{'active':selectType === 2}">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span @click="selected(0)" class="block positive" :class="{'active':selectType === 0}">
        {{desc.positive}}
        <span class="count">{{positive.length}}</span>
      </span>
      <span @click="selected(1)" class="block negative" :class="{'active':selectType === 1}">
        {{desc.negative}}
        <span class="count">{{negative.length}}</span>
      </span>
    </div>
    <div @click="toggleContent" class="switch border-bottom" :class="{'on':onlyContent}">
      <span class="iconfont">&#xe725;</span>
      <span class="text">只看有评论的评价</span>
    </div>
  </div>
</template>

<script>

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  name: 'RatingSelect',
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  methods: {
    selected (type) {
      this.$emit('ratingtypeSelect', type)
    },
    toggleContent () {
      this.$emit('onlyContentSelect')
    }
  },
  computed: {
    positive () {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE
      })
    },
    negative () {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .ratingselect
    .rating-type
      padding: .36rem 0
      margin: 0 .36rem
      font-size: 0
      .block
        display: inline-block
        padding: .16rem .24rem
        border-radius: .02rem
        margin-top: .16rem
        font-size: .24rem
        color: rgb(77, 85, 93)
        margin-right: .16rem
        line-height: .32rem
        &.active
          color: #ffffff
        .count
          font-size: .16rem
          margin-left: .04rem
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 96, 0.2)
          &.active
            background: rgb(77, 85, 96)
    .switch
      padding: .24rem .36rem
      line-height: .48rem
      color: rgb(144, 153, 159)
      font-size: 0
      &.on
        .iconfont
          color: #00c850
      .iconfont
        font-size: .48rem
        margin-right: .08rem
        vertical-align: top
      .text
        font-size: .24rem
</style>
