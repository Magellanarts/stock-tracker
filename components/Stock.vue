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
      <div v-if="showDetails" class="py-4 leading-tight">
        <div class="flex flex-wrap">
          <div class="text-center w-1/2 sm:w-1/3 lg:w-1/4 mb-4">
            <div class="text-xl font-bold">{{ stock.shares }}</div>
            <div class="text-sm text-gray-800">Shares</div>
          </div>
          <div class="text-center w-1/2 sm:w-1/3 lg:w-1/4 mb-4">
            <div class="text-xl font-bold">{{ percentOfPortfolio }}%</div>
            <div class="text-xs text-gray-800">Percentage of Portfolio</div>
          </div>
          <div class="text-center w-1/2 sm:w-1/3 lg:w-1/4 mb-4">
            <div class="text-xl font-bold">
              ${{ numberFormat(stock.price) }}
            </div>
            <div class="text-sm text-gray-800">Current Price</div>
          </div>
          <div class="text-center w-1/2 sm:w-1/3 lg:w-1/4 mb-4">
            <div class="text-xl font-bold">${{ stock.pricePaid }}</div>
            <div class="text-xs text-gray-800">Original Price Paid</div>
          </div>

          <div
            v-if="stock.datePurchased"
            class="text-center w-1/2 sm:w-1/3 lg:w-1/4 mb-4"
          >
            <div class="text-xl font-bold">{{ stock.datePurchased }}</div>
            <div class="text-sm text-gray-800">Date Puchased</div>
          </div>

          <div class="text-center w-1/2 sm:w-1/3 lg:w-1/4 mb-4">
            <div class="text-xl font-bold">${{ numberFormat(totalValue) }}</div>
            <div class="text-sm text-gray-800">Total value</div>
          </div>
          <div class="text-center w-1/2 sm:w-1/3 lg:w-1/4 mb-4">
            <div
              class="font-bold text-xl"
              :class="percentageChange < 0 ? 'text-red-600' : 'text-green-600'"
            >
              ${{ numberFormat(stock.price - stock.pricePaid) }}
            </div>
            <div class="text-sm text-gray-800">Price change</div>
          </div>
          <div class="text-center w-1/2 sm:w-1/3 lg:w-1/4 mb-4">
            <div
              class="font-bold text-xl"
              :class="percentageChange < 0 ? 'text-red-600' : 'text-green-600'"
            >
              {{ percentageChange }}%
            </div>
            <div class="text-sm text-gray-800">Percentage change</div>
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
    },
    percentageChange() {
      return Number(
        ((this.stock.price - this.stock.pricePaid) / this.stock.pricePaid) * 100
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
  max-height: 250px;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>
