<template>
  <div>
    <div class="container mx-auto text-center my-10">
      <h1 class="text-5xl text-pink-900">Welcome</h1>
    </div>
    <symbol-form />

    <div v-if="!token" class="container mx-auto text-center my-6">
      <h2 class="text-2xl text-pink-900 my-6">
        Sign up now to track your positions
      </h2>

      <nuxt-link
        to="sign-up"
        class="rounded-sm px-6 py-2 text-lg bg-pink-900 text-white h-8 hover:bg-pink-700 font-bold"
        >Sign Up</nuxt-link
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SymbolForm from '@/components/SymbolForm'

export default {
  components: {
    SymbolForm
  },
  computed: {
    ...mapState({
      token: (state) => state.authToken
    })
  }
}
</script>
