<template>
  <div
    class="max-w-2xl fixed z-50 top-0 left-0 bottom-0 right-0 bg-gray-100 mx-auto my-20 shadow-lg rounded-sm"
  >
    <button
      type="button"
      class="rounded-sm absolute bottom-0 right-0 p-1 px-3 bg-gray-900 text-white font-bold hover:bg-gray-800"
      @click="$emit('update:editActive', false)"
    >
      Close
    </button>
    <div class="py-3 px-8">
      <h3 class="text-3xl my-3 text-blue-700">
        Edit Position - {{ position.symbol }}
      </h3>

      <form @submit.prevent>
        <div class="mb-6">
          <div class="mb-1">
            <label class="text-gray-500">Date Purchased</label>
          </div>
          <input
            v-model="localPosition.datePurchased"
            class="py-1 px-2 outline-none border-transparent border focus:border-gray-400 rounded-sm"
            type="date"
          />
        </div>
        <div class="mb-6">
          <div class="mb-1">
            <label class="text-gray-500">Price Paid</label>
          </div>

          <input
            v-model="localPosition.pricePaid"
            class="py-1 px-2 outline-none border-transparent border focus:border-gray-400 rounded-sm"
            type="number"
          />
        </div>

        <div class="mb-6">
          <div class="mb-1">
            <label class="text-gray-500">Number of Shares</label>
          </div>

          <input
            v-model="localPosition.shares"
            class="py-1 px-2 outline-none border-transparent border focus:border-gray-400 rounded-sm"
            type="number"
          />
        </div>

        <button
          type="button"
          class="rounded-sm p-2 px-6 bg-green-400 text-white font-bold hover:bg-green-300"
          @click="editPosition(localPosition)"
        >
          Save
        </button>
        <button
          type="button"
          class="rounded-sm p-2 px-6 bg-red-400 text-white font-bold hover:bg-red-300"
          @click="$emit('update:editActive', false)"
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    position: {
      type: Object,
      required: true
    },
    editActive: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    localPosition() {
      return { ...this.position }
    }
  },
  methods: {
    ...mapActions(['editPosition'])
  }
}
</script>
