import Vue from 'Vue'
import { saveStocks, getQuotes } from '@/actions/symbols'
const Cookie = process.client ? require('js-cookie') : undefined
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  authToken: '',
  me: { stocks: [] },
  userId: ''
})

export const getters = {
  authToken: (state) => {
    return state.authToken
  }
}

export const mutations = {
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
    prices.forEach((stock) => {
      const i = state.me.stocks
        .map((item) => item.symbol)
        .indexOf(stock['1. symbol']) // find index of your object

      state.me.stocks[i].price = stock['2. price']
    })

    saveStocks({ stocks: state.me.stocks, userId: state.userId })
  }
}

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req }) {
    let auth = null
    let userId = null

    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)

      auth = parsed.authToken
      userId = parsed.userId
    }
    commit('setUserId', userId)
    commit('setToken', auth)
  },
  userLogin({ commit }, data) {
    commit('setUserId', data.userId)
    commit('setToken', data.token)

    Cookie.set('authToken', data.token)
    Cookie.set('userId', data.userId)
  },
  getUser({ commit, state }) {
    const userId = state.userId

    return new Promise((resolve, reject) => {
      // check to see if we already have values for user in state
      // if not, pull from database
      if (!state.me.firstname) {
        this.$axios
          .post(`${process.env.API_URL}user/getUser`, { userId })
          .then((response) => {
            commit('setUser', response.data)
            resolve(response.data)
          })
          .catch((e) => {
            console.log(`error: ${e}`)
            reject(e)
          })
      }
    })
  },
  updateSymbols({ commit, state }, payload) {
    // TODO: make sure symbol isn't already in stocks list
    // Update state with new symbol

    commit('setSymbols', payload)
    // Update database with new array of symbols
    saveStocks(state.me.stocks, state.userId)
  },
  editPosition({ commit, state }, position) {
    commit('updatePosition', position)
    // Update database with new array of symbols
    saveStocks(state.me.stocks, state.userId)
  },
  async refreshPrices({ commit, state }) {
    // create blank symbols array
    let symbols = []
    // loop through all stocks getting their symbols and storing in array
    state.me.stocks.forEach((stock) => {
      symbols.push(stock.symbol)
    })

    // convert array to string to pass to stocks api
    symbols = symbols.toString()

    // get prices back
    const prices = await getQuotes(symbols)

    // send new prices to mutation to update state
    commit('updatePrices', prices)
  }
}
