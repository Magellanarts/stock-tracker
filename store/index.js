import Vue from 'Vue'
import { reject } from 'q'
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

    return new Promise((resolve) => {
      // check to see if we already have values for user in state
      // if not, pull from database
      if (!state.me.firstname) {
        this.$axios
          .post('http://localhost:3333/api/user/getUser', { userId })
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
    this.$axios.post('http://localhost:3333/api/user/updateStocks', {
      symbol: state.me.stocks,
      userId: state.userId
    })
  },
  editPosition({ commit, state }, position) {
    commit('updatePosition', position)
    // Update database with new array of symbols
    this.$axios.post('http://localhost:3333/api/user/updateStocks', {
      symbol: state.me.stocks,
      userId: state.userId
    })
  }
}
