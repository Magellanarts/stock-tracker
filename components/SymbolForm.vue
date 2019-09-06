<template>
  <div class="container mx-auto text-center my-2">
    <p class="my-6">
      Search for a single symbol or separate multiple with a comma
    </p>

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
          class="rounded-sm p-1 px-4  bg-pink-900 text-white h-8 hover:bg-pink-700 font-bold"
        >
          Submit
        </button>
      </fieldset>
      <div class="text-gray-600 text-sm py-2">
        Separate symbols with a comma
      </div>
    </form>
    {{ searchResults }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchField: '',
      searchResults: ''
    }
  },
  methods: {
    searchSymbols() {
      // cmg,aapl,mack,ua,sbux,amzn,fb,vti,cgc,bynd,dis
      axios
        .get(
          `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&apikey=EB49AOOA68F7PPHE&symbols=${this.searchField}`
        )
        .then((response) => {
          this.searchResults = response.data['Stock Quotes']
        })
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
