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
          <h4 class="text-xl mb-4 text-blue-500">
            Total Value:
            <span class="text-green-500">${{ totalValue }}</span>
          </h4>
          <div class="border-t border-b py-2 text-right mb-6">
            <button
              type="button"
              class="rounded-sm p-1 px-2 text-sm bg-orange-400 text-white font-bold hover:bg-orange-300"
              @click="refreshPrices"
            >
              Refresh
            </button>
          </div>
          <div v-if="me.stocks">
            <stock
              v-for="stock in sortedStocks"
              :key="stock.symbol"
              class="shadow-md p-4 justify-between mb-6"
              :stock="stock"
              :total-portfolio-value="totalValue"
              @update-current-position="onUpdateCurrentPosition"
            />
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
import { numbers } from '@/mixins/formatting'
import SymbolForm from '@/components/SymbolForm'
import EditPosition from '@/components/EditPosition'
import Stock from '@/components/Stock'

export default {
  components: {
    SymbolForm,
    EditPosition,
    Stock
  },
  mixins: [numbers],
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
    },
    totalValue() {
      let value = 0

      this.me.stocks.forEach((stock) => {
        if (stock.shares && stock.price) value += stock.price * stock.shares
      })

      return this.numberFormat(value)
    }
  },
  async mounted() {
    await this.getUser()
  },
  methods: {
    ...mapActions(['getUser', 'refreshPrices']),
    onUpdateCurrentPosition(position) {
      this.editActive = true
      this.currentPosition = position
    }
  }
}
</script>
