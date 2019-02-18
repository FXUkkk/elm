import {
  RECEIVE_GOODS,
  RECEIVE_SELLER
} from './mutations-types'

export default {
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_SELLER] (state, {seller}) {
    state.seller = seller
  }
}
