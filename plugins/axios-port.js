import { setClient } from '@/actions/symbols'

export default ({ app, store }) => {
  setClient(app.$axios)
}
