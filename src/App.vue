<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-bottom">
      <router-link to="/goods" tag="div" class="table-item">商品</router-link>
      <router-link to="/ratings" tag="div" class="table-item">评论</router-link>
      <router-link to="/seller" tag="div" class="table-item">商家</router-link>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import vHeader from 'components/header/Header'
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      seller: {}
    }
  },
  components: {
    vHeader
  },
  methods: {
    getSellInfo () {
      axios.get('/api/seller.json')
        .then(this.getSellInfoSucc)
    },
    getSellInfoSucc (res) {
      res = res.data
      if (res.ret && res.seller) {
        const data = res.seller
        this.seller = data
      }
    }
  },
  mounted () {
    this.getSellInfo()
  }
}
</script>

<style lang="stylus" scoped>
  .border-bottom
    &:before
      border-color: #e5e5e5
  .tab
    display: flex
    width: 100%
    height: .8rem
    line-height: .8rem
    .table-item
      flex: 1
      text-align center
      font-size: .28rem
      color: rgb(77, 85, 93)
      &.active
        color: rgb(240, 20, 20)
</style>
