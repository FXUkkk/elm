<template>
  <div class="cartcontrol">
    <transition name="decresa">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart">
        <i class="iconfont iconadd">&#xe610;</i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop="addCart">
      <i class="iconfont iconadd">&#xe674;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartControl',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (e) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.$emit('animate', e.target)
        if (!this.food.count) {
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      }, 17)
    },
    decreaseCart () {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .decresa-enter-active
    transition: all .4s ease
  .decresa-leave-active
    transition: all .4s linear
  .decresa-enter, .decresa-leave-to
    opacity: 0
    transform: translate3d(.28rem, 0 , 0) rotate(100deg)
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: .12rem
      .iconadd
        line-height: .48rem
        font-size: .48rem
        color: rgb(0, 160, 220)
    .cart-count
      display: inline-block
      width: .24rem
      vertical-align: top
      padding-top: .12rem
      line-height: .48rem
      text-align center
      font-size: .2rem
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: .12rem
      .iconadd
        line-height: .48rem
        font-size: .48rem
        color: rgb(0, 160, 220)
</style>
