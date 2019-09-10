import Vue from 'Vue'
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
  setSymbol(state, symbol) {
    if (state.me.stocks) {
      state.me.stocks.push({ symbol })
    } else {
      // state.me.stocks = [symbol]
      Vue.set(state.me, 'stocks', [symbol])
    }
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

    if (!state.me.firstname) {
      this.$axios
        .post('http://localhost:3333/api/user/getUser', { userId })
        .then((response) => {
          commit('setUser', response.data)
          // Cookie.set('user', response.data)
        })
        .catch((e) => {
          console.log(`error: ${e}`)
        })
    }
  },
  addSymbol({ commit, state }, symbol) {
    // TODO: make sure symbol isn't already in stocks list
    // Update state with new symbol
    commit('setSymbol', symbol)

    // Update database with new array of symbols
    this.$axios.post('http://localhost:3333/api/user/addStock', {
      symbol: state.me.stocks,
      userId: state.userId
    })
  }
}
