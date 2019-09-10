<template>
  <div class="my-2">
    <form @submit.prevent="searchSymbols">
      <fieldset>
        <label for="symbol_search" class="invisible hidden"
          >Search for symbol</label
        >
        <input
          v-model="searchField"
          name="symbol_search"
          class="w-64 border-pink-900 border-solid border rounded-sm p-1 hover:border-pink-700 focus:border-pink-700 outline-none h-8"
          type="text"
          placeholder="Search by symbol"
        />
        <button
          type="submit"
          :disabled="!searchField"
          class="rounded-sm p-1 px-4 bg-pink-900 text-white h-8 hover:bg-pink-700 font-bold"
        >
          Submit
        </button>
      </fieldset>
      <div class="text-gray-600 text-sm py-2">
        Separate symbols with a comma
      </div>
    </form>

    <div
      v-for="result in searchResults"
      :key="result.symbol"
      class="symbol shadow-md p-4 justify-between flex items-center"
    >
      <div>
        <span class="text-2xl text-blue-800">{{ result['1. symbol'] }}</span>
        - ${{ Number(result['2. price']).toFixed(2) }}
      </div>
      <div>
        <button
          type="button"
          class="rounded-sm p-2 px-6 bg-green-400 text-white font-bold hover:bg-green-300"
          @click="addStock(result['1. symbol'])"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getQuotes } from '@/actions/symbols'

export default {
  data() {
    return {
      searchField: '',
      searchResults: ''
    }
  },
  methods: {
    ...mapActions(['addSymbol']),
    async searchSymbols() {
      // cmg,aapl,mack,ua,sbux,amzn,fb,vti,cgc,bynd,dis
      this.searchResults = await getQuotes(this.searchField)
    },
    addStock(symbol) {
      this.addSymbol(symbol)
    }
  }
}
</script>

<style lang="scss" scoped>
button[disabled='disabled'] {
  opacity: 0.5;
  cursor: default;

  &:hover {
    background: #702459;
  }
}
</style>
