<template>
  <div>
    <div class="container mx-auto">
      <h1 class="text-center my-8 text-5xl text-pink-900">Dashboard</h1>
      {{ me }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'authenticated',
  mounted() {
    this.getUser()
  },
  methods: {
    ...mapActions(['getUser'])
  },
  computed: {
    ...mapState({
      me: (state) => state.me
    })
  }
}
</script>
