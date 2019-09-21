<template>
  <div class="shadow p-3 mb-2">
    <div class="flex justify-between sm:flex sm:items-center">
      <div class="text-gray-800 text-xs leading-tight">
        <span>{{ updateTime(snapshot.timestamp) }}</span>
        -
        <span class="text-green-700"
          >${{ numberFormat(snapshot.totalValue) }}</span
        >
      </div>
      <button
        type="button"
        class="rounded-sm p-1 px-2 text-sm bg-blue-400 text-white font-bold hover:bg-blue-300 ml-2"
        @click="showDetails = !showDetails"
      >
        Details
      </button>
    </div>
    <transition name="fadeHeight" mode="out-in">
      <div v-if="showDetails">
        <div class="text-green-700 text-xl">
          ${{ numberFormat(snapshot.totalValue) }}
        </div>
        <div v-for="stock in snapshot.stocks" :key="stock.symbol">
          {{ stock.symbol }} - ${{ numberFormat(stock.price) }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { dates, numbers } from '@/mixins/formatting'
export default {
  mixins: [dates, numbers],
  props: {
    snapshot: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showDetails: false
    }
  }
}
</script>
