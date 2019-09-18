<template>
  <div class="border-t border-b py-2 text-right mb-6">
    <button
      type="button"
      class="inline-block align-middle rounded-sm h-30 p-1 px-2 text-sm bg-teal-400 text-white font-bold hover:bg-teal-300 h-8"
      @click="createSnapshot"
    >
      Add Snapshot
    </button>
    <button
      type="button"
      class="inline-block align-middle rounded-sm h-30 p-1 px-2 text-sm bg-blue-400 text-white font-bold hover:bg-blue-300 h-8"
      @click="$emit('update:allDetails', !allDetails)"
    >
      Toggle All Details
    </button>
    <div class="inline-block relative w-32 align-middle text-sm h-8">
      <select
        v-model="localFilter"
        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline h-8"
        @change="handleFilterChange"
      >
        <option disabled>Filter by:</option>
        <option value="symbol">Alphabetical</option>
        <option value="price">Price</option>
        <option value="percentage">% of Portfolio</option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
    <button
      type="button"
      class="inline-block align-middle rounded-sm h-30 p-1 px-2 text-sm bg-yellow-400 text-white font-bold hover:bg-yellow-300 h-8"
      @click="$emit('update:reverse', !reverse)"
    >
      Reverse
    </button>
    <button
      type="button"
      class="inline-block align-middle rounded-sm h-30 p-1 px-2 text-sm bg-orange-400 text-white font-bold hover:bg-orange-300 h-8"
      @click="refreshPrices"
    >
      Refresh
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    reverse: {
      type: Boolean,
      required: true
    },
    filterBy: {
      type: String,
      required: true
    },
    allDetails: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      localFilter: 'symbol'
    }
  },
  methods: {
    ...mapActions(['refreshPrices', 'createSnapshot']),
    handleFilterChange() {
      this.$emit('update:filterBy', this.localFilter)
    }
  }
}
</script>

<style></style>
