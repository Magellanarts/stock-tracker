<template>
  <div>
    <div class="container mx-auto px-6">
      <h1 class="text-center my-8 text-5xl text-blue-900">Dashboard</h1>

      <h2 class="text-4xl my-4 text-blue-700">
        Welcome {{ me.firstname }} {{ me.lastname }}
      </h2>

      <div class="md:flex md:mr-8">
        <div class="md:w-7/12 mb-12">
          <h3 class="text-2xl mb-4 text-blue-600">Your Stocks</h3>
          <div v-if="me.stocks">
            <div
              v-for="stock in sortedStocks"
              :key="stock.symbol"
              class="shadow-md p-4 justify-between mb-6"
            >
              <div
                class="border-b border-blue-600 pb-2 justify-between flex items-center"
              >
                <div class="text-lg text-blue-800">
                  {{ stock.symbol }} -
                  <span class="text-sm text-blue-700">${{ stock.price }}</span>
                </div>

                <div class="flex justify-around items-center">
                  <button
                    type="button"
                    class="rounded-sm p-1 px-2 text-sm bg-red-400 text-white font-bold hover:bg-red-300"
                    @click="
                      updateSymbols({
                        symbol: stock.symbol,
                        action: 'remove'
                      })
                    "
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    class="rounded-sm p-1 px-2 text-sm bg-blue-400 text-white font-bold hover:bg-blue-300 ml-2"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    class="rounded-sm p-1 px-2 text-sm bg-gray-400 text-white font-bold hover:bg-gray-300 ml-2"
                    @click="updateCurrentPosition(stock)"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="md:w-5/12 md:ml-8">
          <symbol-form />
        </div>
      </div>
    </div>
    <edit-position
      v-if="editActive && currentPosition"
      :position="currentPosition"
      :edit-active.sync="editActive"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SymbolForm from '@/components/SymbolForm'
import EditPosition from '@/components/EditPosition'

export default {
  components: {
    SymbolForm,
    EditPosition
  },
  data() {
    return {
      editActive: false,
      currentPosition: {}
    }
  },
  middleware: 'authenticated',
  computed: {
    ...mapState({
      me: (state) => state.me
    }),
    sortedStocks() {
      let localStocks = []
      if (this.me.stocks) {
        localStocks = [...this.me.stocks]

        localStocks.sort(function(a, b) {
          const textA = a.symbol.toUpperCase()
          const textB = b.symbol.toUpperCase()
          return textA < textB ? -1 : textA > textB ? 1 : 0
        })
      }

      return localStocks
    }
  },
  async mounted() {
    await this.getUser()
  },
  methods: {
    ...mapActions(['getUser', 'updateSymbols']),
    updateCurrentPosition(position) {
      this.editActive = true
      this.currentPosition = position
    }
  }
}
</script>
