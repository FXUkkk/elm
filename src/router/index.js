import Vue from 'vue'
import Router from 'vue-router'
import Goods from 'components/goods/Goods.vue'
import Ratings from 'components/ratings/Ratings.vue'
import Seller from 'components/seller/Seller.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: {
        path: '/goods'
      }
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ]
})
