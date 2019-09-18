import actions from './actions'
import mutations from './mutations'

const state = () => ({
  authToken: '',
  me: { stocks: [], snapshots: [] },
  userId: ''
})

export const getters = {
  authToken: (state) => {
    return state.authToken
  }
}

export default {
  state,
  actions,
  mutations
}
