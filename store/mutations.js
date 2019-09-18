import Vue from 'vue'

import { saveStocks, saveSnapshots } from '@/actions/symbols'
export default {
  setToken(state, authToken) {
    state.authToken = authToken
  },
  setUser(state, user) {
    state.me = user
  },
  setUserId(state, userId) {
    state.userId = userId
  },
  setSymbols(state, { symbol, action, price }) {
    if (action === 'add') {
      if (state.me.stocks) {
        state.me.stocks.push({ symbol, price })
      } else {
        // state.me.stocks = [symbol]
        Vue.set(state.me, 'stocks', [{ symbol, price }])
      }
    } else {
      // remove symbol from stocks list
      const i = state.me.stocks.map((item) => item.symbol).indexOf(symbol) // find index of your object

      state.me.stocks.splice(i, 1) // remove it from array
    }
  },
  updatePosition(state, position) {
    state.me.stocks = [
      ...state.me.stocks.filter(
        (element) => element.symbol !== position.symbol
      ),
      position
    ]
  },
  updatePrices(state, prices) {
    const timestamp = new Date()

    state.lastupdate = timestamp

    prices.forEach((stock) => {
      const i = state.me.stocks
        .map((item) => item.symbol)
        .indexOf(stock['1. symbol']) // find index of your object

      state.me.stocks[i].price = stock['2. price']
    })

    saveStocks({ stocks: state.me.stocks, userId: state.userId, timestamp })
  },
  updateSnapshots(state, snapshot) {
    if (state.me.snapshots) {
      state.me.snapshots.push(snapshot)
    } else {
      // state.me.stocks = [symbol]
      Vue.set(state.me, 'snapshots', [snapshot])
    }

    saveSnapshots({
      snapshots: state.me.snapshots,
      userId: state.userId
    })
  }
}
