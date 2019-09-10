<template>
  <div>
    <div class="container mx-auto px-6">
      <h1 class="text-center my-8 text-5xl text-pink-900">Dashboard</h1>

      <h2 class="text-4xl my-4 text-blue-700">
        Welcome {{ me.firstname }} {{ me.lastname }}
      </h2>

      <div class="md:flex md:mr-8">
        <div class="flex-1 mb-12">
          <h3 class="text-2xl mb-4 text-blue-600">Your Stocks</h3>
          <div
            v-for="stock in me.stocks"
            :key="stock.symbol"
            class="shadow-md p-4 justify-between mb-6"
          >
            <div
              class="border-b border-blue-600 pb-1 justify-between flex items-center"
            >
              <div class="text-lg text-blue-800">{{ stock.symbol }}</div>
              <div>
                <div
                  class="toggle toggle-plus text-lg rounded-full h-6 w-6 text-white bg-blue-700 flex content-center items-center justify-center cursor-pointer hover:bg-blue-500"
                >
                  <span>Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 md:ml-8">
          <symbol-form />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SymbolForm from '@/components/SymbolForm'

export default {
  middleware: 'authenticated',
  components: {
    SymbolForm
  },
  computed: {
    ...mapState({
      me: (state) => state.me
    })
  },
  mounted() {
    this.getUser()
  },
  methods: {
    ...mapActions(['getUser'])
  }
}
</script>
