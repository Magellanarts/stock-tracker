<template>
  <div class="shadow-md p-4 justify-between mb-6">
    <div
      class="border-b border-blue-600 pb-2 justify-between sm:flex sm:items-center"
    >
      <div class="text-lg text-blue-800 mb-2 sm:mb-0">
        {{ stock.symbol }} -
        <span class="text-sm text-blue-700"
          >${{ numberFormat(stock.price) }}</span
        >
      </div>

      <div class="flex sm:justify-around sm:items-center">
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
          @click="showDetails = !showDetails"
        >
          Details
        </button>
        <button
          type="button"
          class="rounded-sm p-1 px-2 text-sm bg-gray-400 text-white font-bold hover:bg-gray-300 ml-2"
          @click="updatePosition(stock)"
        >
          Edit
        </button>
      </div>
    </div>
    <transition name="fadeHeight" mode="out-in">
      <div v-if="showDetails" class="py-2">
        <div>
          <div>
            <span>Shares:</span>
            <span>{{ stock.shares }}</span>
          </div>
          <div>
            <span>Percentage of Portfolio:</span>
            <span>{{ percentOfPortfolio }}%</span>
          </div>
          <div>
            <span>Current Price:</span>
            <span>{{ numberFormat(stock.price) }}</span>
          </div>
          <div>
            <span>Original Price Paid:</span>
            <span>${{ stock.pricePaid }}</span>
          </div>

          <div v-if="stock.datePurchased">
            <span>Date Puchased:</span>
            <span>{{ stock.datePurchased }}</span>
          </div>

          <div>
            <span>Total value:</span>
            <span>${{ numberFormat(totalValue) }}</span>
          </div>
          <div>
            <span>Price change:</span>
            <span>{{ numberFormat(stock.price - stock.pricePaid) }}</span>
          </div>
          <div>
            <span>Percentage change:</span>
            <span>
              {{
                Number(
                  ((stock.price - stock.pricePaid) / stock.pricePaid) * 100
                ).toFixed(2)
              }}%
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { numbers } from '@/mixins/formatting'
export default {
  mixins: [numbers],
  props: {
    stock: {
      type: Object,
      required: true
    },
    totalPortfolioValue: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showDetails: true
    }
  },
  computed: {
    totalValue() {
      return this.stock.price * this.stock.shares
    },
    percentOfPortfolio() {
      return Number(
        this.totalValue / parseFloat(this.totalPortfolioValue) / 10
      ).toFixed(2)
    }
  },
  methods: {
    ...mapActions(['updateSymbols']),
    updatePosition(position) {
      this.$emit('update-current-position', position)
    }
  }
}
</script>

<style>
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.2s;
  max-height: 230px;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>
