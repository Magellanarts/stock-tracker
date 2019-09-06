export default function({ $axios, store }) {
  $axios.onRequest((config) => {
    if (store.state.authToken) {
      config.headers.common.authToken = store.state.authToken
    }
  })
}
