const Cookie = process.client ? require('js-cookie') : undefined
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  authToken: '',
  me: '',
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
  }
}

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req }) {
    let auth = null

    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)

      auth = parsed.authToken
    }
    commit('setToken', auth)
  },
  userLogin({ commit }, data) {
    commit('setUserId', data.userId)
    commit('setToken', data.token)

    Cookie.set('authToken', data.token)
    Cookie.set('userId', data.userId)
  },
  getUser({ commit, state }) {
    const userId = Cookie.get('userId')

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
}
